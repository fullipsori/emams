"use client";

import "../../../../../public/css/style.css";
import React, { useEffect, useRef, useState } from "react";
import { Chart, ChartDataset, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { createSelector } from "@reduxjs/toolkit";
import { MonitorState } from "@/redux/slices/monitoring/reducer";
import { useAppSelector } from "@/redux/hooks";

Chart.register(...registerables, zoomPlugin);

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  //useIsomorphicLayoutEffect
  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay])
}

interface ChartProps{
  // countValue: number;
  queueIndex: number;
  widthVal?: string;
  heightVal?: string;
}

const RTLineChart = (chartProps: ChartProps) => {

  const endTimeValue = new Date();
  const startTimeValue = new Date(endTimeValue.getTime() - 2 * 60 * 60 * 1000);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomCount, setZoomCount] = useState(0);
  const [count, setCount] = useState<number>(2);
  const [legendCount, setLegendCount] = useState<number>(50);

  const selectMonitoringData = createSelector(
    (state: any) => state.MonitoringReducer,
    (monitoringData: MonitorState) => ({labels:  monitoringData.chartLabels, datas: monitoringData.chartDatas[chartProps.queueIndex] }) 
  )
  const monitoringData = useAppSelector(selectMonitoringData);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10) || 0;
    setCount(newValue);
  };

  const handleLegendChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10) || 0;
    setLegendCount(newValue);
  };


  const labels: any = [];
  const lineChartCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
    console.log(" 줌 했음 ", isZoomed);
  };

  const handleRefresh = () => {
  };

  const handleReset = () => {
    const lineChartCanvas = lineChartCanvasRef.current;
    if (lineChartCanvas) {
      const chartInstance = Chart.getChart(lineChartCanvas);
      if (chartInstance) {
        chartInstance.resetZoom();
      }
    }
  };

  const defaultLineChart = (index: number) : any => {
    return ({
        label: `Line Chart ${index + 1}`,
        data: [],
        borderColor: `rgb(${Math.random() * 255},${Math.random() * 255},${ Math.random() * 255 })`,
        borderWidth: 2,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.5,
    });
  }

  useEffect(() => {
    const lineChartCanvas = lineChartCanvasRef.current;
    let lineChartInstance: Chart | null = null;

    const updateZoom = () => {
      if (lineChartInstance) {
        if (lineChartInstance.options && lineChartInstance.options.scales) {
          const xScale = lineChartInstance.options.scales.x;
          if (xScale) {
            xScale.min = zoomCount > 0 ? 1 : undefined;
            xScale.max = zoomCount > 0 ? 6 : undefined;
          }
        }
        lineChartInstance.update();
      }
    };

    if (lineChartCanvas) {
      if (Chart.getChart(lineChartCanvas)) {
        Chart.getChart(lineChartCanvas)?.destroy();
      }

      lineChartInstance = new Chart(lineChartCanvas, {
        type: "line",
        data: {
          labels: labels,
          datasets: Array.from(
                { length: count},
                (_, index) => {
                    return defaultLineChart(index);
                }
            ),
        },
        options: {
          maintainAspectRatio: false,
          animation: false,
          // animations: {
          //   radius: {
          //     duration: 400,
          //     easing: "linear",
          //     loop: (context) => context.active,
          //   },
          // },
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
      });
    }

    updateZoom();

    return () => {
      if (lineChartInstance) {
        lineChartInstance.destroy();
      }
    };
  }, [count, zoomCount, isZoomed]);

  const handleZoomIn = () => {
    setZoomCount((prevZoomCount) => prevZoomCount + 1);
    console.log("zoomIn 했습니다::::", zoomCount);
  };

  const handleZoomOut = () => {
    setZoomCount((prevZoomCount) => Math.max(0, prevZoomCount - 1));
    console.log("zoomOut 했습니다::::", zoomCount);
  };

  useEffect(() => {
    if (!isZoomed) {
      const lineChartCanvas = lineChartCanvasRef.current;
      if (lineChartCanvas) {
        lineChartCanvas.style.position = "static";
        lineChartCanvas.style.width = chartProps.widthVal ?? "40vw";
        lineChartCanvas.style.height = chartProps.heightVal ?? "20vh";
      }
    }
  }, [isZoomed]);

  const updateChart = (index: number) => {
    const lineChartCanvas = lineChartCanvasRef.current;

    if (lineChartCanvas) {
      const chartInstance = Chart.getChart(lineChartCanvas);

      if (chartInstance && monitoringData.datas !== undefined) {
        chartInstance.data.labels = monitoringData.labels;
        chartInstance.data.datasets[0].data = monitoringData.datas;
        if(chartInstance.data.datasets[1].data !== undefined && chartInstance.data.datasets[1].data.length >= 20) {
          chartInstance.data.datasets[1].data.shift();
        }
        // chartInstance.data.datasets[1].data.push(Math.random() * 100);
        chartInstance.update();
      }
    }
  };
  useEffect(()=>{
    updateChart(chartProps.queueIndex);
  }, [monitoringData]);

  return (
    <React.Fragment>
      <div className={`bg-white-100 ${isZoomed ? "box-wrapper" : ""}`}>
        <div className={`${isZoomed ? "box-container" : ""}`}>
          <canvas
            id="lineChart"
            ref={lineChartCanvasRef}
            width={chartProps.widthVal ?? "40vw"}
            height={chartProps.heightVal ?? "20vh"}
          ></canvas>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RTLineChart;
