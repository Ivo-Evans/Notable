import { Accessor, Component, For } from "solid-js"
import { NoteSummary } from "../../../types"

interface Props {
    notes: NoteSummary[]
}

const Sidebar: Component<Props> = ({notes}) => {
    return (
        <div>
            <For each={notes}>
                {note => <p>{note.name}</p>}
            </For>
        </div>
    )
}
export default Sidebar