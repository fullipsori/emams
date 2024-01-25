"use client"

import React from "react";
import { Row, Col, Container, Card, CardHeader, CardBody } from "reactstrap";
import "../monitoring.css";
import RTLineChart from "../common/chart/line/RTLineChart";
import RTBarChart from "../common/chart/bar/RTBarChart";
import {
    labels,
    lineChartData,
    doughnutChartData,
} from "@/data/chartData";

const Monitoring = () => {
    return (
        <React.Fragment>
            <div id="m-layout-wrapper">
                <div className="container-fluid text-center">
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Queue-1</h4>
                                </CardHeader>
                                <CardBody>
                                    <RTLineChart queueIndex={0}/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Queue-2</h4>
                                </CardHeader>
                                <CardBody>
                                    <RTLineChart queueIndex={1}/>
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
                                    <RTBarChart maleData={lineChartData} femaleData={doughnutChartData} labels={labels}/>
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