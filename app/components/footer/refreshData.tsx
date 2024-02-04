"use client";

import React from "react";

interface RefreshProps {
  onRefreshClick: () => void;
  refreshTime: string;
}

const RefreshData: React.FC<RefreshProps> = ({
  onRefreshClick,
  refreshTime,
}) => {
  return (
    <>
      <div>Last Update : {refreshTime}</div>
      <div
        onClick={onRefreshClick}
        style={{
          color: "#e9e9e9",
          fontSize: 14,
          cursor: "pointer",
          backgroundColor: "#000",
          borderRadius: 10,
          paddingRight: 3,
          paddingLeft: 3,
        }}
      >
        Refresh Data
      </div>
    </>
  );
};

export default RefreshData;
