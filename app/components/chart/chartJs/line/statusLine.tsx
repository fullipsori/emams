"use client";

import "../../../../../public/css/style.css";
import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(...registerables, zoomPlugin);

interface StatusLineProps {
  // countValue: number;
  widthVal: number;
  heightVal: number;
}

const StatusLine: React.FC<StatusLineProps> = ({
  // countValue,
  widthVal,
  heightVal,
}) => {
  const endTimeValue = new Date();
  const startTimeValue = new Date(endTimeValue.getTime() - 2 * 60 * 60 * 1000);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomCount, setZoomCount] = useState(0);
  const [count, setCount] = useState<number>(2);
  const [legendCount, setLegendCount] = useState<number>(50);
  // const [chartWidth, setChartWidth] = useState<number>(isZoomed ? 1000 : 800);
  // const [chartHeight, setChartHeight] = useState<number>(isZoomed ? 400 : 300);

  console.log(isZoomed);
  // console.log(chartWidth);
  // console.log(chartHeight);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10) || 0;
    setCount(newValue);
  };

  const handleLegendChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10) || 0;
    setLegendCount(newValue);
  };

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

  var startTime: any;
  {
  const currentTime = new Date(startTimeValue.getTime() - 3*60*1000);
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  startTime = `${hours}:${minutes}`;
  }
  console.log(startTime);

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

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
    console.log(" 줌 했음 ", isZoomed);
  };

  const handleRefresh = () => {
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
          scales: {
            x: {
              min: startTime,
            }
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
        lineChartCanvas.style.width = `${widthVal}px`;
        lineChartCanvas.style.height = `${heightVal}px`;
      }
    }
  }, [isZoomed, heightVal, widthVal]);

  // useEffect(() => {
  //   setChartWidth(isZoomed ? 1000 : 800);
  //   setChartHeight(isZoomed ? 400 : 300);
  // }, [isZoomed]);

  return (
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
          width={widthVal}
          height={heightVal}
        ></canvas>
      </div>
    </div>
  );
};

export default StatusLine;
