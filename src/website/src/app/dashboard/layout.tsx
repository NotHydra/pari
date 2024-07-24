import "@fortawesome/fontawesome-free/css/all.css";
import "bulma/css/bulma.css";

import type { Metadata } from "next";
import { NextFont } from "next/dist/compiled/@next/font";
import { Inter } from "next/font/google";
import Link from "next/link";

import "./../../public/css/main.css";

const inter: NextFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "PARI | Dashboard",
    description: "SISTEM KLASIFIKASI KEMATANGAN PEPAYA (Carica papaya) SECARA NON-INVASIF BERBASIS GELOMBANG ELEKTROMAGNETIK FREKUENSI ULTRA TINGGI",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): JSX.Element {
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
                        <Link href="/dashboard/home" className="button is-fullwidth is-white sidebar-item mr-0 mb-1 pl-4 pr-0 py-2">
                            <p className="is-fullwidth has-text-dark has-text-left">Home</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/tag" className="button is-fullwidth is-white sidebar-item mr-0 mb-1 pl-4 pr-0 py-2">
                            <p className="is-fullwidth has-text-dark has-text-left">Tag</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/reader-configuration" className="button is-fullwidth is-white sidebar-item mr-0 mb-1 pl-4 pr-0 py-2">
                            <p className="is-fullwidth has-text-dark has-text-left">Reader Configuration</p>
                        </Link>
                    </li>
                </ul>
            </aside>

            <div className="column">{children}</div>
        </div>
    );
}
