import { Component } from "solid-js";
import { Note } from "../../../types";
import styles from "./styles.module.css";

interface Props {
  note: Note;
  openNote: (created_at: number) => Promise<void>;
  deleteNote: (created_at: number) => Promise<void>;
}

const NoteMenuItem: Component<Props> = (props) => {
  return (
    <div
      class={styles.note}
      onClick={(e) => props.openNote(props.note.created_at)}
    >
      <span class={styles.summary}>
        <p class={styles.content}>{props.note.content}</p>
        <p class={styles.name}>{props.note.friendly_name}</p>
      </span>
      <span
        class={styles.delete}
        onClick={(e) => {
          e.stopPropagation();
          props.deleteNote(props.note.created_at);
        }}
      >
        D
      </span>
    </div>
  );
};

export default NoteMenuItem;
