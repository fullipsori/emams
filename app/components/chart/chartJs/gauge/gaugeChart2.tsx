"use client";

import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import "chartjs-plugin-datalabels";

Chart.register(...registerables);

interface GaugeChartProps {
  data: number[];
  labels: string[];
}

const GaugeChart2: React.FC<GaugeChartProps> = ({ data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const chartCanvas = chartRef.current;

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

        if (score < 400) {
          rating = "위험";
        }
        if (score >= 500 && score <= 700) {
          rating = "보통";
        }
        if (score > 850) {
          rating = "좋음";
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

        textLabel("300", left, yCoor + 20, 20, "top", "left");
        textLabel("850", right, yCoor + 20, 20, "top", "right");
        textLabel(score, xCoor, yCoor, 150, "bottom", "center");
        textLabel(rating, xCoor, yCoor - 120, 20, "bottom", "center");

        // 아래 선?
        // ctx.fillRect(xCoor, yCoor, 400, 1);

        // ctx.fillStyle = "#666";
        // ctx.textBaseLine = "top";
        // ctx.textAlign = "left";
        // ctx.fillText("300", left, yCoor + 20);

        // ctx.textAlign = "right";
        // ctx.fillText("850", right, yCoor + 20);

        // ctx.textBaseLine = "center";
        // ctx.textAlign = "bottom";
        // ctx.fillText(rating, xCoor, yCoor - 120);
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
              // backgroundColor: [
              //   "rgb(159, 233, 152)",
              //   "rgb(255, 241, 161)",
              //   "rgb(241, 168, 168)",
              // ],
              backgroundColor: [gradient, "#e0e0e0"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          cutout: "80%",
          aspectRatio: 1.0,
          rotation: -90,
          circumference: 180,
        },
        plugins: [gaugeChartText],
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data, labels]);

  return <canvas ref={chartRef} width="300" height="150"></canvas>;
};

export default GaugeChart2;
