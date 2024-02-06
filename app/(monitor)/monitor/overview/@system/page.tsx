"use client"

import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
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
            <div className="content__boxed">
                <Row className="pb-1">
                    <Col lg={12}>
                        <Card >
                            <CardHeader>
                                <h6 className="mb-0 fw-bolder"><i className="psi-retro align-middle fs-5 me-2 "></i>Message Broker Resource Usage</h6>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col lg={8}>
                                        <Card>
                                            <CardHeader>
                                                <h6 className="fw-bold m-2 fs-6">NODE 정보</h6>
                                            </CardHeader>
                                            <CardBody className="">
                                                <Row>
                                                    <Col lg={3} sm={6}>
                                                        <Card>
                                                            <CardBody>
                                                                <h6 className="fw-bold text-muted m-1 text-center">CPU 사용률</h6>
                                                                <RTGaugeChart dataSourceType={dataSourceType.CPU_USAGE} />
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                    <Col lg={3} sm={6}>
                                                        <Card>
                                                            <CardBody>
                                                                <h6 className="fw-bold text-muted m-1 text-center">MEM 사용률</h6>
                                                                <RTGaugeChart dataSourceType={dataSourceType.MEMORY_USAGE} />
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                    <Col lg={3} sm={6}>
                                                        <Card>
                                                            <CardBody>
                                                                <h6 className="fw-bold text-muted m-1 text-center">DISK 사용률</h6>
                                                                <RTGaugeChart dataSourceType={dataSourceType.DISK_STATUS} />
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
                    </Col>

                </Row>
                <Row>
                    <Col lg={12}>
                        <Card >
                            <CardHeader className="d-flex justify-content-between">
                                <h6 className="mb-0 fw-bolder"><i className="psi-retro align-middle fs-5 me-2 "></i>Message Broker Resource Usage (CPU/Memory/Disk IO/Network IO)</h6>
                                <Dropdown className="card-header-dropdown" isOpen={isUserDropdown} toggle={toggleDropdown} direction="start">
                                    <DropdownToggle tag="a" className="text-reset dropdown-btn" role="button">
                                        <span className="text-muted"><i className="psi-receipt align-middle fs-5"></i></span>
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
                    </Col>

                </Row>
            </div>
        </React.Fragment>
    );
}

export default Monitoring;