"use client"

import React, { useEffect, useRef, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MonitorState } from "@/redux/slices/monitoring/reducer";
import { MonitorQueueState } from "@/redux/slices/monitoring-queue/reducer";
import RTLineChartEx from "../common/chart/line/RTLineChartEx";
import { getMonitoringQueueData } from "@/redux/slices/monitoring-queue/thunk";

interface ChartProps {
    countValue: number;
    widthVal?: string;
    heightVal?: string;
}

const PendingQueue = (chartProps: ChartProps) => {
  const dispatch = useAppDispatch();

  const selectMonitoringData = createSelector(
    (selectorState: any) => selectorState.MonitoringQueueReducer,
    (monitoringData: MonitorQueueState) => ({ names: monitoringData.queueNames, labels: monitoringData.queueLabels, datas: monitoringData.queuePendings})
  )
  // const monitoringData = useAppSelector(selectMonitoringData);
  const getMonitoringData = () => useAppSelector(selectMonitoringData);

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


  return (
    <React.Fragment>
        <RTLineChartEx countValue={chartProps.countValue} monitoringDataCallback={getMonitoringData} widthVal={chartProps.widthVal ?? "40vw"} heightVal={chartProps.heightVal ?? "20vh"} />
    </React.Fragment>
  );
};

export default PendingQueue;