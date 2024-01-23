"use client";

import React, { useEffect, useRef } from "react";
import "tabulator-tables/dist/css/tabulator_midnight.min.css";
import { Tabulator } from "tabulator-tables";

interface TabulatorProps {
  columns: any[];
  data: any[];
}

const Tabulator1: React.FC<TabulatorProps> = ({ columns, data }) => {
  const tableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (tableRef.current) {
      const table = new Tabulator(tableRef.current, {
        columns,
        data,
      });

      return () => {
        table.destroy();
      };
    }
  }, [columns, data]);

  return <div ref={tableRef}></div>;
};

export default Tabulator1;
