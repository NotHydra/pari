"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavigationBar(): JSX.Element {
    const pathName: string = usePathname();
    const navigationPath: { [key: string]: { display: string; icon: string; link: string }[] } = {
        "/dashboard": [
            { display: "Dashboard", icon: "gauge", link: "/dashboard" },
            { display: "Home", icon: "home", link: "/dashboard" },
        ],
        "/dashboard/tag": [
            { display: "Dashboard", icon: "gauge", link: "/dashboard" },
            { display: "Tag", icon: "tag", link: "/dashboard/tag" },
        ],
        "/dashboard/reader-configuration": [
            { display: "Dashboard", icon: "gauge", link: "/dashboard" },
            { display: "Reader Configuration", icon: "tower-broadcast", link: "/dashboard/reader-configuration" },
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
                                    icon: string;
                                    link: string;
                                },
                                index: number
                            ) => (
                                <React.Fragment key={index}>
                                    <Link href={item.link} className="navbar-item has-text-main-hover has-text-weight-medium">
                                        <span className="icon is-left">
                                            <i className={`fas fa-${item.icon}`}></i>
                                        </span>

                                        <span>{item.display}</span>
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
