"use client";

import axios, { AxiosResponse } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { RSSIModel } from "@/common/interface/rssi.interface";

import ContentContainer from "@/components/content/container.component";
import ContentTableContainer from "@/components/content/table/container.component";
import ContentTableSort from "@/components/content/table/sort.component";
import ContentTableBack from "@/components/content/table/back.component";

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

    return (
        <ContentContainer>
            <ContentTableContainer>
                <ContentTableSort tableData={tableData} setTableData={setTableData} />

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

                <ContentTableBack link={`/dashboard/tag/${params.tagId}/frequency`} />
            </ContentTableContainer>
        </ContentContainer>
    );
}
