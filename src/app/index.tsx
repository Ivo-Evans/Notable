import { createSignal, createResource } from "solid-js";
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

  const [getSidebarNotes, { mutate: mutateSidebarNotes }] = createResource(
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
    const note = await invoke<Note>("add_note");
    mutateSidebarNotes((notes) => [note, ...notes]);
    await openNote(note.created_at);
  };

  const saveNote = async (createdAt: number, content: string) => {
    await invoke<Note>("save_note", { createdAt, content });

    mutateSidebarNotes((notes) =>
      notes.map((note) =>
        note.created_at === createdAt ? { ...note, content } : note
      )
    );
  };

  const deleteNote = async (createdAt: number) => {
    const notes = getSidebarNotes();
    if (notes.length < 2) {
      setOpenNote(null);
    } else {
      const openNoteIndex = notes.findIndex(
        (note) => note.created_at === createdAt
      );
      const newerNote = notes[openNoteIndex - 1];
      const olderNote = notes[openNoteIndex + 1];
      if (!(newerNote || olderNote)) {
        throw new Error(
          `Index out of bounds: tried to delete note created_at ${createdAt} with index ${openNoteIndex}, but there is no note before or after`
        );
      }
      openNote((newerNote || olderNote).created_at);
    }
    await invoke("delete_note", { createdAt });
    mutateSidebarNotes((notes) =>
      notes.filter((note) => note.created_at !== createdAt)
    );
  };

  return (
    <div class={styles.app}>
      <Sidebar
        getNotes={getSidebarNotes}
        openNote={openNote}
        createNote={createNote}
        deleteNote={deleteNote}
      />
      <Editor note={getOpenNote()} saveNote={saveNote} />
    </div>
  );
}

export default App;
