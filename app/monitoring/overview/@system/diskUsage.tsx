"use client"

import React, { useEffect, useRef, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import RTLineChart from "../../common/chart/line/RTLineChart";
import { MonitorSystemState } from "@/redux/slices/monitoring-system/reducer";
import { Card, CardBody, CardHeader } from "reactstrap";
import ChartHeader from "./chartHeader";
import getLineChartOpts from "../../common/chart/line/LineChartOpts";

interface ChartProps {
    widthVal?: string;
    heightVal?: string;
}

const DiskUsage = (chartProps: ChartProps) => {

  const selectMonitoringData = createSelector(
    (selectorState: any) => selectorState.MonitoringSystemReducer,
    (monitoringData: MonitorSystemState) => ({ names: ["read", "write"],minLabel: monitoringData.minLabel, labels: monitoringData.labels, datas: monitoringData.diskIO })
  )
  const getMonitoringData = () => useAppSelector(selectMonitoringData);

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="py-1">
          <ChartHeader title="DISK read/write" monitoringDataCallback={getMonitoringData} />
        </CardHeader>
        <CardBody className="p-0">
            <RTLineChart dataSourceType="diskUsage" chartOptions={getLineChartOpts({ count: 2 })} />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default DiskUsage;