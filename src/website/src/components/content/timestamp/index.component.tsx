import moment from "moment";

export default function ContentTimestamp({ timestamp }: { timestamp: Date }): JSX.Element {
    const value: string[] = moment(timestamp).format(`HH:mm:ss DD-MMMM-YYYY`).split(" ");

    return (
        <td className="timestamp">
            <div>{value[0]}</div>
            <div>{value[1]}</div>
        </td>
    );
}
