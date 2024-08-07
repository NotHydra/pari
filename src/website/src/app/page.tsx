"use client";

export default function Home(): JSX.Element {
    return (
        <div className="landing-page">
            <section className="hero home has-background-main is-fullheight">
                <div className="hero-body">
                    <div>
                        <p className="title has-text-light mb-1">
                            <span className="is-main">PA</span>RI
                        </p>

                        <p className="subtitle has-text-light has-text-weight-semibold mb-4">
                            <span className="is-main">Papaya</span> Ripeness Identification, Sistem Klasifikasi Kematangan Pepaya Secara Non-Invasif Berbasis
                            Gelombang Elektromagnetik Frekuensi Ultra Tinggi
                        </p>

                        <a className="button is-light has-text-weight-semibold" href="/dashboard">
                            <span className="icon">
                                <i className="fa-solid fa-right-long"></i>
                            </span>

                            <span>Dashboard</span>
                        </a>
                    </div>
                </div>
            </section>

            <footer className="footer has-background-secondary">
                <div className="content has-text-centered">
                    <div className="is-size-3 mb-2">
                        <a className="footer-link has-text-light" href="https://github.com/NotHydra/pari" target="_blank" rel="GitHub">
                            <i className="fa-brands fa-github"></i>
                        </a>
                    </div>

                    <p className="has-text-light has-text-weight-semibold">
                        <span className="has-text-weight-bold">Copyright © 2024</span> - <span className="is-main">PA</span>RI - Enthusiastic Spirit - Institut
                        Teknologi Kalimantan
                    </p>
                </div>
            </footer>
        </div>
    );
}
