"use client";
import React from "react";
import { Chart } from "react-google-charts";

const SankeyChart5: React.FC = () => {
  const data = [
    ["From", "To", "Weight"],
    ["A", "X", 5],
    ["A", "Y", 7],
    ["A", "Z", 6],
    ["B", "X", 2],
    ["B", "Y", 9],
    ["B", "Z", 4],
  ];

  const options = {
    // Google Charts Sankey의 옵션
    width: 600,
    height: 400,
    sankey: {
      // 노드와 링크의 스타일링 옵션
      node: {
        colors: ["blue", "green", "red"],
        label: {
          fontName: "Arial",
          fontSize: 14,
          color: "#871b47",
          bold: true,
        },
      },
      link: {
        colorMode: "gradient",
        colors: ["#d799ae", "#98d9e4", "#fe9929"],
      },
    },
  };

  return (
    <div>
      <Chart
        width={"100%"}
        height={"500px"}
        chartType="Sankey"
        loader={<div>Loading Chart</div>}
        data={data}
        options={options}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};

export default SankeyChart5;
