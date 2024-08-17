import { useDebounce } from "@uidotdev/usehooks";
import axios, { AxiosResponse } from "axios";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

import { ResponseFormatInterface } from "@/common/interface/response-format.interface";

export default function ContentTableBar<TableType>({
    tableURL,
    setTableData,
    sortByOption,
}: {
    tableURL: string;
    setTableData: Dispatch<SetStateAction<TableType[]>>;
    sortByOption?: { [value: string]: string };
}): JSX.Element {
    const [search, setSearch] = useState<string>("default");
    const [sortBy, setSortBy] = useState<string>("default");
    const [sortOrder, setSortOrder] = useState<string>("desc");
    const debouncedSearch: string = useDebounce(search, 250);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.value === "") {
            setSearch("default");

            return;
        }

        setSearch(e.target.value);
    };

    const handleSortBy = (e: ChangeEvent<HTMLSelectElement>): void => {
        setSortBy(e.target.value);
    };

    const handleSortOrder = (e: ChangeEvent<HTMLSelectElement>): void => {
        setSortOrder(e.target.value);
    };

    useEffect(() => {
        const handle = (): void => {
            try {
                if (debouncedSearch) {
                    axios
                        .get<
                            ResponseFormatInterface<TableType[]>
                        >(`${tableURL}?search=${search === "default" ? "" : search}&sortBy=${sortBy === "default" ? "id" : sortBy}&sortOrder=${sortOrder}`)
                        .then((response: AxiosResponse<ResponseFormatInterface<TableType[]>>): void => {
                            console.log(response.data);
                            setTableData(response.data.data);
                        });
                }
            } catch (error) {
                console.log(error);
            }
        };

        handle();
    }, [debouncedSearch, sortBy, sortOrder]);

    return (
        <>
            <div className="column m-0 mr-2 p-0">
                <div className="control has-icons-left" title="Search Action">
                    <input className="input" type="text" placeholder="Search" onChange={(e: ChangeEvent<HTMLInputElement>): void => handleSearch(e)} />

                    <div className="icon is-small is-left">
                        <i className="fas fa-search"></i>
                    </div>
                </div>
            </div>

            <div className="column m-0 mr-2 p-0">
                <div className="control has-icons-left" title="Sort By Action">
                    <div className="select is-fullwidth">
                        <select onChange={(e: ChangeEvent<HTMLSelectElement>): void => handleSortBy(e)}>
                            <option disabled>Sort By</option>

                            <option value={"default"} selected>
                                Default
                            </option>

                            {sortByOption !== undefined &&
                                Object.keys(sortByOption).map((value: string): JSX.Element => <option value={value}>{sortByOption[value]}</option>)}
                        </select>
                    </div>

                    <div className="icon is-small is-left">
                        <i className="fas fa-table-columns"></i>
                    </div>
                </div>
            </div>
            <div className="column m-0 p-0">
                <div className="control has-icons-left" title="Sort Order Action">
                    <div className="select is-fullwidth">
                        <select onChange={(e: ChangeEvent<HTMLSelectElement>): void => handleSortOrder(e)}>
                            <option disabled>Sort Order</option>

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
        </>
    );
}
