"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import "chartjs-plugin-datalabels";

Chart.register(...registerables);

interface GaugeChartProps {
  data: number[];
  labels: string[];
  gaugeValue: number;
}

const DubleGauge2: React.FC<GaugeChartProps> = ({
  data,
  labels,
  gaugeValue,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [valueColor, setValueColor] = useState<string>("green");
  console.log(valueColor);
  console.log(gaugeValue);

  useEffect(() => {
    const chartCanvas = chartRef.current;

    if (gaugeValue) {
      if (gaugeValue <= 65) {
        setValueColor("green");
      } else if (gaugeValue > 65 && gaugeValue <= 85) {
        setValueColor("yellow");
      } else if (gaugeValue > 85 && gaugeValue <= 100) {
        setValueColor("red");
      } else {
        // handle other cases if needed
      }
    }

    const gaugeChartText = {
      id: "gaugeChartText",
      afterDatasetsDraw(chart: any, args: any, pluginOptions: any) {
        const {
          ctx,
          data,
          chartArea: { top, bottom, left, right, width, height },
          scales: { r },
        } = chart;

        ctx.save();
        // console.log(chart.getDatasetMeta(0).data);

        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        const score = data.datasets[0].data[0];

        let rating;

        if (gaugeValue <= 65) {
          rating = "좋음";
        }
        if (gaugeValue > 65 && gaugeValue <= 85) {
          rating = "보통";
        }
        if (gaugeValue > 85 && gaugeValue <= 100) {
          rating = "위험";
        }

        function textLabel(
          text: any,
          x: any,
          y: any,
          fontSize: any,
          textBaseLine: any,
          textAlign: any
        ) {
          ctx.font = "30px";
          ctx.fillStyle = "#666";
          ctx.textBaseLine = textBaseLine;
          ctx.textAlign = textAlign;
          ctx.fillText(text, x, y);
        }

        textLabel("0", left, yCoor + 20, 20, "top", "left");
        textLabel("100", right, yCoor + 20, 20, "top", "right");
        textLabel(score, xCoor, yCoor, 150, "bottom", "center");
        textLabel(rating, xCoor, yCoor - 120, 20, "bottom", "center");
      },
    };

    let chartInstance: Chart<"doughnut", number[], string> | null = null;

    if (chartCanvas) {
      if (Chart.getChart(chartCanvas)) {
        Chart.getChart(chartCanvas)?.destroy();
      }

      const gradient = chartCanvas
        ?.getContext("2d")
        ?.createLinearGradient(0, 0, 300, 50);
      gradient?.addColorStop(0, "red");
      gradient?.addColorStop(0.7, "yellow");
      gradient?.addColorStop(1, "green");

      chartInstance = new Chart(chartCanvas, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Weekly Sales",
              data: data,
              backgroundColor: [`${valueColor}`, "#c0c0c0"],
              // backgroundColor: [gradient, "#e0e0e0"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          cutout: "85%",
          aspectRatio: 1.0,
          rotation: -90,
          circumference: 180,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
        plugins: [gaugeChartText],
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data, labels, gaugeValue, valueColor]);

  return <canvas ref={chartRef} width="280" height="140"></canvas>;
};

export default DubleGauge2;
