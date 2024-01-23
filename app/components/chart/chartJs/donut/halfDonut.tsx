"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { chartJsProps } from "@/types/chartJs";

Chart.register(...registerables);

const HalfDonut: React.FC<chartJsProps> = ({ data, labels }) => {
  const doughnutChartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const doughnutChartCanvas = doughnutChartRef.current;

    let doughnutChartInstance: Chart<"doughnut", number[], string> | null =
      null;

    if (doughnutChartCanvas) {
      if (Chart.getChart(doughnutChartCanvas)) {
        Chart.getChart(doughnutChartCanvas)?.destroy();
      }

      doughnutChartInstance = new Chart<"doughnut", number[], string>(
        doughnutChartCanvas,
        {
          type: "doughnut",
          data: {
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor: [
                  "rgb(243, 233, 205)",
                  "rgb(240,230 ,140)",
                  "rgb(210,180,140)",
                  "rgb(203, 230, 151)",
                  "rgb(255, 178, 85)",
                ],
              },
            ],
          },
          options: {
            rotation: -90,
            circumference: 180,
          },
        }
      );
    }

    return () => {
      if (doughnutChartInstance) {
        doughnutChartInstance.destroy();
      }
    };
  }, [data, labels]);

  return <canvas ref={doughnutChartRef} width="400" height="200"></canvas>;
};

export default HalfDonut;
