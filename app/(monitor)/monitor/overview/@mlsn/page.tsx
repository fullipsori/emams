"use client"

import React from "react";
import { Row, Col, Container, Card, CardHeader, CardBody } from "reactstrap";
import PendingQueue from "./pendingQueue";
import ThroughputQueue from "./throughputQueue";
import ConnectionView from "./connectonView";

const Monitoring = () => {
    return (
        <React.Fragment>
            <div className="content__boxed">
                    <Row>
                        <Col xl={12}>
                            <PendingQueue />
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12}>
                            <ThroughputQueue />
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={12}>
                            <ConnectionView/>
                        </Col>
                    </Row>

            </div>
        </React.Fragment>
    );
}

export default Monitoring;