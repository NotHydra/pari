"use client";

import axios, { AxiosResponse } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { FrequencyTableModel } from "@/common/interface/frequency.interface";

import ContentTableSort from "@/components/content/table/sort.component";
import ContentTableActionTitle from "@/components/content/table/action/title.component";
import ContentTableActionButtonContainer from "@/components/content/table/action/button/container.component";
import ContentTableActionButton from "@/components/content/table/action/button/index.component";
import ContentTableBack from "@/components/content/table/back.component";

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
                            <ContentTableSort tableData={tableData} setTableData={setTableData} />

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

                                            <ContentTableActionTitle />
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {tableData.map((data: FrequencyTableModel, index: number) => (
                                            <tr key={index}>
                                                <td className="no">{index + 1}.</td>

                                                <td>{data.frequency}</td>

                                                <td>{data.rssiCount}</td>

                                                <td>{data.averageRSSI}</td>

                                                <ContentTableActionButtonContainer>
                                                    <ContentTableActionButton
                                                        title="RSSI"
                                                        icon="wifi"
                                                        color="info"
                                                        action={`/dashboard/tag/${params.tagId}/frequency/${data.id}/rssi`}
                                                    />
                                                </ContentTableActionButtonContainer>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <ContentTableBack link={"/dashboard/tag"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
