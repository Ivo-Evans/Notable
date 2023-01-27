use crate::database;

#[tauri::command]
pub fn list_note_summaries() -> Vec<database::NoteSummary> {
    let notes = database::list_note_summaries().unwrap();
    return notes;
}
