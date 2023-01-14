mod database;
mod filesystem;
mod command;

fn main() {
    filesystem::init::init();

    database::init::init().ok();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![command::greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
