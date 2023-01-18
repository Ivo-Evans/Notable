use crate::database;


#[tauri::command]
pub fn list_notes() -> () {
    let notes = database::list_notes().unwrap();
    for note in &notes {
        println!("Found note {:?}", note.created_at);
    }
    // jsonify?
    return ();
}
