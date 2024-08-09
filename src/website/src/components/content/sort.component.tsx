import { ChangeEvent, Dispatch, SetStateAction } from "react";

export default function ContentSort<T extends { id: number }>({
    tableData,
    setTableData,
}: {
    tableData: T[];
    setTableData: Dispatch<SetStateAction<T[]>>;
}): JSX.Element {
    const handleSort = (e: ChangeEvent<HTMLSelectElement>): void => {
        if (e.target.value === "ascending") {
            setTableData([...tableData].sort((a: T, b: T) => a.id - b.id));
        } else if (e.target.value === "descending") {
            setTableData([...tableData].sort((a: T, b: T) => b.id - a.id));
        }
    };

    return (
        <div className="cell">
            <div className="columns action">
                <div className="column m-0 p-0">
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
    );
}
