"use client"

import React, { useEffect, useRef, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MonitorClientState } from "@/redux/slices/monitoring-client/reducer";
import { MonitorState } from "@/redux/slices/monitoring/reducer";
import { getClientInfoData } from "@/redux/slices/monitoring-client/thunk";
import RTBarChart from "../common/chart/bar/RTBarChart";

interface ChartProps {
    widthVal?: string;
    heightVal?: string;
}

const ConnectionView = (chartProps: ChartProps) => {
  const dispatch = useAppDispatch();

  const selectMonitoringData = createSelector(
    (state: any) => state.MonitoringClientReducer,
    (monitoringData: MonitorClientState) => ({ labels: monitoringData.chartLabels, datas: [monitoringData.producerData, monitoringData.consumerData]})
  )
  const getMonitoringData = () => useAppSelector(selectMonitoringData);

  const updateMonitoring = createSelector(
    (state: any) => state.MonitoringReducer,
    (monitoringData: MonitorState) => ({ updateCount: monitoringData.updateCount })
  )

  const monitorState = useAppSelector(updateMonitoring);

  useEffect(() => {
    const req = {
        mlsn : "default",
        period: "now",
    };
    dispatch(getClientInfoData(req));
  }, [monitorState]);


  const defaultBarChartData = [
      {
        label: "Producer",
        data: [],
        backgroundColor: "rgba(82, 90, 124, 0.5)",
        stack: "Stack 1",
      },
      {
        label: "Consumer",
        data: [],
        backgroundColor: "rgba(129, 132, 184, 0.5)",
        stack: "Stack 1",
      }
  ];

  return (
    <React.Fragment>
        <RTBarChart monitoringDataCallback={getMonitoringData} defaultChartData={defaultBarChartData} stack={true} widthVal={chartProps.widthVal ?? "40vw"} heightVal={chartProps.heightVal ?? "20vh"} />
    </React.Fragment>
  );
};

export default ConnectionView;