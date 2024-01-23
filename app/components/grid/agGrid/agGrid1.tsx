"use client";

import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";

const AgGrid = () => {
  const columnDefs: ColDef[] = [
    {
      headerName: "ID",
      field: "id",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Age",
      field: "age",
      sortable: true,
      filter: true,
      resizable: true,
    },
  ];

  const rowData = [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Doe", age: 30 },
  ];

  const gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    defaultColDef: {
      flex: 1,
      filter: true,
      resizable: true,
      minWidth: 100,
      headerClass: "centered",
    },
    pagination: true,
    paginationPageSize: 5,
    onCellClicked: (params: any) => {
      console.log("cell was clicked", params);
    },
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact gridOptions={gridOptions} />
    </div>
  );
};

export default AgGrid;
