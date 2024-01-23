"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface GaugeChartProps {
  value: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value }) => {
  const gaugeRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (gaugeRef.current) {
      drawChart();
    }
  }, [value]);

  const drawChart = () => {
    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    // 기존 차트 지우기
    d3.select(gaugeRef.current).selectAll("*").remove();

    const colorScale = d3
      .scaleLinear<string>()
      // 차트 기준 및 색상
      .domain([0, 50, 100])
      .range(["green", "yellow", "red"]);

    const arc = d3
      .arc<{ endAngle: number }>()
      .innerRadius(radius - 10)
      .outerRadius(radius)
      .startAngle(0);

    const svg = d3
      .select(gaugeRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2}) rotate(-90)`);

    // 게이지 범위 표시
    svg
      .append("text")
      .attr("x", radius)
      .attr("y", -5)
      .attr("text-anchor", "end")
      .style("font-size", "12px")
      .style("fill", "black")
      .attr("transform", `rotate(-90)`)
      .text("0");

    svg
      .append("text")
      .attr("x", 0)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .attr("transform", `rotate(90)`)
      .style("fill", "black")
      .text("50");

    svg
      .append("text")
      .attr("x", radius)
      .attr("y", 15)
      .attr("text-anchor", "end")
      .style("font-size", "12px")
      .style("fill", "black")
      .attr("transform", `rotate(90)`)
      .text("100");

    svg
      .append("path")
      .datum({ endAngle: Math.PI })
      .style("fill", "#ddd")
      .attr("d", arc as any);

    svg
      .append("path")
      .datum({ endAngle: (value / 100) * Math.PI })
      .style("fill", (d) => colorScale(value))
      .attr("d", arc as any);
  };

  return <svg ref={gaugeRef}></svg>;
};

export default GaugeChart;
