"use client"

import React, { useEffect, useRef, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MonitorClientState, reset as resetData } from "@/redux/slices/monitoring-client/reducer";
import { MonitorState } from "@/redux/slices/monitoring/reducer";
import { getClientInfoData } from "@/redux/slices/monitoring-client/thunk";
import RTBarChart from "../../common/chart/bar/RTBarChart";
import { Card, CardBody, CardHeader } from "reactstrap";

interface ChartProps {
    widthVal?: string;
    heightVal?: string;
}

const ConnectionView = (chartProps: ChartProps) => {
  const dispatch = useAppDispatch();

  const selectMonitoringData = createSelector(
    (state: any) => state.MonitoringClientReducer,
    (monitoringData: MonitorClientState) => ({ labels: monitoringData.labels, minLabel: monitoringData.minLabel, datas: [monitoringData.producerData, monitoringData.consumerData]})
  )
  const getMonitoringData = () => useAppSelector(selectMonitoringData);

  const updateMonitoring = createSelector(
    (state: any) => state.MonitoringReducer,
    (monitoringData: MonitorState) => ({ lastChartTime: monitoringData.lastChartTime })
  )

  const monitorState = useAppSelector(updateMonitoring);

  useEffect(() => {
    const req = {
        mlsn : "default",
        period: "now",
    };
    dispatch(getClientInfoData(req));
  }, [monitorState]);

  useEffect(() => {
    return () => {
      dispatch(resetData());
    }
  }, [dispatch]);

  const defaultBarChartData = () => { 
    return([
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
  ])};

  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <h3 className="card-title mb-0 fw-bold"><i className="ri-stop-fill align-middle fs-18 text-primary me-2"></i>Consumers 개수
          </h3>
        </CardHeader>
        <CardBody>
          <RTBarChart monitoringDataCallback={getMonitoringData} defaultChartData={defaultBarChartData} stack={true} widthVal={chartProps.widthVal ?? "40vw"} heightVal={chartProps.heightVal ?? "20vh"} />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default ConnectionView;