"use client"

import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';

import user from  "../../../assets/images/users/avatar-2.jpg";
import RTLineChart from "../common/chart/RTLineChart";
import { useDispatch, useSelector } from "react-redux";
import { addChartData } from "@/redux/slices/monitoring/reducer";

// import AxisChart from './AreaCharts';
const AxisChart = dynamic(() => import('../common/chart/AreaCharts'))
const LineChart = dynamic(() => import('../common/chart/LineChart'))

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  //useIsomorphicLayoutEffect
  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay])
}

const Monitoring = () => {
    const dispatch: any = useDispatch();
    const [chartData, setChartData] = useState<any>();


    useEffect(() => {
        if(chartData !== undefined) {
            dispatch(addChartData(chartData));
        }
    }, [chartData])

    useEffect(() => {
        console.log("dispatch effect");
        // dispatch(getBalanceChartsData("today"));
    }, [dispatch]);

    const timerFunction = () => {
        setChartData((new Date()).getTime());
    };

    useInterval(() => { timerFunction() }, 1000);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={4}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Chart-1</h4>
                                </CardHeader>
                                <CardBody>
                                    {/* <LineChart dataColors='["--vz-primary-rgb, 0.2", "--vz-primary", "--vz-success-rgb, 0.2", "--vz-success"]'/> */}
                                    {/* <AxisChart dataColors='["--vz-info"]' /> */}
                                    <RTLineChart queueIndex={0}/>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={4}>
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
                        <Col lg={4}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Chart-3</h4>
                                </CardHeader>
                                <CardBody>
                                    <RTLineChart queueIndex={2}/>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={4}>
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