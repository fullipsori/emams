"use client";

import { options } from "@/data/tabulatorOptions";
import { GridProps } from "@/types/grid";
import { useRef, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "../../../../public/css/style.css";

interface GridStatusProps {
  title: string;
  data: any[];
}

const GridStatusDropdown: React.FC<GridStatusProps> = ({ title, data }) => {
  // const GridStatusDropdown = () => {
  const tableRef = useRef<ReactTabulator | null>(null);
  const [gridOpen, setGridOpen] = useState(true);

  const handleMenuClick = () => {
    setGridOpen(!gridOpen);
  };

  function statusFormatter(cell: any) {
    var values = cell.getValue();
    var element = document.createElement("span");
    // true: 초록색 , false: 빨간색 , null: 노란색
    if (Array.isArray(values) && values.length === 2) {
      for (let i = 0; i < values.length; i++) {
        const circle = document.createElement("span");
        circle.className =
          values[i] === true
            ? "circle_g"
            : values[i] === false
            ? "circle_r"
            : "circle_y";
        element.appendChild(circle);
      }
    } else {
      // 예외 처리: 그 외의 경우에는 하나의 동그라미 표시
      const circle = document.createElement("span");
      circle.className =
        values === true
          ? "circle_g"
          : values === false
          ? "circle_r"
          : "circle_y";
      element.appendChild(circle);
    }

    return element;
  }

  const statusColumns = [
    {
      title: "status",
      field: "status",
      formatter: statusFormatter,
      width: 60,
    },
    { title: "value", field: "value", width: 80, hozAlign: "right" },
  ];

  return (
    <div
      style={{
        borderColor: "gray",
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: "#d8d8d8",
        minWidth: 144.8,
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
          key={data.length}
          ref={tableRef}
          data={data}
          columns={statusColumns}
          options={options}
          layout={"fitData"}
        />
      )}
    </div>
  );
};

export default GridStatusDropdown;
