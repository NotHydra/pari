"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export default function NavigationBar(): JSX.Element {
    const pathName: string = usePathname();
    const params: { tagId: string; frequencyId: string; readerConfigurationId: string; frequencyConfigurationId: string } = useParams<{
        tagId: string;
        frequencyId: string;
        readerConfigurationId: string;
        frequencyConfigurationId: string;
    }>();

    const navigationPath: { [key: string]: { display: string; link: string }[] } = {};

    navigationPath["/dashboard"] = [
        { display: "Dashboard", link: "/dashboard" },
        { display: "Home", link: "/dashboard" },
    ];

    navigationPath["/dashboard/tag"] = [
        { display: "Dashboard", link: "/dashboard" },
        { display: "Tag", link: "/dashboard/tag" },
    ];

    navigationPath[`/dashboard/tag/${params.tagId}/line-chart`] = [
        { display: "Dashboard", link: "/dashboard" },
        { display: "Tag", link: "/dashboard/tag" },
        { display: "Line Chart", link: `/dashboard/tag/${params.tagId}/line-chart` },
    ];

    navigationPath[`/dashboard/tag/${params.tagId}/frequency`] = [
        { display: "Dashboard", link: "/dashboard" },
        { display: "Tag", link: "/dashboard/tag" },
        { display: "Frequency", link: `/dashboard/tag/${params.tagId}/frequency` },
    ];

    navigationPath[`/dashboard/tag/${params.tagId}/frequency/${params.frequencyId}/rssi`] = [
        { display: "Dashboard", link: "/dashboard" },
        { display: "Tag", link: "/dashboard/tag" },
        { display: "Frequency", link: `/dashboard/tag/${params.tagId}/frequency` },
        { display: "RSSI", link: `/dashboard/tag/${params.tagId}/frequency/${params.frequencyId}/rssi` },
    ];

    navigationPath["/dashboard/reader-configuration"] = [
        { display: "Dashboard", link: "/dashboard" },
        { display: "Reader Configuration", link: "/dashboard/reader-configuration" },
    ];

    navigationPath["/dashboard/reader-configuration/add"] = [
        { display: "Dashboard", link: "/dashboard" },
        { display: "Reader Configuration", link: "/dashboard/reader-configuration" },
        { display: "Add", link: "/dashboard/reader-configuration/add" },
    ];

    navigationPath[`/dashboard/reader-configuration/${params.readerConfigurationId}/change`] = [
        { display: "Dashboard", link: "/dashboard" },
        { display: "Reader Configuration", link: "/dashboard/reader-configuration" },
        { display: "Change", link: `/dashboard/reader-configuration/${params.readerConfigurationId}/change` },
    ];

    navigationPath[`/dashboard/reader-configuration/${params.readerConfigurationId}/remove`] = [
        { display: "Dashboard", link: "/dashboard" },
        { display: "Reader Configuration", link: "/dashboard/reader-configuration" },
        { display: "Remove", link: `/dashboard/reader-configuration/${params.readerConfigurationId}/remove` },
    ];

    navigationPath[`/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration`] = [
        { display: "Dashboard", link: "/dashboard" },
        { display: "Reader Configuration", link: "/dashboard/reader-configuration" },
        { display: "Frequency Configuration", link: `/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration` },
    ];

    navigationPath[`/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration/add`] = [
        { display: "Dashboard", link: "/dashboard" },
        { display: "Reader Configuration", link: "/dashboard/reader-configuration" },
        { display: "Frequency Configuration", link: `/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration` },
        { display: "Add", link: `/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration/add` },
    ];

    navigationPath[`/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration/${params.frequencyConfigurationId}/change`] = [
        { display: "Dashboard", link: "/dashboard" },
        { display: "Reader Configuration", link: "/dashboard/reader-configuration" },
        { display: "Frequency Configuration", link: `/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration` },
        {
            display: "Change",
            link: `/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration/${params.frequencyConfigurationId}/change`,
        },
    ];

    navigationPath[`/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration/${params.frequencyConfigurationId}/remove`] = [
        { display: "Dashboard", link: "/dashboard" },
        { display: "Reader Configuration", link: "/dashboard/reader-configuration" },
        { display: "Frequency Configuration", link: `/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration` },
        {
            display: "Remove",
            link: `/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration/${params.frequencyConfigurationId}/remove`,
        },
    ];

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
