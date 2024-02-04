"use client";

import React from "react";
import { MaterialReactTable } from "material-react-table";
import { Box } from "@mui/material";

interface IRow {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

const Table7: React.FC = () => {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "age",
        header: "Age",
      },
    ],
    []
  );

  const data = React.useMemo<IRow[]>(
    () => [
      { id: 1, firstName: "Alice", lastName: "Johnson", age: 25 },
      { id: 2, firstName: "Bob", lastName: "Smith", age: 30 },
    ],
    []
  );

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <MaterialReactTable
        columns={columns}
        data={data}
        // enableRowSelection // 행 선택 활성화
        // enableRowNumbers // 행 번호 활성화
        // enablePinning // 컬럼 고정 활성화
        // enableSorting // 정렬 활성화
        // enableColumnOrdering // 컬럼 순서 변경 활성화
        // enableColumnResizing // 컬럼 크기 조정 활성화
        // enableGlobalFilter // 전체 필터링 활성화
        // //   enablePaging // 페이징 활성화
        // enablePagination={false}
        // enableColumnFilters // 컬럼별 필터링 활성화
        // enableDensityToggle // 밀도 조절 활성화
      />
    </Box>
  );
};

export default Table7;
