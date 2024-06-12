"use client";

import axios, { AxiosResponse } from "axios";
import { defaults } from "chart.js/auto";
import moment from "moment";
import "moment/locale/id";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import io, { Socket } from "socket.io-client";

defaults.font.size = 9;
moment.locale("ID");

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
    const dateToString = (date: Date): String => {
        return moment(date).format(`HH:mm:ss DD-MMMM-YYYY`);
    };

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

        socket.on("responseInventoryLatest", (models: ResponseInventoryInterface[]): void => {
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
                            <span className="is-main">P</span>M-Sense
                        </p>

                        <p className="subtitle has-text-light has-text-weight-semibold mb-4">
                            Papaya Maturity Sense, Sistem Deteksi Tingkat Kematangan Pepaya Secara Non-invasif Berdasarkan Nilai Received Signal Strength
                            Indicator Pada Gelombang Frekuensi Tinggi
                        </p>

                        <a className="button is-light has-text-weight-semibold" href="#hasil">
                            <span className="icon">
                                <i className="fa-solid fa-right-long"></i>
                            </span>

                            <span>Berikutnya</span>
                        </a>
                    </div>
                </div>
            </section>

            <section className="section has-background-light is-medium" id="hasil">
                <div className="container" style={{ width: "75%" }}>
                    <h3 className="title has-text-dark has-text-centered m-0 mb-6 p-0">Hasil Data</h3>

                    <div className="columns is-vcentered">
                        <div className="column is-three-quarters">
                            <div className="card has-background-light">
                                <div className="card-content">
                                    <div className="content">
                                        <Line
                                            data={{
                                                labels:
                                                    responseInventory.length !== 0
                                                        ? responseInventory.map((model: ResponseInventoryInterface, index: number): String[] =>
                                                              [`Count: ${(index + 1).toString()}`].concat(dateToString(model.createdAt).split(" "))
                                                          )
                                                        : [["Loading"]],
                                                datasets: [
                                                    {
                                                        label: "RSSI",
                                                        data:
                                                            responseInventory.length !== 0
                                                                ? responseInventory
                                                                      .map((model: ResponseInventoryInterface): number => model.rssiValue)
                                                                      .reverse()
                                                                : ["Loading"],
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

                        <div className="column" style={{ height: "85%" }}>
                            <div className="card has-background-light has-border-dark">
                                <div className="card-content">
                                    <div className="content">
                                        <h3 className="title has-text-dark m-0 mb-3 p-0">Hasil Terbaru</h3>

                                        <div className="mb-3">
                                            <h6 className="subtitle has-text-dark m-0 mb-1 p-0">RSSI:</h6>
                                            <p className="has-text-main has-text-weight-semibold m-0 p-0">
                                                {responseInventory.length !== 0 ? responseInventory[0].rssiValue : "Loading..."}
                                            </p>
                                        </div>

                                        <div className="mb-3">
                                            <h6 className="subtitle has-text-dark m-0 mb-1 p-0">Kualitas:</h6>
                                            <p className="has-text-main has-text-weight-semibold m-0 p-0">Loading...</p>
                                        </div>

                                        <div className="mb-3">
                                            <h6 className="subtitle has-text-dark m-0 mb-1 p-0">Diperoleh Pada:</h6>
                                            <p className="has-text-main has-text-weight-semibold m-0 p-0">
                                                {responseInventory.length !== 0 ? dateToString(responseInventory[0].createdAt) : "Loading..."}
                                            </p>
                                        </div>

                                        <div>
                                            <h6 className="subtitle has-text-dark m-0 mb-1 p-0">Rata-Rata RSSI:</h6>
                                            <p className="has-text-main has-text-weight-semibold m-0 p-0">
                                                {responseInventory.length !== 0
                                                    ? responseInventory.reduce((sum, model) => {
                                                          return sum + model.rssiValue;
                                                      }, 0) / responseInventory.length
                                                    : "Loading..."}
                                            </p>
                                        </div>
                                    </div>
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

                    <p className="has-text-light has-text-weight-semibold">
                        <span className="has-text-weight-bold">Copyright © 2024</span> - <span className="is-main">P</span>M-Sense - Enthusiastic Spirit -
                        Kalimantan's Institute of Technology
                    </p>
                </div>
            </footer>
        </>
    );
}
