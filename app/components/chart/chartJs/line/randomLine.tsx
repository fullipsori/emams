"use client";
import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface ProgressiveLineChartProps {
  count: number;
  delay?: number;
}

const RandomLine: React.FC<ProgressiveLineChartProps> = ({
  count,
  delay = 0,
}) => {
  const multiLineChartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let multiLineChartInstance: Chart<"line", number[], string> | null = null;
    const multiLineChartCanvas = multiLineChartRef.current;

    const createChart = () => {
      if (multiLineChartCanvas) {
        if (Chart.getChart(multiLineChartCanvas)) {
          Chart.getChart(multiLineChartCanvas)?.destroy();
        }

        const labels = Array.from(
          { length: count },
          (_, index) => `Label ${index + 1}`
        );
        const data = Array.from({ length: count }, () =>
          Array.from({ length: count }, () => Math.random() * 100)
        );

        multiLineChartInstance = new Chart<"line", number[], string>(
          multiLineChartCanvas,
          {
            type: "line",
            data: {
              labels: labels,
              datasets: data.map((dataset, index) => ({
                label: `Line Chart ${index + 1}`,
                data: dataset,
                borderColor: `rgb(${Math.random() * 255},${
                  Math.random() * 255
                },${Math.random() * 255})`,
                borderWidth: 2,
                fill: false,
              })),
            },
            options: {
              plugins: {
                legend: {
                  position: "right",
                },
              },
            },
          }
        );
      }
    };

    const timeoutId = setTimeout(createChart, delay);

    return () => {
      clearTimeout(timeoutId);
      if (multiLineChartInstance) {
        multiLineChartInstance.destroy();
      }
    };
  }, [count, delay]);

  return (
    <div>
      <canvas ref={multiLineChartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default RandomLine;
