"use client"

import { useAppSelector } from "@/hook/hook";
import { MonitorSystemState } from "@/redux/slices/monitoring-system/reducer";
import { createSelector } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Row, Col } from 'reactstrap';

const SystemResource = () => {
    const [coreCount, setCoreCount] = useState(0);
    const [memorySize, setMemorySize] = useState(0);

    const selectSystemMonitoringData = createSelector(
        (selectorState: any) => selectorState.MonitoringSystemReducer,
        (monitoringData: MonitorSystemState) => ({ coreCount: monitoringData.coreCount, memorySize: monitoringData.memorySize })
    )
    const resourceSelector = useAppSelector(selectSystemMonitoringData);

    useEffect(() => {
        setCoreCount(resourceSelector.coreCount);
        setMemorySize(resourceSelector.memorySize);
    }, [resourceSelector.coreCount, resourceSelector.memorySize]);

    const unitCore = " COREs";
    const unitMem = " GB";
    return(
        <React.Fragment>
            <Row>
                <Card className="card-animate">
                    <CardBody className="text-center">
                        <h6 className="fw-bold text-muted mb-1">CPU 크기</h6>
                        <h4 className="mt-0 ff-secondary fw-semibold fs-4">
                            <span className="text-success">{coreCount}</span>
                            {unitCore}
                        </h4>
                    </CardBody>
                </Card>
            </Row>
            <Row>
                <Card className="card-animate">
                    <CardBody className="text-center">
                        <p className="fw-bold text-muted mb-1">MEMORY</p>
                        <h4 className="mt-0 ff-secondary fw-bold fs-4">
                            <span className="text-success">{memorySize}</span>
                            {unitMem}
                        </h4>
                    </CardBody>
                </Card>
            </Row>
        </React.Fragment>
    );
}

export default SystemResource;