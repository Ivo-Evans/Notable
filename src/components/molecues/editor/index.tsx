import {
  Component,
  onMount,
  onCleanup,
} from "solid-js";
import { Note } from "../../../types";
import styles from "./styles.module.css";

interface Props {
  note: Note | null;
  saveNote: (created_at: number, content: string) => Promise<void>;
}

const Editor: Component<Props> = (props) => {
  let saveFn: ReturnType<typeof setInterval>;
  let editor: HTMLDivElement | undefined;
  
  onMount(() => {
    saveFn = setInterval(() => {
      if (!props.note) {
        return
      }
      const val = editor?.textContent || ""
      props.saveNote(props.note.created_at, val)
    }, 500);
  });
  
  onCleanup(() => {
    clearInterval(saveFn);
  });
  return (
    <div ref={editor} class={styles.editor} 
    contentEditable
    >
      {props.note?.content || ""}
    </div>
  );
};

export default Editor;
