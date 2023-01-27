import { Component } from "solid-js";
import { NoteSummary } from "../../../types";
import styles from "./styles.module.css";

interface Props {
  noteSummary: NoteSummary;
}

const NoteMenuItem: Component<Props> = ({ noteSummary }) => {
  return (
    <div class={styles.noteSummary}>
      <p class={styles.content}>{noteSummary.content}</p>
      <p class={styles.name}>{noteSummary.name}</p>
    </div>
  );
};

export default NoteMenuItem;
