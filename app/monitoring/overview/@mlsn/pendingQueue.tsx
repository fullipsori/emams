"use client"

import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import RTLineChart from "../../common/chart/line/RTLineChart";
import getLineChartOpts from "../../common/chart/line/LineChartOpts";
import { dataSourceType, getDataSourceCount } from "../../common/data/DataSource";
import ChartHeader from "./ChartHeader";

interface ChartProps {
    countValue: number;
    widthVal?: string;
    heightVal?: string;
}

const PendingQueue = (chartProps: ChartProps) => {

  const [yAxisType, setYAxisType] = useState("count");
  const handleYAxisType = (type: string) => {
    if(yAxisType !== type) {
      setYAxisType(type);
    }
  };

  return (
    <React.Fragment>
      <Card className="mb-1 pb-0">
        <CardHeader className="py-1">
          <ChartHeader title="Pending Messages " dataSourceType={dataSourceType.PENDING} handleYAxis={handleYAxisType}/>
        </CardHeader>
        <CardBody className="p-0">
          <RTLineChart dataSourceType={dataSourceType.PENDING}  chartOptions={getLineChartOpts({count:getDataSourceCount(dataSourceType.PENDING), widthVal: chartProps.widthVal, heightVal: chartProps.heightVal})}/>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default PendingQueue;