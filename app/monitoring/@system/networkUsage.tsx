"use client"

import React, { useEffect, useRef, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import RTLineChart from "../common/chart/line/RTLineChartEx";
import { MonitorSystemState } from "@/redux/slices/monitoring-system/reducer";
import { Card, CardBody, CardHeader } from "reactstrap";
import ChartHeader from "./chartHeader";

interface ChartProps {
    widthVal?: string;
    heightVal?: string;
}

const NetworkUsage = (chartProps: ChartProps) => {

  const selectMonitoringData = createSelector(
    (selectorState: any) => selectorState.MonitoringSystemReducer,
    (monitoringData: MonitorSystemState) => ({ names: ["received", "send"], labels: monitoringData.labels, datas: monitoringData.networkIO})
  )
  const getMonitoringData = () => useAppSelector(selectMonitoringData);

  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <ChartHeader title="Network IO" monitoringDataCallback={getMonitoringData} />
        </CardHeader>
        <CardBody>
          <RTLineChart countValue={2} monitoringDataCallback={getMonitoringData} widthVal={chartProps.widthVal ?? "40vw"} heightVal={chartProps.heightVal ?? "20vh"} />
        </CardBody>
      </Card>        
    </React.Fragment>
  );
};

export default NetworkUsage;