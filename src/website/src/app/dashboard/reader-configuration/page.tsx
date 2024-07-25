"use client";

import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import Swal, { SweetAlertResult } from "sweetalert2";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { ActiveReaderConfigurationModel } from "@/common/interface/active-reader-configuration";
import { ReaderConfigurationModel } from "@/common/interface/reader-configuration.interface";

import { timestampToString } from "@/utility/timestamp-to-string";

export default function ReaderConfigurationPage(): JSX.Element {
    const [activeReaderConfiguration, setActiveReaderConfiguration] = useState<ActiveReaderConfigurationModel | null>(null);
    const [tableData, setTableData] = useState<ReaderConfigurationModel[]>([]);

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
                    .get<ResponseFormatInterface<ReaderConfigurationModel[]>>("http://localhost:3001/api/reader-configuration")
                    .then((response: AxiosResponse<ResponseFormatInterface<ReaderConfigurationModel[]>>): void => {
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

    const handleSort = (e: ChangeEvent<HTMLSelectElement>): void => {
        if (e.target.value === "ascending") {
            setTableData([...tableData].sort((a: ReaderConfigurationModel, b: ReaderConfigurationModel) => a.id - b.id));
        } else if (e.target.value === "descending") {
            setTableData([...tableData].sort((a: ReaderConfigurationModel, b: ReaderConfigurationModel) => b.id - a.id));
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
                                    <div className="column is-1 m-0 p-0">
                                        <Link
                                            href="/dashboard/reader-configuration/add"
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
                                                <abbr title="The name of the reader configuration">Name</abbr>
                                            </th>

                                            <th>
                                                <abbr title="The amount of RSSI scan for each frequency">RSSI Scan Count</abbr>
                                            </th>

                                            <th>
                                                <abbr title="The amount of delay after each RSSI scan">RSSI Scan Interval {"(ms)"}</abbr>
                                            </th>

                                            <th>Created At</th>

                                            <th>Updated At</th>

                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {tableData.map((data: ReaderConfigurationModel, index: number) => (
                                            <tr key={index}>
                                                <td>{index + 1}.</td>

                                                <td>{data.name}</td>

                                                <td>{data.rssiScanCount}</td>

                                                <td>{data.rssiScanInterval}</td>

                                                <td className="timestamp">{timestampToString(data.createdAt)}</td>

                                                <td className="timestamp">{timestampToString(data.updatedAt)}</td>

                                                <td>
                                                    <div className="buttons has-addons is-centered">
                                                        <button
                                                            className="button is-success has-text-white"
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

                                                        <Link
                                                            href={`/dashboard/reader-configuration/${data.id}/frequency-configuration`}
                                                            className="button is-info has-text-white"
                                                            title="Frequency Configuration Action"
                                                        >
                                                            <span className="icon">
                                                                <i className="fas fa-sliders"></i>
                                                            </span>
                                                        </Link>

                                                        <Link
                                                            href={`/dashboard/reader-configuration/${data.id}/change`}
                                                            className="button is-warning has-text-white"
                                                            title="Change Action"
                                                        >
                                                            <span className="icon">
                                                                <i className="fas fa-pen-to-square"></i>
                                                            </span>
                                                        </Link>

                                                        <Link
                                                            href={`/dashboard/reader-configuration/${data.id}/remove`}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
