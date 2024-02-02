"use client"

import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import RTLineChart from "../../common/chart/line/RTLineChart";
import getLineChartOpts from "../../common/chart/line/LineChartOpts";
import { dataSourceType, getDataSourceCount } from "../../common/data/DataSource";

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

  const title = "Pending Messages "
  return (
    <React.Fragment>
      <Card>
        <CardHeader>
            <h3 className="card-title mb-0 fw-bold"><i className="ri-stop-fill align-middle fs-18 text-primary me-2"></i>{title}
              <span style={{textDecoration: (yAxisType === "count")? "underline" : ""}} onClick={() => handleYAxisType("count")}>[건수|</span>
              <span style={{textDecoration: (yAxisType === "bytes")? "underline" : ""}} onClick={() => handleYAxisType("bytes")}>Bytes]</span>
            </h3>
        </CardHeader>
        <CardBody>
          <RTLineChart dataSourceType={dataSourceType.PENDING}  chartOptions={getLineChartOpts({count:getDataSourceCount(dataSourceType.PENDING), widthVal: chartProps.widthVal, heightVal: chartProps.heightVal})}/>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default PendingQueue;