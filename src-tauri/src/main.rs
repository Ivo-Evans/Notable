mod command;
mod database;
mod filesystem;

fn main() {
    filesystem::init::init();

    let connection = database::init().unwrap();
    let notes = database::list_notes(&connection).unwrap();
    for note in &notes {
        println!("Found note {:?}", note.created_at);
    }

    database::list_notes(&connection).unwrap();

    database::add_note(&connection).unwrap();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![command::greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
