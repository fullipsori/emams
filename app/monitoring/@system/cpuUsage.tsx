"use client"

import React, { useEffect, useRef, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import RTLineChart from "../common/chart/line/RTLineChart";
import { MonitorSystemState } from "@/redux/slices/monitoring-system/reducer";
import { Card, CardBody, CardHeader } from "reactstrap";
import ChartHeader from "./chartHeader";

interface ChartProps {
    widthVal?: string;
    heightVal?: string;
}

const CpuUsage = (chartProps: ChartProps) => {

  const selectMonitoringData = createSelector(
    (selectorState: any) => selectorState.MonitoringSystemReducer,
    (monitoringData: MonitorSystemState) => ({ names: ["cpu usage"], minLabel: monitoringData.minLabel, labels: monitoringData.labels, datas: [ monitoringData.cpuUsages] })
  )
  const getMonitoringData = () => useAppSelector(selectMonitoringData);

  return (
    <React.Fragment>
        <Card>
          <CardHeader className="py-1">
            <ChartHeader title="CPU usage" monitoringDataCallback={getMonitoringData} />
          </CardHeader>
          <CardBody className="p-0">
            <RTLineChart countValue={1} monitoringDataCallback={getMonitoringData} widthVal={chartProps.widthVal ?? "40vw"} heightVal={chartProps.heightVal ?? "20vh"} />
          </CardBody>
        </Card>
    </React.Fragment>
  );
};

export default CpuUsage;