"use client";

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";

interface SankeyNode {
  name: string;
}

interface SankeyLink {
  source: number;
  target: number;
  value: number;
}

interface SankeyGraph {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

const SankeyD3Chart: React.FC = () => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ref.current) {
      const svg = d3.select(ref.current);

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const graph: SankeyGraph = {
        nodes: [
          { name: "A" },
          { name: "B" },
          { name: "C" },
          { name: "D" },
          { name: "E" },
          { name: "F" },
          { name: "G" },
        ],
        links: [
          { source: 0, target: 1, value: 2 },
          { source: 0, target: 2, value: 3 },
          { source: 0, target: 3, value: 2 },
          { source: 1, target: 4, value: 1 },
          { source: 2, target: 4, value: 1 },
          { source: 2, target: 5, value: 1 },
          { source: 3, target: 5, value: 2 },
          { source: 4, target: 6, value: 2 },
          { source: 5, target: 6, value: 2 },
        ],
      };

      const { width, height } = ref.current.getBoundingClientRect();

      const sankeyGenerator = sankey<SankeyNode, SankeyLink>()
        .nodeWidth(15)
        .nodePadding(10)
        .extent([
          [1, 1],
          [width - 1, height - 5],
        ]);

      const { nodes, links } = sankeyGenerator({
        nodes: graph.nodes.map((d) => ({ ...d })),
        links: graph.links.map((d) => ({ ...d })),
      });

      // Add the links
      svg
        .append("g")
        .selectAll("path")
        .data(links)
        .join("path")
        .attr("d", sankeyLinkHorizontal())
        .style("fill", "none")
        .style("stroke-opacity", 0.5)
        .style("stroke-width", (d: any) => Math.max(1, d.width))
        .style("stroke", (d: any) => color(d.name));

      // Add the node rectangles
      svg
        .append("g")
        .selectAll("rect")
        .data(nodes)
        .join("rect")
        .attr("x", (d: any) => d.x0)
        .attr("y", (d: any) => d.y0)
        .attr("height", (d: any) => d.y1 - d.y0)
        .attr("width", sankeyGenerator.nodeWidth())
        .style("fill", (d) => color(d.name))
        .style("stroke", "black");

      // Add node labels
      svg
        .append("g")
        .style("font", "10px sans-serif")
        .selectAll("text")
        .data(nodes)
        .join("text")
        .attr("x", (d: any) => (d.x0 + d.x1) / 2)
        .attr("y", (d: any) => (d.y0 + d.y1) / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text((d) => d.name);
    }
  }, []);

  return (
    <svg
      ref={ref}
      width={960}
      height={600}
      style={{ width: "100%", minHeight: "600px", border: "1px solid #ccc" }}
    />
  );
};

export default SankeyD3Chart;
