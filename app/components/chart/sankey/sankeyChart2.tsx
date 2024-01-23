"use client";

import React from "react";
import Plot from "react-plotly.js";

const SankeyChart2: React.FC = () => {
  const percentage = "";
  const data = [
    {
      type: "sankey",
      orientation: "h",
      node: {
        // pad는 잘 모르겠음
        pad: 15,
        // thickness: label 두께
        // line : label 테두리
        thickness: 15,
        line: {
          color: "gray",
          width: 2.0,
        },
        // label: ["A1", "A2", "B1", "B2", "C1", "C2"],
        // color: ["blue", "blue", "blue", "blue", "blue", "blue"],
        label: ["A", "B = 37.4%", "C", "D"],
        color: [
          "rgb(252, 228, 242)",
          "rgb(236, 197, 235)",
          "rgb(204, 163, 209)",
          "rgb(118, 90, 121)",
        ],
      },
      link: {
        // source: [0, 1, 0, 2, 3, 3],
        // target: [0, 3, 3, 4, 4, 5],
        // value: [8, 4, 2, 8, 4, 2],
        source: [0, 1, 1],
        target: [1, 2, 3],
        value: [1, 1, 1],
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

export default SankeyChart2;
