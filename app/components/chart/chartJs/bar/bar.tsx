"use client";

import { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { chartJsProps } from "@/types/chartJs";

Chart.register(...registerables);

const Bar: React.FC<chartJsProps> = ({ data, labels }) => {
  useEffect(() => {
    const barChartCanvas = document.getElementById(
      "barChart"
    ) as HTMLCanvasElement;
    let barChartInstance: Chart | null = null;

    if (barChartCanvas) {
      if (Chart.getChart(barChartCanvas)) {
        Chart.getChart(barChartCanvas)?.destroy();
      }

      barChartInstance = new Chart(barChartCanvas, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Bar Chart",
              data: data,
              backgroundColor: "rgb(133, 165, 120)",
              borderColor: "rgb(133, 165, 120)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      if (barChartInstance) {
        barChartInstance.destroy();
      }
    };
  }, [data, labels]);

  return <canvas id="barChart" width="400" height="200"></canvas>;
};

export default Bar;
