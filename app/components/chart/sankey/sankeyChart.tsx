"use client";

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import {
  sankey,
  SankeyGraph,
  SankeyLink,
  SankeyNode,
  SankeyNodeMinimal,
} from "d3-sankey";

// Define the node and link structures
interface SankeyNodeExtended extends SankeyNodeMinimal<{}, {}> {
  name: string;
}

interface SankeyLinkExtended extends SankeyLink<{}, {}> {
  source: number;
  target: number;
}

interface SankeyGraphExtended extends SankeyGraph<{}, {}> {
  nodes: SankeyNodeExtended[];
  links: SankeyLinkExtended[];
}

interface SankeyChartProps {
  data: SankeyGraphExtended;
}

const SankeyChart: React.FC<SankeyChartProps> = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const { nodes, links } = data;
    const width = 800;
    const height = 400;

    const sankeyGenerator = sankey<{}, {}>()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([
        [1, 1],
        [width - 1, height - 5],
      ]);

    const sankeyData = sankeyGenerator({
      nodes: nodes.map((d) => ({ ...d })),
      links: links.map((d) => ({ ...d })),
    });
  }, [data]);

  return <svg ref={svgRef} width={800} height={400}></svg>;
};

export default SankeyChart;
