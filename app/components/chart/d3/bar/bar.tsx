"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface BarChartProps {
  data: { Country: string; Value: number }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const margin = { top: 10, right: 30, bottom: 90, left: 40 },
      width = 400 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    // svg 삭제
    d3.select(chartRef.current).selectAll("*").remove();

    // svg 생성
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand<string>()
      .range([0, width])
      .domain(data.map((d) => d.Country))
      .padding(0.2);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(0)")
      .style("text-anchor", "end");

    const y = d3.scaleLinear<number>().domain([0, 200]).range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll<SVGRectElement, { Country: string; Value: number }>("mybar")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.Country) ?? 0)
      .attr("width", x.bandwidth())
      .attr("fill", "#b3e59b")
      .attr("height", (d) => height - y(0))
      .attr("y", (d) => y(0))
      .transition()
      .duration(800)
      .attr("y", (d) => y(d.Value))
      .attr("height", (d) => height - y(d.Value))
      .delay((d, i) => i * 100);
  }, [data]);

  return <div ref={chartRef as React.RefObject<HTMLDivElement>} />;
};

export default BarChart;
