"use client"

import React from "react";
import RTBarChart from "../../common/chart/bar/RTBarChart";
import { Card, CardBody, CardHeader } from "reactstrap";
import getChartOpts from "../../common/chart/bar/BarChartOpts";

interface ChartProps {
    widthVal?: string;
    heightVal?: string;
}

const ConnectionView = (chartProps: ChartProps) => {

  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <h3 className="card-title mb-0 fw-bold"><i className="ri-stop-fill align-middle fs-18 text-primary me-2"></i>Consumers 개수
          </h3>
        </CardHeader>
        <CardBody>
          <RTBarChart dataSourceType="connection" chartOptions={getChartOpts({count:2, isStack:true, names:["producer","consumer"], widthVal:chartProps.widthVal, heightVal:chartProps.heightVal})}/>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default ConnectionView;