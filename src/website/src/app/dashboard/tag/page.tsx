"use client";

import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Swal, { SweetAlertResult } from "sweetalert2";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { TagModel, TagTableModel } from "@/common/interface/tag.interface";

import ContentContainer from "@/components/content/container.component";
import ContentTableContainer from "@/components/content/table/container.component";
import ContentTableBarContainer from "@/components/content/table/bar/container.component";
import ContentTableBar from "@/components/content/table/bar/index.component";
import ContentTable from "@/components/content/table/index.component";
import ContentTableTimestampTitle from "@/components/content/table/timestamp/title.component";
import ContentTableTimestampValue from "@/components/content/table/timestamp/value.component";
import ContentTableActionTitle from "@/components/content/table/action/title.component";
import ContentTableActionButtonContainer from "@/components/content/table/action/button/container.component";
import ContentTableActionButton from "@/components/content/table/action/button/index.component";
import ContentTableActionButtonRemove from "@/components/content/table/action/button/remove.component";

export default function TagPage(): JSX.Element {
    const tableURL: string = "http://localhost:3001/api/tag/table";
    const [tableData, setTableData] = useState<TagTableModel[]>([]);

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            try {
                await axios
                    .get<ResponseFormatInterface<TagTableModel[]>>(`${tableURL}?sortOrder=desc`)
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
        <ContentContainer>
            <ContentTableContainer>
                <ContentTableBarContainer>
                    <ContentTableBar<TagTableModel>
                        tableURL={tableURL}
                        setTableData={setTableData}
                        sortByOption={{
                            tag: "Tag",
                            reader_configuration_name: "Reader Configuration Name",
                            rssi_count: "RSSI Count",
                            average_rssi: "Average RSSI (dBm)",
                            created_at: "Created At",
                        }}
                    />
                </ContentTableBarContainer>

                <ContentTable>
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

                            <ContentTableTimestampTitle updatedAt={false} />

                            <ContentTableActionTitle />
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

                                <ContentTableTimestampValue createdAt={data.createdAt} />

                                <ContentTableActionButtonContainer>
                                    <ContentTableActionButton
                                        title="Line Chart"
                                        icon="chart-line"
                                        color="info"
                                        action={`/dashboard/tag/${data.id}/line-chart`}
                                    />

                                    <ContentTableActionButton title="Frequency" icon="sliders" color="info" action={`/dashboard/tag/${data.id}/frequency`} />

                                    <ContentTableActionButtonRemove action={() => handleRemove(data.id)} />
                                </ContentTableActionButtonContainer>
                            </tr>
                        ))}
                    </tbody>
                </ContentTable>
            </ContentTableContainer>
        </ContentContainer>
    );
}
