import { timestampToString } from "@/utility/timestamp-to-string";

export default function Timestamp({ timestamp }: { timestamp: Date }): JSX.Element {
    const value: string[] = timestampToString(timestamp).split(" ");

    return (
        <>
            <div>{value[0]}</div>
            <div>{value[1]}</div>
        </>
    );
}
