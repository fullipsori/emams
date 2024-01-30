"use client";

import "../../../../../public/css/style.css";
import React, { useEffect, useRef, useState } from "react";
import { Chart, ChartDataset, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";


Chart.register(...registerables, zoomPlugin);

interface ChartProps{
  countValue: number;
  monitoringDataCallback: () => any;
  widthVal?: string;
  heightVal?: string;
}

const RTLineChart = (chartProps: ChartProps) => {

  const lineChartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const monitoringData = chartProps.monitoringDataCallback();

  const defaultLineChartData = (name?: string, data?: number[]) : any => {
    return ({
        label: name ?? "",
        data: data ?? [],
        borderColor: `rgb(${Math.random() * 255},${Math.random() * 255},${ Math.random() * 255 })`,
        borderWidth: 2,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.5,
    });
  }

  const newChart = (name?: string, labels?: string[], data?: number[]): Chart | null => {
    const lineChartCanvas = lineChartCanvasRef.current;
    if (!lineChartCanvas) return null;

    return new Chart(lineChartCanvas, {
      type: "line",
      data: {
        labels: labels ?? [],
        datasets: Array.from(
          { length: chartProps.countValue },
          (_, index) => {
            return defaultLineChartData(name, data);
          }
        ),
      },
      options: {
        maintainAspectRatio: false,
        animation: false,
        scales: {
          x: {
            ticks: {
              font: {
                family: 'Poppins',
              },
              autoSkip: true,
              maxTicksLimit: 50
            }
          },
          y: {
            ticks: {
              font: {
                family: 'Poppins',
              },
            },
          },
        },
        interaction: {
          mode: "nearest",
          intersect: false,
          axis: "x",
        },
        plugins: {
          legend: { position: "bottom" },
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
    })
  };

  /* initial loading */
  useEffect(() => {
    const lineChartCanvas = lineChartCanvasRef.current;
    let lineChartInstance: Chart | null = null;
    if (lineChartCanvas) {
      lineChartCanvas.style.position = "static";
      lineChartCanvas.style.width = chartProps.widthVal ?? "40vw";
      lineChartCanvas.style.height = chartProps.heightVal ?? "20vh";

      if (Chart.getChart(lineChartCanvas)) {
        Chart.getChart(lineChartCanvas)?.destroy();
      }
      lineChartInstance = newChart("", [], []);
    }

    return () => {
      if (lineChartInstance) {
        lineChartInstance.destroy();
      }
    };
  }, []);

  const updateChart = async (monitoringData: any) => {
    const lineChartCanvas = lineChartCanvasRef.current;

    if (lineChartCanvas) {
      const chartInstance = Chart.getChart(lineChartCanvas);
      if (chartInstance && monitoringData && monitoringData.labels && monitoringData.labels.length > 0) {
        chartInstance.data.labels = monitoringData.labels;
        for(var step= 0; step < chartProps.countValue; step++) {
          chartInstance.data.datasets[step].label = monitoringData.names[step];
          chartInstance.data.datasets[step].data = monitoringData.datas[step];
        }

        chartInstance.update();
      }
    }
  };

  useEffect(()=>{
    updateChart(monitoringData);
  }, [monitoringData]);

  return (
    <React.Fragment>
      <div className={"bg-white-100"}> 
          <canvas
            id="lineChart"
            ref={lineChartCanvasRef}
            width={chartProps.widthVal ?? "40vw"}
            height={chartProps.heightVal ?? "20vh"}
          ></canvas>
      </div>
    </React.Fragment>
  );
};

export default RTLineChart;

