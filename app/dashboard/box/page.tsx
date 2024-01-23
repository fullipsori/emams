"use client";

import "../../../public/css/style.css";
import BoxComponent from "@/app/components/box/boxComponent";
import StackedBar from "@/app/components/chart/chartJs/bar/stackedBar";
import Line from "@/app/components/chart/chartJs/line/line";
import MultiLine from "@/app/components/chart/chartJs/line/multiLine";
import StatusLine from "@/app/components/chart/chartJs/line/statusLine";
import Tabulator1 from "@/app/components/grid/tabulator/tabulator1";
import {
  doughnutChartData,
  labels,
  lineChartData,
  multiLineChartData,
} from "@/data/chartData";
import { columns, data } from "@/data/gridData";
import { useState } from "react";

const Box = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-purple-100">
      <div className="grid-container">
        <BoxComponent
          children={<StatusLine widthVal={400} heightVal={300} />}
        />
        <BoxComponent
          children={
            <Line
              data={lineChartData}
              labels={labels}
              widthVal={400}
              heightVal={300}
            />
          }
        />
        <BoxComponent
          children={
            <MultiLine
              data={multiLineChartData}
              labels={labels}
              widthVal={400}
              heightVal={300}
            />
          }
        />
        <BoxComponent
          children={
            <StackedBar
              maleData={lineChartData}
              femaleData={doughnutChartData}
              labels={labels}
              widthVal={400}
              heightVal={300}
            />
          }
        />
        <BoxComponent children={<Tabulator1 columns={columns} data={data} />} />
      </div>
    </main>
  );
};

export default Box;
