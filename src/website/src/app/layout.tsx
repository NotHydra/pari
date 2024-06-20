import "@fortawesome/fontawesome-free/css/all.css";
import "bulma/css/bulma.css";
import type { Metadata } from "next";
import { NextFont } from "next/dist/compiled/@next/font";
import { Inter } from "next/font/google";

import "./../public/css/main.css";

const inter: NextFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "PM-Sense | Papaya Maturity Sense",
    description:
        "Sistem Deteksi Tingkat Kematangan Pepaya Secara Non-invasif Berdasarkan Nilai Received Signal Strength Indicator Pada Gelombang Frekuensi Tinggi",
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
