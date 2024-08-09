import ContentTableActionButton from "./index.component";

export default function ContentTableActionButtonChange({ action }: { action: string }): JSX.Element {
    return <ContentTableActionButton title="Change" icon="pen-to-square" color="warning" action={action} />;
}
