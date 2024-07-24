"use client";

import "@fortawesome/fontawesome-free/css/all.css";
import "bulma/css/bulma.css";

import React from "react";

import "./../../public/css/main.css";

import SideBar from "./components/side-bar";
import NavigationBar from "./components/navigation-bar";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): JSX.Element {
    return (
        <div className="columns dashboard">
            <SideBar />
            <NavigationBar />
        </div>
    );
}
