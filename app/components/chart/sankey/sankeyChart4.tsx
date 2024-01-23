"use client";

import React from "react";
import Plot from "react-plotly.js";

interface SankeyNode {
  label: string[];
  color: string[];
}

interface SankeyLink {
  source: number[];
  target: number[];
  value: number[];
}

const SankeyChart4: React.FC = () => {
  // 데이터
  const moreLabels = ["Solar", "Wind", "Hydro"];
  const moreColors = ["#FFD700", "#2E8B57", "#1E90FF"];

  const nodes: SankeyNode = {
    // 모든 노드의 레이블을 배열로 추가
    label: ["Nuclear", "Coal", "Biofuel", ...moreLabels],
    // 각 노드의 색상을 배열로 추가
    color: ["#97ED8A", "#61C0BF", "#F4D35E", ...moreColors],
  };

  const additionalSources = [2, 3, 4];
  const additionalTargets = [5, 6, 7];
  const additionalValues = [10, 9, 2];

  const links: SankeyLink = {
    // 각 링크의 시작점 노드 인덱스
    source: [0, 0, 1, ...additionalSources],
    // 각 링크의 끝점 노드 인덱스
    target: [2, 3, 4, ...additionalTargets],
    // 각 링크의 가중치 값
    value: [8, 4, 6, ...additionalValues],
  };

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
        label: nodes.label,
        color: nodes.color,
      },
      link: {
        source: links.source,
        target: links.target,
        value: links.value,
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
      style={{ width: "100%", height: "800px" }}
    />
  );
};

export default SankeyChart4;
