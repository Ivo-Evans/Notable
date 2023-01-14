#[path = "./database/init.rs"]
mod init_db;
#[path = "./filesystem/init.rs"]
mod init_fs;

mod command;

fn main() {
    init_fs::init();

    init_db::init().ok();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![command::greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
