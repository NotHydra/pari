"use client";

import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Swal, { SweetAlertResult } from "sweetalert2";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { ActiveReaderConfigurationModel } from "@/common/interface/active-reader-configuration.interface";
import { ReaderConfigurationTableModel } from "@/common/interface/reader-configuration.interface";

import ContentContainer from "@/components/content/container.component";
import ContentTableContainer from "@/components/content/table/container.component";
import ContentTableBarContainer from "@/components/content/table/bar/container.component";
import ContentTableBarAdd from "@/components/content/table/bar/add.component";
import ContentTableBarSort from "@/components/content/table/bar/sort.component";
import ContentTable from "@/components/content/table/index.component";
import ContentTableTimestampTitle from "@/components/content/table/timestamp/title.component";
import ContentTableTimestampValue from "@/components/content/table/timestamp/value.component";
import ContentTableActionTitle from "@/components/content/table/action/title.component";
import ContentTableActionButton from "@/components/content/table/action/button/index.component";
import ContentTableActionButtonContainer from "@/components/content/table/action/button/container.component";
import ContentTableActionButtonChange from "@/components/content/table/action/button/change.component";
import ContentTableActionButtonRemove from "@/components/content/table/action/button/remove.component";

export default function ReaderConfigurationPage(): JSX.Element {
    const tableURL: string = "http://localhost:3001/api/reader-configuration/table";
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
                    .get<ResponseFormatInterface<ReaderConfigurationTableModel[]>>(`${tableURL}?sortOrder=desc`)
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
        <ContentContainer>
            <ContentTableContainer>
                <ContentTableBarContainer>
                    <ContentTableBarAdd link="/dashboard/reader-configuration/add" />

                    <ContentTableBarSort<ReaderConfigurationTableModel> tableURL={tableURL} setTableData={setTableData} />
                </ContentTableBarContainer>

                <ContentTable>
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

                            <ContentTableTimestampTitle />

                            <ContentTableActionTitle />
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

                                <ContentTableTimestampValue createdAt={data.createdAt} updatedAt={data.updatedAt} />

                                <ContentTableActionButtonContainer>
                                    <ContentTableActionButton
                                        title="Use"
                                        icon="check"
                                        color="success"
                                        action={() => handleUse(data.id)}
                                        disabled={
                                            activeReaderConfiguration !== null && activeReaderConfiguration.readerConfigurationId === data.id ? true : false
                                        }
                                    />

                                    <ContentTableActionButton
                                        title="Frequency Configuration"
                                        icon="sliders"
                                        color="info"
                                        action={`/dashboard/reader-configuration/${data.id}/frequency-configuration`}
                                    />

                                    <ContentTableActionButtonChange action={`/dashboard/reader-configuration/${data.id}/change`} />

                                    <ContentTableActionButtonRemove action={`/dashboard/reader-configuration/${data.id}/remove`} />
                                </ContentTableActionButtonContainer>
                            </tr>
                        ))}
                    </tbody>
                </ContentTable>
            </ContentTableContainer>
        </ContentContainer>
    );
}
