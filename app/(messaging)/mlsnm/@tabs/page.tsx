"use client";

import ConfigBox from "@/app/components/box/configuration/configBox";
import CylinderPage from "@/app/components/cylinderChart/cylinderPage";
import StatusLineChart from "@/app/components/lineChart/statusLineChart";
import { ConfigData, InformationData } from "@/data/gridData";
import { useState } from "react";

export default function Page() {
  const [msgs, setMsgs] = useState<boolean>(true);
  const [size, setSize] = useState<boolean>(false);

  const handleMsgsBtnClick = () => {
    alert("msgs를 클릭했습니다");
    setMsgs(true);
    setSize(false);
  };

  const handleSizeBtnClick = () => {
    alert("size를 클릭했습니다");
    setMsgs(false);
    setSize(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: 30,
        gap: 70,
        // justifyContent: "space-around",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 10 }}>
          HA Configuration Status
          <div
            style={{
              borderStyle: "solid",
              borderColor: "gray",
              borderWidth: 0.5,
              marginBottom: 10,
              marginTop: 5,
            }}
          />
        </div>
        <div style={{ marginLeft: 30 }}>
          <ConfigBox data={ConfigData} />
        </div>
        <div
          style={{
            borderStyle: "solid",
            borderColor: "gray",
            borderWidth: 0.5,
            marginTop: 50,
            marginBottom: 10,
          }}
        />
        <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 10 }}>
          Basic Information
        </div>
        {/* <CylinderChart radius={10} percentage={20} /> */}
        <CylinderPage data={InformationData} />
      </div>
      <div>
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>PendingMessage</div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 16,
                paddingRight: 5,
                paddingLeft: 5,
              }}
            >
              [
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
                color: msgs === true ? "#fdb351" : "gray",
              }}
              onClick={handleMsgsBtnClick}
            >
              msgs
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 16,
                paddingRight: 5,
                paddingLeft: 5,
              }}
            >
              |
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
                color: size === true ? "#fdb351" : "gray",
              }}
              onClick={handleSizeBtnClick}
            >
              size
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 20,
                paddingRight: 5,
                paddingLeft: 5,
              }}
            >
              ]
            </div>
          </div>
        </div>
        <StatusLineChart widthVal={500} heightVal={150} />
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>
            Message In / Out Rate
          </div>
        </div>
        <StatusLineChart widthVal={500} heightVal={150} />
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>HA Status</div>
        </div>
        <StatusLineChart widthVal={500} heightVal={150} />
      </div>
    </div>
  );
}
