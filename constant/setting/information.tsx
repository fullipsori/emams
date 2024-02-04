"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";

interface InformationProps {
  isEditStatus: boolean;
  onEditChange?: (isEditing: boolean) => void;
}

const Information: React.FC<InformationProps> = ({
  isEditStatus,
  onEditChange,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [isEnable, setIsEnable] = useState<boolean>(true);
  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEnable(event.target.checked);
  };

  // 더블 클릭 이벤트 핸들러
  const handleDoubleClick = () => {
    console.log("333");
    setIsEdit(false);
    onEditChange?.(false);
  };

  useEffect(() => setIsEdit(isEditStatus), [isEditStatus]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>Message Broker Name</div>
        <input
          readOnly={isEdit}
          onDoubleClick={handleDoubleClick}
          style={{
            backgroundColor: isEdit ? "#f8f8f8" : "white",
            cursor: isEdit ? "default" : "text",
            color: isEdit ? "#999" : " #000",
            borderColor: isEdit ? "#dddddd" : " #c7c7c7",
            borderStyle: "solid",
          }}
          // className={isEdit ? "inputFieldReadOnly" : "inputFieldReadOnly"}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>Message Broker IP Adress</div>
        <div onDoubleClick={handleDoubleClick}>
          <input disabled={isEdit} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>Message Broker Port No</div>
        <div onDoubleClick={handleDoubleClick}>
          <input disabled={isEdit} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>Message VPN Name</div>
        <div onDoubleClick={handleDoubleClick}>
          <input disabled={isEdit} />
        </div>
      </div>
      <label style={{ display: "flex", gap: 3, marginTop: 20 }}>
        <input
          type="checkbox"
          checked={isEnable}
          onChange={handleToggleChange}
        />
        <div style={{ fontSize: 14, fontWeight: 700, alignSelf: "center" }}>
          Enable
        </div>
      </label>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>Message VPN Name</div>
        <div onDoubleClick={handleDoubleClick}>
          <input disabled={isEdit} />
        </div>
      </div>
    </div>
  );
};

export default Information;
