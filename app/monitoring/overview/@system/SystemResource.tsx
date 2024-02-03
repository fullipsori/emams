"use client"

import { useAppSelector } from "@/redux/hooks";
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
        console.log("called ")
        setCoreCount(resourceSelector.coreCount);
        setMemorySize(resourceSelector.memorySize);
    }, [resourceSelector.coreCount, resourceSelector.memorySize]);

    const unitCore = " COREs";
    const unitMem = " GB";
    return(
        <React.Fragment>
            <Row>
                <Card className="card-animate">
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="fw-medium text-muted mb-1">CPU 크기</p>
                                <h4 className="mt-0 ff-secondary fw-semibold fs-4">
                                    <span className="text-success">{coreCount}</span>
                                    {unitCore}
                                </h4>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Row>
            <Row>
                <Card className="card-animate">
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            <div className="">
                                <p className="fw-medium text-muted mb-1">MEMORY</p>
                                <h4 className="mt-0 ff-secondary fw-bold fs-4">
                                    <span className="text-success">{memorySize}</span>
                                    {unitMem}
                                </h4>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Row>
        </React.Fragment>
    );
}

export default SystemResource;