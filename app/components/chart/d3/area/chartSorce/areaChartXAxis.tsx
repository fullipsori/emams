"use client";

import React, { useEffect } from "react";
import * as d3 from "d3";

interface AreaChartXAxisProps {
  height: number;
  margin: number;
  xScale: d3.ScaleLinear<number, number, never>;
  tickValues?: number[];
}

export const AreaChartXAxis = (props: AreaChartXAxisProps) => {
  const { height, margin, xScale, tickValues = [10, 25, 50, 75, 90] } = props;

  useEffect(() => {
    // create axis
    const xAxis = d3
      .axisBottom(xScale)
      .tickSize(0)
      .ticks(5)
      .tickValues(tickValues)
      .tickFormat((x) => x + "th");

    // appending x axis and removing axis line
    d3.select(".x-axis").append("g").call(xAxis).select(".domain").remove();

    // customize x axis text
    d3.selectAll(".x-axis text")
      .attr("transform", "translate(10,5)")
      .style("text-anchor", "end")
      .style("font-size", 24)
      .style("fill", "#515151");
  }, [tickValues, xScale]);

  return (
    <g className="x-axis" transform={`translate(0, ${height - margin})`}></g>
  );
};
