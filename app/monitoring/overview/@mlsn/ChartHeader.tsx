"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import {getDataSourceSelector} from "../../common/data/DataSource";
import { Button } from "reactstrap";
import { useRouter } from "next/navigation";

interface ChartProps {
    title: string;
    handleYAxis?: (type: string) => void,
    dataSourceType: string;
}

const ChartHeader = (chartProps: ChartProps) => {
    const router = useRouter();

    const handleDetail = () => {
        router.push(`/monitoring/${chartProps.dataSourceType}`);
    };

    const [yAxisType, setYAxisType] = useState("count");
    const handleYAxisType = (type: string) => {
        if (yAxisType !== type) {
            setYAxisType(type);
        }
    };

    return (
        <React.Fragment>
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0 fw-bold"><i className="ri-stop-fill align-middle fs-18 text-primary me-2"></i> {chartProps.title}
                    {
                        chartProps.handleYAxis && <span style={{textDecoration: (yAxisType === "count")? "underline" : ""}} onClick={() => handleYAxisType("count")}>{'[건수'}</span>
                    }
                    {
                        chartProps.handleYAxis && <span style={{textDecoration: (yAxisType === "bytes")? "underline" : ""}} onClick={() => handleYAxisType("bytes")}>{ '|Bytes]'}</span>
                    }
                </h4>
                <Button onClick={handleDetail} className="primary text-bg-light">Click Detail</Button>
            </div>
        </React.Fragment>
    );
};

export default ChartHeader;
