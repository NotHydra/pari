"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavigationBar(): JSX.Element {
    const pathName: string = usePathname();
    const navigationPath: { [key: string]: { display: string; link: string }[] } = {
        "/dashboard": [
            { display: "Dashboard", link: "/dashboard" },
            { display: "Home", link: "/dashboard" },
        ],
        "/dashboard/tag": [
            { display: "Dashboard", link: "/dashboard" },
            { display: "Tag", link: "/dashboard/tag" },
        ],
        "/dashboard/reader-configuration": [
            { display: "Dashboard", link: "/dashboard" },
            { display: "Reader Configuration", link: "/dashboard/reader-configuration" },
        ],
        "/dashboard/reader-configuration/add": [
            { display: "Dashboard", link: "/dashboard" },
            { display: "Reader Configuration", link: "/dashboard/reader-configuration" },
            { display: "Add", link: "/dashboard/reader-configuration/add" },
        ],
        "/dashboard/reader-configuration/1/change": [
            { display: "Dashboard", link: "/dashboard" },
            { display: "Reader Configuration", link: "/dashboard/reader-configuration" },
            { display: "Change", link: "/dashboard/reader-configuration/1/change" },
        ],
    };

    return (
        <div className="column pl-0 pb-0">
            <nav className="navbar is-white line-bottom py-2">
                <div className="navbar-menu">
                    <div className="navbar-start pl-2">
                        {navigationPath[pathName].map(
                            (
                                item: {
                                    display: string;
                                    link: string;
                                },
                                index: number
                            ) => (
                                <React.Fragment key={index}>
                                    <Link href={item.link} className="navbar-item has-text-main-hover has-text-weight-medium">
                                        {item.display}
                                    </Link>

                                    {index < navigationPath[pathName].length - 1 ? (
                                        <span className="navbar-item has-text-weight-medium px-0"> {">"} </span>
                                    ) : null}
                                </React.Fragment>
                            )
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
