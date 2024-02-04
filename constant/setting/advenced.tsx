"use client";

import ProgressComponent from "@/app/components/progress/progressComponent";
import { ProgressData } from "@/data/gridData";
import { useState } from "react";

interface AdvancedProp {
  hiddenMenu: boolean;
  isEditStatus: boolean;
}

const Advenced: React.FC<AdvancedProp> = ({ hiddenMenu, isEditStatus }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}></div>
      {hiddenMenu && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 80,
            marginBottom: 200,
          }}
        >
          <ProgressComponent
            title={"Alert Thresholds1"}
            isEditStatus={isEditStatus}
            proData={ProgressData.eventConnectionCountThreshold}
          />
          <ProgressComponent
            title={"Alert Thresholds2"}
            isEditStatus={isEditStatus}
            proData={ProgressData.eventEgressFlowCountThreshold}
          />
          <ProgressComponent
            title={"Alert Thresholds3"}
            isEditStatus={isEditStatus}
            proData={ProgressData.eventEndpointCountThreshold}
          />
        </div>
      )}
    </div>
  );
};

export default Advenced;
