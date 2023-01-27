import { Accessor, Component, For } from "solid-js";
import { NoteSummary } from "../../../types";
import NoteMenuItem from "../../atoms/note-menu-item";
import styles from "./styles.module.css";

interface Props {
  notes: NoteSummary[];
}

const Sidebar: Component<Props> = ({ notes }) => {
  // for some reason these only display after a hot reload
  return (
    <div class={styles.sidebar}>
      <For each={notes}>
        {(noteSummary) => <NoteMenuItem noteSummary={noteSummary} />}
      </For>
    </div>
  );
};
export default Sidebar;
