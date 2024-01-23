"use client";

import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export interface lineChartJsProps {
  data: any[];
  labels: string[];
}

const LineAddData: React.FC<lineChartJsProps> = ({ data, labels }) => {
  const lineChartRef = useRef<HTMLCanvasElement | null>(null);
  const [widthValue, setWidthValue] = useState(400);
  const [heightValue, setHeightValue] = useState(200);
  const [isZoomed, setIsZoomed] = useState(false);

  const [datasets, setDatasets] = useState(
    data.map((dataset, index) => ({
      label: `Chart ${index + 1}`,
      data: dataset,
      borderColor: `rgb(${Math.random() * 255},${Math.random() * 255},${
        Math.random() * 255
      })`,
      borderWidth: 2,
      fill: false,
    }))
  );

  useEffect(() => {
    let lineChartInstance: Chart<"line", number[], string> | null = null;

    if (lineChartRef.current) {
      if (Chart.getChart(lineChartRef.current)) {
        Chart.getChart(lineChartRef.current)?.destroy();
      }

      lineChartInstance = new Chart<"line", number[], string>(
        lineChartRef.current,
        {
          type: "line",
          data: {
            labels: labels,
            datasets: datasets,
          },
        }
      );
    }

    return () => {
      if (lineChartInstance) {
        lineChartInstance.destroy();
      }
    };
  }, [datasets, labels, widthValue, heightValue]);

  const handleAddLine = () => {
    const newDataPoints = Array.from({ length: labels.length }, () =>
      Math.floor(Math.random() * 50)
    );

    setDatasets((prevDatasets) => [
      ...prevDatasets,
      {
        label: `Chart ${prevDatasets.length + 1}`,
        data: newDataPoints,
        borderColor: `rgb(${Math.random() * 255},${Math.random() * 255},${
          Math.random() * 255
        })`,
        borderWidth: 2,
        fill: false,
      },
    ]);
  };

  const handleZoom = () => {
    console.log(isZoomed);
    if (isZoomed) {
      setWidthValue(400);
      setHeightValue(200);
    } else {
      setWidthValue(window.innerWidth);
      setHeightValue(window.innerHeight);
    }

    setIsZoomed((prev) => !prev);
  };

  return (
    <div>
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
          onClick={handleAddLine}
        >
          add
        </button>
      </div>
      <canvas
        ref={lineChartRef}
        width={widthValue}
        height={heightValue}
      ></canvas>
    </div>
  );
};

export default LineAddData;
