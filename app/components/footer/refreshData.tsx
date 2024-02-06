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
      <div className="col-form-label sol_mr_6">Last Update {refreshTime}</div>
      <button
        className="btn hstack btn-outline-secondary"
        onClick={onRefreshClick}
      >
        Refresh Data
      </button>
    </>
  );
};

export default RefreshData;
