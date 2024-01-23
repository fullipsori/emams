"use client";

import React from "react";
import Plot from "react-plotly.js";
import { Data } from "plotly.js";

const SankeyDiagram: React.FC = () => {
  const data: Data[] = [
    {
      type: "sankey",
      orientation: "h",
      node: {
        pad: 15,
        thickness: 20,
        line: {
          color: "black",
          width: 0.5,
        },
        label: [
          "Producer Application",
          "Percentage",
          "Consumer Application A",
          "Consumer Application B",
        ],
        color: ["blue", "blue", "blue", "blue"],
      },
      link: {
        source: [0, 1, 1],
        target: [1, 2, 3],
        value: [8, 4, 2],
        label: ["37.4%", "12,345Msgs", "23MB"],
      },
    },
  ];

  const layout = {
    title: "Sankey Diagram with Percentage",
    font: {
      size: 12,
    },
  };

  return (
    <Plot
      data={data}
      layout={layout}
      style={{ width: "100%", height: "400px" }}
    />
  );
};

export default SankeyDiagram;
