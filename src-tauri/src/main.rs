mod command;
mod database;
mod filesystem;

fn main() {
    filesystem::init::init();
    database::add_note().unwrap();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![command::list_notes])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
