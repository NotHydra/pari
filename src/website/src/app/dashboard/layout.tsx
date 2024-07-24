"use client";

import "@fortawesome/fontawesome-free/css/all.css";
import "bulma/css/bulma.css";

import Link from "next/link";
import { usePathname } from "next/navigation";

import "./../../public/css/main.css";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): JSX.Element {
    const pathName: string = usePathname();

    return (
        <div className="columns dashboard">
            <aside className="column is-2 sidebar has-text-dark has-background-white pb-0 pr-0">
                <div className="line-bottom">
                    <Link href="/dashboard/home" className="navbar-item p-0">
                        <h2 className="title is-3 is-fullwidth has-text-dark has-text-main-hover has-text-centered py-5">PARI</h2>
                    </Link>
                </div>

                <ul className="ml-3 mt-3">
                    <li>
                        <Link
                            href="/dashboard/home"
                            className={`button is-fullwidth is-white sidebar-item mr-0 mb-3 pl-4 pr-0 py-2${pathName == "/dashboard/home" ? " is-active" : ""}`}
                        >
                            <p className="is-fullwidth has-text-dark has-text-left">Home</p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/tag"
                            className={`button is-fullwidth is-white sidebar-item mr-0 mb-3 pl-4 pr-0 py-2${pathName == "/dashboard/tag" ? " is-active" : ""}`}
                        >
                            <p className="is-fullwidth has-text-dark has-text-left">Tag</p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/reader-configuration"
                            className={`button is-fullwidth is-white sidebar-item mr-0 mb-3 pl-4 pr-0 py-2${pathName == "/dashboard/reader-configuration" ? " is-active" : ""}`}
                        >
                            <p className="is-fullwidth has-text-dark has-text-left">Reader Configuration</p>
                        </Link>
                    </li>
                </ul>
            </aside>

            <div className="column">{children}</div>
        </div>
    );
}
