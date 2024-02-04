import React, { useEffect, useRef, useState } from "react";
import { Chart, ChartDataset, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-date-fns";
import { getDataSourceSelector } from "../../data/DataSource";
import { useAppSelector } from "@/hook/hook";


Chart.register(...registerables, zoomPlugin);

interface ChartProps {
  dataSourceType: string,
  chartOptions: any,
}

const RTLineChart = (chartProps: ChartProps) => {
  const lineChartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const monitoringData : any = useAppSelector(getDataSourceSelector(chartProps.dataSourceType));

  const newChart = (): Chart | null => {
    const lineChartCanvas = lineChartCanvasRef.current;
    if (!lineChartCanvas) return null;

    return new Chart(lineChartCanvas,chartProps.chartOptions.config);
  };

  /* initial loading */
  useEffect(() => {
    const lineChartCanvas = lineChartCanvasRef.current;
    let lineChartInstance: Chart | null = null;
    if (lineChartCanvas) {
      lineChartCanvas.style.position = "static";
      lineChartCanvas.style.width = chartProps.chartOptions.widthVal ?? "40vw";
      lineChartCanvas.style.height = chartProps.chartOptions.heightVal ?? "20vh";

      if (Chart.getChart(lineChartCanvas)) {
        Chart.getChart(lineChartCanvas)?.destroy();
      }
      lineChartInstance = newChart();
    }

    return () => {
      if (lineChartInstance) {
        lineChartInstance.destroy();
      }
    };
  }, []);

  const updateTitle = (title: any) => {
    if (monitoringData && monitoringData.datas) {
      let newTitle = `  ${title} : `;
      for (var i = 0; i < monitoringData.datas.length; i++) {
        const lastValue = Math.round(monitoringData.datas[i][monitoringData.datas[i].length - 1] * 100) / 100;
        newTitle += lastValue.toString();
        if (i < (monitoringData.datas.length - 1)) {
          newTitle += " / ";
        }
      }
      return newTitle;
    }
  }

  const updateChart = async (monitoringData: any) => {
    const lineChartCanvas = lineChartCanvasRef.current;
    if (lineChartCanvas) {
      const chartInstance = Chart.getChart(lineChartCanvas);
      if (chartInstance && monitoringData && monitoringData.labels && monitoringData.labels.length > 0) {
        chartInstance.data.labels = monitoringData.labels;
        if (chartInstance.options.scales && chartInstance.options.scales.x) {
          chartInstance.options.scales.x.min = monitoringData.minLabel;
        }
        for (var step = 0; step < chartProps.chartOptions.count; step++) {
          chartInstance.data.datasets[step].label = monitoringData.names[step];
          chartInstance.data.datasets[step].data = monitoringData.datas[step];
        }

        if(chartInstance.options.plugins && chartInstance.options.plugins.title && chartInstance.options.plugins.title.display) {
          chartInstance.options.plugins.title.text = updateTitle(chartProps.chartOptions.chartTitle);
        }
        chartInstance.update();
      }
    }
  };

  useEffect(() => {
    updateChart(monitoringData);
  }, [monitoringData.labels]);

  const [isZoomed, setIsZoomed] = useState(false);
  const handleZoom = () => {
    setIsZoomed(!isZoomed);
    console.log(" 줌 했음 ", isZoomed);
  };

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
            <button style={{ width: 20, marginRight: 10, visibility: chartProps.chartOptions.zoomMode? 'visible':"hidden" }} onClick={handleZoom} >
              {isZoomed ? (
                <img src="/zoom_out.png" alt="ZoomOut" />
              ) : (
                <img src="/zoom.png" alt="Zoom" />
              )}
            </button>
          </div>
          <canvas id="lineChart" ref={lineChartCanvasRef} width={(chartProps.chartOptions.widthVal || '40vw')} height={(chartProps.chartOptions.heightVal || '20vh')}></canvas>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RTLineChart;

