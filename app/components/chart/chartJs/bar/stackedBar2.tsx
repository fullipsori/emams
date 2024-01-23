"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chart, ChartConfiguration } from "chart.js";

interface StackedBarChartProps {
  data: {
    dataset1: number[];
    dataset2: number[];
    dataset3: number[];
  };
  labels: string[];
  widthVal: number;
  heightVal: number;
  onChartDataSelect: (data: any[]) => void;
}

const StackedBar2: React.FC<StackedBarChartProps> = ({
  data,
  labels,
  widthVal,
  heightVal,
  onChartDataSelect,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedChartData, setSelectedChartData] = useState<any[]>([]);

  const handleChartDataSelect = (data: any[]) => {
    setSelectedChartData(data);
  };
  console.log("선택한 데이터111:::", selectedChartData);

  let stackedBarChart: Chart | null = null;

  console.log("11111", stackedBarChart);

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");

    if (ctx) {
      console.log("22222", stackedBarChart);

      if (stackedBarChart) {
        stackedBarChart.destroy();
        stackedBarChart = null;
        console.log("33333", stackedBarChart);
      }

      stackedBarChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "붕어빵",
              data: data.dataset1,
              backgroundColor: "rgba(80, 63, 44, 0.5)",
              stack: "Stack 1",
            },
            {
              label: "단팥빵",
              data: data.dataset2,
              backgroundColor: "rgba(134, 107, 75, 0.5)",
              stack: "Stack 1",
            },
            {
              label: "계란빵",
              data: data.dataset3,
              backgroundColor: "rgba(185, 161, 125, 0.5)",
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
          onClick: (event, activeElements) => {
            if (activeElements.length > 0) {
              const activeElement = activeElements[0];
              const datasetIndex = activeElement.datasetIndex;
              const dataIndex = activeElement.index;
              const datasetLabel =
                stackedBarChart?.data.datasets[datasetIndex].label;
              const allDatasetLabels =
                stackedBarChart?.data.datasets.map(
                  (dataset) => dataset.label
                ) || [];
              const dataValue =
                stackedBarChart?.data.datasets[datasetIndex].data[dataIndex];
              const dataLabel = stackedBarChart?.data.labels ?? [];
              const activeDataLabel = dataLabel[dataIndex];
              const yDataForSelectedX = stackedBarChart?.data.datasets.map(
                (dataset) => dataset.data[dataIndex]
              );
              const activeDataLabelValue = Array.from(
                { length: allDatasetLabels.length },
                () => activeDataLabel
              );

              if (
                yDataForSelectedX &&
                yDataForSelectedX.length === allDatasetLabels.length
              ) {
                // 선택한 데이터 저장
                setSelectedChartData(
                  allDatasetLabels.map((label, index) => [
                    {
                      key: [label],
                      value: [yDataForSelectedX[index]],
                    },
                  ])
                );
              }
              console.log(
                `${allDatasetLabels} :: ${dataValue} :: ${activeDataLabelValue}`
              );

              // 선택한 데이터 저장
              setSelectedChartData([
                { key: activeDataLabelValue, value: yDataForSelectedX },
              ]);
              onChartDataSelect(selectedChartData);
            }
          },
        },
      } as ChartConfiguration);
    }

    return () => {
      console.log("44444", stackedBarChart);

      if (stackedBarChart) {
        console.log("55555", stackedBarChart);

        stackedBarChart.destroy();
        stackedBarChart = null;
        console.log("66666", stackedBarChart);
      }
    };
  }, [isZoomed, widthVal, heightVal, onChartDataSelect, selectedChartData]);

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

export default StackedBar2;
