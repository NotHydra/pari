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
                    <h2 className="title is-3 brand is-fullwidth has-text-dark has-text-main-hover has-text-centered">PARI</h2>
                </Link>
            </div>

            <ul className="ml-3 mt-3">
                <li>
                    <Link
                        href="/dashboard"
                        className={`button is-fullwidth is-white sidebar-item mr-0 mb-3 pl-4 pr-0 py-2${pathName == "/dashboard" ? " is-active" : ""}`}
                    >
                        <span className="icon is-left">
                            <i className="fas fa-home"></i>
                        </span>

                        <span className="is-fullwidth has-text-dark has-text-left">Home</span>
                    </Link>
                </li>

                <li>
                    <Link
                        href="/dashboard/tag"
                        className={`button is-fullwidth is-white sidebar-item mr-0 mb-3 pl-4 pr-0 py-2${pathName.includes("/dashboard/tag") ? " is-active" : ""}`}
                    >
                        <span className="icon is-left">
                            <i className="fas fa-tag"></i>
                        </span>

                        <span className="is-fullwidth has-text-dark has-text-left">Tag</span>
                    </Link>
                </li>

                <li>
                    <Link
                        href="/dashboard/reader-configuration"
                        className={`button is-fullwidth is-white sidebar-item mr-0 mb-3 pl-4 pr-0 py-2${pathName.includes("/dashboard/reader-configuration") ? " is-active" : ""}`}
                    >
                        <span className="icon is-left">
                            <i className="fas fa-tower-broadcast"></i>
                        </span>

                        <span className="is-fullwidth has-text-dark has-text-left">Reader Configuration</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
