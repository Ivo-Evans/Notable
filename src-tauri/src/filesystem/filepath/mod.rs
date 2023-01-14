use std::env;

pub fn destination_folder_path() -> String {
    return format!("{}/.notable", env::var("HOME").unwrap());
}

pub fn db_file_path() -> String {
    return format!("{}/{}", destination_folder_path(), "notable.db");
}

// pub fn note_path(file_name: String) -> String {
//     return format!("{}/{}", destination_folder_path(), file_name);
// }
