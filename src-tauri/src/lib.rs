use std::process::Command;
use reqwest;
use serde_json::Value;

#[tauri::command]
fn run_ps(command: &str) -> String {
    let output = Command::new("cmd")
        .args(["/C", command])
        .output();

    match output {
        Ok(output) => {
            if output.status.success() {
                String::from_utf8_lossy(&output.stdout).to_string()
            } else {
                String::from_utf8_lossy(&output.stderr).to_string()
            }
        }
        Err(e) => format!("Error executing command: {}", e),
    }
}

#[tauri::command]
fn google_suggest(query: &str) -> Vec<String> {
    let url = format!(
        "https://suggestqueries.google.com/complete/search?client=firefox&q={}",
        query
    );

    let resp = reqwest::blocking::get(&url);

    match resp {
        Ok(res) => {
            if let Ok(json) = res.json::<Value>() {
                if let Some(arr) = json.get(1).and_then(|v| v.as_array()) {
                    return arr
                        .iter()
                        .filter_map(|v| v.as_str().map(|s| s.to_string()))
                        .collect();
                }
            }
            vec![]
        }
        Err(e) => vec![format!("Error: {}", e)],
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
            .invoke_handler(tauri::generate_handler![
                run_ps,
                google_suggest
            ])
            .run(tauri::generate_context!())
            .expect("error while running Tauri app");
}
