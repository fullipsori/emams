"use client";

import React, { useEffect } from "react";
import * as d3 from "d3";

interface AreaChartJobSalaryLineProps {
  xScale: d3.ScaleLinear<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
  jobSalary: {
    percentile: number;
    salary: number;
  };
  medianAdvertisedSalary: {
    percentile: number;
    salary: number;
  };
  height: number;
  width: number;
  margin: number;
}

export const AreaChartJobSalaryLine = (props: AreaChartJobSalaryLineProps) => {
  const {
    xScale,
    yScale,
    jobSalary,
    height,
    medianAdvertisedSalary,
    width,
    margin,
  } = props;

  useEffect(() => {
    d3.select(".jobSalaryLine")
      .append("line")
      .attr("x1", xScale(jobSalary.percentile))
      .attr("y1", 0)
      .attr("x2", xScale(jobSalary.percentile))
      .attr("y2", height - margin)
      .attr("stroke-width", 2)
      .attr("stroke", "#7E67D8");

    d3.select(".jobSalaryLine")
      .append("g")
      .selectAll("val")
      .data([jobSalary])
      .enter()
      .append("text")
      .html((d) => d3.format("$,")(d.salary))
      .style("fill", "#21006e")
      .attr("font-size", 18)
      .attr("font-weight", 400)
      .attr("font-family", "Roboto")
      .attr("y", height - margin * 4.75)
      .attr("x", (d) => xScale(d.percentile) - width / 8);

    // d3.select(".jobSalaryLine")
    //   .append("line")
    //   .attr("x1", xScale(medianAdvertisedSalary.percentile))
    //   .attr("y1", yScale(medianAdvertisedSalary.salary))
    //   .attr("x2", xScale(medianAdvertisedSalary.percentile))
    //   .attr("y2", height - margin)
    //   .style("stroke-dasharray", "5, 5")
    //   .attr("stroke-width", 1)
    //   .attr("stroke", "#515151");
  }, [jobSalary, medianAdvertisedSalary, height, xScale, yScale]);

  return <g className="jobSalaryLine"></g>;
};
