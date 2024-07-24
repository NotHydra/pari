"use client";

import "@fortawesome/fontawesome-free/css/all.css";
import "bulma/css/bulma.css";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import "./../../public/css/main.css";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): JSX.Element {
    const pathName: string = usePathname();
    const navigationPath: { [key: string]: { display: string; link: string }[] } = {
        "/dashboard/home": [
            { display: "Dashboard", link: "/dashboard/home" },
            { display: "Home", link: "/dashboard/home" },
        ],
        "/dashboard/tag": [
            { display: "Dashboard", link: "/dashboard/home" },
            { display: "Tag", link: "/dashboard/tag" },
        ],
        "/dashboard/reader-configuration": [
            { display: "Dashboard", link: "/dashboard/home" },
            { display: "Reader Configuration", link: "/dashboard/reader-configuration" },
        ],
    };

    return (
        <div className="columns dashboard">
            <aside className="column is-2 sidebar has-text-dark has-background-white line-right pb-0 pr-0">
                <div className="line-bottom">
                    <Link href="/dashboard/home" className="navbar-item p-0">
                        <h2 className="title is-3 brand is-fullwidth has-text-dark has-text-main-hover has-text-centered py-4">PARI</h2>
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

            <div className="column pl-0">
                <nav className="navbar is-white line-bottom py-2" role="navigation" aria-label="main navigation">
                    <div className="navbar-menu">
                        <div className="navbar-start pl-2">
                            {navigationPath[pathName].map((item, index) => (
                                <React.Fragment key={index}>
                                    <Link href={item.link} className="navbar-item has-text-main-hover has-text-weight-medium">
                                        {item.display}
                                    </Link>

                                    {index < navigationPath[pathName].length - 1 ? (
                                        <span className="navbar-item has-text-weight-medium px-0"> {">"} </span>
                                    ) : null}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}
