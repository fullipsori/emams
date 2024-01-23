"use client";
import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface lineChartJsProps {
  data: any[];
  labels: string[];
  widthVal: number;
  heightVal: number;
}

const MultiLine: React.FC<lineChartJsProps> = ({
  data,
  labels,
  widthVal,
  heightVal,
}) => {
  const multiLineChartRef = useRef<HTMLCanvasElement | null>(null);
  const [zoomCount, setZoomCount] = useState(0);
  const randomColor = `rgb(${Math.random() * 255},${Math.random() * 255},${
    Math.random() * 255
  })`;

  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
    console.log(" 줌 했음 ", isZoomed);
  };

  useEffect(() => {
    let multiLineChartInstance: Chart<"line", number[], string> | null = null;
    const multiLineChartCanvas = multiLineChartRef.current;

    const updateZoom = () => {
      if (multiLineChartInstance) {
        if (
          multiLineChartInstance.options &&
          multiLineChartInstance.options.scales
        ) {
          const xScale = multiLineChartInstance.options.scales.x;
          if (xScale) {
            xScale.min = zoomCount > 0 ? 1 : undefined;
            xScale.max = zoomCount > 0 ? 6 : undefined;
          }
        }
        multiLineChartInstance.update();
      }
    };

    if (multiLineChartCanvas) {
      if (Chart.getChart(multiLineChartCanvas)) {
        Chart.getChart(multiLineChartCanvas)?.destroy();
      }

      multiLineChartInstance = new Chart<"line", number[], string>(
        multiLineChartCanvas,
        {
          type: "line",
          data: {
            labels: labels,
            datasets: data.map((dataset, index) => ({
              label: `Line Chart ${index + 1}`,
              data: dataset,
              borderColor: `rgb(${Math.random() * 255},${Math.random() * 255},${
                Math.random() * 255
              })`,
              borderWidth: 2,
              fill: true,
              backgroundColor: `rgba(${Math.random() * 255},${
                Math.random() * 255
              },${Math.random() * 255}, 0.4)`,
            })),
          },
        }
      );
    }

    updateZoom();

    return () => {
      if (multiLineChartInstance) {
        multiLineChartInstance.destroy();
      }
    };
  }, [data, labels, zoomCount]);

  const handleZoomIn = () => {
    setZoomCount((prevZoomCount) => prevZoomCount + 1);
    console.log("zoomIn 했습니다::::", zoomCount);
  };

  const handleZoomOut = () => {
    setZoomCount((prevZoomCount) => Math.max(0, prevZoomCount - 1));
    console.log("zoomOut 했습니다::::", zoomCount);
  };

  useEffect(() => {
    console.log("zoomCount 변경:", zoomCount);
  }, [zoomCount]);

  useEffect(() => {
    if (!isZoomed) {
      const chartCanvas = multiLineChartRef.current;
      if (chartCanvas) {
        chartCanvas.style.position = "static";
        chartCanvas.style.width = `${widthVal}px`;
        chartCanvas.style.height = `${heightVal}px`;
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
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <button
            style={{
              backgroundColor: "#e9e9e9",
              paddingRight: 6,
              paddingLeft: 6,
              borderWidth: 2,
              borderColor: "#616161",
              fontWeight: 700,
              marginRight: 10,
              borderRadius: 8,
            }}
            onClick={handleZoomIn}
          >
            +
          </button>
          <button
            style={{
              backgroundColor: "#e9e9e9",
              paddingRight: 6,
              paddingLeft: 6,
              borderWidth: 2,
              borderColor: "#616161",
              borderRadius: 8,
              fontWeight: 700,
            }}
            onClick={handleZoomOut}
          >
            -
          </button>
          <button
            style={{
              width: 20,
              marginLeft: 10,
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
          ref={multiLineChartRef}
          width={widthVal}
          height={heightVal}
        ></canvas>
      </div>
    </div>
  );
};

export default MultiLine;
