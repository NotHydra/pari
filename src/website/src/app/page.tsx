"use client";

export default function Home(): JSX.Element {
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

            <footer className="footer">
                <div className="content has-text-centered">
                    <div className="is-size-3 mb-2">
                        <a className="footer-link" href="https://github.com/NotHydra/pm-sense" target="_blank" rel="GitHub">
                            <i className="fa-brands fa-github"></i>
                        </a>
                    </div>

                    <p>
                        <strong>Copyright © 2024</strong> PM-Sense - Enthusiastic Spirit - Kalimantan's Institute of Technology
                    </p>
                </div>
            </footer>
        </>
    );
}
