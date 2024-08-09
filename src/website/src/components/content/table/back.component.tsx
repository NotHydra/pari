import Link from "next/link";

export default function ContentTableBack({ link }: { link: string }): JSX.Element {
    return (
        <div className="cell">
            <Link href={link} className="button is-fullwidth is-danger has-text-white has-text-weight-bold" title="Back Action">
                <span className="icon">
                    <i className="fas fa-reply"></i>
                </span>

                <span>Back</span>
            </Link>
        </div>
    );
}
