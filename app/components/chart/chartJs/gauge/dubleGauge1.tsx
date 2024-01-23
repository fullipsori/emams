"use client";

import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import "chartjs-plugin-datalabels";

Chart.register(...registerables);

interface GaugeChartProps {
  data: number[];
  labels: string[];
}

const DubleGauge: React.FC<GaugeChartProps> = ({ data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const chartCanvas = chartRef.current;

    let chartInstance: Chart<"doughnut", number[], string> | null = null;

    if (chartCanvas) {
      if (Chart.getChart(chartCanvas)) {
        Chart.getChart(chartCanvas)?.destroy();
      }

      const gradient = chartCanvas
        ?.getContext("2d")
        ?.createLinearGradient(0, 0, 300, 50);
      gradient?.addColorStop(0, "red");
      gradient?.addColorStop(0.7, "yellow");
      gradient?.addColorStop(1, "green");

      chartInstance = new Chart(chartCanvas, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Weekly Sales",
              data: data,
              backgroundColor: ["green", "yellow", "red"],
              // backgroundColor: [gradient, "#e0e0e0"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          cutout: "95%",
          aspectRatio: 1.0,
          rotation: -90,
          circumference: 180,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data, labels]);

  return <canvas ref={chartRef} width="300" height="150"></canvas>;
};

export default DubleGauge;
