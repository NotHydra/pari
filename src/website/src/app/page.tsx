"use client";

import axios, { AxiosResponse } from "axios";
import "chart.js/auto";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import io, { Socket } from "socket.io-client";

interface ResponseFormatInterface<T> {
    success: boolean;
    status: number;
    message: string;
    data: T;
}

interface ResponseInventoryInterface {
    id: number;
    rssi: String;
    data: String;
    rssiValue: number;
    createdAt: Date;
}

export default function Home(): JSX.Element {
    const color: { [key: string]: string } = {
        main: "#ff9933",
    };

    const [responseInventory, setResponseInventory] = useState<ResponseInventoryInterface[]>([]);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response: AxiosResponse<ResponseFormatInterface<ResponseInventoryInterface[]>> = await axios.get<
                    ResponseFormatInterface<ResponseInventoryInterface[]>
                >("http://localhost:3001/api/response-inventory/latest");

                console.log("ResponseInventory:");
                console.log(response.data.data);

                setResponseInventory(response.data.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const socket: Socket = io("http://localhost:3001", {
            transports: ["websocket"],
        });

        socket.on("responseInventoryLatest", (models: ResponseInventoryInterface[]) => {
            console.log(`Models:`);
            console.log(models);

            setResponseInventory(models);
        });
    }, []);

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

                <div className="columns">
                    <div className="column is-two-thirds">
                        <div className="card has-background-light has-border-main">
                            <div className="card-content">
                                <div className="content">
                                    <Line
                                        data={{
                                            labels: responseInventory.map((model: ResponseInventoryInterface) => model.createdAt.toString()).reverse(),
                                            datasets: [
                                                {
                                                    label: "RSSI",
                                                    data: responseInventory.map((model: ResponseInventoryInterface) => model.rssiValue).reverse(),
                                                    fill: false,
                                                    borderColor: color.main,
                                                    tension: 0.1,
                                                },
                                            ],
                                        }}
                                    ></Line>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="column">
                        <div className="card has-background-light has-border-main">
                            <div className="card-content">
                                <div className="content">
                                    <h4 className="title has-text-main m-0 mb-3 p-0">Latest Data</h4>

                                    <h6 className="subtitle has-text-main m-0 mb-1 p-0">
                                        RSSI: {responseInventory.length !== 0 ? responseInventory[0].rssiValue : "Loading..."}
                                    </h6>

                                    <h6 className="subtitle has-text-main m-0 mb-1 p-0">Quality: Good</h6>

                                    <h6 className="subtitle has-text-main m-0 mb-1 p-0">
                                        Obtained At: {responseInventory.length !== 0 ? responseInventory[0].createdAt.toString() : "Loading..."}
                                    </h6>
                                </div>
                            </div>
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
