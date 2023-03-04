import { Accessor, Component, For } from "solid-js";
import { Note } from "../../../types";
import NoteMenuItem from "../note-menu-item";
import styles from "./styles.module.css";

interface Props {
  getNotes: Accessor<Note[]>;
  openNote: (created_at: number) => Promise<void>;
  createNote: () => Promise<void>;
  deleteNote: (created_at: number)=> Promise<void>;
}

const Sidebar: Component<Props> = (props) => {
  return (
    <div class={styles.sidebar}>
      <div class={styles.addRow}>
        <button class={styles.addButton} onClick={() => props.createNote()}>
          +
        </button>
      </div>
      <For each={props.getNotes()}>
        {(note) => (
          <NoteMenuItem
            note={note}
            openNote={(created_at) => props.openNote(created_at)}
            deleteNote={props.deleteNote}
          />
        )}
      </For>
    </div>
  );
};
export default Sidebar;
