"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chart, ChartConfiguration, elements } from "chart.js";
import { createSelector } from "@reduxjs/toolkit";
import { useAppSelector } from "@/redux/hooks";
import { MonitorConnState } from "@/redux/slices/monitoring-conn/reducer";

interface StackedBarChartProps {
  widthVal?: number;
  heightVal?: number;
}

const RTBarChart = (stackedBarChartProps: StackedBarChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const selectMonitoringData = createSelector(
    (state: any) => state.MonitoringConnReducer,
    (monitoringData: MonitorConnState) => ({ labels: monitoringData.chartLabels, producerData: monitoringData.producerData, consumerData: monitoringData.consumerData })
  )
  const monitoringData = useAppSelector(selectMonitoringData);

  useEffect(() => {
    const barChartCanvas = chartRef.current;
    //차이점을 확인 : const ctx = chartRef.current?.getContext("2d");
    let chartInstance: Chart | null = null;

    if(barChartCanvas) {
      Chart.getChart(barChartCanvas)?.destroy();

      /*
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
      */

      chartInstance = new Chart(barChartCanvas, {
        type: "bar",
        data: {
          labels: [],
          datasets: defaultBarChartDatas() 
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
            if (chartInstance && activeElements.length > 0) {
              const activeElement = activeElements[0];
              const datasetIndex = activeElement.datasetIndex;
              const dataIndex = activeElement.index;
              const datasetLabel =
                chartInstance.data.datasets[datasetIndex].label;
              const dataValue =
                chartInstance.data.datasets[datasetIndex].data[dataIndex];
              const dataLabel = chartInstance.data.labels ?? [];
              // const dataLabelValue = dataLabel[datasetIndex];
              console.log(`${datasetLabel} :: ${dataValue}`);
            }
          },
        },
      } as ChartConfiguration);
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);


  const defaultBarChartDatas = () : any => {
    return ([
      {
        label: "Producer",
        data: [],
        backgroundColor: "rgba(82, 90, 124, 0.5)",
        stack: "Stack 1",
      },
      {
        label: "Consumer",
        data: [],
        backgroundColor: "rgba(129, 132, 184, 0.5)",
        stack: "Stack 1",
      }
    ]);
  }

  useEffect(()=>{
    updateChart();
  }, [monitoringData]);


  const updateChart = async () => {
    if(!monitoringData || !monitoringData.labels)
      return;
    const chartCanvas = chartRef.current;
    if(!chartCanvas) return;

    const chartInstance = Chart.getChart(chartCanvas);
    if(!chartInstance) return;

    chartInstance.data.labels = monitoringData.labels;
    chartInstance.data.datasets[0].data = monitoringData.producerData;
    chartInstance.data.datasets[1].data = monitoringData.consumerData;
    chartInstance.update();
  };

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
    console.log(" 줌 했음 ", isZoomed);
  };

  /*
  useEffect(() => {
    if (!isZoomed) {
      const barChartCanvas = chartRef.current;
      if (barChartCanvas) {
        barChartCanvas.style.position = "static";
        barChartCanvas.style.width = (stackedBarChartProps.widthVal || '40vw') ;
        barChartCanvas.style.height = (stackedBarChartProps.heightVal || '20vh');
      }
    }
  }, [isZoomed, stackedBarChartProps.widthVal, stackedBarChartProps.heightVal]);
  */

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
        <canvas ref={chartRef} width={(stackedBarChartProps.widthVal || '40vw')} height={(stackedBarChartProps.heightVal || '20vh')}></canvas>
      </div>
    </div>
  );
};

export default RTBarChart;
