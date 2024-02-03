"use client"

import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import "../../assets/monitoring.css";
import RTGaugeChart from "../../common/chart/gauge/RTGaugeChart";
import SystemResource from "./SystemResource";
import CpuUsage from "./cpuUsage";
import MemoryUsage from "./memoryUsage";
import DiskUsage from "./diskUsage";
import NetworkUsage from "./networkUsage";
import { dataSourceType } from "../../common/data/DataSource";

const Monitoring = () => {
    const [isUserDropdown, setUserDropdown] = useState<boolean>(false);
    const toggleDropdown = () => setUserDropdown(!isUserDropdown);

    const onChangeDropItem = (item: string) => {
        console.log("under construction:" + item);
    }

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
                                                        <CardBody>
                                                            <h6 className="fw-bold text-muted m-1 text-center">CPU 사용률</h6>
                                                            <RTGaugeChart dataSourceType={dataSourceType.CPU_USAGE}/>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                                <Col lg={3} sm={6}>
                                                    <Card>
                                                        <CardBody>
                                                            <h6 className="fw-bold text-muted m-1 text-center">MEM 사용률</h6>
                                                            <RTGaugeChart dataSourceType={dataSourceType.MEMORY_USAGE}/>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                                <Col lg={3} sm={6}>
                                                    <Card>
                                                        <CardBody>
                                                            <h6 className="fw-bold text-muted m-1 text-center">DISK 사용률</h6>
                                                            <RTGaugeChart dataSourceType={dataSourceType.DISK_STATUS}/>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                                <Col lg={3} sm={6} className="m-0">
                                                    <SystemResource />
                                                </Col>
                                            </Row>

                                        </CardBody>
                                    </Card>

                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader className="d-flex justify-content-between">
                            <h4 className="card-title mb-0 fw-bolder"><i className="ri-stop-fill align-middle fs-18 text-primary me-2"></i>Message Broker Resource Usages (CPU/Memory/Disk IO/Netowork IO)</h4>
                            <Dropdown className="card-header-dropdown" isOpen={isUserDropdown} toggle={toggleDropdown} direction="start">
                                <DropdownToggle tag="a" className="text-reset dropdown-btn" role="button">
                                    <span className="text-muted fs-16"><i className="ti-menu align-middle"></i></span>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end" >
                                    <DropdownItem onClick={() => { onChangeDropItem("item-a"); }}>item-a</DropdownItem>
                                    <DropdownItem onClick={() => { onChangeDropItem("item-b"); }}>item-b</DropdownItem>
                                    <DropdownItem onClick={() => { onChangeDropItem("item-c"); }}>item-c</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
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