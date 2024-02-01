"use client"

import React, { useEffect, useRef, useState } from "react";
import RTLineChart from "../../common/chart/line/RTLineChart";
import { Card, CardBody, CardHeader } from "reactstrap";
import ChartHeader from "./chartHeader";
import getLineChartOpts from "../../common/chart/line/LineChartOpts";

interface ChartProps {
    widthVal?: string;
    heightVal?: string;
}

const MemoryUsage = (chartProps: ChartProps) => {



  return (
    <React.Fragment>
      <Card>
        <CardHeader className="py-1">
          <ChartHeader title="Memory usage" dataSourceType="memoryUsage"/>
        </CardHeader>
        <CardBody className="p-0">
            <RTLineChart dataSourceType="memoryUsage" chartOptions={getLineChartOpts({ count: 1 })} />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default MemoryUsage;