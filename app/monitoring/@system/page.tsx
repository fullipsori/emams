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
import { MonitorSystemState } from "@/redux/slices/monitoring-system/reducer";

const Monitoring = () => {
    const dispatch = useAppDispatch();

    const updateMonitoring = createSelector(
        (state: any) => state.MonitoringReducer,
        (monitoringData: MonitorState) => ({ updateCount: monitoringData.updateCount })
    )
    const monitorState = useAppSelector(updateMonitoring);

    useEffect(() => {
        const req = {
            msn: "default",
            period: "now",
        };
        dispatch(getMonitoringSystemData(req));
    }, [monitorState]);

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
            <div className="m-page-content">
                <Container fluid>
                    <Card>
                        <CardHeader>
                            <h4 className="card-title mb-0 fw-bolder">Message Broker Resource Usage</h4>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col lg={3} sm={6}>
                                    <Card>
                                        <CardHeader className="align-items-center text-center d-flex">
                                            <h6 className="fw-bold text-muted mb-1 flex-grow-1">CPU 사용률</h6>
                                        </CardHeader>
                                        <CardBody>
                                            <RTGaugeChart monitoringDataCallback={() => useAppSelector(selectCpuData)} />
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg={3} sm={6}>
                                    <Card>
                                        <CardHeader className="align-items-center text-center d-flex">
                                            <h6 className="fw-bold text-muted mb-1 flex-grow-1">Memory 사용률</h6>
                                        </CardHeader>
                                        <CardBody>
                                            <RTGaugeChart monitoringDataCallback={() => useAppSelector(selectMemoryData)} />
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg={3} sm={6}>
                                    <Card>
                                        <CardHeader className="align-items-center text-center d-flex">
                                            <h6 className="fw-bold text-muted mb-1 flex-grow-1">DISK 사용률</h6>
                                        </CardHeader>
                                        <CardBody>
                                            <RTGaugeChart monitoringDataCallback={() => useAppSelector(selectDiskData)} />
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg={3} sm={6}>
                                    <DockerInfo />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>
                            <h4 className="card-title mb-0 fw-bolder">Message Broker Resource Usages (CPU/Memory/Disk IO/Netowork IO)</h4>
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
                </Container>
            </div>
        </React.Fragment>
    );
}

export default Monitoring;