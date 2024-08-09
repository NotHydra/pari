import Link from "next/link";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export default function ContentTableSort<T extends { id: number }>({
    tableData,
    setTableData,
    addAction,
}: {
    tableData: T[];
    setTableData: Dispatch<SetStateAction<T[]>>;
    addAction?: string;
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
                {addAction !== undefined && (
                    <div className="column is-1 m-0 mr-2 p-0">
                        <Link href={addAction} className="button is-normal is-fullwidth is-success has-text-weight-bold" title="Add Action">
                            <span className="icon">
                                <i className="fab fa-plus"></i>
                            </span>
                        </Link>
                    </div>
                )}

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
