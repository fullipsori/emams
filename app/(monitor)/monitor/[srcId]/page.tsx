"use client"

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Select from "react-select";
import { Container, Row, Col, Button } from "reactstrap";
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
                    <Row className="m-page-sub-title-box">
                        <Col lg={4} className='d-sm-flex align-items-center'>
                            <h4 className="text-muted mb-0 fw-bold fs-15" onClick={handleBack}><i className="psi-arrow-back"></i></h4>
                            <h4 className="text-muted mb-0 fw-bold fs-15 ml-2">{title}</h4>
                            <Select id="choices-monitor-type" className='mb-0 ml-3 ml_20 w-50'
                                value={monitorOptions.find((item)=>item.value===props.params.srcId) ?? monitorOptions[0]}
                                onChange={(selected: any) => { handleMonitoryType(selected); }}
                                placeholder="Select monitor type"
                                options={monitorOptions} />
                        </Col>
                    </Row>
            <Row>
                <Col md={12}>
                        <div className="align-items-center text-center bg-white-100" style={{width:"90%"}} >
                            {
                                (props.params.srcId === dataSourceType.CONNECTION)? 
                                    <RTBarChart dataSourceType={dataSourceType.CONNECTION} chartOptions={getBarChartOpts({count:getDataSourceCount(props.params.srcId), isStack:true, names:["producer","consumer"], legendPos: "right"})}/>
                                    :
                                    <RTLineChart dataSourceType={props.params.srcId} chartOptions={getLineChartOpts({count:getDataSourceCount(props.params.srcId), legendPos: "right"}) }/>
                            }
                        </div>
                </Col>
            </Row>
            <div className="d-flex d-grid justify-content-end mb-1 " style={{position: "relative", top: "-50px"}}>
                <Button onClick={handleBack} className="primary text-bg-secondary me-2" >모니터링 화면</Button>
                <Button onClick={handleFileSave} className="primary text-bg-secondary me-2">파일로 저장</Button>
            </div>

        </React.Fragment>
    );
}

export default Detail;