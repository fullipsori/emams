"use client"

import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import RTLineChart from "../../common/chart/line/RTLineChart";
import getLineChartOpts from "../../common/chart/line/LineChartOpts";
import { dataSourceType, getDataSourceCount } from "../../common/data/DataSource";
import ChartHeader from "./ChartHeader";

interface ChartProps {
    widthVal?: string;
    heightVal?: string;
}

const PendingQueue = (chartProps: ChartProps) => {
  return (
    <React.Fragment>
      <Card className="mb-1 monitor-content">
        <CardHeader className="monitor-content-header">
          <ChartHeader title="Pending Messages " dataSourceType={dataSourceType.PENDING} />
        </CardHeader>
        <CardBody className="p-0 monitor-content-body">
          <RTLineChart dataSourceType={dataSourceType.PENDING}  chartOptions={getLineChartOpts({count:getDataSourceCount(dataSourceType.PENDING), widthVal: chartProps.widthVal, heightVal: chartProps.heightVal})}/>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default PendingQueue;