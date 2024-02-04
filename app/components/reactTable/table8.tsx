"use client";

import React, { useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box } from "@mui/material";
import CustomPagination from "./customPagination";

interface IRow {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

const Table8: React.FC = () => {
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
      { id: 3, firstName: "Bob", lastName: "Smith", age: 30 },
      { id: 4, firstName: "Bob", lastName: "Smith", age: 30 },
      { id: 5, firstName: "Bob", lastName: "Smith", age: 30 },
      { id: 6, firstName: "Bob", lastName: "Smith", age: 30 },
      { id: 7, firstName: "Bob", lastName: "Smith", age: 30 },
      { id: 8, firstName: "Bob", lastName: "Smith", age: 30 },
      { id: 9, firstName: "Bob", lastName: "Smith", age: 30 },
      { id: 10, firstName: "Bob", lastName: "Smith", age: 30 },
      { id: 11, firstName: "Bob", lastName: "Smith", age: 30 },
      { id: 12, firstName: "Bob", lastName: "Smith", age: 30 },
    ],
    []
  );

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const currentPageData = data.slice(
    page * pageSize,
    page * pageSize + pageSize
  );

  return (
    <Box sx={{ height: 400, width: "100%", marginBottom: 100 }}>
      <MaterialReactTable
        columns={columns}
        // data={data}
        data={currentPageData}
        enableRowSelection // 행 선택 활성화
        enableRowNumbers // 행 번호 활성화
        enablePinning // 컬럼 고정 활성화
        enableSorting // 정렬 활성화
        enableColumnOrdering // 컬럼 순서 변경 활성화
        enableColumnResizing // 컬럼 크기 조정 활성화
        enableGlobalFilter // 전체 필터링 활성화
        //   enablePaging // 페이징 활성화
        enableColumnFilters // 컬럼별 필터링 활성화
        enablePagination={false}
        enableDensityToggle // 밀도 조절 활성화
        enableBottomToolbar={false}
        // enableTopToolbar={false}
      />
      <CustomPagination
        pageCount={Math.ceil(data.length / pageSize)}
        pageIndex={page}
        gotoPage={handleChangePage}
      />
    </Box>
  );
};

export default Table8;
