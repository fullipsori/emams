"use client";

import React, { useEffect, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";
import "tabulator-tables/dist/css/tabulator.min.css";
import "@/styles/style.css";
import { vpnColumn, vpnData } from "@/data/gridData";

const Table12: React.FC = () => {
  const menuList = vpnColumn.map((item: any) => item.title);
  const [tableData, setTableData] = useState(vpnData);
  const [pageSize, setPageSize] = useState(10);
  const [visibleColumns, setVisibleColumns] = useState<any[]>(menuList);
  const tableKey = JSON.stringify(visibleColumns);

  const handleToggleColumn = (columnField: string) => {
    setVisibleColumns((prev) =>
      prev.includes(columnField)
        ? prev.filter((field) => field !== columnField)
        : [...prev, columnField]
    );
  };

  useEffect(() => {}, [vpnData, menuList]);

  const handelMoreBtnClick = (event: any) => {
    event.preventDefault();
    setPageSize((prevSize) => prevSize + 10);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Toggle columns UI */}
      <div>
        {vpnColumn.map((col) => (
          <label key={col.field}>
            <input
              type="checkbox"
              checked={visibleColumns.includes(col.field)}
              onChange={() => handleToggleColumn(col.field)}
            />
            {col.title}
          </label>
        ))}
      </div>
      <div>
        <ReactTabulator
          key={tableKey}
          data={tableData}
          columns={vpnColumn.filter((col) =>
            visibleColumns.includes(col.field)
          )}
          options={{
            addRowPos: "top",
            layout: "fitColumns",
            placeholder: "데이터가 없습니다",
            pagination: "local",
            paginationSize: pageSize,
            paginationElement: document.getElementById("table-pagination"),
            paginationButtonCount: 0,
            movableColumns: true,
            headerFilterLiveFilter: true,
            headerFilterPlaceholder: "Filter...",
            maxHeight: 350,
          }}
        />
      </div>
      <button onClick={handelMoreBtnClick}>더보기</button>
      {/* Footer */}
      <div
        id="table-footer"
        style={{
          position: "fixed",
          bottom: 0,
          left: 250,
          width: "100%",
          background: "#2e353d",
          padding: "10px",
          borderTop: "1px solid #2e353d",
        }}
      >
        <div id="table-pagination" style={{ display: "none" }}></div>
      </div>
    </div>
  );
};

export default Table12;
