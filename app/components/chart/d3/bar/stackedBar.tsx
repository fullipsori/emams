"use client";
import React, { useEffect } from "react";
import * as d3 from "d3";

const StackedBarChart: React.FC = () => {
  useEffect(() => {
    d3.select("#stacked_bar").select("svg").remove();

    const margin = { top: 100, right: 20, bottom: 50, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Sample Data
    const sampleData = [
      { year: 2010, male: 40, female: 30 },
      { year: 2011, male: 23, female: 40 },
      { year: 2012, male: 14, female: 26 },
      { year: 2013, male: 42, female: 30 },
      { year: 2014, male: 20, female: 40 },
      { year: 2015, male: 33, female: 16 },
    ];

    const svg = d3
      .select("#stacked_bar")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const typeKeys = ["male", "female"];

    // stack data
    const stack = d3
      .stack()
      .keys(typeKeys)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetDiverging); // 변경된 부분

    const stackedData = stack(sampleData);

    // X scale and Axis
    const xScale = d3
      .scaleBand()
      .domain(sampleData.map((d: any) => d.year))
      .range([0, width])
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(0).tickPadding(8));

    const maxDataValue = d3.max(stackedData, (d: any) =>
      d3.max(d, (e: any) => Math.abs(+e[1]))
    ) as number;

    console.log("최댓값:::", maxDataValue);

    const yScale = d3
      .scaleLinear()
      .domain([0, maxDataValue || 0] as number[])
      .range([height, 0]);

    svg
      .append("g")
      .call(d3.axisLeft(yScale).ticks(9).tickSize(0).tickPadding(6))
      .call(function (d: any) {
        return d.select(".domain").remove();
      });

    // 격자 무늬
    svg
      .append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-width)
          .tickFormat(null as any)
      );

    // color palette
    const color = d3
      .scaleOrdinal()
      .domain(typeKeys)
      .range(["rgba(104, 76, 67, 0.5)", "rgba(247, 197, 132, 0.5)"]);

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("id", "chart")
      .attr("class", "tooltip");

    const mouseover = function (this: any, d: any) {
      tooltip.style("opacity", 0.8);
      d3.select(this).style("opacity", 0.5);
    };
    const mousemove = function (event: any, d: any) {
      const formatter = d3.format(",");
      tooltip
        .html(formatter(d[1] - d[0]))
        .style("top", event.pageY - 10 + "px")
        .style("left", event.pageX + 10 + "px");
    };
    const mouseleave = function (this: any, d: any) {
      tooltip.style("opacity", 0);
      d3.select(this).style("opacity", 1);
    };

    // bar
    svg
      .append("g")
      .selectAll("g")
      .data(stackedData)
      .enter()
      .append("g")
      .attr("fill", (d: any) => color(d.key) as string)
      .selectAll("rect")
      .data((d: any) => d)
      .join("rect")
      .attr("x", (d: any) => xScale(d.data.year) as number)
      .attr("y", (d: any) => yScale(Math.max(d[0], d[1])) as number) // 변경된 부분
      .attr("width", xScale.bandwidth() as number)
      .attr(
        "height",
        (d: any) => Math.abs(yScale(d[0]) - yScale(d[1])) as number
      )
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
  }, []);

  return <div id="stacked_bar" />;
};

export default StackedBarChart;
