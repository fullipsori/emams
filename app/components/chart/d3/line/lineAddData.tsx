"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface DataPoint {
  name: string;
  year: number;
  n: number;
}

interface LineChartProps {
  data: DataPoint[];
}

const LineAddDataChart: React.FC<LineChartProps> = ({ data }) => {
  console.log(data);
  const chartRef = useRef<SVGSVGElement | null>(null);
  //   const [datasets, setDatasets] = useState(
  //     data.map((dataset, index) => ({
  //       name: `Group${index + 1}`,
  //       year: 2022,
  //       n: Math.floor(Math.random() * 50),
  //     }))
  //   );

  const [datasets, setDatasets] = useState(data);

  const handleAddLine = () => {
    console.log(datasets);
    // const newDataPoints = Array.from({ length: datasets.length }, () => ({
    //   name: `Group${Math.floor(Math.random() * 10) + 1}`,
    //   year: 2022,
    //   n: Math.floor(Math.random() * 50),
    // }));

    const newDataPoints = Math.floor(Math.random() * 50);
    console.log(newDataPoints);

    setDatasets((prevDatasets: any) => [
      ...prevDatasets,
      {
        name: `Group${prevDatasets.length + 1}`,
        year: 2022,
        n: newDataPoints,
      },
    ]);
  };

  useEffect(() => {
    if (!datasets || datasets.length === 0 || !chartRef.current) return;

    const margin = { top: 10, right: 30, bottom: 30, left: 60 };
    const width = 400 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .select("svg")
      .remove() // 기존의 SVG 요소를 삭제
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    datasets.forEach((d) => {
      d.year = +d.year;
      d.n = +d.n;
    });

    const sumstat = d3.group(datasets, (d) => d.name);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(datasets, (d) => d.year) as [number, number])
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(5));

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(datasets, (d) => d.n) || 0])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

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
        d3
          .line<any>()
          .x((d) => x(d.year) || 0)
          .y((d) => y(d.n) || 0)(d[1])
      );
  }, [datasets]);

  return (
    <div id="my_dataviz">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          style={{
            backgroundColor: "rgb(177, 197, 141, 0.5)",
            paddingRight: 6,
            paddingLeft: 6,
            borderWidth: 2,
            borderColor: "#636161",
            borderRadius: 8,
            marginRight: 10,
            fontSize: 10,
            color: "#636161",
          }}
          onClick={handleAddLine}
        >
          add
        </button>
      </div>
      <svg ref={chartRef} width={400} height={300} />
    </div>
  );
};

export default LineAddDataChart;
