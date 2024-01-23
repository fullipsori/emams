"use client";

import { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { chartJsProps } from "@/types/chartJs";

Chart.register(...registerables);

const HorizontalBar: React.FC<chartJsProps> = ({ data, labels }) => {
  useEffect(() => {
    const horizontalBarChartCanvas = document.getElementById(
      "horizontalBarChart"
    ) as HTMLCanvasElement;
    let horizontalBarChartInstance: Chart | null = null;

    if (horizontalBarChartCanvas) {
      if (Chart.getChart(horizontalBarChartCanvas)) {
        Chart.getChart(horizontalBarChartCanvas)?.destroy();
      }

      horizontalBarChartInstance = new Chart(horizontalBarChartCanvas, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Horizontal Bar Chart",
              data: data,
              backgroundColor: "rgb(221, 160,221)",
              borderColor: "rgb(221, 160,221)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: "y",
          //   scales: {
          //     x: {
          //       beginAtZero: true,
          //     },
          //     y: {
          //       beginAtZero: true,
          //     },
          //   },
        },
      });
    }

    return () => {
      if (horizontalBarChartInstance) {
        horizontalBarChartInstance.destroy();
      }
    };
  }, [data, labels]);

  return <canvas id="horizontalBarChart" width="400" height="200"></canvas>;
};

export default HorizontalBar;
