import { Accessor, Component, For } from "solid-js";
import { Note } from "../../../types";
import NoteMenuItem from "../../atoms/note-menu-item";
import styles from "./styles.module.css";

interface Props {
  getNotes: Accessor<Note[]>;
  openNote: (index: number, created_at: number) => Promise<void>;
  createNote: () => Promise<void>;
}

const Sidebar: Component<Props> = (props) => {
  console.log("✌", props.getNotes());
  return (
    <div class={styles.sidebar}>
      <div class={styles.addRow}>
        <button class={styles.addButton} onClick={() => props.createNote()}>
          +
        </button>
      </div>
      <For each={props.getNotes()}>
        {(note, getIndex) => (
          <NoteMenuItem
            note={note}
            openNote={(created_at) => props.openNote(getIndex(), created_at)}
          />
        )}
      </For>
    </div>
  );
};
export default Sidebar;
