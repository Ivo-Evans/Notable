import { createSignal, createResource } from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";
import { Note } from "../types";
import Sidebar from "../components/molecues/sidebar";
import styles from "./styles.module.css";
import Editor from "../components/molecues/editor";

function App() {
  const [getOpenNote, setOpenNote] = createSignal<Note | null>(null);
  const [getOpenNoteIndex, setOpenNoteIndex] = createSignal<number | null>(
    null
  );

  const openNote = async (index: number, created_at: number) => {
    const openNote = await invoke<Note>("open_note", { createdAt: created_at });
    setOpenNoteIndex(index);
    setOpenNote(openNote);
  };

  const [getNotes, { mutate: mutateNotes }] = createResource(
    async () => {
      const notes = await invoke<Note[]>("list_note_summaries");
      if (notes.length && !getOpenNote()) {
        await openNote(0, notes[0].created_at);
      }
      return notes;
    },
    { initialValue: [] }
  );

  const createNote = async () => {
    const note = await invoke<Note>("add_note");
    mutateNotes((notes) => [note, ...notes]);
    await openNote(0, note.created_at);
  };

  const saveNote = async (createdAt: number, content: string) => {
    const openNoteIndex = getOpenNoteIndex();
    if (openNoteIndex === null) {
      return;
    }
    await invoke<Note>("save_note", { createdAt, content });
    const notes = getNotes();
    // mutate at index instead of iterating and replacing for performance
    const newNote = { ...notes[openNoteIndex], content: content.slice(0, 29) };
    notes[openNoteIndex] = newNote;
    // clone the array so solid's reactivity system is aware of a change
    mutateNotes([...notes]);
  };

  return (
    <div class={styles.app}>
      <Sidebar
        getNotes={getNotes}
        openNote={openNote}
        createNote={createNote}
      />
      <Editor note={getOpenNote()} saveNote={saveNote} />
    </div>
  );
}

export default App;
