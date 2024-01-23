"use client";

import { options } from "@/data/tabulatorOptions";
import { GridProps } from "@/types/grid";
import { useEffect, useRef, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";

const GridDropdown: React.FC<GridProps> = ({ title, data, columns }) => {
  const tableRef = useRef<ReactTabulator | null>(null);
  const [gridOpen, setGridOpen] = useState(true);
  const [gridData, setGridData] = useState(data);

  useEffect(() => {
    setGridData(data);
  }, [data]);

  const handleMenuClick = () => {
    setGridOpen(!gridOpen);
  };

  return (
    <div
      style={{
        borderColor: "gray",
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: "#d8d8d8",
        minWidth: 424.8,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 5,
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 500 }}>{title}</div>
        <img
          src="/menu.png"
          style={{ width: 24, height: 24, cursor: "pointer" }}
          onClick={handleMenuClick}
        />
      </div>
      {gridOpen && (
        <ReactTabulator
          key={gridData.length}
          ref={tableRef}
          data={gridData}
          columns={columns}
          options={options}
          layout={"fitData"}
        />
      )}
    </div>
  );
};

export default GridDropdown;
