"use client";

import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(...registerables, zoomPlugin);

interface StatusLineProps {
  // countValue: number;
  widthVal: number;
  heightVal: number;
}

const StatusLineChart: React.FC<StatusLineProps> = ({
  // countValue,
  widthVal,
  heightVal,
}) => {
  const endTimeValue = new Date();
  const startTimeValue = new Date(endTimeValue.getTime() - 2 * 60 * 60 * 1000);
  const [count, setCount] = useState<number>(1);
  const [legendCount, setLegendCount] = useState<number>(50);

  const getRandomData = (count: number) => {
    return Array.from({ length: legendCount }, () => Math.random() * 100);
  };

  const labels: any = [];
  const interval = 5 * 60 * 1000;

  // 범례 개수
  for (let i = 0; i < legendCount; i++) {
    const currentTime = new Date(startTimeValue.getTime() + i * interval);
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const label = `${hours}:${minutes}`;
    labels.push(label);
  }

  const generateRandomDataset = () => {
    return Array.from({ length: count }, () => getRandomData(count));
  };
  const lineChartCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const dataValue1: (number | null)[] = Array.from(
    { length: legendCount },
    (_, index) => {
      const rangeIndex = Math.floor((2 * legendCount) / 3);
      return index < rangeIndex ? null : 20;
    }
  );
  const dataValue2: (number | null)[] = Array.from(
    { length: legendCount },
    (_, index) => {
      const rangeIndex = Math.floor((1 * legendCount) / 3);
      return index >= rangeIndex ? null : 30;
    }
  );
  const dataValue3: (number | null)[] = Array.from(
    { length: legendCount },
    (_, index) => {
      const rangeStart = Math.floor(legendCount / 3);
      const rangeEnd = Math.floor((2 * legendCount) / 4);
      return index >= rangeStart && index < rangeEnd ? 50 : null;
    }
  );

  useEffect(() => {
    const lineChartCanvas = lineChartCanvasRef.current;
    let lineChartInstance: Chart | null = null;

    if (lineChartCanvas) {
      if (Chart.getChart(lineChartCanvas)) {
        Chart.getChart(lineChartCanvas)?.destroy();
      }

      lineChartInstance = new Chart(lineChartCanvas, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "LineValue1",
              borderColor: "rgba(255, 0, 0, 0.3)",
              borderWidth: 2,
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              data: dataValue1,
              fill: true,
              pointRadius: 0,
              pointHoverRadius: 0,
            },
            {
              label: "LineValue2",
              borderColor: "rgba(31, 155, 0, 0.3)",
              borderWidth: 2,
              backgroundColor: "rgba(31, 155, 0, 0.2)",
              fill: true,
              data: dataValue2,
              pointRadius: 0,
              pointHoverRadius: 0,
            },
            {
              label: "LineValue3",
              borderColor: "rgb(214, 228, 15, 0.3)",
              borderWidth: 2,
              data: dataValue3,
              fill: true,
              backgroundColor: "rgb(214, 228, 15, 0.2)",
              pointRadius: 0,
              pointHoverRadius: 0,
            },
            ...generateRandomDataset().map((dataset, index) => ({
              label: `Line Chart ${index + 1}`,
              data: dataset,
              borderColor: `rgb(${Math.random() * 255},${Math.random() * 255},${
                Math.random() * 255
              })`,
              borderWidth: 2,
              fill: false,
              pointRadius: 0,
              pointHoverRadius: 0,
              tension: 0.5,
            })),
          ],
        },
        options: {
          // animations: {
          //   radius: {
          //     duration: 400,
          //     easing: "linear",
          //     loop: (context) => context.active,
          //   },
          // },
          interaction: {
            mode: "nearest",
            intersect: false,
            axis: "x",
          },
          plugins: {
            legend: {
              display: false,
            },
            // { position: "bottom" },
            zoom: {
              zoom: {
                drag: {
                  enabled: true,
                },
                mode: "x",
              },
            },
          },
        },
      });
    }

    return () => {
      if (lineChartInstance) {
        lineChartInstance.destroy();
      }
    };
  }, [count]);

  return (
    <div className={`bg-red-100`}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 20,
          marginBottom: 20,
          alignItems: "center",
        }}
      ></div>
      <canvas
        id="lineChart"
        ref={lineChartCanvasRef}
        width={widthVal}
        height={heightVal}
      ></canvas>
    </div>
  );
};

export default StatusLineChart;
