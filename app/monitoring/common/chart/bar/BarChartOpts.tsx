import { ChartConfiguration } from "chart.js";
import "../../../../../public/css/style.css";

interface ChartOption {
    count: number,
    widthVal?: string,
    heightVal?: string,
    color?: string[],
    zoomDrag?: boolean,
    zoomMode?: boolean,
    detailMode?: boolean,
    maxTickSize?: number,
    names?: string[],
    labels?: (number | string)[],
    datas?: number[][],
    legendPos?: string,
    isStack ?: boolean,
    stackName ?: string[],
    enableDateAdapter?: boolean,
}

const getBarChartOpts = (chartOption: ChartOption) => {
    return {
        count: chartOption.count,
        widthVal: chartOption.widthVal ?? undefined,
        heightVal: chartOption.heightVal ?? undefined,
        zoomMode: chartOption.zoomMode ?? false,
        detailMode: chartOption.detailMode ?? true,
        enableDateAdapter: chartOption.enableDateAdapter ?? false,
        config : {
            type: "bar",
            data: {
                labels: chartOption.labels ?? [],
                datasets: Array.from({ length: chartOption.count }, (_, index) => {
                    return ({
                        label: chartOption.names?.at(index) ?? `item-${index}`,
                        data: chartOption.datas?.at(index) ?? [],
                        backgroundColor: chartOption.color?.at(index) ?? ["rgba(82,90,124,0.5)", "rgba(129,132,184, 0.5)"].at(index%2),
                        stack: chartOption.stackName ?? "Stack 1",
                    });
                }),
            },
            options: {
                animation: false,
                indexAxis: "x", //fullip
                scales: {
                    x: {
                        ticks: {
                            font: {
                                family: 'Poppins',
                            },
                            autoSkip: true,
                            maxTicksLimit: chartOption.maxTickSize ?? 10,
                            callback(tickValue, index, ticks) {
                                const dateTime: Date = new Date(this.getLabelForValue(index));
                                const hours = dateTime.getHours().toString().padStart(2, "0");
                                const minutes = dateTime.getMinutes().toString().padStart(2, "0");
                                const seconds = dateTime.getSeconds().toString().padStart(2, "0");
                                return `${hours}:${minutes}:${seconds}`;
                            },
                        },
                        stacked: chartOption.isStack ?? false,
                        beginAtZero: true,
                    },
                    y: {
                        stacked: chartOption.isStack ?? false,
                        ticks: {
                            font: {
                                family: 'Poppins',
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
                    legend: chartOption.legendPos ? { position: chartOption.legendPos } : undefined ,
                    zoom: chartOption.zoomDrag ? { zoom: { drag: { enabled: true, }, mode: "x", }, } : undefined,
                },
                /* custom
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
                */
            },
        } as ChartConfiguration

    };
};
export default getBarChartOpts;
