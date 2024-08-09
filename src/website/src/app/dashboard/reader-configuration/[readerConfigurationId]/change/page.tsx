"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Swal, { SweetAlertResult } from "sweetalert2";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { ReaderConfigurationModel } from "@/common/interface/reader-configuration.interface";

import ContentFormButton from "@/components/content/form/button/index.component";

export default function ReaderConfigurationChangePage(): JSX.Element {
    const router: AppRouterInstance = useRouter();

    const params: { readerConfigurationId: string } = useParams<{ readerConfigurationId: string }>();

    const [name, setName] = useState<string>("");
    const [rssiScanCount, setRssiScanCount] = useState<number>(0);
    const [rssiScanInterval, setRssiScanInterval] = useState<number>(0);

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            try {
                console.log(params);

                if (params.readerConfigurationId !== undefined) {
                    await axios
                        .get<ResponseFormatInterface<ReaderConfigurationModel>>(
                            `http://localhost:3001/api/reader-configuration/id/${params.readerConfigurationId}`
                        )
                        .then((response: AxiosResponse<ResponseFormatInterface<ReaderConfigurationModel>>): void => {
                            console.log(response.data);

                            setName(response.data.data.name);
                            setRssiScanCount(response.data.data.rssiScanCount);
                            setRssiScanInterval(response.data.data.rssiScanInterval);
                        })
                        .catch((error: AxiosError<ResponseFormatInterface<ReaderConfigurationModel>>): void => {
                            console.log(error);

                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: error.response !== undefined && error.response.data.status === 404 ? "Data Not Found" : "Internal Server Error",
                                confirmButtonText: "Close",
                                confirmButtonColor: "#FF6685",
                            }).then((): void => {
                                router.push("/dashboard/reader-configuration");
                            });
                        })
                        .catch((error): void => {
                            console.log(error);

                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Internal Server Error",
                                confirmButtonText: "Close",
                                confirmButtonColor: "#FF6685",
                            }).then((): void => {
                                router.push("/dashboard/reader-configuration");
                            });
                        });
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [params]);

    const handleChange = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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
                        .put<
                            ResponseFormatInterface<ReaderConfigurationModel>
                        >(`http://localhost:3001/api/reader-configuration/id/${params.readerConfigurationId}`, { name, rssiScanCount, rssiScanInterval })
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
                    <form onSubmit={handleChange}>
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
                            <ContentFormButton type="change" />

                            <Link
                                href="/dashboard/reader-configuration"
                                className="button is-fullwidth is-danger has-text-white has-text-weight-bold"
                                title="Back Action"
                            >
                                <span className="icon">
                                    <i className="fas fa-reply"></i>
                                </span>

                                <span>Back</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
