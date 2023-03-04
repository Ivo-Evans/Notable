import {
  Component,
  onMount,
  onCleanup,
} from "solid-js";
import { Note } from "../../../types";
import styles from "./styles.module.css";

const ONE_SECOND = 1000
const SAVE_INTERVAL = ONE_SECOND/ 2

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
    }, SAVE_INTERVAL);
  });
  
  onCleanup(() => {
    clearInterval(saveFn);
  });
  return (
    <div ref={editor} class={styles.editor} 
    contentEditable={props.note !== null}
    >
      {props.note?.content || ""}
    </div>
  );
};

export default Editor;
