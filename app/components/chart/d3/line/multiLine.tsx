"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DataPoint {
  name: string;
  year: number;
  n: number;
}

interface LineChartProps {
  data: DataPoint[];
}

const MultiLineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !chartRef.current) return;

    const margin = { top: 10, right: 30, bottom: 30, left: 60 };
    const width = 400 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    data.forEach((d) => {
      d.year = +d.year;
      d.n = +d.n;
    });

    const sumstat = d3.group(data, (d) => d.name);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.year) as [number, number])
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(5));

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.n) || 0])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    // color palette
    const color = d3
      .scaleOrdinal<string>()
      // .domain(allGroup)
      .range([
        "#e41a1c",
        "#377eb8",
        "#4daf4a",
        "#984ea3",
        "#ff7f00",
        "#ffff33",
        "#a65628",
        "#f781bf",
        "#999999",
      ]);

    // line
    svg
      .selectAll(".line")
      .data(sumstat)
      .join("path")
      .attr("fill", "none")
      .attr("stroke", (d) => color(d[0]))
      .attr("stroke-width", 1.5)
      .attr("d", (d) =>
        d3
          .line<DataPoint>()
          .x((d) => x(d.year) || 0)
          .y((d) => y(d.n) || 0)(d[1])
      );
  }, [data]);

  return (
    <div id="my_dataviz">
      <svg
        ref={chartRef}
        width={400}
        height={300}
        // style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default MultiLineChart;
