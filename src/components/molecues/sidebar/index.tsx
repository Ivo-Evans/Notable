import { Accessor, Component, For } from "solid-js";
import { Note } from "../../../types";
import NoteMenuItem from "../../atoms/note-menu-item";
import styles from "./styles.module.css";

interface Props {
  notes: Note[];
  openNote: (created_at: number) => Promise<void>;
  createNote: () => Promise<void>;
}

const Sidebar: Component<Props> = (props) => {
  return (
    <div class={styles.sidebar}>
      <div class={styles.addRow}>
         <button class={styles.addButton} onClick={() => props.createNote()}>
          +
         </button>
      </div>
      <For each={props.notes}>
        {(note) => <NoteMenuItem note={note} openNote={props.openNote} />}
      </For>
    </div>
  );
};
export default Sidebar;
