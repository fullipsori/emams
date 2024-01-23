export const labels = ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"];
export const areaZoomLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];
export const gaugeLabels = ["Level.1", "Level.2", "Level.3"];
export const gaugeLabels2 = ["Level.1", "Level.2"];

export const lineChartData = [10, 20, 15, 25, 18];
export const multiLineChartData = [
  [10, 20, 15, 5, 18],
  [15, 20, 10, 24, 22],
  [17, 33, 1, 14, 12],
];
export const barChartData = [15, 25, -18, 30, 22];
export const chartData1 = [5, 21, 18, 32, 13, 6, 23, 35];
export const chartData2 = [15, 25, 17, 20, 2, 12, 22, 4];
export const horizontalBarChartData = [15, 25, 18, -6, 22];
export const doughnutChartData = [30, 20, 10, 25, 15];
export const areaChartData = [10, -13, 3, 25, -15];
// export const areaZoomChartData = [10, 13, 3, 25, 15, 32, 23, 3];
export const areaZoomChartData = {
  danpatppang: [10, 15, 7, 25, 20, 30, 18, 12],
  patppungeopang: [5, 12, 15, 22, 17, 28, 25, 8],
  hodugwaja: [15, 18, 10, 30, 25, 22, 20, 14],
};
export const gauageChartData = [200, 400, 700];
export const gauageChartData2 = [401, 200];

interface TreemapDataset {
  label: string;
  key: string;
  groups: string[];
  fontColor: string;
  fontSize: number;
  fontWeight: string;
  tree: any[];
  spacing: number;
  borderWidth: number;
  borderColor: string;
}

export const treemapDataset: TreemapDataset = {
  label: "treemap",
  key: "price",
  groups: ["displayValue"],
  fontColor: "grey",
  fontSize: 16,
  fontWeight: "bold",
  tree: [
    { price: 100, name: "BTC" },
    { price: 20, name: "ETX" },
    { price: 6, name: "XRP" },
    { price: 6, name: "DGE" },
    { price: 0.4, name: "TRD" },
    { price: 40, name: "TVD" },
    { price: 10, name: "FRO" },
    { price: 10, name: "GEO" },
    { price: 63, name: "ABC" },
  ].map((item) => {
    const { name, price } = item;
    const displayValue = `Subtheme: ${name} ${price}`;
    return { ...item, displayValue };
  }),
  spacing: 0.1,
  borderWidth: 1,
  borderColor: "rgba(255, 255, 255, 0.5)",
};

export const d3Data = [
  { Country: "A", Value: 50 },
  { Country: "B", Value: 80 },
  { Country: "C", Value: 120 },
  { Country: "D", Value: 10 },
  { Country: "E", Value: 150 },
  // { Country: "F", Value: -2000 },
];

export const temporaryData = [
  { name: "Group1", year: 2020, n: 15 },
  { name: "Group1", year: 2021, n: 25 },
  { name: "Group1", year: 2022, n: 13 },
  { name: "Group2", year: 2020, n: 17 },
  { name: "Group2", year: 2021, n: 19 },
  { name: "Group2", year: 2022, n: 15 },
  { name: "Group3", year: 2020, n: 24 },
  { name: "Group3", year: 2021, n: 28 },
  { name: "Group3", year: 2022, n: 21 },
  { name: "Group4", year: 2020, n: 11 },
  { name: "Group4", year: 2021, n: 3 },
  { name: "Group4", year: 2022, n: 8 },
  { name: "Group5", year: 2020, n: 12 },
  { name: "Group5", year: 2021, n: 30 },
  { name: "Group5", year: 2022, n: 28 },
];

interface DataNode {
  name: string;
  shortName: string;
  size?: number | null;
  children: DataNode[];
}

export const treemapData: DataNode = {
  name: "Treemap Test",
  shortName: "Test",
  size: null,
  children: [
    {
      name: "Category 1",
      shortName: "카테고리1",
      size: 500,
      children: [
        {
          name: "왕밤빠앙",
          shortName: "왕밤빠앙",
          size: 59,
          children: [],
        },
        {
          name: "붕어빠앙",
          shortName: "붕어빠앙",
          size: 248,
          children: [],
        },
      ],
    },
    {
      name: "Category 2",
      shortName: "카테고리2",
      size: 200,
      children: [
        {
          name: "계란빠앙",
          shortName: "계란빠앙",
          size: 92,
          children: [],
        },
        {
          name: "호두과자",
          shortName: "호두과자",
          size: 405,
          children: [],
        },
      ],
    },
  ],
};

export const temporaryData1 = [
  { percentile: 10, salary: 50000 },
  { percentile: 20, salary: 55000 },
  { percentile: 30, salary: 60000 },
  { percentile: 40, salary: 65000 },
  { percentile: 50, salary: 70000 },
  { percentile: 60, salary: 75000 },
  { percentile: 70, salary: 80000 },
  { percentile: 80, salary: 85000 },
  { percentile: 90, salary: 90000 },
  { percentile: 100, salary: 95000 },
];

export const StackedBar2Data = {
  dataset1: [30, 40, 50, 12, 33, 21, 2, 34],
  dataset2: [20, 25, 30, 11, 35, 43, 22, 9],
  dataset3: [10, 15, 20, 21, 33, 52, 12, 11],
};
