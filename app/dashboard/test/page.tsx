import CylinderChart from "@/app/components/diagram/percentage";
import SankeyD3Chart2 from "@/app/components/chart/d3/sankey/sankeyD3Chart2";
import ProgressBar from "@/app/components/component/progressBar";
import ProgressComponent from "@/app/components/component/progressComponent";
import ProgressPage from "@/app/components/component/progressPage";

const Test = () => {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-sky-100">
        <ProgressPage />
        <CylinderChart radius={50} percentage={40} />
        <div style={{ marginBottom: 20 }}>
          <SankeyD3Chart2 title={"Application 명"} />
        </div>
      </main>
    </div>
  );
};

export default Test;
