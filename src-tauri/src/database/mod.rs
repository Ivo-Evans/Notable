use crate::filesystem;
use rusqlite::{Connection, Result};
use std::time::{SystemTime, UNIX_EPOCH};

pub fn init() -> Result<Connection> {
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

pub struct Note {
    pub created_at: u32,
    pub modified_at: u32,
    pub content: String,
}

pub fn list_notes(connection: &Connection) -> Result<Vec<Note>> {
    let mut statement = connection.prepare("select * from notes;").unwrap();

    let rows = statement.query_map([], |row| {
        Ok(Note {
            created_at: row.get(0)?,
            modified_at: row.get(1)?,
            content: row.get(2)?,
        })
    })?;

    let notes = Vec::from_iter(rows.map(|row| row.unwrap()));

    return Ok(notes);
}

pub fn add_note(connection: &Connection) -> Result<usize> {
    let now = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs();

    let res = connection
        .execute(
            "insert into notes (created_at, last_modified, content) values (?1, ?1, '');",
            [now],
        );
        

    return res;
}
