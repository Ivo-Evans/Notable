use crate::database::{self, NoteSummary};

#[tauri::command]
pub fn list_note_summaries() -> Vec<database::NoteSummary> {
    return database::list_note_summaries().unwrap();
}

#[tauri::command]
pub fn open_note(created_at: u64) -> NoteSummary {
    return database::open_note(created_at).unwrap();
}

#[tauri::command]
pub fn save_note(created_at: u64, content: String) -> NoteSummary {
    return database::save_note(created_at, content).unwrap()
}

#[tauri::command]
pub fn add_note() -> NoteSummary {
    return database::add_note().unwrap();
}