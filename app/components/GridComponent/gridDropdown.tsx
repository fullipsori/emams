"use client";

import { useEffect, useRef, useState } from "react";
import "react-tabulator/lib/styles.css";
// import "react-tabulator/lib/css/tabulator.css";
// import "react-tabulator/lib/css/tabulator.css";
import "react-tabulator/lib/css/tabulator_midnight.css";
// import "react-tabulator/lib/css/tabulator_bulma.css";
import { topColumns, topData1 } from "@/data/gridData";
import { options } from "@/data/tabulatorOptions";
import { GridProps } from "@/types/grid";
import { ReactTabulator } from "react-tabulator";

const GridDropdown: React.FC<GridProps> = ({ title, data, columns }) => {
  const tableRef = useRef(null);
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
        borderRadius: 20,
        backgroundColor: "#fff",
        width: 200,
        height: 30,
        marginRight: 30,
        cursor: "pointer",
      }}
      onClick={handleMenuClick}
    >
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
            // onClick={handleMenuClick}
          />
        </div>
        {gridOpen && (
          <div>
            <ReactTabulator
              key={topData1.length}
              ref={tableRef}
              data={topData1}
              columns={topColumns}
              options={options}
              layout={"fitData"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GridDropdown;
