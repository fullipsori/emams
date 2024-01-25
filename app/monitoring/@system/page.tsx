"use client"

import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import RTLineChart from "../common/chart/line/RTLineChart";
import "../monitoring.css";
import RTGaugeChart from "../common/chart/gauge/RTGaugeChart";

const Monitoring = () => {
    return (
        <React.Fragment>
            <div className="m-page-content">
                <Container fluid>
                    <Row>
                        <Col md={3}>
                            <RTGaugeChart gaugeValue={60} />
                        </Col>
                        <Col md={3}>
                            <RTGaugeChart gaugeValue={75} />
                        </Col>
                        
                        <Col md={3}>
                            <RTGaugeChart gaugeValue={90} />
                        </Col>
                        <Col md={3}>
                            box

                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Chart-1</h4>
                                </CardHeader>
                                <CardBody>
                                    <RTLineChart queueIndex={0}/>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Chart-2</h4>
                                </CardHeader>
                                <CardBody>
                                    <RTLineChart queueIndex={1} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Chart-3</h4>
                                </CardHeader>
                                <CardBody>
                                    <RTLineChart queueIndex={2}/>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Chart-4</h4>
                                </CardHeader>
                                <CardBody>
                                    <RTLineChart queueIndex={3}/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default Monitoring;