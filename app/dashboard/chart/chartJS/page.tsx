import Area from "@/app/components/chart/chartJs/area/area";
import AreaZoom from "@/app/components/chart/chartJs/area/areaZoom";
import Bar from "@/app/components/chart/chartJs/bar/bar";
import BothStackedBar from "@/app/components/chart/chartJs/bar/bothStackedBar";
import HorizontalBar from "@/app/components/chart/chartJs/bar/horizontalBar";
import StackedBar from "@/app/components/chart/chartJs/bar/stackedBar";
import Donut from "@/app/components/chart/chartJs/donut/donut";
import HalfDonut from "@/app/components/chart/chartJs/donut/halfDonut";
import DubleGaugePage from "@/app/components/chart/chartJs/gauge/dubleGaugePage";
import GaugeChart from "@/app/components/chart/chartJs/gauge/gauge";
import GaugeChart2 from "@/app/components/chart/chartJs/gauge/gaugeChart2";
import Line from "@/app/components/chart/chartJs/line/line";
import LineAddData from "@/app/components/chart/chartJs/line/lineAddData";
import MultiLine from "@/app/components/chart/chartJs/line/multiLine";
import RandomLine from "@/app/components/chart/chartJs/line/randomLine";
import StatusLine from "@/app/components/chart/chartJs/line/statusLine";
import Treemap from "@/app/components/chart/chartJs/treemap/treemap";
import {
  lineChartData,
  labels,
  multiLineChartData,
  doughnutChartData,
  gauageChartData,
  gaugeLabels,
  gauageChartData2,
  gaugeLabels2,
  barChartData,
  horizontalBarChartData,
  areaChartData,
  areaZoomChartData,
  areaZoomLabels,
  treemapDataset,
} from "@/data/chartData";

const ChartJs = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-red-100">
      {/* ----- Chart JS ----- */}
      <div style={{ fontSize: 30, fontWeight: 700 }} className="mb-10">
        Chart.js
      </div>
      <div className="flex flex-row mt-12 gap-10">
        <div style={{ marginBottom: 20 }}>
          <StatusLine widthVal={800} heightVal={400} />
        </div>
      </div>
      <div className="flex flex-row">
        <div>
          <Line
            data={lineChartData}
            labels={labels}
            widthVal={400}
            heightVal={300}
          />
        </div>
        <div>
          <MultiLine
            data={multiLineChartData}
            labels={labels}
            widthVal={400}
            heightVal={300}
          />
        </div>
        <div>
          <LineAddData data={multiLineChartData} labels={labels} />
        </div>
      </div>
      <div className="flex flex-row mt-12">
        <div>
          <HalfDonut
            data={doughnutChartData}
            labels={labels}
            widthVal={400}
            heightVal={300}
          />
        </div>
        <div>
          <Donut
            data={doughnutChartData}
            labels={labels}
            widthVal={400}
            heightVal={300}
          />
        </div>
      </div>
      <div className="flex flex-row mt-12 gap-10">
        <div>
          <GaugeChart data={gauageChartData} labels={gaugeLabels} />
        </div>
        <div>
          <GaugeChart2 data={gauageChartData2} labels={gaugeLabels2} />
        </div>
        <div>
          <DubleGaugePage />
        </div>
      </div>
      <div className="flex flex-row mt-12 gap-10">
        <div>
          <Bar data={barChartData} labels={labels} widthVal={0} heightVal={0} />
        </div>
        <div>
          <HorizontalBar
            data={horizontalBarChartData}
            labels={labels}
            widthVal={0}
            heightVal={0}
          />
        </div>
      </div>
      <div className="flex flex-row mt-12 gap-10">
        <div>
          <StackedBar
            maleData={lineChartData}
            femaleData={doughnutChartData}
            labels={labels}
            widthVal={400}
            heightVal={300}
          />
        </div>
        <div>
          <BothStackedBar
            maleData={lineChartData}
            femaleData={doughnutChartData}
            labels={labels}
          />
        </div>
      </div>
      <div className="flex flex-row mt-12 gap-10">
        <div>
          <Area
            data={areaChartData}
            labels={labels}
            widthVal={0}
            heightVal={0}
          />
        </div>
        <div>
          <AreaZoom data={areaZoomChartData} labels={areaZoomLabels} />
        </div>
      </div>
      <div className="flex flex-row mt-12 gap-10">
        <div>
          <RandomLine count={20} />
        </div>
        <div>
          <Treemap data={treemapDataset} />
        </div>
      </div>
    </main>
  );
};

export default ChartJs;
