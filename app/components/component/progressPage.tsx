"use client";

import ProgressComponent from "@/app/components/component/progressComponent";
import { useState } from "react";

const ProgressPage = () => {
  const [hiddenMenu, setHiddenMenu] = useState<boolean>(true);
  const [textValue, setTextValue] = useState<string>("Show Advanced Settings");

  const handleHiddenMenu = () => {
    setHiddenMenu(!hiddenMenu);
    if (hiddenMenu) {
      setTextValue("Show Advanced Settings");
    } else {
      setTextValue("Hide Advanced Settings");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button
        style={{ marginBottom: 100, justifyContent: "center" }}
        onClick={handleHiddenMenu}
      >
        {textValue}
      </button>
      {hiddenMenu && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 80,
            marginBottom: 200,
          }}
        >
          <ProgressComponent title={"Alert Thresholds1"} />
          <ProgressComponent title={"Alert Thresholds2"} />
          <ProgressComponent title={"Alert Thresholds3"} />
        </div>
      )}
    </div>
  );
};

export default ProgressPage;
