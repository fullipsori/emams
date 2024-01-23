"use client";

import React, { useEffect, useRef } from "react";
import { Chart, LinearScale, Tooltip } from "chart.js";
import { TreemapController, TreemapElement } from "chartjs-chart-treemap";

Chart.register(LinearScale, Tooltip, TreemapController, TreemapElement);

interface TreemapProps {
  data: any;
}

const Treemap: React.FC<TreemapProps> = ({ data }) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvas.current) {
      const chart = new Chart(canvas.current, {
        type: "treemap",
        data: {
          datasets: [data],
        },
      });

      return () => chart.destroy();
    }
  }, [canvas, data]);

  return (
    <div>
      <canvas ref={canvas} />
    </div>
  );
};

export default Treemap;
