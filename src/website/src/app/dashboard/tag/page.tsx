"use client";

import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { TagTableModel } from "@/common/interface/tag.interface";

import Timestamp from "@/components/timestamp.component";

export default function TagPage(): JSX.Element {
    const [tableData, setTableData] = useState<TagTableModel[]>([]);

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            try {
                await axios
                    .get<ResponseFormatInterface<TagTableModel[]>>("http://localhost:3001/api/tag/table")
                    .then((response: AxiosResponse<ResponseFormatInterface<TagTableModel[]>>): void => {
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
            setTableData([...tableData].sort((a: TagTableModel, b: TagTableModel) => a.id - b.id));
        } else if (e.target.value === "descending") {
            setTableData([...tableData].sort((a: TagTableModel, b: TagTableModel) => b.id - a.id));
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

                            <div className="cell table-container line has-background-light">
                                <table className="table has-background-white has-text-dark is-fullwidth is-bordered is-striped is-narrow is-hoverable">
                                    <thead>
                                        <tr>
                                            <th>No.</th>

                                            <th>
                                                <abbr title="The byte id of the tag">Tag</abbr>
                                            </th>

                                            <th>
                                                <abbr title="The name of the reader configuration used">Reader Configuration Name</abbr>
                                            </th>

                                            <th>
                                                <abbr title="The amount of RSSI scan done ">RSSI Count</abbr>
                                            </th>

                                            <th>
                                                <abbr title="The average RSSI of each frequency obtained">Average RSSI (dBm)</abbr>
                                            </th>

                                            <th className="timestamp">Created At</th>

                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {tableData.map((data: TagTableModel, index: number) => (
                                            <tr key={index}>
                                                <td className="no">{index + 1}.</td>

                                                <td>{data.tag}</td>

                                                <td>{data.readerConfigurationName}</td>

                                                <td>{data.rssiCount}</td>

                                                <td>{data.averageRSSI}</td>

                                                <td className="timestamp">
                                                    <Timestamp timestamp={data.createdAt} />
                                                </td>

                                                <td className="action m-0 p-0">
                                                    <div className="fixed-grid has-1-cols">
                                                        <div className="grid is-row-gap-0">
                                                            <div className="cell">
                                                                <Link
                                                                    href={`/dashboard/tag/${data.id}/line-chart`}
                                                                    className="button is-small is-fullwidth is-info has-text-white"
                                                                    title="Line Chart Action"
                                                                >
                                                                    <span className="icon">
                                                                        <i className="fas fa-chart-line"></i>
                                                                    </span>
                                                                </Link>
                                                            </div>

                                                            <div className="cell">
                                                                <Link
                                                                    href={`/dashboard/tag/${data.id}/frequency`}
                                                                    className="button is-small is-fullwidth is-info has-text-white"
                                                                    title="Frequency Action"
                                                                >
                                                                    <span className="icon">
                                                                        <i className="fas fa-sliders"></i>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
