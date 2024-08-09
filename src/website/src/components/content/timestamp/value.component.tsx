import ContentTimestamp from "./index.component";

export default function ContentTimestampValue({ createdAt, updatedAt }: { createdAt: Date; updatedAt?: Date }): JSX.Element {
    return (
        <>
            <ContentTimestamp timestamp={createdAt} />

            {updatedAt !== undefined && <ContentTimestamp timestamp={updatedAt} />}
        </>
    );
}
