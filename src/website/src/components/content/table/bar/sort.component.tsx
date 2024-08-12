import axios, { AxiosResponse } from "axios";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";

export default function ContentTableBarSort<TableType>({
    tableURL,
    setTableData,
}: {
    tableURL: string;
    setTableData: Dispatch<SetStateAction<TableType[]>>;
}): JSX.Element {
    const handleSort = async (e: ChangeEvent<HTMLSelectElement>): Promise<void> => {
        try {
            await axios
                .get<ResponseFormatInterface<TableType[]>>(`${tableURL}?sortOrder=${e.target.value === "asc" ? "asc" : "desc"}`)
                .then((response: AxiosResponse<ResponseFormatInterface<TableType[]>>): void => {
                    console.log(response.data);

                    setTableData(response.data.data);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="column m-0 p-0">
            <div className="control has-icons-left" title="Sort Action">
                <div className="select is-fullwidth">
                    <select onChange={(e: ChangeEvent<HTMLSelectElement>): Promise<void> => handleSort(e)}>
                        <option disabled>Sort</option>

                        <option value={"asc"}>Ascending</option>

                        <option value={"desc"} selected>
                            Descending
                        </option>
                    </select>
                </div>

                <div className="icon is-small is-left">
                    <i className="fas fa-up-down"></i>
                </div>
            </div>
        </div>
    );
}
