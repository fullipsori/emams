"use client";

import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { ChartConfiguration } from "chart.js";
import "chartjs-plugin-datalabels";

Chart.register(...registerables);

interface GaugeChartProps {
  data: number[];
  labels: string[];
}

const GaugeChart: React.FC<GaugeChartProps> = ({ data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const chartCanvas = chartRef.current;

    let chartInstance: Chart<"doughnut", number[], string> | null = null;

    if (chartCanvas) {
      if (Chart.getChart(chartCanvas)) {
        Chart.getChart(chartCanvas)?.destroy();
      }

      chartInstance = new Chart(chartCanvas, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: [
                "rgb(167, 205, 241)",
                "rgb(174, 226, 168)",
                "rgb(250, 208, 168)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          cutout: "80%",
          aspectRatio: 1.0,
          rotation: -90,
          circumference: 180,
          plugins: {},
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

export default GaugeChart;
