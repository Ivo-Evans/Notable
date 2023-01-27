use crate::filesystem;
use crate::time_utils;
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

#[derive(serde::Serialize)]
pub struct NoteSummary {
    pub name: String,
    pub content: String,
}

pub fn list_note_summaries() -> Result<Vec<NoteSummary>> {
    return _CONNECTION.with(|connection| {
        let mut statement = connection
            .prepare("select created_at, content from notes;")
            .unwrap();

        let rows = statement.query_map([], |row| {
            Ok(NoteSummary {
                name: time_utils::friendly_time_from_seconds(row.get(0)?),
                content: row.get(1)?,
            })
        })?;

        let notes = Vec::from_iter(rows.map(|row| row.unwrap()));

        return Ok(notes);
    });
}

pub fn add_note() -> Result<usize> {
    return _CONNECTION.with(|connection| {

        let res = connection.execute(
            "insert into notes (created_at, last_modified, content) values (?1, ?1, '');",
            [time_utils::current_time_in_seconds()],
        );

        return res;
    });
}
