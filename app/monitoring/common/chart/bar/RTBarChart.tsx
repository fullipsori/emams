import React, { useEffect, useRef, useState } from "react";
import { Chart, ChartConfiguration, elements } from "chart.js";
import "chartjs-adapter-date-fns";
import getDataSource from "../../data/DataSource";

interface ChartProps {
  dataSourceType: string,
  chartOptions: any,
}

const RTBarChart = (chartProps: ChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const dataSourceFunc = getDataSource(chartProps.dataSourceType);
  const monitoringData = dataSourceFunc();

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
  }, [monitoringData]);


  const updateChart = async (monitoringData: any) => {
    const chartCanvas = chartRef.current;
    if (!chartCanvas) return;

    const chartInstance = Chart.getChart(chartCanvas);
    if (!chartInstance) return;

    if (!monitoringData || !monitoringData.labels)
      return;


    chartInstance.data.labels = monitoringData.labels;
    chartInstance.data.datasets[0].data = monitoringData.datas[0];
    chartInstance.data.datasets[1].data = monitoringData.datas[1];

    chartInstance.update();
  };

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
    console.log(" 줌 했음 ", isZoomed);
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

  return (
    <React.Fragment>
      <div className={`${isZoomed ? "bg-red-100 box-wrapper " : " bg-white-100"}`}>
        <div className={`${isZoomed ? "box-container" : ""}`}>
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
            <button
              style={{
                width: 20,
                marginRight: 10,
              }}
              onClick={handleZoom}
            >
              {isZoomed ? (
                <img src="/zoom_out.png" alt="ZoomOut" />
              ) : (
                <img src="/zoom.png" alt="Zoom" />
              )}
            </button>
          </div>
          <canvas ref={chartRef} width={(chartProps.chartOptions.widthVal || '40vw')} height={(chartProps.chartOptions.heightVal || '20vh')}></canvas>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RTBarChart;
