"use client";
import { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { chartJsProps } from "@/types/chartJs";

Chart.register(...registerables);

const Donut: React.FC<chartJsProps> = ({
  data,
  labels,
  widthVal,
  heightVal,
  id,
}) => {
  console.log("높이랑 너비 받아옴:::", widthVal, widthVal);
  const percentage = data[0];
  console.log(percentage);

  useEffect(() => {
    const canvasId = `doughnutChart-${id}`;
    const doughnutChartCanvas = document.getElementById(
      canvasId
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
                backgroundColor: ["#00c895", "#cfcfcf"],
              },
            ],
          },
          options: {
            cutout: "75%",
            aspectRatio: 1.0,
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        }
      );
    }

    return () => {
      if (doughnutChartInstance) {
        doughnutChartInstance.destroy();
      }
    };
  }, [data, labels, widthVal, heightVal, id]);

  return (
    <div>
      <div style={{ position: "absolute" }}>
        <canvas
          id={`doughnutChart-${id}`}
          width={widthVal}
          height={heightVal}
        ></canvas>
      </div>
      <div
        style={{
          color: "#000",
          position: "relative",
          width: 130,
          height: 130,
          top: 50,
          left: 60,
        }}
      >
        {percentage}
      </div>
    </div>
  );
};

export default Donut;
