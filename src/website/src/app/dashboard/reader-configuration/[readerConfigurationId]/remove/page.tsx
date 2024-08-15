"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Swal, { SweetAlertResult } from "sweetalert2";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { ReaderConfigurationModel } from "@/common/interface/reader-configuration.interface";

import ContentContainer from "@/components/content/container.component";
import ContentFormButtonContainer from "@/components/content/form/button/container.component";
import ContentFormButtonRemove from "@/components/content/form/button/remove.component";
import ContentFormButtonBack from "@/components/content/form/button/back.component";

export default function ReaderConfigurationRemovePage(): JSX.Element {
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

    const handleRemove = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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
                    await axios
                        .delete<
                            ResponseFormatInterface<ReaderConfigurationModel>
                        >(`http://localhost:3001/api/reader-configuration/id/${params.readerConfigurationId}`)
                        .then(
                            (response: AxiosResponse<ResponseFormatInterface<ReaderConfigurationModel>>): void => {
                                console.log(response.data);

                                Swal.fire({
                                    icon: "success",
                                    title: "Success",
                                    confirmButtonText: "Close",
                                    confirmButtonColor: "#FF6685",
                                });

                                router.push("/dashboard/reader-configuration");
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
        <ContentContainer>
            <form onSubmit={handleRemove}>
                <div className="field" title="The name of the reader configuration">
                    <label className="label" htmlFor="name">
                        Name
                    </label>

                    <div className="control">
                        <input className="input" type="text" name="name" value={name} placeholder="Insert name here" disabled />
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
                            disabled
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
                            disabled
                        />
                    </div>
                </div>

                <ContentFormButtonContainer>
                    <ContentFormButtonRemove/>

                    <ContentFormButtonBack link="/dashboard/reader-configuration" />
                </ContentFormButtonContainer>
            </form>
        </ContentContainer>
    );
}
