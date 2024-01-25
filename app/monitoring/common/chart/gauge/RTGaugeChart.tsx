"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import "chartjs-plugin-datalabels";

Chart.register(...registerables);

interface GaugeChartProps {
//   data: number[];
//   labels: string[];
  gaugeValue: number;
}

const RTGaugeChart = (gauageChartProps: GaugeChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [valueColor, setValueColor] = useState<string>("green");
  console.log(valueColor);
  console.log(gauageChartProps.gaugeValue);

  useEffect(() => {
    const chartCanvas = chartRef.current;

    if (gauageChartProps.gaugeValue) {
      if (gauageChartProps.gaugeValue <= 65) {
        setValueColor("green");
      } else if (gauageChartProps.gaugeValue > 65 && gauageChartProps.gaugeValue <= 85) {
        setValueColor("yellow");
      } else if (gauageChartProps.gaugeValue > 85 && gauageChartProps.gaugeValue <= 100) {
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

        if (gauageChartProps.gaugeValue <= 65) {
          rating = "좋음";
        }
        if (gauageChartProps.gaugeValue > 65 && gauageChartProps.gaugeValue <= 85) {
          rating = "보통";
        }
        if (gauageChartProps.gaugeValue > 85 && gauageChartProps.gaugeValue <= 100) {
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
          labels: ["system"],
          datasets: [
            {
              label: "Outer gauge",
              data: [70,20,10],
              backgroundColor: ["green", "yellow", "red"],
              borderWidth: 0,
              weight:0.1,
            },
            {
              label: "Inner gauge",
              data: [gauageChartProps.gaugeValue,100-gauageChartProps.gaugeValue],
              backgroundColor: [`${valueColor}`, "#c0c0c0"],
              borderWidth: 0,
              weight:0.9,
            },
          ],
        },
        options: {
            animation:false,
            cutout: "70%",
            // aspectRatio: 1.0,
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
  }, [gauageChartProps.gaugeValue, valueColor]);

  return (
  <React.Fragment><canvas ref={chartRef} style={{width:"100%", height:"100%"}}></canvas></React.Fragment>);
};

export default RTGaugeChart;
