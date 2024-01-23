"use client";

import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { chartJsProps } from "@/types/chartJs";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(...registerables, zoomPlugin);

const Line: React.FC<chartJsProps> = ({
  data,
  labels,
  widthVal,
  heightVal,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const lineChartCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
    console.log(" 줌 했음 ", isZoomed);
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
              label: "Line Chart",
              data: data,
              borderColor: "rgb(135,206,235)",
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          plugins: {
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
  }, [data, labels]);

  useEffect(() => {
    if (!isZoomed) {
      const chartCanvas = lineChartCanvasRef.current;
      if (chartCanvas) {
        chartCanvas.style.position = "static";
        chartCanvas.style.width = `${widthVal}px`;
        chartCanvas.style.height = `${heightVal}px`;
      }
    }
  }, [isZoomed, widthVal, heightVal]);

  return (
    <div className={`bg-red-100 ${isZoomed ? "box-wrapper" : ""}`}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          style={{
            backgroundColor: "rgb(177, 197, 141, 0.5)",
            paddingRight: 6,
            paddingLeft: 6,
            borderWidth: 2,
            borderColor: "#636161",
            borderRadius: 8,
            marginRight: 10,
            fontSize: 10,
            color: "#636161",
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
  );
};

export default Line;
