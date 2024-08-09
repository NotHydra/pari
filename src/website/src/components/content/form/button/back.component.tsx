import Link from "next/link";

export default function ContentFormButtonBack({ link }: { link: string }): JSX.Element {
    return (
        <Link href={link} className="button is-fullwidth is-danger has-text-white has-text-weight-bold" title="Back Action">
            <span className="icon">
                <i className="fas fa-reply"></i>
            </span>

            <span>Back</span>
        </Link>
    );
}
