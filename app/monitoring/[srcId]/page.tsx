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
    const [selectedMonitorType, setSelectedMonitorType] = useState(props.params.srcId);

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
        router.replace(`/monitoring/${selectedValue.value}`);
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
            <Row>
                <Col md={9}>
                    <Row className="m-page-title-box">
                        <Col lg={4} className='d-sm-flex align-items-center'>
                            <h4 className="text-muted mb-0 fw-bold fs-15" onClick={handleBack}>←</h4>
                            <h4 className="text-muted mb-0 fw-bold fs-15">{title}</h4>

                            <Select id="choices-monitor-type" className='mb-0 ml-3'
                                value={selectedMonitorType}
                                onChange={(selected: any) => { handleMonitoryType(selected); }}
                                placeholder="Select monitor type"
                                options={monitorOptions} />
                        </Col>
                    </Row>
                    <Row>
                        <div className="border-2 align-items-center text-center bg-white-100" style={{height: "80vh"}} >
                            {
                                (props.params.srcId === dataSourceType.CONNECTION)? 
                                    <RTBarChart dataSourceType={dataSourceType.CONNECTION} chartOptions={getBarChartOpts({count:getDataSourceCount(dataSourceType.CONNECTION), isStack:true, names:["producer","consumer"], legendPos: "right"})}/>
                                    :
                                    <RTLineChart dataSourceType={selectedMonitorType} chartOptions={getLineChartOpts({count:getDataSourceCount(selectedMonitorType), legendPos: "right"}) }/>
                            }
                        </div>
                    </Row>
                </Col>
                <Col md={3}>
                    <Row className="bg-red-100" style={{height: "80vh"}}>
                        Status
                    </Row>
                    <div className="d-flex justify-content-evenly mt-4">
                        <Button onClick={handleBack} className="primary text-bg-secondary">모니터링 화면</Button>
                        <Button onClick={handleFileSave} className="primary text-bg-secondary">파일로 저장</Button>
                    </div>
                </Col>
            </Row>

        </React.Fragment>
    );
}

export default Detail;