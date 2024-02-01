"use client"

import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Select from "react-select";
import { Container, Row, Col, Button } from "reactstrap";
import RTLineChart from "../common/chart/line/RTLineChart";
import getLineChartOpts from "../common/chart/line/LineChartOpts";

const Detail = (props: any) => {

    const handleBack = () => {
        console.log("Back");
    }
    const handleFileSave = () => {
        console.log("save to file");
    }

    const monitorOptions= [
        { value: 'queue', label: 'Pending Queues' },
        { value: 'transaction', label: 'Transaction' },
        { value: 'connection', label: 'Connection' },
    ];
    const [selectedMonitorType, setSelectedMonitorType] = useState<any>(null);
    function handleMonitoryType(selectedValue: any) {
        console.log("value:" + selectedValue);
        setSelectedMonitorType(selectedValue);
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
                             <RTLineChart dataSourceType={props.params.srcId}  chartOptions={getLineChartOpts({count:3, widthVal:"100%", heightVal:"100%"}) }/>
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