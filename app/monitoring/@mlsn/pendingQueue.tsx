"use client"

import React, { useEffect, useRef, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MonitorState } from "@/redux/slices/monitoring/reducer";
import { MonitorQueueState } from "@/redux/slices/monitoring-queue/reducer";
import RTLineChart from "../common/chart/line/RTLineChartEx";
import { getMonitoringQueueData } from "@/redux/slices/monitoring-queue/thunk";
import { Card, CardBody, CardHeader } from "reactstrap";

interface ChartProps {
    countValue: number;
    widthVal?: string;
    heightVal?: string;
}

const PendingQueue = (chartProps: ChartProps) => {
  const dispatch = useAppDispatch();

  const selectMonitoringData = createSelector(
    (state: any) => state.MonitoringQueueReducer,
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


  const [yAxisType, setYAxisType] = useState("count");
  const handleYAxisType = (type: string) => {
    if(yAxisType !== type) {
      setYAxisType(type);
    }
  };

  return (
    <React.Fragment>
      <Card>
        <CardHeader>
            <h3 className="card-title mb-0 fw-bold">Pending Messages   
              <span style={{textDecoration: (yAxisType === "count")? "underline" : ""}} onClick={() => handleYAxisType("count")}>[건수|</span>
              <span style={{textDecoration: (yAxisType === "bytes")? "underline" : ""}} onClick={() => handleYAxisType("bytes")}>Bytes]</span>
            </h3>
        </CardHeader>
        <CardBody>
          <RTLineChart countValue={chartProps.countValue} monitoringDataCallback={getMonitoringData} widthVal={chartProps.widthVal ?? "40vw"} heightVal={chartProps.heightVal ?? "20vh"} />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default PendingQueue;