"use client";

import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";

const AgGrid2 = () => {
  const columnDefs: ColDef[] = [
    { field: "name", width: 150, filter: true },
    { field: "age", width: 150, filter: true },
    {
      field: "country",
      width: 150,
      filter: true,
    },
  ];

  const data = [
    { name: "수연", age: 30, country: "한국" },
    { name: "붕어빵", age: 25, country: "한국" },
    { name: "계란빵", age: 40, country: "UK" },
    { name: "John Doe", age: 30, country: "USA" },
    { name: "호두과자", age: 67, country: "한국" },
    { name: "Jane Doe", age: 24, country: "Canada" },
    { name: "호두과자", age: 24, country: "한국" },
    { name: "옥수수빵", age: 51, country: "한국" },
    { name: "Bob Smith", age: 40, country: "UK" },
  ];

  const options = {
    layout: "fitDataTable",
    pagination: true,
    paginationSize: 10,
    paginationSizeSelector: [50, 100, 500],
    height: 460,
    placeholder: "데이터가 없습니다.",
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        gridOptions={options}
        rowData={data}
        columnDefs={columnDefs}
      />
    </div>
  );
};

export default AgGrid2;
