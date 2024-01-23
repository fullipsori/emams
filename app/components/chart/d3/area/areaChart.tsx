"use client";

import React from "react";
import * as d3 from "d3";
import { AreaChartFill } from "./chartSorce/areaChartFill";
import { AreaChartXAxis } from "./chartSorce/areaChartXAxis";
import { AreaChartYAxis } from "./chartSorce/areaChartYxis";
import { AreaChartJobSalaryLine } from "./chartSorce/areaChartJonSalaryLine";
import { AreaChartValueBubbles } from "./chartSorce/areaChartVlaueBubbles";

interface AreaChartProps {
  margin?: number;
  data: { percentile: number; salary: number }[];
  jobSalary: { percentile: number; salary: number };
  medianAdvertisedSalary: { percentile: number; salary: number };
}

export const AreaChart = (props: AreaChartProps) => {
  const { margin = 50, data, jobSalary, medianAdvertisedSalary } = props;

  const width = 550;
  const height = 0.5 * width;

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.percentile) as [number, number])
    .range([0, width - margin]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.salary * 1.25)] as [number, number])
    .range([height - margin, 0]);

  console.log(xScale);
  console.log(yScale);

  return (
    <div style={{ width: 400, height: 300 }}>
      <svg viewBox={`0, 0, ${width + margin}, ${height + margin}`}>
        <g transform={`translate(${margin}, ${margin})`}>
          <AreaChartFill
            xScale={xScale}
            yScale={yScale}
            data={data}
            height={height}
            margin={margin}
          />
          <AreaChartXAxis height={height} margin={margin} xScale={xScale} />
          <AreaChartYAxis height={height} margin={margin} yScale={yScale} />
          <AreaChartJobSalaryLine
            jobSalary={jobSalary}
            medianAdvertisedSalary={medianAdvertisedSalary}
            height={height}
            width={width}
            margin={margin}
            yScale={yScale}
            xScale={xScale}
          />
          <AreaChartValueBubbles
            height={height}
            width={width}
            margin={margin}
            yScale={yScale}
            xScale={xScale}
            data={data}
          />
        </g>
      </svg>
    </div>
  );
};
