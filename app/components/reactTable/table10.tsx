"use client";

import React, { useEffect, useState, useRef } from "react";
import { Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";

interface IRow {
  id: number;
  name: string;
  age: number;
  job: string;
}

const Table10: React.FC = () => {
  const tableRef = useRef<HTMLDivElement>(null);
  const tabulatorInstance = useRef<Tabulator | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [table, setTable] = useState<Tabulator>();

  const data: IRow[] = [
    { id: 1, name: "Alice", age: 28, job: "Software Engineer" },
    { id: 2, name: "Bob", age: 32, job: "Designer" },
    { id: 3, name: "Charlie", age: 30, job: "Doctor" },
    { id: 4, name: "Alice", age: 28, job: "Software Engineer" },
    { id: 5, name: "Bob", age: 32, job: "Designer" },
    { id: 6, name: "Charlie", age: 30, job: "Doctor" },
    { id: 7, name: "Alice", age: 28, job: "Software Engineer" },
    { id: 8, name: "Bob", age: 32, job: "Designer" },
    { id: 9, name: "Charlie", age: 30, job: "Doctor" },
    { id: 10, name: "Alice", age: 28, job: "Software Engineer" },
    { id: 11, name: "Bob", age: 32, job: "Designer" },
    { id: 12, name: "Charlie", age: 30, job: "Doctor" },
  ];

  useEffect(() => {
    if (tableRef.current) {
      tabulatorInstance.current = new Tabulator(tableRef.current, {
        data: data,
        pagination: true,
        paginationSize: 5,
        columns: [
          { title: "Name", field: "name" },
          { title: "Age", field: "age" },
          { title: "Job", field: "job" },
        ],
      });

      tabulatorInstance.current.on("pageLoaded", (pageNum: number) => {
        setCurrentPage(pageNum);
      });
    }
  }, [data]);

  const handleNextPage = () => {
    if (tabulatorInstance.current) {
      tabulatorInstance.current.setPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (tabulatorInstance.current) {
      tabulatorInstance.current.setPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div ref={tableRef}></div>
      <button onClick={handlePrevPage}>Previous Page</button>
      <button onClick={handleNextPage}>Next Page</button>
    </div>
  );
};

export default Table10;
