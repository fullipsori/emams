"use client";

import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { ChartConfiguration } from "chart.js";
import "chartjs-plugin-datalabels";

Chart.register(...registerables);

interface GaugeChartProps {
  data: number[];
  labels: string[];
}

const GaugeChart1: React.FC<GaugeChartProps> = ({ data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const chartCanvas = chartRef.current;

    const gaugeNeedle = {
      id: "gaugeNeedle",
      afterDatasetsDraw(chart: any, args: any, plugins: any) {
        const { ctx, data } = chart;

        ctx.save();
        // console.log(chart.getDatasetMeta(0).data);

        const xCenter = chart.getDatasetMeta(0).data[0].x;
        const yCenter = chart.getDatasetMeta(0).data[0].y;
        const outRadius = chart.getDatasetMeta(0).data[0].outerRadius;
        const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;

        const widthSlice = (outRadius - innerRadius) / 2;

        ctx.translate(xCenter, yCenter);
        const radius = 10;
        const angle = Math.PI / 180;

        const needleValue = data.datasets[0].needleValue;
        const dataTotal = data.datasets[0].data.reduce(
          (a: any, b: any) => a + b,
          0
        );
        const circumference =
          (chart.getDatasetMeta(0).data[0].circumference /
            Math.PI /
            data.datasets[0].data[0]) *
          needleValue;
        // console.log(dataTotal);
        ctx.rotate(Math.PI * (circumference + 1.5));

        // needle
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.lineWidth = 2;

        ctx.moveTo(0 - radius, 0);
        ctx.lineTo(0, 0 - innerRadius - widthSlice);
        ctx.lineTo(0 + radius, 0);

        ctx.stroke();
        ctx.fill();
        ctx.restore();

        //dot
        // ctx.beginPath();
        // ctx.arc(0, 0, radius, 0, angle * 360, false);
        // ctx.fill();
      },
    };

    let chartInstance: Chart<"doughnut", number[], string> | null = null;

    if (chartCanvas) {
      if (Chart.getChart(chartCanvas)) {
        Chart.getChart(chartCanvas)?.destroy();
      }

      chartInstance = new Chart(chartCanvas, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: [
                "rgb(100, 90, 61)",
                "rgb(153, 186, 196)",
                "rgb(175, 138, 166)",
              ],
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
        plugins: [gaugeNeedle],
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

export default GaugeChart1;
