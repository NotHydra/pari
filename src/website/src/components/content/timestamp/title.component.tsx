export default function ContentTimestampTitle({ updatedAt = true }: { updatedAt?: boolean }): JSX.Element {
    return (
        <>
            <th className="timestamp">Created At</th>

            {updatedAt && <th className="timestamp">Updated At</th>}
        </>
    );
}
