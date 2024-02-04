"use client";

import ProgressComponent from "@/app/components/progress/progressComponent";
import { ProgressData } from "@/data/gridData";
import { useState } from "react";

const ProgressPage = () => {
  const [hiddenMenu, setHiddenMenu] = useState<boolean>(true);
  const [textValue, setTextValue] = useState<string>("Show Advanced Settings");
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [isEditTextValue, setIsEditTextValue] = useState<string>("isEdit");

  console.log("편집", isEdit);
  const handleHiddenMenu = () => {
    setHiddenMenu(!hiddenMenu);
    if (hiddenMenu) {
      setTextValue("Show Advanced Settings");
    } else {
      setTextValue("Hide Advanced Settings");
    }
  };

  const handleEditClick = () => {
    setIsEdit(!isEdit);
    console.log("편집할건가요?", isEdit);
    if (isEdit) {
      setIsEditTextValue("Apply");
    } else {
      setIsEditTextValue("isEdit");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          style={{
            justifyContent: "center",
            backgroundColor: "#00c895",
            width: 300,
            height: 30,
          }}
          onClick={handleHiddenMenu}
        >
          {textValue}
        </button>
        <button
          style={{
            marginBottom: 100,
            backgroundColor: "#fff",
            borderColor: "#00c895",
            borderWidth: 2,
            width: 100,
            borderRadius: 20,
          }}
          onClick={handleEditClick}
        >
          {isEditTextValue}
        </button>
      </div>
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
            isEditStatus={isEdit}
            proData={ProgressData.eventConnectionCountThreshold}
          />
          <ProgressComponent
            title={"Alert Thresholds2"}
            isEditStatus={isEdit}
            proData={ProgressData.eventEgressFlowCountThreshold}
          />
          <ProgressComponent
            title={"Alert Thresholds3"}
            isEditStatus={isEdit}
            proData={ProgressData.eventEndpointCountThreshold}
          />
        </div>
      )}
    </div>
  );
};

export default ProgressPage;
