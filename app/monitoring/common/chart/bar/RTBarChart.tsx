import React, { useEffect, useRef, useState } from "react";
import { Chart, ChartConfiguration, elements } from "chart.js";
import "chartjs-adapter-date-fns";

interface ChartProps {
  monitoringDataCallback: () => any;
  defaultChartData: () => any;
  stack: boolean;
  widthVal?: string;
  heightVal?: string;
}

const RTBarChart = (chartProps: ChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const monitoringData = chartProps.monitoringDataCallback();

  useEffect(() => {
    const barChartCanvas = chartRef.current;
    //차이점을 확인 : const ctx = chartRef.current?.getContext("2d");
    let chartInstance: Chart | null = null;

    if (barChartCanvas) {
      Chart.getChart(barChartCanvas)?.destroy();

      chartInstance = new Chart(barChartCanvas, {
        type: "bar",
        data: {
          labels: [],
          datasets: chartProps.defaultChartData(),
        },
        options: {
          animation: false,
          indexAxis: "x",
          scales: {
            x: {
              type: undefined,
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
                callback(tickValue, index, ticks) {
                  const dateTime: Date = new Date(this.getLabelForValue(index));
                  const hours = dateTime.getHours().toString().padStart(2, "0");
                  const minutes = dateTime.getMinutes().toString().padStart(2, "0");
                  const seconds = dateTime.getSeconds().toString().padStart(2, "0");
                  return `${hours}:${minutes}:${seconds}`;
                }
              },
              stacked: chartProps.stack,
              beginAtZero: true,
            },
            y: {
              stacked: chartProps.stack,
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
          // 클릭한 차트 정보
          onClick: (event, activeElements) => {
            if (chartInstance && activeElements.length > 0) {
              const activeElement = activeElements[0];
              const datasetIndex = activeElement.datasetIndex;
              const dataIndex = activeElement.index;
              const datasetLabel = chartInstance.data.datasets[datasetIndex].label;
              const dataValue = chartInstance.data.datasets[datasetIndex].data[dataIndex];
              const dataLabel = chartInstance.data.labels ?? [];
              // const dataLabelValue = dataLabel[datasetIndex];
              console.log(`${datasetLabel} :: ${dataValue}`);
            }
          },
        },
      } as ChartConfiguration);
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
          <canvas ref={chartRef} width={(chartProps.widthVal || '40vw')} height={(chartProps.heightVal || '20vh')}></canvas>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RTBarChart;
