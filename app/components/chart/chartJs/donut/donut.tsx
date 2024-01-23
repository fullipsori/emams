"use client";
import { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { chartJsProps } from "@/types/chartJs";

Chart.register(...registerables);

const Donut: React.FC<chartJsProps> = ({ data, labels }) => {
  useEffect(() => {
    const doughnutChartCanvas = document.getElementById(
      "doughnutChart"
    ) as HTMLCanvasElement;
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
                  "rgb(255,240 ,245)",
                  "rgb(255,182,193)",
                  "rgb(253, 122, 192)",
                  "rgb(221,160,221)",
                  "rgb(180, 159, 219)",
                ],
              },
            ],
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

  return <canvas id="doughnutChart" width="400" height="200"></canvas>;
};

export default Donut;
