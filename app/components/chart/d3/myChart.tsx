"use client";

import * as d3 from "d3";
import React, { useEffect } from "react";

interface DataItem {
  x: Date;
  y: number;
}

interface LineChartProps {
  data: DataItem[];
}

const MyChart: React.FC<LineChartProps> = ({ data }) => {
  useEffect(() => {
    const octalNumber1 = 0o6;
    const octalNumber2 = 0o1;
    const x = d3.timeDays(
      new Date(2020, octalNumber1, octalNumber2),
      new Date(2020, 10, 30)
    );
    const y = Array.from({ length: x.length }, Math.random).map(
      (n) => Math.floor(n * 10) + 5
    );
    const processedData = x.map((v, i) => ({
      x: v,
      y: y[i],
    }));

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const line = d3
      .line<DataItem>()
      .x((d) => xScale(d.x)!)
      .y((d) => yScale(d.y)!);

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .on("zoom", (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        xScale
          .domain(event.transform.rescaleX(xScale2).domain())
          .range([0, width].map((d) => event.transform.applyX(d)));

        svg.select<SVGPathElement>(".line").attr("d", line(processedData)!);

        svg
          .select<SVGGElement>(".x-axis")
          .call(d3.axisBottom<Date>(xScale).tickSizeOuter(0));
      })
      .scaleExtent([1, 32]);

    const xScale = d3
      .scaleUtc()
      .domain([d3.min(x)!, d3.max(x)!])
      .range([0, width]);

    const xScale2 = d3
      .scaleUtc()
      .domain([d3.min(x)!, d3.max(x)!])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(y)! + 5])
      .range([height, 0]);

    const svg = d3
      .select("#my_chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .call(zoom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.selectAll("*").remove();

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("x", 0)
      .attr("width", width)
      .attr("height", height);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("clip-path", "url(#clip)")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale));

    svg
      .append("path")
      .datum(processedData)
      .attr("class", "line")
      .attr("clip-path", "url(#clip)")
      .attr("d", line);
  }, [data]);

  return <div id="my_chart" />;
};

export default MyChart;
