use rusqlite::{Connection, Result};
use crate::filesystem;

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

    Ok(conn)
}
