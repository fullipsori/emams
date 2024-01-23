"use client";

import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export interface areaChartJsProps {
  data: {
    danpatppang: number[];
    patppungeopang: number[];
    hodugwaja: number[];
  };
  labels: string[];
}

const AreaZoom: React.FC<areaChartJsProps> = ({ data, labels }) => {
  const areaChartRef = useRef<HTMLCanvasElement | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const canvas = areaChartRef.current;

    let areaChartInstance: Chart | null = null;

    const updateZoom = () => {
      if (areaChartInstance) {
        if (areaChartInstance.options && areaChartInstance.options.scales) {
          const xScale = areaChartInstance.options.scales.x;
          if (xScale) {
            xScale.min = zoomLevel > 1 ? 2 : undefined;
            xScale.max = zoomLevel > 1 ? 6 : undefined;
          }
        }
        areaChartInstance.update();
      }
    };

    if (canvas) {
      if (Chart.getChart(canvas)) {
        Chart.getChart(canvas)?.destroy();
      }

      areaChartInstance = new Chart(canvas, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "단팥빵",
              data: data["danpatppang"],
              borderColor: "rgb(121, 94, 69)",
              borderWidth: 2,
              fill: {
                target: "origin",
                above: "rgb(121, 94, 69, 0.4)",
                below: "rgb(121, 94, 69, 0.4)",
              },
            },
            {
              label: "팥붕어빵",
              data: data["patppungeopang"],
              borderColor: "rgb(168, 139, 127)",
              borderWidth: 2,
              fill: {
                target: "origin",
                above: "rgb(168, 139, 127, 0.4)",
                below: "rgb(168, 139, 127, 0.4)",
              },
            },
            {
              label: "호두과자",
              data: data["hodugwaja"],
              borderColor: "rgb(189, 177, 111)",
              borderWidth: 2,
              fill: {
                target: "origin",
                above: "rgb(189, 177, 111, 0.4)",
                below: "rgb(189, 177, 111, 0.4)",
              },
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            filler: {
              propagate: true,
            },
            title: {
              display: true,
            },
            tooltip: {
              mode: "index",
            },
          },
          interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
          },
          scales: {
            // x: {
            //   type: "linear",
            //   position: "bottom",
            // },
            y: {
              stacked: true,
            },
          },
        },
      });
    }

    updateZoom();

    return () => {
      if (areaChartInstance) {
        areaChartInstance.destroy();
      }
    };
  }, [data, labels, zoomLevel]);

  const handleZoomIn = () => {
    setZoomLevel((prevZoomLevel) => prevZoomLevel + 1);
    console.log("zoomIn 했습니다::::", zoomLevel);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoomLevel) => Math.max(1, prevZoomLevel - 1));
    console.log("zoomOut 했습니다::::", zoomLevel);
  };

  useEffect(() => {
    console.log("zoomLevel 변경:", zoomLevel);
  }, [zoomLevel]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{
            backgroundColor: "#fff",
            paddingRight: 6,
            paddingLeft: 6,
            borderWidth: 1,
            borderColor: "#000",
            marginRight: 10,
          }}
          onClick={handleZoomIn}
        >
          +
        </button>
        <button
          style={{
            backgroundColor: "#fff",
            paddingRight: 6,
            paddingLeft: 6,
            borderWidth: 1,
            borderColor: "#000",
          }}
          onClick={handleZoomOut}
        >
          -
        </button>
      </div>
      <canvas ref={areaChartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default AreaZoom;
