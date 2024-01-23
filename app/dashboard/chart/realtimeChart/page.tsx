import dynamic from "next/dynamic";
import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';

import user from  "../../../assets/images/users/avatar-2.jpg";
import RealtimeStatus from "./realtimeStatus";

// import AxisChart from './AreaCharts';
const AxisChart = dynamic(() => import('./AreaCharts'))
const LineChart = dynamic(() => import('./LineChart'))

const RTCharts = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Area Chart - Datetime</h4>
                                </CardHeader>
                                <CardBody>
                                    {/* <LineChart dataColors='["--vz-primary-rgb, 0.2", "--vz-primary", "--vz-success-rgb, 0.2", "--vz-success"]'/> */}
                                    {/* <AxisChart dataColors='["--vz-info"]' /> */}
                                    <RealtimeStatus widthVal={800} heightVal={400} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default RTCharts;