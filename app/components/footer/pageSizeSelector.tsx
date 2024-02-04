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
    <select id="pagesize" onChange={onPageSizeChange} value={pageSize}>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
    </select>
  );
};

export default PageSizeSelector;
