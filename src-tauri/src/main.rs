mod command;
mod database;
mod filesystem;
mod time_utils;

fn main() {
    filesystem::init::init();
    database::add_note().unwrap();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            command::list_note_summaries,
            command::open_note,
            command::save_note
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
