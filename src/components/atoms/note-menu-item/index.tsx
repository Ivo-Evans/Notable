import { Component } from "solid-js";
import { Note } from "../../../types";
import styles from "./styles.module.css";

interface Props {
  note: Note;
  openNote: (created_at: number) => Promise<void>;
}

const NoteMenuItem: Component<Props> = (props) => {
  return (
    <div class={styles.note} onClick={() => props.openNote(props.note.created_at)}>
      <p class={styles.content}>{props.note.content}</p>
      <p class={styles.name}>{props.note.friendly_name}</p>
    </div>
  );
};

export default NoteMenuItem;
