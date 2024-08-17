"use client";

import axios, { AxiosResponse } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";
import { FrequencyConfigurationTableModel } from "@/common/interface/frequency-configuration.interface";

import ContentContainer from "@/components/content/container.component";
import ContentTableContainer from "@/components/content/table/container.component";
import ContentTableBarContainer from "@/components/content/table/bar/container.component";
import ContentTableBarAdd from "@/components/content/table/bar/add.component";
import ContentTableBar from "@/components/content/table/bar/index.component";
import ContentTable from "@/components/content/table/index.component";
import ContentTableTimestampTitle from "@/components/content/table/timestamp/title.component";
import ContentTableTimestampValue from "@/components/content/table/timestamp/value.component";
import ContentTableActionTitle from "@/components/content/table/action/title.component";
import ContentTableActionButtonContainer from "@/components/content/table/action/button/container.component";
import ContentTableActionButtonChange from "@/components/content/table/action/button/change.component";
import ContentTableActionButtonRemove from "@/components/content/table/action/button/remove.component";
import ContentTableBack from "@/components/content/table/back.component";

export default function FrequencyConfigurationPage(): JSX.Element {
    const params: { readerConfigurationId: string } = useParams<{ readerConfigurationId: string }>();

    const tableURL: string = `http://localhost:3001/api/frequency-configuration/table/reader-configuration-id/${params.readerConfigurationId}`;
    const [tableData, setTableData] = useState<FrequencyConfigurationTableModel[]>([]);

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            try {
                await axios
                    .get<ResponseFormatInterface<FrequencyConfigurationTableModel[]>>(`${tableURL}?sortOrder=desc`)
                    .then((response: AxiosResponse<ResponseFormatInterface<FrequencyConfigurationTableModel[]>>): void => {
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
                    <ContentTableBarAdd link={`/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration/add`} />

                    <ContentTableBar<FrequencyConfigurationTableModel>
                        tableURL={tableURL}
                        setTableData={setTableData}
                        sortByOption={{
                            frequency: "Frequency (Hz)",
                            created_at: "Created At",
                            updated_at: "Updated At",
                        }}
                    />
                </ContentTableBarContainer>

                <ContentTable hasBackButton={true}>
                    <thead>
                        <tr>
                            <th>No.</th>

                            <th>
                                <abbr title="The value of the frequency configuration">Frequency (Hz)</abbr>
                            </th>

                            <ContentTableTimestampTitle />

                            <ContentTableActionTitle />
                        </tr>
                    </thead>

                    <tbody>
                        {tableData.map((data: FrequencyConfigurationTableModel, index: number) => (
                            <tr key={index}>
                                <td className="no">{index + 1}.</td>

                                <td>{data.frequency}</td>

                                <ContentTableTimestampValue createdAt={data.createdAt} updatedAt={data.updatedAt} />

                                <ContentTableActionButtonContainer>
                                    <ContentTableActionButtonChange
                                        action={`/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration/${data.id}/change`}
                                    />

                                    <ContentTableActionButtonRemove
                                        action={`/dashboard/reader-configuration/${params.readerConfigurationId}/frequency-configuration/${data.id}/remove`}
                                    />
                                </ContentTableActionButtonContainer>
                            </tr>
                        ))}
                    </tbody>
                </ContentTable>

                <ContentTableBack link={"/dashboard/reader-configuration"} />
            </ContentTableContainer>
        </ContentContainer>
    );
}
