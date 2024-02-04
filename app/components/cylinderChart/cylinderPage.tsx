"use client";

import { InformationProps } from "@/types/grid";
import CylinderChart from "./cylinderChart";

interface DataProps {
  data: InformationProps[];
}

const CylinderPage: React.FC<DataProps> = ({ data }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {data.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 30,
            marginTop: 20,
          }}
        >
          <div style={{}}>
            <CylinderChart
              radius={20}
              percentage={item.percentage}
              heightVal={165}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
              marginLeft: 30,
              marginRight: 200,
              width: 220,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700 }}>{item.key1}:</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{item.value1}</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700 }}>{item.key2}:</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{item.value2}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CylinderPage;
