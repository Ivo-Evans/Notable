import {
  createSignal,
  createResource,
} from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";
import { Note } from "../types";
import Sidebar from "../components/molecues/sidebar";
import styles from "./styles.module.css";
import Editor from "../components/molecues/editor";

function App() {
  const [getOpenNote, setOpenNote] = createSignal<Note | null>(null);

  const openNote = async (created_at: number) => {
    const openNote = await invoke<Note>("open_note", { createdAt: created_at });
    setOpenNote(openNote);
  };

  const [getNotes, { mutate: mutateNotes }] = createResource(
    async () => {
      const notes = await invoke<Note[]>("list_note_summaries");
      if (notes.length && !getOpenNote()) {
        await openNote(notes[0].created_at);
      }
      return notes;
    },
    { initialValue: [] }
  );

  const createNote = async () => {
    const note = await invoke<Note>("add_note")
    mutateNotes(notes => [note, ...notes])
    await openNote(note.created_at)
  }

  const saveNote = async (createdAt: number, content: string) => {
    invoke<Note>("save_note", { createdAt, content });
  };

  return (
    <div class={styles.app}>
      <Sidebar notes={getNotes()} openNote={openNote} createNote={createNote} />
      <Editor note={getOpenNote()} saveNote={saveNote} />
    </div>
  );
}

export default App;
