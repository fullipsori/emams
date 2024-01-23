"use client";

import React from "react";
import Plot from "react-plotly.js";

const SankeyChart3: React.FC = () => {
  const data: Partial<Plotly.PlotData>[] = [
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
        label: ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"],
        color: [
          "rgb(156, 133, 103)",
          "rgb(128, 128, 0)",
          "rgb(149, 158, 125)",
          "rgb(240, 232, 166)",
          "rgb(148, 124, 92)",
          "rgb(131, 113, 89)",
          "rgb(125, 143, 111)",
          "rgb(210, 223, 137)",
        ],
      },
      link: {
        source: [0, 1, 0, 2, 3, 3, 3, 4, 5, 5],
        target: [2, 3, 3, 4, 4, 5, 6, 6, 6, 7],
        value: [8, 4, 2, 8, 4, 2, 4, 4, 2, 2],
      },
    } as any,
  ];

  const layout: Partial<Plotly.Layout> = {
    title: "Sankey Diagram",
    font: {
      size: 10,
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

export default SankeyChart3;
