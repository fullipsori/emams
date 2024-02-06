import { ChartConfiguration } from "chart.js";

interface ChartOption {
    count: number,
    widthVal?: string,
    heightVal?: string,
    color?: string[],
    zoomDrag?: boolean,
    zoomMode?: boolean,
    maxTickSize?: number,
    chartTitle?: string,
    names?: string[],
    labels?: (number | string)[],
    datas?: number[][],
    legendPos?: string,
    enableDateAdapter ?: boolean
}

const getLineChartOpts = (chartOption: ChartOption) => {
    return {
        count: chartOption.count,
        widthVal: chartOption.widthVal,
        heightVal: chartOption.heightVal,
        zoomMode: chartOption.zoomMode ?? false,
        chartTitle: chartOption.chartTitle,
        enableDateAdapter: chartOption.enableDateAdapter ?? true,
        config: {
            type: "line",
            data: {
                labels: chartOption.labels ?? [],
                datasets: Array.from({ length: chartOption.count }, (_, index) => {
                    return ({
                        label: chartOption.names?.at(index) ?? "",
                        data: chartOption.datas?.at(index) ?? [],
                        borderColor: chartOption.color?.at(index) ?? `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
                        borderWidth: 2,
                        fill: true,
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        tension: 0.5,
                    });
                }),
            },
            options: {
                animation: false,
                scales: {
                    x: {
                        type: chartOption.enableDateAdapter == false ?  undefined : 'time',
                        time: chartOption.enableDateAdapter == false ?  undefined : { displayFormats: { second: 'HH:mm:ss' } },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: chartOption.maxTickSize ?? 20,
                        },
                    },
                    y: {
                        ticks: {
                        },
                        min: 0,
                    },
                },
                interaction: {
                    mode: "nearest",
                    intersect: false,
                    axis: "x",
                },
                plugins: {
                    legend: {
                        display: false,
                        position: chartOption.legendPos ?? "bottom",
                    },
                    zoom: chartOption.zoomDrag ? { zoom: { drag: { enabled: true, }, mode: "x", }, } : undefined,
                    title: {
                        display: (chartOption.chartTitle)? true : false,
                        text: (chartOption.chartTitle)? `  ${chartOption.chartTitle}` : undefined,
                        font: {
                            weight: 'bold',
                            size: 16,
                        },
                        align: 'start', 
                        padding: {
                            top: 0,
                            bottom: 15,
                        }
                    }
                },
            },
        } as ChartConfiguration

    };
};
export default getLineChartOpts;
