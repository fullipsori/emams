"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import "chartjs-plugin-datalabels";

Chart.register(...registerables);

interface ChartProps {
  monitoringDataCallback: () => any;
  widthVal?: string;
  heightVal?: string;
}

const RTGaugeChart = (chartProps: ChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  // const [valueColor, setValueColor] = useState<string>("green");
  const monitoringData = chartProps.monitoringDataCallback();

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
        const score = Math.round(data.datasets[1].data[0] * 100)/100;

        function textLabel(
          value: number,
          x: any,
          y: any,
          fontSize: any,
          textBaseLine: any,
          textAlign: any
        ) {
          // ctx.font = `${fontSize}px`;
          // ctx.fillStyle = "#666";
          ctx.font = 'bolder 20px sans-serif';
          ctx.fillStyle = (value > 90)? "red" : (value > 70)? "orange" : "green";
          ctx.textBaseLine = textBaseLine;
          ctx.textAlign = textAlign;
          ctx.fillText(`${value}%`, x, y);
        }

        // textLabel("0", left, yCoor + 20, 20, "top", "left");
        // textLabel("100", right, yCoor + 20, 20, "top", "right");
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
              backgroundColor: ["green", "orange", "red"],
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
            rotation: -110,
            circumference: 220,
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

  const updateChart = async (monitoringData: any) => {
    if(!monitoringData || !monitoringData.datas)
      return;
    const chartCanvas = chartRef.current;
    if(!chartCanvas) return;

    const chartInstance = Chart.getChart(chartCanvas);
    if(!chartInstance) return;

    const gaugeValue = monitoringData.datas[monitoringData.datas.length-1];
    let colorValue = "green";
    if (gaugeValue) {
      if (gaugeValue <= 70) {
        colorValue = "green";
      } else if (gaugeValue > 70 && gaugeValue <= 90) {
        colorValue = "orange";
      } else if (gaugeValue > 90 && gaugeValue <= 100) {
        colorValue = "red";
      } else {
        // handle other cases if needed
      }
    }

    // const gradient = chartCanvas
    //   ?.getContext("2d")
    //   ?.createLinearGradient(0, 0, 300, 50);
    // gradient?.addColorStop(0, "red");
    // gradient?.addColorStop(0.7, "orange");
    // gradient?.addColorStop(1, "green");

    chartInstance.data.datasets[1].backgroundColor = [`${colorValue}`, "#c0c0c0"];
    chartInstance.data.datasets[1].data = [gaugeValue, 100-gaugeValue];
    chartInstance.data.labels = monitoringData.names;
    if(chartInstance.options.plugins?.gaugeChartText) {
      chartInstance.options.plugins.gaugeChartText.gaugeValue = gaugeValue;
    }
    chartInstance.update();

    /**  fullip: check this.
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
    */
  };

  useEffect(()=>{
    updateChart(monitoringData);
  }, [monitoringData]);

        // style={{width:"100%", height:"100%"}}>
  return (
    // <React.Fragment><canvas ref={chartRef} style={{width:"100%", height:"100%"}}></canvas></React.Fragment>
    <React.Fragment>
      <canvas 
        id="gauge-chart"
        ref={chartRef} 
        // width={chartProps.widthVal ?? "25vw"}
        height={chartProps.heightVal ?? "15vh"}
      ></canvas>
    </React.Fragment>
  );
};

export default RTGaugeChart;
