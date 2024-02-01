"use client"

import React, { useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import "../monitoring.css";
import RTGaugeChart from "../common/chart/gauge/RTGaugeChart";
import DockerInfo from "./DockerInfo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createSelector } from "@reduxjs/toolkit";
import { MonitorState } from "@/redux/slices/monitoring/reducer";
import { getMonitoringSystemData } from "@/redux/slices/monitoring-system/thunk";
import CpuUsage from "./cpuUsage";
import MemoryUsage from "./memoryUsage";
import DiskUsage from "./diskUsage";
import NetworkUsage from "./networkUsage";
import { MonitorSystemState, reset as resetData } from "@/redux/slices/monitoring-system/reducer";

const Monitoring = () => {
    const dispatch = useAppDispatch();

    const updateMonitoring = createSelector(
        (state: any) => state.MonitoringReducer,
        (monitoringData: MonitorState) => ({ lastChartTime: monitoringData.lastChartTime})
    )
    const monitorState = useAppSelector(updateMonitoring);

    useEffect(() => {
        const req = {
            msn: "default",
            period: "now",
        };
        dispatch(getMonitoringSystemData(req));
    }, [monitorState]);

    useEffect( ()=> {
        return () => {
            dispatch(resetData());
        }
    }, [dispatch]);

    const selectCpuData = createSelector(
        (state: any) => state.MonitoringSystemReducer,
        (monitoringData: MonitorSystemState) => ({ names: ["cpu"], datas: monitoringData.cpuUsages })
    )
    const selectMemoryData = createSelector(
        (state: any) => state.MonitoringSystemReducer,
        (monitoringData: MonitorSystemState) => ({ names: ["memory"], datas: monitoringData.memoryUsages })
    )
    const selectDiskData = createSelector(
        (state: any) => state.MonitoringSystemReducer,
        (monitoringData: MonitorSystemState) => ({ names: ["disk"], datas: monitoringData.diskUsages })
    )

    return (
        <React.Fragment>
            <div className="m-subpage-content">
                    <Card className="mb-1 pb-0">
                        <CardHeader>
                            <h4 className="card-title mb-0 fw-bolder"><i className="ri-stop-fill align-middle fs-18 text-primary me-2"></i>Message Broker Resource Usage</h4>
                        </CardHeader>
                        <CardBody className="pt-0 pb-0">
                            <Row>
                                <Col lg={6}>
                                    <Card className="mb-1">
                                        <CardHeader >
                                            <h5 className="fw-bold text-muted m-2">NODE 정보</h5>
                                        </CardHeader>
                                        <CardBody className="">
                                            <Row>
                                                <Col lg={3} sm={6}>
                                                    <Card>
                                                        {/* <CardHeader className="align-items-center text-center">
                                                            <h6 className="fw-bold text-muted m-0">CPU 사용률</h6>
                                                        </CardHeader> */}
                                                        <CardBody>
                                                            <h6 className="fw-bold text-muted m-1 text-center">CPU 사용률</h6>
                                                            <RTGaugeChart monitoringDataCallback={() => useAppSelector(selectCpuData)}/>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                                <Col lg={3} sm={6}>
                                                    <Card>
                                                        <CardBody>
                                                            <h6 className="fw-bold text-muted m-1 text-center">Mem 사용률</h6>
                                                            <RTGaugeChart monitoringDataCallback={() => useAppSelector(selectMemoryData)}/>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                                <Col lg={3} sm={6}>
                                                    <Card>
                                                        <CardBody>
                                                            <h6 className="fw-bold text-muted m-1 text-center">DISK 사용률%</h6>
                                                            <RTGaugeChart monitoringDataCallback={() => useAppSelector(selectDiskData)}/>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                                <Col lg={3} sm={6} className="m-0">
                                                    <DockerInfo />
                                                </Col>
                                            </Row>

                                        </CardBody>
                                    </Card>

                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>
                            <h4 className="card-title mb-0 fw-bolder"><i className="ri-stop-fill align-middle fs-18 text-primary me-2"></i>Message Broker Resource Usages (CPU/Memory/Disk IO/Netowork IO)</h4>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col lg={6}>
                                    <CpuUsage />
                                </Col>
                                <Col lg={6}>
                                    <MemoryUsage />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6}>
                                    <DiskUsage />
                                </Col>
                                <Col lg={6}>
                                    <NetworkUsage />
                                </Col>
                            </Row>

                        </CardBody>
                    </Card>
            </div>
        </React.Fragment>
    );
}

export default Monitoring;