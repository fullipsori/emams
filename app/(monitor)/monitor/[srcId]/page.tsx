"use client"

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Select from "react-select";
import { Container, Row, Col, Button, CardBody, Card } from "reactstrap";
import RTLineChart from "../common/chart/line/RTLineChart";
import getLineChartOpts from "../common/chart/line/LineChartOpts";
import { dataSourceType, getDataSourceCount } from "../common/data/DataSource";
import RTBarChart from "../common/chart/bar/RTBarChart";
import getBarChartOpts from "../common/chart/bar/BarChartOpts";

const Detail = (props: any) => {
    const router = useRouter();

    const monitorOptions= [
        { value: dataSourceType.PENDING, label: 'Pending Queues' },
        { value: dataSourceType.THROUGHPUT, label: 'Throughput' },
        { value: dataSourceType.CONNECTION, label: 'Connection' },
        { value: dataSourceType.CPU_USAGE, label: 'CPU Usage' },
        { value: dataSourceType.DISK_USAGE, label: 'DISK Usage' },
        { value: dataSourceType.MEMORY_USAGE, label: 'Memory Usage' },
        { value: dataSourceType.NETWORK_USAGE, label: 'Network Usage' },
    ];

    const handleMonitoryType = (selectedValue: any) => {
        router.replace(`/monitor/${selectedValue.value}`);
    }

    const handleBack = () => {
        router.back();
    }
    const handleFileSave = () => {
        console.log("save to file");
    }

    const title = "  모니터링 지표 ";
    return(
        <React.Fragment>
            <Row className="m-1">
                <Col lg={4} className='d-flex align-items-center gap-2'>
                    <h4 className="mb-0 fw-bold fs-6" onClick={handleBack}><i className="psi-arrow-back"></i></h4>
                    <h4 className="mb-0 fw-bold fs-6">{title}</h4>
                    <Select id="choices-monitor-type" className='mb-0 w-50'
                        value={monitorOptions.find((item) => item.value === props.params.srcId) ?? monitorOptions[0]}
                        onChange={(selected: any) => { handleMonitoryType(selected); }}
                        placeholder="Select monitor type"
                        options={monitorOptions} />
                </Col>
            </Row>
            <Row className="m-1">
                <Col md={12}>
                <Card>
                    <CardBody>
                        <div className="align-items-center text-center bg-white-100" style={{width: "90%"}} >
                            {
                                (props.params.srcId === dataSourceType.CONNECTION)? 
                                    <RTBarChart dataSourceType={dataSourceType.CONNECTION} chartOptions={getBarChartOpts({count:getDataSourceCount(props.params.srcId), isStack:true, names:["producer","consumer"], legendPos: "right"})}/>
                                    :
                                    <RTLineChart dataSourceType={props.params.srcId} chartOptions={getLineChartOpts({count:getDataSourceCount(props.params.srcId), legendPos: "right"}) }/>
                            }
                        </div>

                    </CardBody>
                </Card>
                </Col>
            </Row>
            <div className="d-flex justify-content-end m-1 ">
                <Button onClick={handleBack} className="btn-primary text-bg-secondary me-2" >모니터링 화면</Button>
                <Button onClick={handleFileSave} className="btn-primary text-bg-secondary me-2">파일로 저장</Button>
            </div>

        </React.Fragment>
    );
}

export default Detail;