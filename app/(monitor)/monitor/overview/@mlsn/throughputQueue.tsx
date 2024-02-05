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

const ThroughputQueue = (chartProps: ChartProps) => {

  return (
    <React.Fragment>
      <Card className="mb-1 pb-0">
        <CardHeader className="py-1">
          <ChartHeader title="Messages In/Out Rate " dataSourceType={dataSourceType.THROUGHPUT}/>
        </CardHeader>
        <CardBody className="p-0">
          <RTLineChart dataSourceType={dataSourceType.THROUGHPUT} chartOptions={getLineChartOpts({count:getDataSourceCount(dataSourceType.THROUGHPUT), widthVal:chartProps.widthVal, heightVal:chartProps.heightVal})} />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default ThroughputQueue;