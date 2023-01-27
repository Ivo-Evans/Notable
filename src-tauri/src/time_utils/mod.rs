extern crate chrono;
use chrono::prelude::{DateTime, NaiveDateTime};
use chrono::Utc;
use std::time::{SystemTime, UNIX_EPOCH};

pub fn current_time_in_seconds() -> u64 {
    return SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs();
}

pub fn friendly_time_from_seconds(seconds: u64) -> String {
    let naive = NaiveDateTime::from_timestamp_opt(seconds as i64, 0).unwrap();
    let datetime: DateTime<Utc> = DateTime::from_utc(naive, Utc);
    return datetime.format("%H:%M:%S, %m-%d").to_string();
}
