"use client";

import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal, { SweetAlertResult } from "sweetalert2";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { ActiveReaderConfigurationModel } from "@/common/interface/active-reader-configuration.interface";
import { ReaderConfigurationTableModel } from "@/common/interface/reader-configuration.interface";

import ContentSort from "@/components/content/sort.component";
import ContentTimestampTitle from "@/components/content/timestamp/title.component";
import ContentTimestamp from "@/components/content/timestamp.component";

export default function ReaderConfigurationPage(): JSX.Element {
    const [activeReaderConfiguration, setActiveReaderConfiguration] = useState<ActiveReaderConfigurationModel | null>(null);
    const [tableData, setTableData] = useState<ReaderConfigurationTableModel[]>([]);

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            try {
                await axios
                    .get<ResponseFormatInterface<ActiveReaderConfigurationModel[]>>("http://localhost:3001/api/active-reader-configuration")
                    .then((response: AxiosResponse<ResponseFormatInterface<ActiveReaderConfigurationModel[]>>): void => {
                        console.log(response.data);

                        setActiveReaderConfiguration(response.data.data[0]);
                    });

                await axios
                    .get<ResponseFormatInterface<ReaderConfigurationTableModel[]>>("http://localhost:3001/api/reader-configuration/table")
                    .then((response: AxiosResponse<ResponseFormatInterface<ReaderConfigurationTableModel[]>>): void => {
                        console.log(response.data);

                        setTableData(response.data.data);
                    });
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleUse = async (id: number): Promise<void> => {
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
                        .put<
                            ResponseFormatInterface<ActiveReaderConfigurationModel>
                        >("http://localhost:3001/api/active-reader-configuration/id/1", { readerConfigurationId: id })
                        .then(
                            (response: AxiosResponse<ResponseFormatInterface<ActiveReaderConfigurationModel>>): void => {
                                console.log(response.data);

                                setActiveReaderConfiguration(response.data.data);

                                Swal.fire({
                                    icon: "success",
                                    title: "Success",
                                    confirmButtonText: "Close",
                                    confirmButtonColor: "#FF6685",
                                });
                            },
                            (response: AxiosResponse<ResponseFormatInterface<ActiveReaderConfigurationModel>>): void => {
                                console.log(response.data);

                                Swal.fire({
                                    icon: "error",
                                    title: response.data.message,
                                    confirmButtonText: "Close",
                                    confirmButtonColor: "#FF6685",
                                });
                            }
                        );
                } catch (error) {
                    console.log(error);
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
                                                <abbr title="The name of the reader configuration">Name</abbr>
                                            </th>

                                            <th>
                                                <abbr title="The amount of frequency configuration">Frequency Configuration Count</abbr>
                                            </th>

                                            <th>
                                                <abbr title="The amount of RSSI scan for each frequency">RSSI Scan Count</abbr>
                                            </th>

                                            <th>
                                                <abbr title="The amount of delay after each RSSI scan">RSSI Scan Interval {"(ms)"}</abbr>
                                            </th>

                                            <ContentTimestampTitle />

                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {tableData.map((data: ReaderConfigurationTableModel, index: number) => (
                                            <tr key={index}>
                                                <td className="no">{index + 1}.</td>

                                                <td>{data.name}</td>

                                                <td>{data.frequencyConfigurationCount}</td>

                                                <td>{data.rssiScanCount}</td>

                                                <td>{data.rssiScanInterval}</td>

                                                <td className="timestamp">
                                                    <ContentTimestamp timestamp={data.createdAt} />
                                                </td>

                                                <td className="timestamp">
                                                    <ContentTimestamp timestamp={data.updatedAt} />
                                                </td>

                                                <td className="action m-0 p-0">
                                                    <div className="fixed-grid has-1-cols">
                                                        <div className="grid is-row-gap-0">
                                                            <div className="cell">
                                                                <button
                                                                    className="button is-small is-fullwidth is-success has-text-white"
                                                                    title="Use Action"
                                                                    onClick={(): void => {
                                                                        handleUse(data.id);
                                                                    }}
                                                                    disabled={
                                                                        activeReaderConfiguration !== null &&
                                                                        activeReaderConfiguration.readerConfigurationId === data.id
                                                                            ? true
                                                                            : false
                                                                    }
                                                                >
                                                                    <span className="icon">
                                                                        <i className="fas fa-check"></i>
                                                                    </span>
                                                                </button>
                                                            </div>

                                                            <div className="cell">
                                                                <Link
                                                                    href={`/dashboard/reader-configuration/${data.id}/frequency-configuration`}
                                                                    className="button is-small is-fullwidth is-info has-text-white"
                                                                    title="Frequency Configuration Action"
                                                                >
                                                                    <span className="icon">
                                                                        <i className="fas fa-sliders"></i>
                                                                    </span>
                                                                </Link>
                                                            </div>

                                                            <div className="cell">
                                                                <Link
                                                                    href={`/dashboard/reader-configuration/${data.id}/change`}
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
                                                                    href={`/dashboard/reader-configuration/${data.id}/remove`}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
