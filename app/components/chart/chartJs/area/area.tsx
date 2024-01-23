"use client";

import { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { chartJsProps } from "@/types/chartJs";

Chart.register(...registerables);

const Area: React.FC<chartJsProps> = ({ data, labels }) => {
  useEffect(() => {
    const areaChartCanvas = document.getElementById(
      "areaChart"
    ) as HTMLCanvasElement;
    let areaChartInstance: Chart | null = null;

    if (areaChartCanvas) {
      if (Chart.getChart(areaChartCanvas)) {
        Chart.getChart(areaChartCanvas)?.destroy();
      }

      areaChartInstance = new Chart(areaChartCanvas, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Area Chart",
              data: data,
              borderColor: "deepPink",
              borderWidth: 2,
              fill: {
                target: "origin",
                above: "rgb(255, 182, 185)",
                below: "rgb(173, 216, 230)",
              },
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            filler: {
              propagate: true,
            },
            title: {
              display: true,
            },
            tooltip: {
              mode: "index",
            },
          },
          interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
          },
          scales: {
            y: {
              stacked: true,
            },
          },
        },
      });
    }

    return () => {
      if (areaChartInstance) {
        areaChartInstance.destroy();
      }
    };
  }, [data, labels]);

  return <canvas id="areaChart" width="400" height="200"></canvas>;
};

export default Area;
