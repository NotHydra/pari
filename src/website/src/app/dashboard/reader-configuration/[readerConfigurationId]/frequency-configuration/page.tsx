"use client";

import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { FrequencyConfigurationModel } from "@/common/interface/frequency-configuration";

import { timestampToString } from "@/utility/timestamp-to-string";

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
                            <div className="cell">
                                <div className="columns action">
                                    <div className="column is-1 m-0 p-0">
                                        <Link
                                            href={`/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration/add`}
                                            className="button is-normal is-fullwidth is-success has-text-weight-bold"
                                            title="Add Action"
                                        >
                                            <span className="icon">
                                                <i className="fab fa-plus"></i>
                                            </span>
                                        </Link>
                                    </div>

                                    <div className="column m-0 mx-2 p-0">
                                        <div className="field" title="Search Action">
                                            <p className="control has-icons-left">
                                                <span className="icon is-left">
                                                    <i className="fas fa-search"></i>
                                                </span>

                                                <input className="input" type="text" placeholder="Search" />
                                            </p>
                                        </div>
                                    </div>

                                    <div className="column is-2 m-0 p-0">
                                        <div className="control has-icons-left" title="Sort Action">
                                            <div className="select is-fullwidth">
                                                <select>
                                                    <option disabled>Sort</option>
                                                    <option selected>Ascending</option>
                                                    <option>Descending</option>
                                                </select>
                                            </div>

                                            <div className="icon is-small is-left">
                                                <i className="fas fa-up-down"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cell table-container has-back-button line has-background-light">
                                <table className="table has-background-white has-text-dark is-fullwidth is-bordered is-striped is-narrow is-hoverable">
                                    <thead>
                                        <tr>
                                            <th>No.</th>

                                            <th>
                                                <abbr title="The value of the frequency configuration">Frequency (Hz)</abbr>
                                            </th>

                                            <th>Created At</th>

                                            <th>Updated At</th>

                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {tableData.map((data: FrequencyConfigurationModel, index: number) => (
                                            <tr key={index}>
                                                <td>{index + 1}.</td>

                                                <td>{data.frequency}</td>

                                                <td className="timestamp">{timestampToString(data.createdAt)}</td>

                                                <td className="timestamp">{timestampToString(data.updatedAt)}</td>

                                                <td>
                                                    <div className="buttons has-addons is-centered">
                                                        <Link
                                                            href={`/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration/${data.id}/change`}
                                                            className="button is-warning has-text-white"
                                                            title="Change Action"
                                                        >
                                                            <span className="icon">
                                                                <i className="fas fa-pen-to-square"></i>
                                                            </span>
                                                        </Link>

                                                        <Link
                                                            href={`/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration/${data.id}/remove`}
                                                            className="button is-danger has-text-white"
                                                            title="Remove Action"
                                                        >
                                                            <span className="icon">
                                                                <i className="fas fa-trash"></i>
                                                            </span>
                                                        </Link>
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
