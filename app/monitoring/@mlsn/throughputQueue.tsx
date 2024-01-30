"use client"

import React, { useEffect, useRef, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MonitorQueueState } from "@/redux/slices/monitoring-queue/reducer";
import RTLineChartEx from "../common/chart/line/RTLineChartEx";

interface ChartProps {
    countValue: number;
    widthVal?: string;
    heightVal?: string;
}

const ThroughputQueue = (chartProps: ChartProps) => {

  const selectMonitoringData = createSelector(
    (selectorState: any) => selectorState.MonitoringQueueReducer,
    (monitoringData: MonitorQueueState) => ({ names: monitoringData.queueNames, labels: monitoringData.queueLabels, datas: monitoringData.queueTps})
  )
  // const monitoringData = useAppSelector(selectMonitoringData);
  const getMonitoringData = () => useAppSelector(selectMonitoringData);

  /*

  const dispatch = useAppDispatch();
  const updateMonitoring = createSelector(
    (state: any) => state.MonitoringReducer,
    (monitoringData: MonitorState) => ({ updateCount: monitoringData.updateCount })
  )

  const monitorState = useAppSelector(updateMonitoring);

  useEffect(() => {
    const req = {
      period: "now",
      queueCount: chartProps.countValue,
    };
    dispatch(getMonitoringQueueData(req));
  }, [monitorState]);
  */

  return (
    <React.Fragment>
        <RTLineChartEx countValue={chartProps.countValue} monitoringDataCallback={getMonitoringData} widthVal={chartProps.widthVal ?? "40vw"} heightVal={chartProps.heightVal ?? "20vh"} />
    </React.Fragment>
  );
};

export default ThroughputQueue;