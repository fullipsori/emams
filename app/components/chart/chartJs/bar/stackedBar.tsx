"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chart, ChartConfiguration, elements } from "chart.js";

interface StackedBarChartProps {
  maleData: number[];
  femaleData: number[];
  labels: string[];
  widthVal: number;
  heightVal: number;
}

const StackedBar: React.FC<StackedBarChartProps> = ({
  maleData,
  femaleData,
  labels,
  widthVal,
  heightVal,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
    console.log(" 줌 했음 ", isZoomed);
  };

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    const tooltip = {
      xAlign: "bottom",
      titleAlign: "center",
      callback: {
        label: function (context: any) {
          console.log("context:::", context.raw);
          return `${context.dataset.label} ${Math.abs(context.raw)}`;
        },
      },
    };

    if (ctx) {
      const stackedBarChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "붕어빵",
              data: maleData,
              backgroundColor: "rgba(82, 90, 124, 0.5)",
              stack: "Stack 1",
            },
            {
              label: "단팥빵",
              data: femaleData,
              backgroundColor: "rgba(129, 132, 184, 0.5)",
              stack: "Stack 1",
            },
            {
              label: "계란빵",
              data: femaleData,
              backgroundColor: "rgba(125, 151, 185, 0.5)",
              stack: "Stack 1",
            },
          ],
        },
        options: {
          indexAxis: "x",
          scales: {
            x: {
              stacked: true,
              beginAtZero: true,
            },
            y: {
              stacked: true,
              ticks: {
                callback: function (value: any, index, values) {
                  return Math.abs(value);
                },
              },
            },
          },
          plugins: {
            tooltip: {
              yAlign: "bottom",
              titleAlign: "center",
              callbacks: {
                label: function (context: any) {
                  return `${context.dataset.label} ${Math.abs(context.raw)}`;
                },
              },
            },
          },
          // 클릭한 차트 정보
          onClick: (event, activeElements) => {
            if (activeElements.length > 0) {
              const activeElement = activeElements[0];
              const datasetIndex = activeElement.datasetIndex;
              const dataIndex = activeElement.index;
              const datasetLabel =
                stackedBarChart.data.datasets[datasetIndex].label;
              const dataValue =
                stackedBarChart.data.datasets[datasetIndex].data[dataIndex];
              const dataLabel = stackedBarChart.data.labels ?? [];
              // const dataLabelValue = dataLabel[datasetIndex];
              console.log(`${datasetLabel} :: ${dataValue}`);
            }
          },
        },
      } as ChartConfiguration);

      return () => {
        stackedBarChart.destroy();
      };
    }
  }, [maleData, femaleData, labels, isZoomed]);

  useEffect(() => {
    if (!isZoomed) {
      const barChartCanvas = chartRef.current;
      if (barChartCanvas) {
        barChartCanvas.style.position = "static";
        barChartCanvas.style.width = `${widthVal}px`;
        barChartCanvas.style.height = `${heightVal}px`;
      }
    }
  }, [isZoomed, widthVal, heightVal]);

  return (
    <div className={`bg-red-100 ${isZoomed ? "box-wrapper" : ""}`}>
      <div className={`${isZoomed ? "box-container" : ""}`}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 20,
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <button
            style={{
              width: 20,
              marginRight: 10,
            }}
            onClick={handleZoom}
          >
            {isZoomed ? (
              <img src="/zoom_out.png" alt="ZoomOut" />
            ) : (
              <img src="/zoom.png" alt="Zoom" />
            )}
          </button>
        </div>
        <canvas ref={chartRef} width={widthVal} height={heightVal}></canvas>
      </div>
    </div>
  );
};

export default StackedBar;
