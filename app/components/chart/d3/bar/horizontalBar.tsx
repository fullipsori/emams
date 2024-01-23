"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface BarChartProps {
  data: { Country: string; Value: number }[];
}

const HorizontalBarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 40, left: 90 };
    const width = 400 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

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

    // X axis
    const x = d3.scaleLinear().domain([0, 200]).range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    const y = d3
      .scaleBand()
      .range([0, height])
      .domain(data.map((d) => d.Country))
      .padding(0.1);
    svg.append("g").call(d3.axisLeft(y));

    // Bars 차트!
    svg
      .selectAll("horizontalBar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", x(0))
      .attr("y", (d) => y(d.Country) || 0)
      .attr("width", (d) => x(d.Value) || 0)
      .attr("height", y.bandwidth() || 0)
      .attr("fill", "rgb(172, 153, 209)");
  }, [data]);

  return <div ref={chartRef as React.RefObject<HTMLDivElement>} />;
};

export default HorizontalBarChart;
