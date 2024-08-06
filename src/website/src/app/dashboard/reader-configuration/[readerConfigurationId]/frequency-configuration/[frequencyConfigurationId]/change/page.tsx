"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Swal, { SweetAlertResult } from "sweetalert2";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { FrequencyConfigurationModel } from "@/common/interface/frequency-configuration.interface";

export default function FrequencyConfigurationChangePage(): JSX.Element {
    const router: AppRouterInstance = useRouter();

    const params: { readerConfigurationId: string; frequencyConfigurationId: string } = useParams<{
        readerConfigurationId: string;
        frequencyConfigurationId: string;
    }>();

    const [frequency, setFrequency] = useState<number>(0);

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            try {
                console.log(params);

                if (params.readerConfigurationId !== undefined) {
                    await axios
                        .get<ResponseFormatInterface<FrequencyConfigurationModel>>(
                            `http://localhost:3001/api/frequency-configuration/id/${params.frequencyConfigurationId}`
                        )
                        .then((response: AxiosResponse<ResponseFormatInterface<FrequencyConfigurationModel>>): void => {
                            console.log(response.data);

                            setFrequency(Number(response.data.data.frequency));
                        })
                        .catch((error: AxiosError<ResponseFormatInterface<FrequencyConfigurationModel>>): void => {
                            console.log(error);

                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: error.response !== undefined && error.response.data.status === 404 ? "Data Not Found" : "Internal Server Error",
                                confirmButtonText: "Close",
                                confirmButtonColor: "#FF6685",
                            }).then((): void => {
                                router.push(`/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration`);
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
                                router.push(`/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration`);
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
                    if (frequency <= 0) {
                        throw new Error("Frequency Must Be Greater Than 0");
                    }

                    await axios
                        .put<
                            ResponseFormatInterface<FrequencyConfigurationModel>
                        >(`http://localhost:3001/api/frequency-configuration/id/${params.frequencyConfigurationId}`, { frequency: String(frequency) })
                        .then(
                            (response: AxiosResponse<ResponseFormatInterface<FrequencyConfigurationModel>>): void => {
                                console.log(response.data);

                                Swal.fire({
                                    icon: "success",
                                    title: "Success",
                                    confirmButtonText: "Close",
                                    confirmButtonColor: "#FF6685",
                                });
                            },
                            (response: AxiosResponse<ResponseFormatInterface<FrequencyConfigurationModel>>): void => {
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
                            <label className="label" htmlFor="frequency">
                                Frequency (Hz)
                            </label>

                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    step="0.01"
                                    name="frequency"
                                    value={frequency == 0 ? "" : frequency}
                                    min="0"
                                    placeholder="Insert frequency here"
                                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setFrequency(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="buttons">
                            <button className="button is-fullwidth is-warning has-text-weight-bold" type="submit" title="Change Action">
                                <span className="icon">
                                    <i className="fas fa-pen-to-square"></i>
                                </span>

                                <span>Change</span>
                            </button>

                            <Link
                                href={`/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration`}
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
