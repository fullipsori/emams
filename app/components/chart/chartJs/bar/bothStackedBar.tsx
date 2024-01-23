"use client";

import React, { useEffect, useRef } from "react";
import { Chart, ChartConfiguration, elements } from "chart.js";

interface StackedBarChartProps {
  maleData: number[];
  femaleData: number[];
  labels: string[];
}

const BothStackedBar: React.FC<StackedBarChartProps> = ({
  maleData,
  femaleData,
  labels,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    const tooltip = {
      xAlign: "bottom",
      titleAlign: "center",
      callback: {
        label: function (context: any) {
          console.log("context:::", context.raw);
          return `${context.dataset.label} ${Math.abs(context.raw)}`;
        },
      },
    };

    if (ctx) {
      const female = femaleData;
      const femaleDataVaue: any[] = [];
      female.forEach((elements) => femaleDataVaue.push(elements * -1));

      // const tooltips = {
      //   yAlign: "bottom",
      //   titleAlign: "center",
      //   callbacks: {
      //     label: function (context: any) {
      //       return `${context.dataset.label} ${Math.abs(context.raw)}`;
      //     },
      //   },
      // };

      const stackedBarChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Male",
              data: maleData,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              stack: "Stack 1",
            },
            {
              label: "Female",
              // data: femaleData.map((value) => -value),
              data: femaleDataVaue,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              stack: "Stack 1",
            },
          ],
        },
        options: {
          indexAxis: "x",
          scales: {
            x: {
              stacked: true,
              beginAtZero: true,
            },
            y: {
              stacked: true,
              ticks: {
                callback: function (value: any, index, values) {
                  return Math.abs(value);
                },
              },
            },
          },
          plugins: {
            tooltip: {
              yAlign: "bottom",
              titleAlign: "center",
              callbacks: {
                label: function (context: any) {
                  return `${context.dataset.label} ${Math.abs(context.raw)}`;
                },
              },
            },
          },
        },
      } as ChartConfiguration);

      return () => {
        stackedBarChart.destroy();
      };
    }
  }, [maleData, femaleData, labels]);

  return <canvas ref={chartRef} width="400" height="300"></canvas>;
};

export default BothStackedBar;
