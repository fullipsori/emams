"use client"

import React from "react";
import { Row, Col, Container, Card, CardHeader, CardBody } from "reactstrap";
import "../../monitoring.css";
import PendingQueue from "./pendingQueue";
import ThroughputQueue from "./throughputQueue";
import ConnectionView from "./connectonView";

const Monitoring = () => {
    return (
        <React.Fragment>
            <div id="m-subpage-content">
                <Container fluid >
                    <Row>
                        <Col lg={12}>
                            <PendingQueue countValue={3}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <ThroughputQueue countValue={3}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <ConnectionView/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default Monitoring;