"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DualGaugeChartProps {
  value1: number[];
  value2: number;
}
const DualGaugeChart: React.FC<DualGaugeChartProps> = ({ value1, value2 }) => {
  const gaugeRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (gaugeRef.current) {
      drawChart(gaugeRef.current, value1, value2);
    }
  }, [value1, value2]);

  const drawChart = (
    svgRef: SVGSVGElement,
    value1: number[],
    value2: number
  ) => {
    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    // 기존 차트 지우기
    d3.select(svgRef).selectAll("*").remove();

    const colorScale11 = d3
      .scaleQuantize<string>()
      .domain([0, 100])
      .range(["red"]);

    const colorScale12 = d3
      .scaleQuantize<string>()
      .domain([0, 100])
      .range(["yellow"]);

    const colorScale13 = d3
      .scaleQuantize<string>()
      .domain([0, 100])
      .range(["green"]);

    const colorScale2 = d3
      .scaleQuantize<string>()
      .domain([0, 100])
      .range(["green", "green", "green", "yellow", "red"]);

    // 첫 번째 Gauge에 사용할 arc
    const arc1 = d3
      .arc<{ endAngle: number }>()
      .innerRadius(radius - 0)
      .outerRadius(radius - 6)
      .startAngle(0);

    // 두 번째 Gauge에 사용할 arc
    const arc2 = d3
      .arc<{ endAngle: number }>()
      .innerRadius(radius - 18)
      .outerRadius(radius - 7)
      .startAngle(0);

    const svg = d3
      .select(svgRef)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2}) rotate(-90)`);

    // 게이지 범위 표시 (첫 번째 Gauge)
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

    // 첫 번째 Gauge (게이지 범위 포함)
    svg
      .append("path")
      .datum({ endAngle: (value1[0] / 100) * Math.PI })
      .style("fill", (d) => colorScale11(value1[0]))
      .attr("d", arc1 as any);
    svg
      .append("path")
      .datum({ endAngle: (value1[1] / 100) * Math.PI })
      .style("fill", (d) => colorScale12(value1[1]))
      .attr("d", arc1 as any);
    svg
      .append("path")
      .datum({ endAngle: (value1[2] / 100) * Math.PI })
      .style("fill", (d) => colorScale13(value1[2]))
      .attr("d", arc1 as any);

    // 두 번째 Gauge (게이지 범위 제외, 겹쳐짐)
    svg
      .append("path")
      .datum({ endAngle: (value2 / 100) * Math.PI })
      .style("fill", (d) => colorScale2(value2))
      .attr("d", arc2 as any)
      // translate (위아래, 왼오)
      .attr("transform", `translate(0, 0) rotate(0)`);
  };

  return (
    <div style={{ position: "relative", margin: "20px" }}>
      <svg ref={gaugeRef}></svg>
    </div>
  );
};

export default DualGaugeChart;
