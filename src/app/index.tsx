import { createSignal, createEffect } from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";
import { NoteSummary } from "../types";
import Sidebar from "../components/molecues/sidebar";
import styles from "./styles.module.css"
import Editor from "../components/molecues/editor";

function App() {
  const [getNotes, setNotes] = createSignal<NoteSummary[]>([]);

  createEffect(async () => {
    const notes = await invoke<NoteSummary[]>("list_note_summaries");
    setNotes(notes);
  });

  return (
    <div class={styles.app}>
      <Sidebar notes={getNotes()} />
      <Editor />
    </div>
  );
}

export default App;
