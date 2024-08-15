export default function ContentFormButton({ color, title, icon }: { color: string; title: string; icon: string }): JSX.Element {
    return (
        <button className={`button is-fullwidth is-${color} has-text-weight-bold`} type="submit" title={`${title} Action`}>
            <span className="icon">
                <i className={`fas fa-${icon}`}></i>
            </span>

            <span>{title}</span>
        </button>
    );
}
