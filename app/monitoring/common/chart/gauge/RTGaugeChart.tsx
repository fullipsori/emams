"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import "chartjs-plugin-datalabels";
import { createSelector } from "@reduxjs/toolkit";
import { MonitorState } from "@/redux/slices/monitoring/reducer";
import { useAppSelector } from "@/redux/hooks";

Chart.register(...registerables);

interface GaugeChartProps {
//   data: number[];
//   labels: string[];
  gaugeIndex: number
}

const RTGaugeChart = (gauageChartProps: GaugeChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  // const [valueColor, setValueColor] = useState<string>("green");

  const selectMonitoringData = createSelector(
    (state: any) => state.MonitoringReducer,
    (monitoringData: MonitorState) => ({labels:  monitoringData.chartLabels, datas: monitoringData.chartDatas[gauageChartProps.gaugeIndex] }) 
  )
  const monitoringData = useAppSelector(selectMonitoringData);

  useEffect(()=>{
    updateChart();
  }, [monitoringData]);

  const gaugeChartText = {
     id: "gaugeChartText",
     beforeDraw: (chart: any, args: any, options: any) => {
        const {
          ctx,
          data,
          chartArea: { top, bottom, left, right, width, height },
          scales: { r },
        } = chart;

        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        const score = Math.round(data.datasets[1].data[0]);

        /** 
        let rating;

        if (options.gaugeValue <= 65) {
          rating = "좋음";
        }
        if (options.gaugeValue > 65 && options.gaugeValue <= 85) {
          rating = "보통";
        }
        if (options.gaugeValue > 85 && options.gaugeValue <= 100) {
          rating = "위험";
        }
        */

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
        // textLabel(rating, xCoor, yCoor - 120, 20, "bottom", "center");
      },
  };

  const defaultChart = (value: number) : any => {
    return ({
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
              data: [value, 100-value],
              backgroundColor: ["green", "#c0c0c0"],
              borderWidth: 0,
              weight:0.9,
            },
          ],
        },
        options: {
            animation:false,
            cutout: "70%",
            rotation: -90,
            circumference: 180,
            plugins: {
                legend: {
                    display: false,
                },
                gaugeChartText: {
                  gaugeVale : 0,
                }
            },
        },
        plugins: [gaugeChartText],
      });
  }

  useEffect(() => {
    const gaugeChartCanvas = chartRef.current;
    let chartInstance: Chart<"doughnut", number[], string> | null = null;

    if(gaugeChartCanvas) {
      Chart.getChart(gaugeChartCanvas)?.destroy();
      chartInstance = new Chart(gaugeChartCanvas, defaultChart(0));
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  const updateChart = async () => {
    if(!monitoringData || !monitoringData.datas)
      return;
    const chartCanvas = chartRef.current;
    if(!chartCanvas) return;

    const chartInstance = Chart.getChart(chartCanvas);
    if(!chartInstance) return;

    const gaugeValue = monitoringData.datas[monitoringData.datas.length-1];
    let colorValue = "green";
    if (gaugeValue) {
      if (gaugeValue <= 65) {
        colorValue = "green";
      } else if (gaugeValue > 65 && gaugeValue <= 85) {
        colorValue = "yellow";
      } else if (gaugeValue > 85 && gaugeValue <= 100) {
        colorValue = "red";
      } else {
        // handle other cases if needed
      }
    }

    // const gradient = chartCanvas
    //   ?.getContext("2d")
    //   ?.createLinearGradient(0, 0, 300, 50);
    // gradient?.addColorStop(0, "red");
    // gradient?.addColorStop(0.7, "yellow");
    // gradient?.addColorStop(1, "green");

    chartInstance.data.datasets[1].backgroundColor = [`${colorValue}`, "#c0c0c0"];
    chartInstance.data.datasets[1].data = [gaugeValue, 100-gaugeValue];
    if(chartInstance.options.plugins?.gaugeChartText) {
      chartInstance.options.plugins.gaugeChartText.gaugeValue = gaugeValue;
    }
    chartInstance.update();

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  };

  return (
    <React.Fragment><canvas ref={chartRef} style={{width:"100%", height:"100%"}}></canvas></React.Fragment>
  );
};

export default RTGaugeChart;
