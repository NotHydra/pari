"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavigationBar(): JSX.Element {
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
        <div className="column pl-0 pb-0">
            <nav className="navbar is-white line-bottom py-2" role="navigation" aria-label="main navigation">
                <div className="navbar-menu">
                    <div className="navbar-start pl-2">
                        {navigationPath[pathName].map((item, index) => (
                            <React.Fragment key={index}>
                                <Link href={item.link} className="navbar-item has-text-main-hover has-text-weight-medium">
                                    {item.display}
                                </Link>

                                {index < navigationPath[pathName].length - 1 ? <span className="navbar-item has-text-weight-medium px-0"> {">"} </span> : null}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    );
}
