"use client"

import React from "react";
import { Row, Col, Container } from "reactstrap";
import "../monitoring.css";
import Test from "../test/page";

const Monitoring = () => {
    return (
        <React.Fragment>
            <div id="m-layout-wrapper">
                <div className="container-fluid text-center">
                    <Row>
                        <Col md={12}>
                            Test1
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            Test2
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            Test2
                        </Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Monitoring;