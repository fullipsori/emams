"use client";

import React from "react";

interface PageSizeSelectorProps {
  pageSize: number;
  onPageSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  pageSize,
  onPageSizeChange,
}) => {
  return (
    <>
      <div className="sol_a sol_mr_6 sol_ml_6">Show</div>
      <select
        id="pagesize"
        className="form-select sol_w100"
        onChange={onPageSizeChange}
        value={pageSize}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </>
  );
};

export default PageSizeSelector;
