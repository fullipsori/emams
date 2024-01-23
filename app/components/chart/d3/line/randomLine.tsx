"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { select, event as currentEvent } from "d3-selection";
import { brushX, D3BrushEvent } from "d3-brush";
import {
  scaleLinear,
  axisBottom,
  axisLeft,
  line,
  extent,
  max,
  group,
  ScaleLinear,
  ScaleOrdinal,
} from "d3";

interface DataPoint {
  name: string;
  year: number;
  n: number;
}

interface LineChartProps {
  data: DataPoint[];
  widthVal: number;
  heightVal: number;
}

const RandomLineChart: React.FC<LineChartProps> = ({
  data,
  widthVal,
  heightVal,
}) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  const clearChart = () => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();
  };

  useEffect(() => {
    if (!data || data.length === 0 || !chartRef.current) return;

    clearChart();

    const margin = { top: 10, right: 30, bottom: 30, left: 60 };
    const width = widthVal - margin.left - margin.right;
    const height = heightVal - margin.top - margin.bottom;

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

    const x = scaleLinear()
      .domain(extent(data, (d) => d.year) as [number, number])
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(axisBottom(x).ticks(5));

    // Add Y axis
    const y = scaleLinear()
      .domain([0, max(data, (d) => d.n) || 0])
      .range([height, 0]);

    svg.append("g").call(axisLeft(y));

    // color palette
    const color = d3
      .scaleOrdinal<string>()
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
        line<DataPoint>()
          .x((d) => x(d.year) || 0)
          .y((d) => y(d.n) || 0)(d[1])
      );

    // Add brush
    const brush = brushX()
      .extent([
        [0, 0],
        [width, height],
      ])
      .on("end", brushed);

    svg.append("g").call(brush);

    function brushed(brushEvent: D3BrushEvent<number>) {
      if (brushEvent.selection) {
        const [x0, x1] = brushEvent.selection;
        const newX = x.invert(x0);
        const newX1 = x.invert(x1);

        console.log("Selected Range:", newX, newX1);
      }
    }

    // Add zoom
    const zoom: d3.ZoomBehavior<SVGSVGElement, unknown> = d3
      .zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .extent([
        [0, 0],
        [width, height],
      ])
      .on("zoom", zoomed);

    svg.call(zoom);

    function zoomed() {
      const transform = currentEvent.transform;
      svg.selectAll(".line").attr("d", (d) =>
        line<DataPoint>()
          .x((d) => transform.applyX(x(d.year) || 0))
          .y<DataPoint>((d) => transform.applyY(y(d.n) || 0))(d[1])
      );
      svg
        .select<SVGGElement>(".x-axis")
        .call(
          axisBottom<ScaleLinear<number, number>>(x).scale(
            transform.rescaleX(x)
          )
        );
      svg
        .select<SVGGElement>(".y-axis")
        .call(
          axisLeft<ScaleLinear<number, number>>(y).scale(transform.rescaleY(y))
        );
    }
  }, [data, widthVal, heightVal]);

  return (
    <div id="my_dataviz">
      <svg
        ref={chartRef}
        width={widthVal}
        height={heightVal}
        // style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default RandomLineChart;
