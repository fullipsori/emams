"use client";

import React, { useEffect, useRef, useState } from "react";
import getDataSource from "../../common/data/DataSource";

interface ChartProps {
    title: string;
    dataSourceType: string;
}

const ChartHeader = (chartProps: ChartProps) => {
    const [headerTitle, setHeaderTitle] = useState(chartProps.title);

    const dataSourceFunc = getDataSource(chartProps.dataSourceType);
    const monitoringData = dataSourceFunc();

    useEffect(() => {
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
    }, [monitoringData]);

    return (
        <div>
            <h4 className="card-title mb-0 fw-bold"> {headerTitle}</h4>
        </div>
    );
};

export default ChartHeader;
