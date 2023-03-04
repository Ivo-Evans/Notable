use crate::filesystem;
use crate::time_utils;
use rusqlite::named_params;
use rusqlite::{Connection, Result};

fn init() -> Result<Connection> {
    let conn = Connection::open(filesystem::filepath::db_file_path())?;

    let res = conn.execute(
        "create table if not exists notes (
            created_at number primary key,
            last_modified number not null,
             content text not null default ''
         );",
        [],
    );
    match res {
        Ok(_usize) => (),
        Err(error) => panic!("Problem creating the table: {:?}", error),
    }

    return Ok(conn);
}

thread_local!(static _CONNECTION: Connection = init().unwrap());

#[derive(Debug, serde::Serialize)]
pub struct NoteSummary {
    pub friendly_name: String,
    pub created_at: u64,
    pub content: String,
}

pub fn list_note_summaries() -> Result<Vec<NoteSummary>> {
    return _CONNECTION.with(|connection| {
        let mut statement = connection
            .prepare("select created_at, substr(content, 0, 18) as content from notes order by created_at desc")
            .unwrap();

        let rows = statement.query_map([], |row| {
            Ok(NoteSummary {
                friendly_name: time_utils::friendly_time_from_seconds(row.get(0)?),
                created_at: row.get(0)?,
                content: row.get(1)?,
            })
        })?;

        let notes = Vec::from_iter(rows.map(|row| row.unwrap()));

        return Ok(notes);
    });
}

pub fn open_note(created_at: u64) -> Result<NoteSummary> {
    println!("Trying to open note #{}", created_at);
    return _CONNECTION.with(|connection| {
        // println!("{}", created_at);
        let mut statement =
            connection.prepare("select created_at, content from notes where created_at = ?1")?;
        let mut rows = statement.query_map([created_at], |row| {
            Ok(NoteSummary {
                friendly_name: time_utils::friendly_time_from_seconds(row.get(0)?),
                created_at: row.get(0)?,
                content: row.get(1)?,
            })
        })?;
        let row = rows.nth(0).unwrap().unwrap();
        Ok(row)
    });
}

pub fn add_note() -> Result<NoteSummary> {
    return _CONNECTION.with(|connection| {
        let mut statement = connection.prepare("insert into notes (created_at, last_modified, content) values (?1, ?1, '') returning created_at, content;")?;
        let mut rows = statement.query_map([time_utils::current_time_in_seconds()], |row| {
            Ok(NoteSummary {
                friendly_name: time_utils::friendly_time_from_seconds(row.get(0)?),
                created_at: row.get(0)?,
                content: row.get(1)?,
            })
        })?;
        let row = rows.nth(0).unwrap().unwrap();


        return Ok(row);
    });
}

pub fn save_note(created_at: u64, content: String) -> Result<NoteSummary> {
    return _CONNECTION.with(|connection| {
        let mut statement = connection.prepare(
            "update notes set last_modified = :last_modified, content = :content where created_at = :created_at returning created_at, content",
        )?;
        let mut rows = statement.query_map(
            named_params! {":last_modified": time_utils::current_time_in_seconds(), ":content": content, ":created_at": created_at},
            |row| {
                Ok(NoteSummary {
                    friendly_name: time_utils::friendly_time_from_seconds(row.get(0)?),
                    created_at: row.get(0)?,
                    content: row.get(1)?,
                })
            },
        )?;
        let row = rows.nth(0).unwrap().unwrap();
        Ok(row)
    });
}

pub fn delete_note(created_at: u64) -> Result<()> {
    return  _CONNECTION.with(|connection| {
        println!("Deleting note #{}", created_at);
        let mut statement = connection.prepare("delete from notes where created_at = ?")?;
        statement.execute([created_at]).unwrap();
        Ok(())

    });
}

// go back and refactor - use named params more widely, and extract unpacking logic to a helper
