import moment from "moment";

export default function Timestamp({ timestamp }: { timestamp: Date }): JSX.Element {
    const value: string[] = moment(timestamp).format(`HH:mm:ss DD-MMMM-YYYY`).split(" ");

    return (
        <>
            <div>{value[0]}</div>
            <div>{value[1]}</div>
        </>
    );
}
