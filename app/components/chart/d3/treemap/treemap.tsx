"use client";
import React, { useEffect, useRef, useState } from "react";
import { select } from "d3-selection";
import { hierarchy, treemap } from "d3-hierarchy";
import { scaleOrdinal, scaleLinear } from "d3-scale";
import { max, min, mean } from "d3-array";
import { schemeTableau10, schemeSet3 } from "d3-scale-chromatic";
import jsonData from "../../../../../data/treemap.json";

interface DataNode {
  data: any;
  x0: any;
  y0: any;
  x1: any;
  y1: any;
  name: string;
  category: string;
  value: number;
}

const TreemapChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [gameValues, setGameValues] = useState<any>(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const legendRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let hierarchyTree = hierarchy<any>(jsonData)
      .sum((d) => {
        return d.value;
      })
      .sort(function (a: any, b: any) {
        return b.height - a.height || b.value - a.value;
      });

    treemap<DataNode>().size([1000, 600])(hierarchyTree);

    let cat = hierarchyTree.leaves().map(function (nodes) {
      return nodes.data.category;
    });
    setCategories(
      cat.filter(function (category, index, self) {
        return self.indexOf(category) === index;
      })
    );

    const consoleGameValue = jsonData.children
      .map((data: any) => data.children)
      .map((gameData: any) =>
        gameData.map((gameValues: any) => parseFloat(gameValues.value))
      );
    const gameMean = consoleGameValue.map((value: any) => mean(value) || 0);
    const maxGameMean = max(gameMean) || 0;
    setGameValues(maxGameMean);
    setData(hierarchyTree.leaves());
    //   });
  }, []);

  useEffect(() => {
    const minValue = min(data, (d) => parseFloat(d.data.value) || 0);

    let color = scaleOrdinal([...schemeTableau10, ...schemeSet3]);

    let opacity = scaleLinear().domain([minValue, gameValues]).range([0.75, 1]);

    const svg = select(svgRef.current).attr("id", "tree-map");
    let tooltip = select("body").append("div").attr("class", "tooltip");

    var block = svg
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "group")
      .attr("transform", (d) => {
        return "translate(" + d.x0 + ", " + d.y0 + ")";
      });

    block
      .append("rect")
      .attr("class", "tile")
      .attr("width", (d) => {
        return d.x1 - d.x0;
      })
      .attr("height", (d) => {
        return d.y1 - d.y0;
      })
      .attr("data-name", function (d) {
        return d.data.name;
      })
      .attr("data-category", function (d) {
        return d.data.category;
      })
      .attr("data-value", function (d) {
        return d.data.value;
      })
      .attr("fill", (d) => {
        return color(d.data.category);
      })
      .attr("opacity", (d) => {
        return opacity(d.data.value);
      })
      .on("mouseover", function (event, d) {
        let coordinates = [event.pageX, event.pageY];
        select(this).classed("active", true);

        tooltip.attr("data-value", d.data.value);

        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .attr("id", "tooltip")
          .attr("data-value", d.data.value)
          .html(
            `
            Name: ${d.data.name}<br>
            Category: ${d.data.category}<br>
            Value: ${d.data.value}
            `
          )
          .style("left", coordinates[0] + 10 + "px")
          .style("top", coordinates[1] - 28 + "px");
      })
      .on("mouseout", function (d) {
        select(this).classed("active", false);
        tooltip.transition().duration(100).style("opacity", 0);
      });

    block
      .append("text")
      .attr("class", "tile-text")
      .selectAll("tspan")
      .data(function (d: any) {
        return d.data.name.split(/(?=[A-Z][^A-Z])/g);
      })
      .enter()
      .append("tspan")
      .attr("x", 4)
      .attr("y", function (d: any, i: any) {
        return 13 + i * 10;
      })
      .text(function (d: any) {
        return String(d);
      });

    // Legend //
    const legend = select(legendRef.current).attr("id", "legend");

    var legendWidth = +legend.attr("width");
    const LEGEND_OFFSET = 10;
    const LEGEND_RECT_SIZE = 15;
    const LEGEND_H_SPACING = 50;
    const LEGEND_V_SPACING = 10;
    const LEGEND_TEXT_X_OFFSET = 3;
    const LEGEND_TEXT_Y_OFFSET = -2;
    var legendElemsPerRow = Math.floor(legendWidth / LEGEND_H_SPACING);

    var legendElem = legend
      .append("g")
      .attr("transform", "translate(30," + LEGEND_OFFSET + ")")
      .selectAll("g")
      .data(categories)
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        return (
          "translate(" +
          (i % legendElemsPerRow) * LEGEND_H_SPACING +
          "," +
          (Math.floor(i / legendElemsPerRow) * LEGEND_RECT_SIZE +
            LEGEND_V_SPACING * Math.floor(i / legendElemsPerRow)) +
          ")"
        );
      });

    legendElem
      .append("rect")
      .attr("width", LEGEND_RECT_SIZE)
      .attr("height", LEGEND_RECT_SIZE)
      .attr("class", "legend-item")
      .attr("fill", function (d) {
        return color(d);
      });

    legendElem
      .append("text")
      .attr("x", LEGEND_RECT_SIZE + LEGEND_TEXT_X_OFFSET)
      .attr("y", LEGEND_RECT_SIZE + LEGEND_TEXT_Y_OFFSET)
      .text(function (d: string) {
        return d;
      });
  }, [data, categories]);

  return (
    <div>
      <h1 id="title">Video Game Sales</h1>
      <h4 id="description">임시 데이터 넣어봄...</h4>
      <div className="svgContainer">
        <svg ref={svgRef} width={1000} height={800}></svg>
        <svg ref={legendRef} width={100}></svg>
      </div>
    </div>
  );
};

export default TreemapChart;
