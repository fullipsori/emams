"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import {getDataSourceSelector} from "../../common/data/DataSource";
import { Button } from "reactstrap";
import { useRouter } from "next/navigation";

interface ChartProps {
    title: string;
    dataSourceType: string;
}

const ChartHeader = (chartProps: ChartProps) => {
    const router = useRouter();
    const [headerTitle, setHeaderTitle] = useState(chartProps.title);

    const monitoringData = useAppSelector(getDataSourceSelector(chartProps.dataSourceType));

    const updateTitle = (monitoringData: any) => {
        if (monitoringData && monitoringData.datas) {
            let newTitle = chartProps.title + " : ";
            for (var i = 0; i < monitoringData.datas.length; i++) {
                const lastValue = Math.round(monitoringData.datas[i][monitoringData.datas[i].length - 1] * 100) / 100;
                newTitle += lastValue.toString();
                if (i < (monitoringData.datas.length - 1)) {
                    newTitle += " / ";
                }
            }
            setHeaderTitle(newTitle);
        }
    }

    useEffect(() => {
        updateTitle(monitoringData);
    }, [monitoringData]);

    const handleDetail = () => {
        router.push(`/monitoring/${chartProps.dataSourceType}`);
    };

    return (
        <React.Fragment>
            <h4 className="card-title mb-0 fw-bold"> {headerTitle}</h4>
        </React.Fragment>
    );
};

export default ChartHeader;
