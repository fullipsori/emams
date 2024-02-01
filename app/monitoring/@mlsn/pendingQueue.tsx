"use client"

import React, { useEffect, useRef, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MonitorState } from "@/redux/slices/monitoring/reducer";
import { MonitorQueueState, reset as resetData } from "@/redux/slices/monitoring-queue/reducer";
import { getMonitoringQueueData } from "@/redux/slices/monitoring-queue/thunk";
import { Card, CardBody, CardHeader } from "reactstrap";
import RTLineChart from "../common/chart/line/RTLineChart";

interface ChartProps {
    countValue: number;
    widthVal?: string;
    heightVal?: string;
}

const PendingQueue = (chartProps: ChartProps) => {
  const dispatch = useAppDispatch();

  const selectMonitoringData = createSelector(
    (state: any) => state.MonitoringQueueReducer,
    (monitoringData: MonitorQueueState) => ({ names: monitoringData.queueNames, minLabel: monitoringData.minLabel, labels: monitoringData.queueLabels, datas: monitoringData.queuePendings})
  )
  // const monitoringData = useAppSelector(selectMonitoringData);
  const getMonitoringData = () => useAppSelector(selectMonitoringData);

  const updateMonitoring = createSelector(
    (state: any) => state.MonitoringReducer,
    (monitoringData: MonitorState) => ({ lastChartTime: monitoringData.lastChartTime})
  )
  const monitorState = useAppSelector(updateMonitoring);

  useEffect(() => {
    const req = {
      period: "now",
      queueCount: chartProps.countValue,
    };
    dispatch(getMonitoringQueueData(req));

  }, [monitorState]);


  useEffect(() => {
    return () => {
      dispatch(resetData());
    }
  }, [dispatch]);

  const [yAxisType, setYAxisType] = useState("count");
  const handleYAxisType = (type: string) => {
    if(yAxisType !== type) {
      setYAxisType(type);
    }
  };

  const title = "Pending Messages "
  return (
    <React.Fragment>
      <Card>
        <CardHeader>
            <h3 className="card-title mb-0 fw-bold"><i className="ri-stop-fill align-middle fs-18 text-primary me-2"></i>{title}
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