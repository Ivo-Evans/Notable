mod filepath;

use std::fs;
use std::path::Path;

pub fn init() -> () {
    fs::create_dir_all(Path::new(&filepath::destination_folder_path())).ok();
    return ();
}
