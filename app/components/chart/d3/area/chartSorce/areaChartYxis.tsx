"use client";

import React, { useEffect } from "react";
import * as d3 from "d3";

interface AreaChartYAxisProps {
  height: number;
  margin: number;
  yScale: d3.ScaleLinear<number, number, never>;
  tickValues?: number[];
}

export const AreaChartYAxis = (props: AreaChartYAxisProps) => {
  const { height, margin, yScale } = props;

  useEffect(() => {
    // create axis
    const yAxis = d3
      .axisLeft(yScale)
      .tickSize(0)
      .ticks(5)
      .tickFormat((x, i) =>
        i === 0 ? "$0" : "$" + (+x / 1000).toString() + "k"
      );

    // appending y axis and removing axis line
    d3.select(".y-axis").append("g").call(yAxis).select(".domain").remove();

    // customize y axis text
    d3.selectAll(".y-axis text")
      .attr("transform", "translate(-7,0)")
      .style("text-anchor", "end")
      .style("font-size", 24)
      .style("fill", "#515151");

    d3.select(".y-axis")
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(yAxis.tickSize(1));
  }, [yScale]);

  return <g className="y-axis"></g>;
};
