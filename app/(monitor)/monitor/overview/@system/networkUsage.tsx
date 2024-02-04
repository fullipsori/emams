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

const NetworkUsage = (chartProps: ChartProps) => {


  return (
    <React.Fragment>
      <Card>
        <CardBody className="p-0">
            <RTLineChart dataSourceType={dataSourceType.NETWORK_USAGE} chartOptions={getLineChartOpts({ count: getDataSourceCount(dataSourceType.NETWORK_USAGE),chartTitle:"Network IO", widthVal:chartProps.widthVal, heightVal:chartProps.heightVal })} />
        </CardBody>
      </Card>        
    </React.Fragment>
  );
};

export default NetworkUsage;