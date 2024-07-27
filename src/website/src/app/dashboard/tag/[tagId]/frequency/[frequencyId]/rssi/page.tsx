"use client";

import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { RSSIModel } from "@/common/interface/rssi.interface";

export default function RSSIPage(): JSX.Element {
    const params: { tagId: string; frequencyId: string } = useParams<{ tagId: string; frequencyId: string }>();

    const [tableData, setTableData] = useState<RSSIModel[]>([]);

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            try {
                await axios
                    .get<ResponseFormatInterface<RSSIModel[]>>(`http://localhost:3001/api/rssi/table/frequency-id/${params.frequencyId}`)
                    .then((response: AxiosResponse<ResponseFormatInterface<RSSIModel[]>>): void => {
                        console.log(response.data);

                        setTableData(response.data.data);
                    });
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleSort = (e: ChangeEvent<HTMLSelectElement>): void => {
        if (e.target.value === "ascending") {
            setTableData([...tableData].sort((a: RSSIModel, b: RSSIModel) => a.id - b.id));
        } else if (e.target.value === "descending") {
            setTableData([...tableData].sort((a: RSSIModel, b: RSSIModel) => b.id - a.id));
        }
    };

    return (
        <div className="card has-background-white">
            <div className="card-content">
                <div className="content">
                    <div className="fixed-grid has-1-cols is-fullwidth">
                        <div className="grid">
                            <div className="cell">
                                <div className="columns action">
                                    <div className="column m-0 p-0">
                                        <div className="control has-icons-left" title="Sort Action">
                                            <div className="select is-fullwidth">
                                                <select onChange={(e: ChangeEvent<HTMLSelectElement>): void => handleSort(e)}>
                                                    <option disabled>Sort</option>

                                                    <option value={"ascending"} selected>
                                                        Ascending
                                                    </option>

                                                    <option value={"descending"}>Descending</option>
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
                                                <abbr title="The value of the frequency configuration">RSSI (dBm)</abbr>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {tableData.map((data: RSSIModel, index: number) => (
                                            <tr key={index}>
                                                <td className="no">{index + 1}.</td>

                                                <td>{data.rssi}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="cell">
                                <Link
                                    href={`/dashboard/tag/${params.tagId}/frequency`}
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
