"use client";

import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { FrequencyConfigurationModel } from "@/common/interface/frequency-configuration.interface";

import ContentTableSort from "@/components/content/table/sort.component";
import ContentTableTimestampTitle from "@/components/content/table/timestamp/title.component";
import ContentTableTimestampValue from "@/components/content/table/timestamp/value.component";

export default function FrequencyConfigurationPage(): JSX.Element {
    const params: { readerConfigurationId: string } = useParams<{ readerConfigurationId: string }>();

    const [tableData, setTableData] = useState<FrequencyConfigurationModel[]>([]);

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            try {
                await axios
                    .get<
                        ResponseFormatInterface<FrequencyConfigurationModel[]>
                    >(`http://localhost:3001/api/frequency-configuration/reader-configuration-id/${params.readerConfigurationId}`)
                    .then((response: AxiosResponse<ResponseFormatInterface<FrequencyConfigurationModel[]>>): void => {
                        console.log(response.data);

                        setTableData(response.data.data);
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
                            <ContentTableSort tableData={tableData} setTableData={setTableData} />

                            <div className="cell table-container has-back-button line has-background-light">
                                <table className="table has-background-white has-text-dark is-fullwidth is-bordered is-striped is-narrow is-hoverable">
                                    <thead>
                                        <tr>
                                            <th>No.</th>

                                            <th>
                                                <abbr title="The value of the frequency configuration">Frequency (Hz)</abbr>
                                            </th>

                                            <ContentTableTimestampTitle />

                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {tableData.map((data: FrequencyConfigurationModel, index: number) => (
                                            <tr key={index}>
                                                <td className="no">{index + 1}.</td>

                                                <td>{data.frequency}</td>

                                                <ContentTableTimestampValue createdAt={data.createdAt} updatedAt={data.updatedAt} />

                                                <td className="action m-0 p-0">
                                                    <div className="fixed-grid has-1-cols">
                                                        <div className="grid is-row-gap-0">
                                                            <div className="cell">
                                                                <Link
                                                                    href={`/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration/${data.id}/change`}
                                                                    className="button is-small is-fullwidth is-warning has-text-white"
                                                                    title="Change Action"
                                                                >
                                                                    <span className="icon">
                                                                        <i className="fas fa-pen-to-square"></i>
                                                                    </span>
                                                                </Link>
                                                            </div>

                                                            <div className="cell">
                                                                <Link
                                                                    href={`/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration/${data.id}/remove`}
                                                                    className="button is-small is-fullwidth is-danger has-text-white"
                                                                    title="Remove Action"
                                                                >
                                                                    <span className="icon">
                                                                        <i className="fas fa-trash"></i>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="cell">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
