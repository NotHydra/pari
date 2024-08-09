import Link from "next/link";

export default function ContentTableActionButton({
    title,
    icon,
    color,
    action,
    disabled = false,
}: {
    title: string;
    icon: string;
    color: string;
    action: string | (() => void);
    disabled?: boolean;
}): JSX.Element {
    return (
        <div className="cell">
            {typeof action === "string" ? (
                <Link href={action} className={`button is-small is-fullwidth is-${color} has-text-white`} title={`${title} Action`}>
                    <span className="icon">
                        <i className={`fas fa-${icon}`}></i>
                    </span>
                </Link>
            ) : (
                <button className={`button is-small is-fullwidth is-${color} has-text-white`} title={`${title} Action`} onClick={action} disabled={disabled}>
                    <span className="icon">
                        <i className={`fas fa-${icon}`}></i>
                    </span>
                </button>
            )}
        </div>
    );
}
