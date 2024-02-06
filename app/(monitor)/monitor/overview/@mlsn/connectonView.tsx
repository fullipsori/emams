"use client"

import React from "react";
import RTBarChart from "../../common/chart/bar/RTBarChart";
import { Card, CardBody, CardHeader, Collapse, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import getBarChartOpts from "../../common/chart/bar/BarChartOpts";
import { dataSourceType, getDataSourceCount } from "../../common/data/DataSource";
import ChartHeader from "./ChartHeader";

interface ChartProps {
    widthVal?: string;
    heightVal?: string;
}

const ConnectionView = (chartProps: ChartProps) => {

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="mb-1">
          <ChartHeader title="Consumers 개수 " dataSourceType={dataSourceType.CONNECTION} />
        </CardHeader>
        <CardBody className="p-0">
          <RTBarChart dataSourceType={dataSourceType.CONNECTION} chartOptions={getBarChartOpts({count:getDataSourceCount(dataSourceType.CONNECTION), isStack:true, widthVal:chartProps.widthVal, heightVal:chartProps.heightVal})}/>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default ConnectionView;