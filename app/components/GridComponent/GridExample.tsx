"use client";

import React, { useState } from "react";
import { ReactTabulator, ColumnDefinition } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator.min.css";

// 테이블에 표시할 데이터 타입 정의
interface IData {
  id: number;
  name: string;
  age: number;
  isSelected: boolean;
}

const GridExample: React.FC = () => {
  const [data, setData] = useState<IData[]>([
    { id: 1, name: "John", age: 28, isSelected: false },
    { id: 2, name: "Jane", age: 32, isSelected: false },
    { id: 3, name: "Gary", age: 40, isSelected: false },
  ]);

  // 선택된 행의 데이터를 저장하는 상태
  const [selectedRow, setSelectedRow] = useState<IData | null>(null);

  // 체크박스 포매터 함수
  const checkboxFormatter = (
    cell: any,
    formatterParams: any,
    onRendered: any
  ) => {
    const isChecked = cell.getValue();
    return `<input type='radio' ${isChecked ? "checked" : ""}/>`;
  };

  // 셀 클릭 이벤트 핸들러
  const handleCellClick = (e: any, cell: any) => {
    const clickedRowData = cell.getRow().getData() as IData;
    setData(
      data.map((row) =>
        row.id === clickedRowData.id
          ? { ...row, isSelected: !row.isSelected }
          : { ...row, isSelected: false }
      )
    );
    setSelectedRow(clickedRowData.isSelected ? null : clickedRowData);
  };

  const columns: ColumnDefinition[] = [
    { title: "Name", field: "name", width: 150 },
    { title: "Age", field: "age", hozAlign: "left", width: 100 },
    {
      title: "Select",
      field: "isSelected",
      width: 100,
      formatter: checkboxFormatter,
      cellClick: handleCellClick,
    },
  ];

  return (
    <div>
      <ReactTabulator
        data={data}
        columns={columns}
        tooltips={true}
        layout={"fitData"}
      />
      {selectedRow && (
        <div>
          <h3>Selected Row:</h3>
          <p>ID: {selectedRow.id}</p>
          <p>Name: {selectedRow.name}</p>
          <p>Age: {selectedRow.age}</p>
        </div>
      )}
    </div>
  );
};

export default GridExample;
