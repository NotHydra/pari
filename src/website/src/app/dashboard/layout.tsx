"use client";

import "@fortawesome/fontawesome-free/css/all.css";
import "bulma/css/bulma.css";

import React from "react";

import "@/public/css/main.css";

import SideBar from "@/components/side-bar";
import NavigationBar from "@/components/navigation-bar";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): JSX.Element {
    return (
        <div className="columns dashboard">
            <SideBar />

            <div className="fixed-grid has-1-cols is-fullwidth">
                <div className="grid">
                    <div className="cell">
                        <NavigationBar />
                    </div>

                    <div className="cell ml-3 mr-5">{children}</div>
                </div>
            </div>
        </div>
    );
}
