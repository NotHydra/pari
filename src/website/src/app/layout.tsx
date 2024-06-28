import "@fortawesome/fontawesome-free/css/all.css";
import "bulma/css/bulma.css";
import type { Metadata } from "next";
import { NextFont } from "next/dist/compiled/@next/font";
import { Inter } from "next/font/google";

import "./../public/css/main.css";

const inter: NextFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "PARI | Papaya Ripeness Identification",
    description: "SISTEM KLASIFIKASI KEMATANGAN PEPAYA (Carica papaya) SECARA NON-INVASIF BERBASIS GELOMBANG ELEKTROMAGNETIK FREKUENSI ULTRA TINGGI",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): JSX.Element {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
