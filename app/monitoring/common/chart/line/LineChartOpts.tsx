import "../../../../../public/css/style.css";

interface ChartOption {
    count: number,
    widthVal?: string,
    heightVal?: string,
    color?: string[],
    zoomDrag?: boolean,
    zoomMode?: boolean,
    maxTickSize?: number,
    names?: string[],
    labels?: (number | string)[],
    datas?: number[][],
    disableDateAdapter?: boolean
}

const getLineChartOpts = (chartOption: ChartOption) => {
    return {
        count: chartOption.count,
        zoomMode: chartOption.zoomMode ?? false,
        disableDateAdapter: chartOption.disableDateAdapter ?? false,
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
                        type: chartOption.disableDateAdapter? undefined : 'time',
                        time: chartOption.disableDateAdapter? undefined : { displayFormats: { second: 'HH:mm:ss' } },
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
                    legend: { position: "bottom" },
                    zoom: chartOption.zoomDrag ? { zoom: { drag: { enabled: true, }, mode: "x", }, } : undefined,
                },
            },
        }

    };
};
export default getLineChartOpts;
