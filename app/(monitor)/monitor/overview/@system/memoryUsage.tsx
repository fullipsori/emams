"use client"

import React, { useEffect, useRef, useState } from "react";
import RTLineChart from "../../common/chart/line/RTLineChart";
import { Card, CardBody, CardHeader } from "reactstrap";
import getLineChartOpts from "../../common/chart/line/LineChartOpts";
import { dataSourceType, getDataSourceCount } from "../../common/data/DataSource";

interface ChartProps {
    widthVal?: string;
    heightVal?: string;
}

const MemoryUsage = (chartProps: ChartProps) => {

  return (
    <React.Fragment>
      <Card>
        <CardBody className="p-0">
            <RTLineChart dataSourceType={dataSourceType.MEMORY_USAGE} chartOptions={getLineChartOpts({ count: getDataSourceCount(dataSourceType.MEMORY_USAGE), chartTitle:"Memory usage", widthVal:chartProps.widthVal, heightVal:chartProps.heightVal })} />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default MemoryUsage;