"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DataItem {
  Country: string;
  Value: number;
}

interface LineChartProps {
  data: DataItem[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
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

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.Country))
      .range([0, width]);

    const line = d3
      .line<DataItem>()
      .x((d) => x(d.Country)!)
      .y((d) => y(d.Value)!);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.Value) || 0])
      .range([height, 0]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", y(0)!)
      .attr("x2", 0)
      .attr("y2", y(d3.max(data, (d) => d.Value) || 0)!)
      .selectAll("stop")
      .data([
        { offset: "0%", color: "blue" },
        { offset: "100%", color: "red" },
      ])
      .enter()
      .append("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.color);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient)")
      .attr("stroke-width", 2)
      .attr("d", line);
  }, [data]);

  return (
    <div id="my_dataviz">
      <svg ref={chartRef} width={460} height={300} />
    </div>
  );
};

export default LineChart;
