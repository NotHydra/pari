import ContentTableActionButton from "./index.component";

export default function ContentTableActionButtonRemove({ action }: { action: string | (() => void) }): JSX.Element {
    return <ContentTableActionButton title="Remove" icon="trash" color="danger" action={action} />;
}
