import { createSignal, createEffect } from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { NoteSummary } from "./types";
import Sidebar from "./components/molecues/sidebar";

function App() {
  const [getNotes, setNotes] = createSignal<NoteSummary[]>([]);

  createEffect(async () => {
    const notes = await invoke<NoteSummary[]>("list_note_summaries");
    setNotes(notes);
  });

  return (
    <div class="container">
      <Sidebar notes={getNotes()} />
    </div>
  );
}

export default App;
