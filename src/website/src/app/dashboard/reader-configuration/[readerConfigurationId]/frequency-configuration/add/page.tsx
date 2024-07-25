"use client";

import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal, { SweetAlertResult } from "sweetalert2";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { FrequencyConfigurationModel } from "@/common/interface/frequency-configuration";

export default function FrequencyConfigurationAddPage(): JSX.Element {
    const params: { readerConfigurationId: string } = useParams<{ readerConfigurationId: string }>();

    const [frequency, setFrequency] = useState<number>(0);

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
                    if (frequency <= 0) {
                        throw new Error("Frequency Must Be Greater Than 0");
                    }

                    await axios
                        .post<
                            ResponseFormatInterface<FrequencyConfigurationModel>
                        >("http://localhost:3001/api/frequency-configuration", { readerConfigurationId: Number(params.readerConfigurationId), frequency: String(frequency) })
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
                    <form onSubmit={handleAdd}>
                        <div className="field" title="The name of the reader configuration">
                            <label className="label" htmlFor="frequency">
                                Frequency (Hz)
                            </label>

                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    name="frequency"
                                    value={frequency == 0 ? "" : frequency}
                                    min="0"
                                    placeholder="Insert frequency here"
                                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setFrequency(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="buttons">
                            <button className="button is-fullwidth is-success has-text-weight-bold" type="submit" title="Add Action">
                                <span className="icon">
                                    <i className="fas fa-plus"></i>
                                </span>

                                <span>Add</span>
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
