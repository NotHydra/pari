export default function Page(): JSX.Element {
    return (
        <div className="card has-background-white">
            <div className="card-content">
                <div className="content">
                    <div className="fixed-grid has-1-cols is-fullwidth">
                        <div className="grid">
                            <div className="cell">
                                <div className="columns action">
                                    <div className="column is-1 m-0 p-0">
                                        <div className="button is-normal is-fullwidth is-success has-text-weight-bold" title="Add Action">
                                            <span className="icon">
                                                <i className="fab fa-plus"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="column m-0 mx-2 p-0">
                                        <div className="field" title="Search Action">
                                            <p className="control has-icons-left">
                                                <span className="icon is-left">
                                                    <i className="fas fa-search"></i>
                                                </span>

                                                <input className="input" type="text" placeholder="Search" />
                                            </p>
                                        </div>
                                    </div>

                                    <div className="column is-2 m-0 p-0">
                                        <div className="control has-icons-left" title="Sort Action">
                                            <div className="select is-fullwidth">
                                                <select>
                                                    <option disabled>Sort</option>
                                                    <option selected>Ascending</option>
                                                    <option>Descending</option>
                                                </select>
                                            </div>

                                            <div className="icon is-small is-left">
                                                <i className="fas fa-up-down"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cell">
                                <div className="table-container line has-background-light">
                                    <table className="table has-background-white has-text-dark is-fullwidth is-bordered is-striped is-narrow is-hoverable">
                                        <thead>
                                            <tr>
                                                <th>No.</th>

                                                <th>
                                                    <abbr title="The name of the reader configuration">Name</abbr>
                                                </th>

                                                <th>
                                                    <abbr title="The amount of RSSI scan for each frequency">RSSI Scan Count</abbr>
                                                </th>

                                                <th>
                                                    <abbr title="The amount of delay after each RSSI scan">RSSI Scan Interval {"(ms)"}</abbr>
                                                </th>

                                                <th>Created At</th>

                                                <th>Updated At</th>

                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>1.</td>

                                                <td>Default</td>

                                                <td>10</td>

                                                <td>10</td>

                                                <td className="timestamp">1212-12-12 12:12:12</td>

                                                <td className="timestamp">1212-12-12 12:12:12</td>

                                                <td>
                                                    <div className="buttons has-addons is-centered">
                                                        <button className="button is-info is-normal" title="Frequency Configuration Action">
                                                            <span className="icon">
                                                                <i className="fas fa-sliders"></i>
                                                            </span>
                                                        </button>

                                                        <button className="button is-warning is-normal" title="Change Action">
                                                            <span className="icon">
                                                                <i className="fas fa-pen-to-square"></i>
                                                            </span>
                                                        </button>

                                                        <button className="button is-danger is-normal" title="Remove Action">
                                                            <span className="icon">
                                                                <i className="fas fa-trash"></i>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
