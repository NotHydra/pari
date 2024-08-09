"use client";

import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal, { SweetAlertResult } from "sweetalert2";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { TagModel, TagTableModel } from "@/common/interface/tag.interface";

import ContentSort from "@/components/content/sort.component";
import ContentTimestampTitle from "@/components/content/timestamp/title.component";
import ContentTimestampValue from "@/components/content/timestamp/value.component";

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

    const handleRemove = async (id: number): Promise<void> => {
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
                    await axios.delete<ResponseFormatInterface<TagModel>>(`http://localhost:3001/api/tag/id/${id}`).then(
                        async (response: AxiosResponse<ResponseFormatInterface<TagModel>>): Promise<void> => {
                            console.log(response.data);

                            await axios
                                .get<ResponseFormatInterface<TagTableModel[]>>("http://localhost:3001/api/tag/table")
                                .then((response: AxiosResponse<ResponseFormatInterface<TagTableModel[]>>): void => {
                                    console.log(response.data);

                                    setTableData(response.data.data);

                                    Swal.fire({
                                        icon: "success",
                                        title: "Success",
                                        confirmButtonText: "Close",
                                        confirmButtonColor: "#FF6685",
                                    });
                                });
                        },
                        (response: AxiosResponse<ResponseFormatInterface<TagModel>>): void => {
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
                    <div className="fixed-grid has-1-cols is-fullwidth">
                        <div className="grid">
                            <ContentSort tableData={tableData} setTableData={setTableData} />

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

                                            <ContentTimestampTitle updatedAt={false} />

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

                                                <ContentTimestampValue createdAt={data.createdAt} />

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

                                                            <div className="cell">
                                                                <button
                                                                    className="button is-small is-fullwidth is-danger has-text-white"
                                                                    title="Remove Action"
                                                                    onClick={(): void => {
                                                                        handleRemove(data.id);
                                                                    }}
                                                                >
                                                                    <span className="icon">
                                                                        <i className="fas fa-trash"></i>
                                                                    </span>
                                                                </button>
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
