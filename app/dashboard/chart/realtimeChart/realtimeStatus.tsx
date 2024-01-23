"use client";

import "../../../../public/css/style.css";
import React, { useEffect, useRef, useState } from "react";
import { Chart, ChartDataset, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

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

interface StatusLineProps {
  // countValue: number;
  widthVal: number;
  heightVal: number;
}

const RealtimeStatus = (statusLineProps: StatusLineProps) => {

  const endTimeValue = new Date();
  const startTimeValue = new Date(endTimeValue.getTime() - 2 * 60 * 60 * 1000);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomCount, setZoomCount] = useState(0);
  const [count, setCount] = useState<number>(2);
  const [legendCount, setLegendCount] = useState<number>(50);

  // const [chartWidth, setChartWidth] = useState<number>(isZoomed ? 1000 : 800);
  // const [chartHeight, setChartHeight] = useState<number>(isZoomed ? 400 : 300);

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
    /** 
    const newDataset = generateRandomDataset();
    const lineChartCanvas = lineChartCanvasRef.current;

    if (lineChartCanvas) {
      const chartInstance = Chart.getChart(lineChartCanvas);

      if (chartInstance) {
        const newLabels = Array.from({ length: legendCount }, (_, index) => {
          const currentTime = new Date();
          const labelTime = new Date(currentTime.getTime() + index * interval);
          const hours = labelTime.getHours().toString().padStart(2, "0");
          const minutes = labelTime.getMinutes().toString().padStart(2, "0");
          return `${hours}:${minutes}`;
        });

        // 차트의 데이터를 갱신
        chartInstance.data.labels = newLabels;
        chartInstance.data.datasets = [
          ...chartInstance.data.datasets.slice(0, 3),
          ...newDataset.map((dataset, index) => ({
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
        ];

        // 차트 업데이트
        chartInstance.update();
      }
    }
    */
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
        borderColor: `rgb(${Math.random() * 255},${Math.random() * 255},${
        Math.random() * 255
        })`,
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
                    maxTicksLimit: 20
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
        lineChartCanvas.style.width = `${statusLineProps.widthVal}px`;
        lineChartCanvas.style.height = `${statusLineProps.heightVal}px`;
      }
    }
  }, [isZoomed, statusLineProps.heightVal, statusLineProps.widthVal]);


  const updateData = (dateTime : Date, maxCount: number) => {
    const lineChartCanvas = lineChartCanvasRef.current;

    if (lineChartCanvas) {
      const chartInstance = Chart.getChart(lineChartCanvas);

      if (chartInstance) {
        const isShift = ((chartInstance.data.labels?.length || 0) >= maxCount)? true : false;
        console.log(isShift)
        if(isShift) {
            chartInstance.data.labels?.shift();
            chartInstance.data.datasets[0].data.shift();
            chartInstance.data.datasets[1].data.shift();
        }

        const hours = dateTime.getHours().toString().padStart(2, "0");
        const minutes = dateTime.getMinutes().toString().padStart(2, "0");
        const seconds = dateTime.getSeconds().toString().padStart(2, "0");

        chartInstance.data.labels?.push(`${hours}:${minutes}:${seconds}`)
        chartInstance.data.datasets[0].data.push(Math.random() * 100);
        chartInstance.data.datasets[1].data.push(Math.random() * 100);
        chartInstance.update();

      }
    }
  };

  useInterval( () => { updateData(new Date(), 20 ) },1000);

  return (
    <React.Fragment>
    <div className={`bg-red-100 ${isZoomed ? "box-wrapper" : ""}`}>
      <div className={`${isZoomed ? "box-container" : ""}`}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: isZoomed ? "center" : "flex-end",
            gap: 20,
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <input
            type="number"
            value={legendCount}
            onChange={handleLegendChange}
            min={0}
            max={100}
            style={{
              marginBottom: 10,
              borderColor: "#000",
              borderWidth: 1,
              paddingLeft: 5,
            }}
          />
          <input
            type="number"
            value={count}
            onChange={handleInputChange}
            min={0}
            max={100}
            style={{
              marginBottom: 10,
              borderColor: "#000",
              borderWidth: 1,
              paddingLeft: 5,
            }}
          />
          <img
            src="/zoomIn.png"
            alt="ZoomOut"
            style={{ width: 30, height: 30, cursor: "pointer" }}
            onClick={handleZoomIn}
          />
          <img
            src="/zoomOut.png"
            alt="ZoomOut"
            style={{ width: 30, height: 30, cursor: "pointer" }}
            onClick={handleZoomOut}
          />
          <button
            style={{
              backgroundColor: "rgb(177, 197, 141, 0.5)",
              paddingRight: 6,
              paddingLeft: 6,
              borderWidth: 2,
              borderColor: "#636161",
              borderRadius: 8,
              fontSize: 10,
              color: "#636161",
              height: 25,
            }}
            onClick={handleRefresh}
          >
            refresh
          </button>
          <button
            style={{
              backgroundColor: "rgb(177, 197, 141, 0.5)",
              paddingRight: 6,
              paddingLeft: 6,
              borderWidth: 2,
              borderColor: "#636161",
              borderRadius: 8,
              fontSize: 10,
              color: "#636161",
              height: 25,
            }}
            onClick={handleReset}
          >
            reset
          </button>
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
        <canvas
          id="lineChart"
          ref={lineChartCanvasRef}
          width={statusLineProps.widthVal}
          height={statusLineProps.heightVal}
        ></canvas>
      </div>
    </div>
    </React.Fragment>
  );
};

export default RealtimeStatus;
