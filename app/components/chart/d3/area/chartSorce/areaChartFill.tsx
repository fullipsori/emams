"use client";

import React, { useEffect } from "react";
import * as d3 from "d3";

interface AreaChartFillProps {
  xScale: d3.ScaleLinear<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
  data: {
    percentile: number;
    salary: number;
  }[];
  height: number;
  margin: number;
  circleRadius?: number;
}

export const AreaChartFill = (props: AreaChartFillProps) => {
  const { xScale, yScale, data, height, margin, circleRadius = 3 } = props;
  useEffect(() => {
    const area = d3
      .area()
      .curve(d3.curveLinear)
      .x((d) => xScale((d as unknown as { percentile: number }).percentile))
      .y0(yScale(0))
      .y1((d) => yScale((d as unknown as { salary: number }).salary));

    const line = d3
      .line()
      .x((d) => xScale((d as unknown as { percentile: number }).percentile))
      .y((d) => yScale((d as unknown as { salary: number }).salary));

    const add = d3
      .select(".lines")
      .selectAll(".line-group")
      .data([data])
      .enter()
      .append("g")
      .style("fill", "url(#areachart_gradient)")
      .attr("class", "line-group");

    const tooltip = d3.select(".tooltip-area").style("opacity", 0);

    const mouseover = (event: any, d: any) => {
      tooltip.style("opacity", 1);
    };

    const mouseleave = (event: any, d: any) => {
      tooltip.style("opacity", 0);
    };

    const mousemove = (event: any, d: any) => {
      const text = d3.select(".tooltip-area__text");
      text.text(d3.format("$,")(d.salary));
      const [x, y] = d3.pointer(event);

      tooltip.attr("transform", `translate(${x - 10}, ${y - 10})`);
    };

    add
      .append("svg:path")
      .attr("class", "line")
      .attr("d", (d) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        line(d)
      )
      .style("stroke", "#54D2C7");

    add.append("path").attr(
      "d",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (d) => area(d)
    );

    /* Add circles in the line */
    d3.select(".lines")
      .selectAll("circle-group")
      .data([data])
      .enter()
      .append("g")
      .style("fill", "white")
      .selectAll("circle")
      .data((d, i) => d)
      .enter()
      .append("g")
      .append("circle")
      .attr("class", (d, i) => `circle${i}`)
      .attr("cx", (d) => xScale(d.percentile))
      .attr("cy", (d) => yScale(d.salary))
      .attr("r", circleRadius)
      .style("stroke", "#210071")
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .on("mouseover", mouseover);
  }, [circleRadius, margin, data, height, xScale, yScale]);

  return (
    <g>
      <g className="lines">
        <g className="tooltip-area">
          <text className="tooltip-area__text">aas</text>
        </g>
      </g>
      {/* This creates the gradient background */}
      <defs>
        <linearGradient
          id={"areachart_gradient"}
          gradientTransform="rotate(90)"
        >
          <stop offset="5%" stop-color="#6EEDB8" />
          <stop offset="95%" stop-color="#54D2C7" />
        </linearGradient>
      </defs>
    </g>
  );
};
