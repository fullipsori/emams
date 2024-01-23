"use client";

import {
  statusData,
  topData1,
  topData2,
  topData3,
  topColumns,
} from "@/data/gridData";
import GridDropdown from "../components/Dropdown/gridDropdown/gridDropdown";
import GridStatusDropdown from "../components/Dropdown/gridDropdown/gridStatusDropdown";
import {
  StackedBar2Data,
  areaZoomLabels,
  labels,
  lineChartData,
} from "@/data/chartData";
import BoxComponent from "../components/box/boxComponent";
import StackedBar2 from "../components/chart/chartJs/bar/stackedBar2";
import { useState } from "react";
import "../../public/css/style.css";
import Line from "../components/chart/chartJs/line/line";

const Dashboard = () => {
  const [selectedChartData, setSelectedChartData] = useState<any[]>([]);

  console.log("받아온 데이터:::", selectedChartData);

  const handleChartDataSelect = (data: any[]) => {
    setSelectedChartData(data);
    console.log("???", data);
  };
  const data = [
    {
      key: selectedChartData[0]?.key[0],
      value: selectedChartData[0]?.value[0],
    },
    {
      key: selectedChartData[0]?.key[1],
      value: selectedChartData[0]?.value[1],
    },
    {
      key: selectedChartData[0]?.key[2],
      value: selectedChartData[0]?.value[2],
    },
  ];

  console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-stone-200">
      <div className="flex flex-row gap-5">
        <div>
          <GridStatusDropdown title={"Broker Status"} data={statusData} />
        </div>
        <div>
          <GridDropdown
            title={"Pending Message Top5"}
            data={topData3}
            columns={topColumns}
          />
        </div>
        <div>
          <GridDropdown
            title={"10mins LowMessage In Rate Top5"}
            data={topData1}
            columns={topColumns}
          />
        </div>
        <div>
          <GridDropdown
            title={"10mins HighMessage In Rate Top5"}
            data={topData2}
            columns={topColumns}
          />
        </div>
      </div>
      <div className="flex flex-row gap-5">
        <BoxComponent
          children={
            <StackedBar2
              data={StackedBar2Data}
              labels={areaZoomLabels}
              widthVal={800}
              heightVal={200}
              onChartDataSelect={handleChartDataSelect}
            />
          }
        />
        <div>
          <GridDropdown
            title={"선택한 차트에 해당하는 데이터"}
            data={data}
            columns={topColumns}
          />
        </div>
        {/* <BoxComponent
          children={
            <Line
              data={lineChartData}
              labels={labels}
              widthVal={400}
              heightVal={300}
            />
          }
        /> */}
      </div>
    </main>
  );
};

export default Dashboard;
