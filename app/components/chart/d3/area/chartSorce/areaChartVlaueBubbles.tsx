"use client";

import React, { useEffect } from "react";
import * as d3 from "d3";

interface AreaChartValueBubblesProps {
  xScale: d3.ScaleLinear<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
  data: {
    percentile: number;
    salary: number;
  }[];
  height: number;
  width: number;
  margin: number;
}

export const AreaChartValueBubbles = (props: AreaChartValueBubblesProps) => {
  const { xScale, yScale, data, height } = props;

  useEffect(() => {
    var bubbleContainer = d3.select(".value-bubbles");
    bubbleContainer
      .append("g")
      .selectAll("val")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", (d) => (d.salary.toString().length === 6 ? 70 : 65))
      .attr("height", 25)
      .attr("rx", 15)
      .attr("ry", 15)
      .style("fill", "#A6D3F4")
      .style("visibility", "hidden")
      .attr("y", (d) => yScale(d.salary + height * 55))
      .attr("x", (d) => xScale(d.percentile - 3.5));

    bubbleContainer
      .append("g")
      .selectAll("val")
      .data(data)
      .enter()
      .append("text")
      .html((d) => d3.format("$,")(d.salary))
      .style("fill", "#21006e")
      .attr("font-size", 12)
      .attr("font-weight", 600)
      .attr("font-family", "Roboto")
      .attr("y", (d) => yScale(d.salary + height * 28))
      .attr("x", (d) => xScale(d.percentile - 2.5));
  }, [data, height, xScale, yScale]);

  return <g className="value-bubbles"></g>;
};
