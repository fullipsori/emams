"use client";

import Input from "@/app/components/input/input";
import ProgressComponent from "@/app/components/progress/progressComponent";
import { ProgressData } from "@/data/gridData";
import { useAppSelector } from "@/hook/hook";
import axios from "axios";
import { useEffect, useState } from "react";

interface AdvancedProp {
  data: any;
  hiddenMenu: boolean;
  isEditStatus: boolean;
}

const Advenced: React.FC<AdvancedProp> = ({
  data,
  hiddenMenu,
  isEditStatus,
}) => {
  useEffect(() => {}, [data]);

  console.log(data);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}></div>
      {hiddenMenu && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 60,
            marginBottom: 200,
          }}
        >
          <ProgressComponent
            title={"eventConnectionCountThreshold"}
            isEditStatus={isEditStatus}
            proData={data.eventConnectionCountThreshold}
          />
          <Input text={"maxConnectionCount"} value={data.maxConnectionCount} />
          <ProgressComponent
            title={"eventEndpointCountThreshold"}
            isEditStatus={isEditStatus}
            proData={data.eventMsgSpoolUsageThreshold}
          />
          <Input text={"maxEgressFlowCount"} value={data.maxEgressFlowCount} />
          <ProgressComponent
            title={"eventMsgSpoolUsageThreshold"}
            isEditStatus={isEditStatus}
            proData={data.eventEndpointCountThreshold}
          />
          <Input text={"maxEndpointCount"} value={data.maxEndpointCount} />
        </div>
      )}
    </div>
  );
};

export default Advenced;
