"use client";

import axios, { AxiosResponse } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { RSSITableModel } from "@/common/interface/rssi.interface";

import ContentContainer from "@/components/content/container.component";
import ContentTableContainer from "@/components/content/table/container.component";
import ContentTableBarContainer from "@/components/content/table/bar/container.component";
import ContentTableBarSort from "@/components/content/table/bar/sort.component";
import ContentTable from "@/components/content/table/index.component";
import ContentTableBack from "@/components/content/table/back.component";

export default function RSSIPage(): JSX.Element {
    const params: { tagId: string; frequencyId: string } = useParams<{ tagId: string; frequencyId: string }>();

    const tableURL: string = `http://localhost:3001/api/rssi/table/frequency-id/${params.frequencyId}`;
    const [tableData, setTableData] = useState<RSSITableModel[]>([]);

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            try {
                await axios
                    .get<ResponseFormatInterface<RSSITableModel[]>>(`${tableURL}?sortOrder=desc`)
                    .then((response: AxiosResponse<ResponseFormatInterface<RSSITableModel[]>>): void => {
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
                <ContentTableBarContainer>
                    <ContentTableBarSort<RSSITableModel> tableURL={tableURL} setTableData={setTableData} />
                </ContentTableBarContainer>

                <ContentTable hasBackButton={true}>
                    <thead>
                        <tr>
                            <th>No.</th>

                            <th>
                                <abbr title="The value of the frequency configuration">RSSI (dBm)</abbr>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {tableData.map((data: RSSITableModel, index: number) => (
                            <tr key={index}>
                                <td className="no">{index + 1}.</td>

                                <td>{data.rssi}</td>
                            </tr>
                        ))}
                    </tbody>
                </ContentTable>

                <ContentTableBack link={`/dashboard/tag/${params.tagId}/frequency`} />
            </ContentTableContainer>
        </ContentContainer>
    );
}
