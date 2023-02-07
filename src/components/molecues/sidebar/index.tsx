import { Accessor, Component, For } from "solid-js";
import { Note } from "../../../types";
import NoteMenuItem from "../../atoms/note-menu-item";
import styles from "./styles.module.css";

interface Props {
  notes: Note[];
  openNote: (created_at: number) => Promise<void>;
}

const Sidebar: Component<Props> = (props) => {
  return (
    <div class={styles.sidebar}>
      <For each={props.notes}>
        {(note) => <NoteMenuItem note={note} openNote={props.openNote} />}
      </For>
    </div>
  );
};
export default Sidebar;
