"use client";

import axios, { AxiosResponse } from "axios";
import { defaults } from "chart.js/auto";
import moment from "moment";
import "moment/locale/id";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import io, { Socket } from "socket.io-client";

defaults.font.size = 10;
moment.locale("ID");

interface ResponseFormatInterface<T> {
    success: boolean;
    status: number;
    message: string;
    data: T;
}

interface AttemptInterface {
    id: number;
    frequency: FrequencyInterface[];
    createdAt: Date;
}

interface FrequencyInterface {
    id: number;
    frequency: string;
    rssi: RSSIInterface[];
}

interface RSSIInterface {
    id: number;
    rssi: number;
}

export default function Home(): JSX.Element {
    const dateToString = (date: Date): String => {
        return moment(date).format(`HH:mm:ss DD-MMMM-YYYY`);
    };

    const minMaxRSSI = (attempt: AttemptInterface): { min: number; max: number } | null => {
        let min: number | null = null;
        let max: number | null = null;

        for (const freq of attempt.frequency) {
            for (const rssiObj of freq.rssi) {
                if (min === null || rssiObj.rssi < min) {
                    min = rssiObj.rssi;
                }

                if (max === null || rssiObj.rssi > max) {
                    max = rssiObj.rssi;
                }
            }
        }

        if (min === null || max === null) {
            return null;
        }

        return { min, max };
    };

    const color: { [key: string]: string | string[] } = {
        main: "#FF9933",
        frequency: ["#3E26A8", "#9EACFD", "#23A0E5", "#2EC4A4", "#B6C532", "#F4BA3A", "#F9D82C"],
    };

    const [attempt, setAttempt] = useState<AttemptInterface | null>(null);
    const [minValue, setMinValue] = useState<number | null>(null);
    const [maxValue, setMaxValue] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response: AxiosResponse<ResponseFormatInterface<AttemptInterface>> = await axios.get<ResponseFormatInterface<AttemptInterface>>(
                    "http://localhost:3001/api/attempt/latest"
                );

                console.log("Attempt:");
                console.log(response.data.data);

                setAttempt(response.data.data);

                const minMaxValue: {
                    min: number;
                    max: number;
                } | null = minMaxRSSI(response.data.data);

                if (minMaxValue !== null) {
                    setMinValue(minMaxValue.min);
                    setMaxValue(minMaxValue.max);
                }
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

        socket.on("attemptLatest", (model: AttemptInterface): void => {
            console.log(`Model:`);
            console.log(model);

            setAttempt(model);

            const minMaxValue: {
                min: number;
                max: number;
            } | null = minMaxRSSI(model);

            if (minMaxValue !== null) {
                setMinValue(minMaxValue.min);
                setMaxValue(minMaxValue.max);
            }
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
                                        {attempt !== null ? (
                                            <Line
                                                data={{
                                                    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value: number): string => `Count: ${value}`),
                                                    datasets: attempt.frequency.map((frequencyModel: FrequencyInterface, frequencyIndex: number) => {
                                                        return {
                                                            label: `${frequencyModel.frequency}Hz`,
                                                            data: frequencyModel.rssi.map((rssiModel: RSSIInterface): number => rssiModel.rssi),
                                                            fill: false,
                                                            borderColor: color.frequency[frequencyIndex],
                                                            tension: 0.1,
                                                        };
                                                    }),
                                                }}
                                                options={{
                                                    scales: {
                                                        y: {
                                                            type: "linear",
                                                            suggestedMin: minValue !== null ? minValue - 5 : -30,
                                                            suggestedMax: maxValue !== null ? maxValue + 5 : -30,
                                                            ticks: {
                                                                callback: (value: string | number): string => {
                                                                    if (Number(value) % 5 === 0) {
                                                                        return value.toString();
                                                                    }

                                                                    return "";
                                                                },
                                                            },
                                                        },
                                                    },
                                                }}
                                            ></Line>
                                        ) : (
                                            "Loading..."
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="column" style={{ height: "85%" }}>
                            <div className="card has-background-light has-border-dark">
                                <div className="card-content">
                                    <div className="content">
                                        <h3 className="title has-text-dark m-0 mb-3 p-0">Hasil Terbaru</h3>

                                        <div className="mb-3">
                                            <h6 className="subtitle has-text-dark m-0 mb-1 p-0">RSSI:</h6>
                                            <p className="has-text-main has-text-weight-semibold m-0 p-0">
                                                {responseInventory.length !== 0 ? responseInventory[0].rssi : "Loading..."}
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
                                                          return sum + model.rssi;
                                                      }, 0) / responseInventory.length
                                                    : "Loading..."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
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
