"use client"

import React from "react";

import "./monitoring.css"
import MonitorHeader from "./monitorHeader";

const Monitoring = (props: any) => {
    return (
        <React.Fragment>
            <div className="m-page-content">
                <MonitorHeader title="EMAMS" pageTitle="Monitoring" />
            </div>
        </React.Fragment>
    );
}

export default Monitoring;