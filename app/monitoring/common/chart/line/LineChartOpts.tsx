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
    enableDateAdapter ?: boolean
}

const getLineChartOpts = (chartOption: ChartOption) => {
    return {
        count: chartOption.count,
        widthVal: chartOption.widthVal,
        heightVal: chartOption.heightVal,
        zoomMode: chartOption.zoomMode ?? false,
        detailMode: chartOption.detailMode ?? true,
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
                            font: {
                                family: 'Poppins',
                            },
                            autoSkip: true,
                            maxTicksLimit: chartOption.maxTickSize ?? 20,
                        },
                    },
                    y: {
                        ticks: {
                            font: {
                                family: 'Poppins',
                            },
                        },
                    },
                },
                interaction: {
                    mode: "nearest",
                    intersect: false,
                    axis: "x",
                },
                plugins: {
                    legend: chartOption.legendPos ? { position: chartOption.legendPos } :{ position: "bottom" },
                    zoom: chartOption.zoomDrag ? { zoom: { drag: { enabled: true, }, mode: "x", }, } : undefined,
                },
            },
        }

    };
};
export default getLineChartOpts;
