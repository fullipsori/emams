import { AreaChart } from "@/app/components/chart/d3/area/areaChart";
import AreaChart2 from "@/app/components/chart/d3/area/areaChart2";
import BarChart from "@/app/components/chart/d3/bar/bar";
import BothStackedBarChart from "@/app/components/chart/d3/bar/bothStackedBar";
import HorizontalBarChart from "@/app/components/chart/d3/bar/horizontalBar";
import StackedBarChart from "@/app/components/chart/d3/bar/stackedBar";
import DubleGaugeTest from "@/app/components/chart/d3/gauge/dubleGaugeTest";
import GaugeTest from "@/app/components/chart/d3/gauge/gaugeTest";
import LineChart from "@/app/components/chart/d3/line/line";
import LineAddDataChart from "@/app/components/chart/d3/line/lineAddData";
import LineTest from "@/app/components/chart/d3/line/lineTest";
import MultiLineChart from "@/app/components/chart/d3/line/multiLine";
import MyChart from "@/app/components/chart/d3/myChart";
import TreemapChart from "@/app/components/chart/d3/treemap/treemap";
import { d3Data, temporaryData } from "@/data/chartData";

const D3Chart = () => {
  const AreaChartData = [
    {
      series: 0,
      data: [
        { date: new Date(2019, 2, 1), value: 20 },
        { date: new Date(2019, 2, 2), value: 45 },
        { date: new Date(2019, 2, 3), value: 30 },
      ],
    },
    {
      series: 1,
      data: [
        { date: new Date(2019, 2, 1), value: 50 },
        { date: new Date(2019, 2, 2), value: 35 },
        { date: new Date(2019, 2, 3), value: 70 },
      ],
    },
  ];

  const dataValue = [
    { percentile: 10, salary: 111900 },
    { percentile: 25, salary: 127188 },
    { percentile: 50, salary: 210793 },
    { percentile: 75, salary: 242805 },
    { percentile: 90, salary: 368399 },
  ];

  const testData = [
    { Country: "CountryA", Value: 10 },
    { Country: "CountryB", Value: 15 },
    { Country: "CountryC", Value: 8 },
  ];

  const jobSalary = { percentile: 45, salary: 80400 };
  const medianAdvertisedSalary = { percentile: 65, salary: 96969 };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-orange-100">
      {/* ----- D3 Chart ----- */}
      <div style={{ fontSize: 30, fontWeight: 700 }} className="mb-20 mt-20">
        D3 Chart
      </div>
      <div className="flex flex-row">
        <div>
          <LineChart data={d3Data} />
        </div>
        <div>
          <MultiLineChart data={temporaryData} />
        </div>
        {/* <div>
          <LineAddDataChart data={temporaryData} />
        </div> */}
      </div>
      {/* <div className="flex flex-row">
        <div>
          <MyChart data={testData} />
        </div>
      </div> */}
      <div className="flex flex-row">
        <div>
          <LineTest />
        </div>
      </div>
      <div className="flex flex-row mt-12">
        <div>
          <HorizontalBarChart data={d3Data} />
        </div>
        <div>
          <BarChart data={d3Data} />
        </div>
      </div>
      <div className="flex flex-row gap-10">
        <div>
          <BothStackedBarChart />
        </div>
        <div>
          <StackedBarChart />
        </div>
      </div>
      <div className="flex flex-row gap-10">
        <div>
          <GaugeTest />
        </div>
        <div>
          <DubleGaugeTest />
        </div>
      </div>
      <div className="flex flex-row gap-10">
        <div>
          <AreaChart
            data={dataValue}
            jobSalary={jobSalary}
            medianAdvertisedSalary={medianAdvertisedSalary}
          />
        </div>
        <div>
          <AreaChart2
            data={AreaChartData}
            width={400}
            height={300}
            top={20}
            bottom={30}
            left={30}
            right={20}
          />
        </div>
      </div>
      <div className="flex flex-row gap-10">
        <div>
          <TreemapChart />
        </div>
      </div>
    </main>
  );
};

export default D3Chart;
