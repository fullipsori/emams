"use client"

import React, { useEffect, useRef, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MonitorQueueState } from "@/redux/slices/monitoring-queue/reducer";
import { Card, CardBody, CardHeader } from "reactstrap";
import RTLineChart from "../../common/chart/line/RTLineChart";
import getLineChartOpts from "../../common/chart/line/LineChartOpts";
import { dataSourceType, getDataSourceCount } from "../../common/data/DataSource";
import ChartHeader from "./ChartHeader";

interface ChartProps {
    countValue: number;
    widthVal?: string;
    heightVal?: string;
}

const ThroughputQueue = (chartProps: ChartProps) => {

  const [yAxisType, setYAxisType] = useState("count");
  const handleYAxisType = (type: string) => {
    if(yAxisType !== type) {
      setYAxisType(type);
    }
  };

  return (
    <React.Fragment>
      <Card className="mb-1 pb-0">
        <CardHeader className="py-1">
          <ChartHeader title="Messages In/Out Rate " dataSourceType={dataSourceType.THROUGHPUT} handleYAxis={handleYAxisType} />
        </CardHeader>
        <CardBody className="p-0">
          <RTLineChart dataSourceType={dataSourceType.THROUGHPUT} chartOptions={getLineChartOpts({count:getDataSourceCount(dataSourceType.THROUGHPUT), widthVal:chartProps.widthVal, heightVal:chartProps.heightVal})} />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default ThroughputQueue;