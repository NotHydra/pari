"use client";

import axios, { AxiosResponse } from "axios";
import { useParams } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal, { SweetAlertResult } from "sweetalert2";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { FrequencyConfigurationModel } from "@/common/interface/frequency-configuration.interface";

import ContentContainer from "@/components/content/container.component";
import ContentFormButtonContainer from "@/components/content/form/button/container.component";
import ContentFormButtonAdd from "@/components/content/form/button/add.component";
import ContentFormButtonBack from "@/components/content/form/button/back.component";

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
        <ContentContainer>
            <form onSubmit={handleAdd}>
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

                <ContentFormButtonContainer>
                    <ContentFormButtonAdd />

                    <ContentFormButtonBack link={`/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration`} />
                </ContentFormButtonContainer>
            </form>
        </ContentContainer>
    );
}
