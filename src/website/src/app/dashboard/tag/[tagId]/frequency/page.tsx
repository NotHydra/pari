"use client";

import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { FrequencyTableModel } from "@/common/interface/frequency.interface";

import ContentSort from "@/components/content/sort.component";

export default function FrequencyPage(): JSX.Element {
    const params: { tagId: string } = useParams<{ tagId: string }>();

    const [tableData, setTableData] = useState<FrequencyTableModel[]>([]);

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            try {
                await axios
                    .get<ResponseFormatInterface<FrequencyTableModel[]>>(`http://localhost:3001/api/frequency/table/tag-id/${params.tagId}`)
                    .then((response: AxiosResponse<ResponseFormatInterface<FrequencyTableModel[]>>): void => {
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
                            <ContentSort tableData={tableData} setTableData={setTableData} />

                            <div className="cell table-container has-back-button line has-background-light">
                                <table className="table has-background-white has-text-dark is-fullwidth is-bordered is-striped is-narrow is-hoverable">
                                    <thead>
                                        <tr>
                                            <th>No.</th>

                                            <th>
                                                <abbr title="The value of the frequency">Frequency (Hz)</abbr>
                                            </th>

                                            <th>
                                                <abbr title="The amount of RSSI scan done ">RSSI Count</abbr>
                                            </th>

                                            <th>
                                                <abbr title="The average RSSI obtained">Average RSSI (dBm)</abbr>
                                            </th>

                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {tableData.map((data: FrequencyTableModel, index: number) => (
                                            <tr key={index}>
                                                <td className="no">{index + 1}.</td>

                                                <td>{data.frequency}</td>

                                                <td>{data.rssiCount}</td>

                                                <td>{data.averageRSSI}</td>

                                                <td className="action m-0 p-0">
                                                    <div className="fixed-grid has-1-cols">
                                                        <div className="grid is-row-gap-0">
                                                            <div className="cell">
                                                                <Link
                                                                    href={`/dashboard/tag/${params.tagId}/frequency/${data.id}/rssi`}
                                                                    className="button is-small is-fullwidth is-info has-text-white"
                                                                    title="RSSI Action"
                                                                >
                                                                    <span className="icon">
                                                                        <i className="fas fa-wifi"></i>
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
                                <Link href="/dashboard/tag" className="button is-fullwidth is-danger has-text-white has-text-weight-bold" title="Back Action">
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
