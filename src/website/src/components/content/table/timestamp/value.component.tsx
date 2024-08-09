import ContentTableTimestamp from "./index.component";

export default function ContentTableTimestampValue({ createdAt, updatedAt }: { createdAt: Date; updatedAt?: Date }): JSX.Element {
    return (
        <>
            <ContentTableTimestamp timestamp={createdAt} />

            {updatedAt !== undefined && <ContentTableTimestamp timestamp={updatedAt} />}
        </>
    );
}
