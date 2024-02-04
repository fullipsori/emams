import React, { useEffect, useRef, useState } from "react";
import { Chart, ChartConfiguration, elements } from "chart.js";
import "chartjs-adapter-date-fns";
import { useAppSelector } from "@/hook/hook";
import {getDataSourceSelector} from "../../data/DataSource";
import { useRouter } from "next/navigation";

interface ChartProps {
  dataSourceType: string,
  chartOptions: any,
}

const RTBarChart = (chartProps: ChartProps) => {
  const router = useRouter();
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const monitoringData : any = useAppSelector(getDataSourceSelector(chartProps.dataSourceType));

  useEffect(() => {
    const barChartCanvas = chartRef.current;
    //차이점을 확인 : const ctx = chartRef.current?.getContext("2d");
    let chartInstance: Chart | null = null;

    if (barChartCanvas) {
      Chart.getChart(barChartCanvas)?.destroy();
      chartInstance = new Chart(barChartCanvas, chartProps.chartOptions.config);
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  useEffect(() => {
    updateChart(monitoringData);
  }, [monitoringData.labels]);


  const updateChart = async (monitoringData: any) => {
    const chartCanvas = chartRef.current;
    if (!chartCanvas) return;

    const chartInstance = Chart.getChart(chartCanvas);
    if (!chartInstance) return;

    if (!monitoringData || !monitoringData.labels || monitoringData.labels.length <= 0)
      return;


    chartInstance.data.labels = monitoringData.labels;
    for (let step = 0; step < chartProps.chartOptions.count; step++) {
      chartInstance.data.datasets[step].label = monitoringData.names[step];
      chartInstance.data.datasets[step].data = monitoringData.datas[step];
    }

    chartInstance.update();
  };



  /*
  useEffect(() => {
    if (!isZoomed) {
      const barChartCanvas = chartRef.current;
      if (barChartCanvas) {
        barChartCanvas.style.position = "static";
        barChartCanvas.style.width = (stackedBarChartProps.widthVal || '40vw') ;
        barChartCanvas.style.height = (stackedBarChartProps.heightVal || '20vh');
      }
    }
  }, [isZoomed, stackedBarChartProps.widthVal, stackedBarChartProps.heightVal]);
  */

    const handleDetail = () => {
      router.push(`/monitoring/${chartProps.dataSourceType}`);
    };

  return (
    <React.Fragment>
      <div className={"bg-white-100"}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 20,
              marginBottom: 20,
              alignItems: "center",
            }}
          >
          </div>
          <canvas ref={chartRef} width={(chartProps.chartOptions.widthVal || '40vw')} height={(chartProps.chartOptions.heightVal || '20vh')}></canvas>
      </div>
    </React.Fragment>
  );
};

export default RTBarChart;
