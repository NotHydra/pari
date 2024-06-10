"use client";

import "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function Home(): JSX.Element {
    const color: { [key: string]: string } = {
        main: "#ff9933",
    };

    return (
        <>
            <section className="hero home has-background-main is-fullheight">
                <div className="hero-body">
                    <div>
                        <p className="title has-text-light mb-1">
                            P<span className="is-main">M</span>-Sense
                        </p>

                        <p className="subtitle has-text-light mb-4">Papaya Maturity Sense, Sistem Deteksi Tingkat Kematangan Pepaya</p>

                        <a className="button is-light" href="#manage">
                            <span className="icon">
                                <i className="fa-solid fa-right-long"></i>
                            </span>

                            <span>Berikutnya</span>
                        </a>
                    </div>
                </div>
            </section>

            <section className="section manage has-background-light" id="manage">
                <div className="card has-background-light has-border-main">
                    <div className="card-content">
                        <div className="content">
                            <h3 className="title has-text-main m-0 p-0">Manage</h3>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer has-background-secondary">
                <div className="content has-text-centered">
                    <div className="is-size-3 mb-2">
                        <a className="footer-link has-text-light" href="https://github.com/NotHydra/pm-sense" target="_blank" rel="GitHub">
                            <i className="fa-brands fa-github"></i>
                        </a>
                    </div>

                    <p className="has-text-light">
                        <strong>Copyright © 2024</strong> PM-Sense - Enthusiastic Spirit - Kalimantan's Institute of Technology
                    </p>
                </div>
            </footer>
        </>
    );
}
