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

const DiskUsage = (chartProps: ChartProps) => {

  return (
    <React.Fragment>
      <Card className="moniitor-content">
        <CardBody className="p-0 monitor-content-body">
            <RTLineChart dataSourceType={dataSourceType.DISK_USAGE} chartOptions={getLineChartOpts({ count: getDataSourceCount(dataSourceType.DISK_USAGE), chartTitle:"DISK read/write", widthVal:chartProps.widthVal, heightVal:chartProps.heightVal })} />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default DiskUsage;