"use client";

import Link from "next/link";

export default function ReaderConfigurationAddPage(): JSX.Element {
    return (
        <div className="card has-background-white">
            <div className="card-content">
                <div className="content">
                    <div className="field" title="The name of the reader configuration">
                        <label className="label" htmlFor="name">
                            Name
                        </label>

                        <div className="control">
                            <input className="input" type="text" name="name" placeholder="Insert name here" />
                        </div>
                    </div>

                    <div className="field" title="The amount of RSSI scan for each frequency">
                        <label className="label" htmlFor="rssiScanCount">
                            RSSI Scan Count
                        </label>

                        <div className="control">
                            <input className="input" type="text" name="rssiScanCount" placeholder="Insert RSSI scan count here" />
                        </div>
                    </div>

                    <div className="field" title="The amount of delay after each RSSI scan">
                        <label className="label" htmlFor="rssiScanInterval">
                            RSSI Scan Interval
                        </label>

                        <div className="control">
                            <input className="input" type="text" name="rssiScanInterval" placeholder="Insert RSSI scan interval here" />
                        </div>
                    </div>

                    <div className="buttons">
                        <button className="button is-fullwidth is-success has-text-weight-bold" title="Add Action">
                            <span className="icon">
                                <i className="fas fa-plus"></i>
                            </span>

                            <span>Add</span>
                        </button>

                        <Link
                            href="/dashboard/reader-configuration"
                            className="button is-fullwidth is-danger has-text-white has-text-weight-bold"
                            title="Back Action"
                        >
                            <span className="icon">
                                <i className="fas fa-reply"></i>
                            </span>

                            <span>Back</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
