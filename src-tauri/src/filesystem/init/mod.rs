use crate::filesystem;
use std::fs;
use std::path::Path;

pub fn init() -> () {
    fs::create_dir_all(Path::new(&filesystem::filepath::destination_folder_path())).ok();
    return ();
}
