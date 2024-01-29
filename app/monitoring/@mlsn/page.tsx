"use client"

import React from "react";
import { Row, Col, Container, Card, CardHeader, CardBody } from "reactstrap";
import "../monitoring.css";
import RTBarChart from "../common/chart/bar/RTBarChart";
import PendingQueue from "./pendingQueue";
import ThroughputQueue from "./throughputQueue";

const Monitoring = () => {
    return (
        <React.Fragment>
            <div id="m-layout-wrapper">
                <div className="container-fluid text-center">
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Pending Status</h4>
                                </CardHeader>
                                <CardBody>
                                    <PendingQueue countValue={3}/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Queue Throughput</h4>
                                </CardHeader>
                                <CardBody>
                                    <ThroughputQueue countValue={3}/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">VPN</h4>
                                </CardHeader>
                                <CardBody>
                                    <RTBarChart />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Monitoring;