"use client";

import axios, { AxiosResponse } from "axios";
import { defaults } from "chart.js/auto";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { TagDetailedModel } from "@/common/interface/tag.interface";
import { FrequencyDetailedModel } from "@/common/interface/frequency.interface";
import { RSSIModel } from "@/common/interface/rssi.interface";

defaults.font.size = 10;

export default function RSSIPage(): JSX.Element {
    const minMaxRSSI = (tag: TagDetailedModel): { min: number; max: number } | null => {
        let min: number | null = null;
        let max: number | null = null;

        tag.frequency.forEach((frequencyModel: FrequencyDetailedModel): void => {
            frequencyModel.rssi.forEach((rssiModel: RSSIModel): void => {
                if (min === null || rssiModel.rssi < min) {
                    min = rssiModel.rssi;
                }

                if (max === null || rssiModel.rssi > max) {
                    max = rssiModel.rssi;
                }
            });
        });

        if (min === null || max === null) {
            return null;
        }

        return { min, max };
    };

    const lengthRSSI = (tag: TagDetailedModel): number => {
        let length: number = 0;

        let rssiCount: number = 0;
        tag.frequency.forEach((frequencyModel: FrequencyDetailedModel): void => {
            rssiCount += frequencyModel.rssi.length;

            if (rssiCount > length) {
                length = rssiCount;
            }

            rssiCount = 0;
        });

        return length;
    };

    const params: { tagId: string } = useParams<{ tagId: string }>();

    const frequencyColor: string[] = ["#3E26A8", "#9EACFD", "#23A0E5", "#2EC4A4", "#B6C532", "#F4BA3A", "#F9D82C"];

    const [chartData, setChartData] = useState<TagDetailedModel>();
    const [minRSSIValue, setMinRSSIValue] = useState<number | null>(null);
    const [maxRSSIValue, setMaxRSSIValue] = useState<number | null>(null);

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            try {
                await axios
                    .get<ResponseFormatInterface<TagDetailedModel>>(`http://localhost:3001/api/tag/id/${params.tagId}/detailed`)
                    .then((response: AxiosResponse<ResponseFormatInterface<TagDetailedModel>>): void => {
                        setChartData(response.data.data);
                        const minMaxValue: {
                            min: number;
                            max: number;
                        } | null = minMaxRSSI(response.data.data);
                        if (minMaxValue !== null) {
                            setMinRSSIValue(minMaxValue.min);
                            setMaxRSSIValue(minMaxValue.max);
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="card has-background-white">
            <div className="card-content">
                <div className="content">
                    <div className="fixed-grid has-1-cols is-fullwidth">
                        <div className="grid">
                            <div className="cell chart has-back-button">
                                <Line
                                    data={{
                                        labels: chartData
                                            ? Array.from({ length: lengthRSSI(chartData) }, (_, x) => x).map((value: number): string => `RSSI ${value + 1}`)
                                            : ["Loading..."],
                                        datasets: chartData
                                            ? chartData.frequency
                                                  .map((frequencyModel: FrequencyDetailedModel, frequencyIndex: number) => {
                                                      return {
                                                          label: `${frequencyModel.frequency}Hz`,
                                                          data: frequencyModel.rssi.map((rssiModel: RSSIModel): number => rssiModel.rssi),
                                                          fill: false,
                                                          borderColor: frequencyColor[frequencyIndex],
                                                          tension: 0.1,
                                                      };
                                                  })
                                                  .reverse()
                                            : [{ label: "Loading...", data: [0], fill: false, tension: 0.1 }],
                                    }}
                                    options={{
                                        scales: {
                                            y: {
                                                type: "linear",
                                                suggestedMin: minRSSIValue !== null ? minRSSIValue - 5 : -30,
                                                suggestedMax: maxRSSIValue !== null ? maxRSSIValue + 5 : -50,
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
                                        plugins: {
                                            legend: {
                                                reverse: true,
                                            },
                                        },
                                    }}
                                ></Line>
                            </div>

                            <div className="cell">
                                <Link href={`/dashboard/tag`} className="button is-fullwidth is-danger has-text-white has-text-weight-bold" title="Back Action">
                                    <span className="icon">
                                        <i className="fas fa-reply"></i>
                                    </span>

                                    <span>Back</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
