export default function ContentFormButton({ type }: { type: string }): JSX.Element {
    let color: string = "success";
    let title: string = "Add";
    let icon: string = "plus";

    if (type === "change") {
        color = "warning";
        title = "Change";
        icon = "pen-to-square";
    } else if (type === "remove") {
        color = "danger";
        title = "Remove";
        icon = "trash";
    }

    return (
        <button className={`button is-fullwidth is-${color} has-text-weight-bold`} type="submit" title={`${title} Action`}>
            <span className="icon">
                <i className={`fas fa-${icon}`}></i>
            </span>

            <span>{title}</span>
        </button>
    );
}
