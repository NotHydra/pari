import Link from "next/link";

export default function ContentTableBarAdd({ link }: { link: string }): JSX.Element {
    return (
        <div className="column is-1 m-0 mr-2 p-0">
            <Link href={link} className="button is-normal is-fullwidth is-success has-text-weight-bold" title="Add Action">
                <span className="icon">
                    <i className="fab fa-plus"></i>
                </span>
            </Link>
        </div>
    );
}
