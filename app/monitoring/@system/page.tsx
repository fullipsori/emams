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
                <Container fluid>
                    <Card className="mb-1 pb-0">
                        <CardHeader>
                            <h4 className="card-title mb-0 fw-bolder"><i className="ri-stop-fill align-middle fs-18 text-primary me-2"></i>Message Broker Resource Usage</h4>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col lg={8}>
                                    <Card outline={false} className="mb-0">
                                        <CardHeader>
                                            <h5 className="fw-bold text-muted mb-1">NODE 정보</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col lg={3} sm={6}>
                                                    <Card>
                                                        <CardHeader className="align-items-center text-center">
                                                            <h6 className="fw-bold text-muted mb-1">CPU 사용률</h6>
                                                        </CardHeader>
                                                        <CardBody>
                                                            <RTGaugeChart monitoringDataCallback={() => useAppSelector(selectCpuData)} />
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                                <Col lg={3} sm={6}>
                                                    <Card>
                                                        <CardHeader className="align-items-center text-center">
                                                            <h6 className="fw-bold text-muted mb-1">Memory 사용률</h6>
                                                        </CardHeader>
                                                        <CardBody>
                                                            <RTGaugeChart monitoringDataCallback={() => useAppSelector(selectMemoryData)} />
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                                <Col lg={3} sm={6}>
                                                    <Card>
                                                        <CardHeader className="align-items-center text-center">
                                                            <h6 className="fw-bold text-muted mb-1">DISK 사용률</h6>
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
                </Container>
            </div>
        </React.Fragment>
    );
}

export default Monitoring;