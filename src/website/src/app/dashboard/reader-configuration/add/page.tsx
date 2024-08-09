"use client";

import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal, { SweetAlertResult } from "sweetalert2";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { ReaderConfigurationModel } from "@/common/interface/reader-configuration.interface";

import ContentFormButton from "@/components/content/form/button/index.component";
import ContentFormButtonBack from "@/components/content/form/button/back.component";

export default function ReaderConfigurationAddPage(): JSX.Element {
    const [name, setName] = useState<string>("");
    const [rssiScanCount, setRssiScanCount] = useState<number>(0);
    const [rssiScanInterval, setRssiScanInterval] = useState<number>(0);

    const handleAdd = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        Swal.fire<void>({
            icon: "question",
            title: "Are you sure?",
            confirmButtonText: "Yes",
            confirmButtonColor: "#3ABB81",
            showCancelButton: true,
            cancelButtonColor: "#FF6685",
        }).then(async (result: SweetAlertResult<void>): Promise<void> => {
            if (result.isConfirmed) {
                try {
                    if (name === "") {
                        throw new Error("Name Must Not Be Empty");
                    }

                    if (rssiScanCount <= 0) {
                        throw new Error("RSSI Scan Count Must Be Greater Than 0");
                    }

                    if (rssiScanInterval <= 0) {
                        throw new Error("RSSI Scan Interval Must Be Greater Than 0");
                    }

                    await axios
                        .post<
                            ResponseFormatInterface<ReaderConfigurationModel>
                        >("http://localhost:3001/api/reader-configuration", { name, rssiScanCount, rssiScanInterval })
                        .then(
                            (response: AxiosResponse<ResponseFormatInterface<ReaderConfigurationModel>>): void => {
                                console.log(response.data);

                                Swal.fire({
                                    icon: "success",
                                    title: "Success",
                                    confirmButtonText: "Close",
                                    confirmButtonColor: "#FF6685",
                                });
                            },
                            (response: AxiosResponse<ResponseFormatInterface<ReaderConfigurationModel>>): void => {
                                console.log(response.data);

                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: response.data.message,
                                    confirmButtonText: "Close",
                                    confirmButtonColor: "#FF6685",
                                });
                            }
                        );
                } catch (error) {
                    console.log(error);

                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: error instanceof Error ? error.message : "Internal Server Error",
                        confirmButtonText: "Close",
                        confirmButtonColor: "#FF6685",
                    });
                }
            }
        });
    };

    return (
        <div className="card has-background-white">
            <div className="card-content">
                <div className="content">
                    <form onSubmit={handleAdd}>
                        <div className="field" title="The name of the reader configuration">
                            <label className="label" htmlFor="name">
                                Name
                            </label>

                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="Insert name here"
                                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="field" title="The amount of RSSI scan for each frequency">
                            <label className="label" htmlFor="rssiScanCount">
                                RSSI Scan Count
                            </label>

                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    name="rssiScanCount"
                                    value={rssiScanCount === 0 ? "" : rssiScanCount}
                                    min="0"
                                    placeholder="Insert RSSI scan count here"
                                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setRssiScanCount(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="field" title="The amount of delay after each RSSI scan">
                            <label className="label" htmlFor="rssiScanInterval">
                                RSSI Scan Interval {"(ms)"}
                            </label>

                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    name="rssiScanInterval"
                                    value={rssiScanInterval == 0 ? "" : rssiScanInterval}
                                    min="0"
                                    placeholder="Insert RSSI scan interval here"
                                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setRssiScanInterval(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="buttons">
                            <ContentFormButton type="add" />

                            <ContentFormButtonBack link="/dashboard/reader-configuration" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
