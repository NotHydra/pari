"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SideBar(): JSX.Element {
    const pathName: string = usePathname();

    return (
        <aside className="column is-2 sidebar has-text-dark has-background-white line-right pb-0 pr-0">
            <div className="line-bottom">
                <Link href="/dashboard" className="navbar-item p-0">
                    <h2 className="title is-3 brand is-fullwidth has-text-dark has-text-main-hover has-text-centered py-4">PARI</h2>
                </Link>
            </div>

            <ul className="ml-3 mt-3">
                <li>
                    <Link
                        href="/dashboard"
                        className={`button is-fullwidth is-white sidebar-item mr-0 mb-3 pl-4 pr-0 py-2${pathName == "/dashboard" ? " is-active" : ""}`}
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
    );
}
