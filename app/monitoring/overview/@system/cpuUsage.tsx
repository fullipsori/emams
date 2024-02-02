"use client"

import React, { useEffect, useRef, useState } from "react";
import RTLineChart from "../../common/chart/line/RTLineChart";
import { Card, CardBody, CardHeader } from "reactstrap";
import ChartHeader from "./chartHeader";
import getChartOpts from "../../common/chart/line/LineChartOpts";

interface ChartProps {
    widthVal?: string;
    heightVal?: string;
}

const CpuUsage = (chartProps: ChartProps) => {


  return (
    <React.Fragment>
        <Card>
          <CardHeader className="py-1">
            <ChartHeader title="CPU usage" dataSourceType="cpuUsage"/>
          </CardHeader>
          <CardBody className="p-0">
            <RTLineChart dataSourceType="cpuUsage" chartOptions={getChartOpts({ count: 1, widthVal:chartProps.widthVal, heightVal:chartProps.heightVal })} />
          </CardBody>
        </Card>
    </React.Fragment>
  );
};

export default CpuUsage;