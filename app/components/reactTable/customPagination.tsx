import React from "react";
import { Pagination, PaginationItem } from "@mui/material";

interface CustomPaginationProps {
  pageCount: number;
  pageIndex: number;
  gotoPage: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  pageCount,
  pageIndex,
  gotoPage,
}) => {
  return (
    <Pagination
      count={pageCount}
      // MaterialReactTable의 pageIndex는 0부터 시작
      page={pageIndex + 1}
      onChange={(_, page) => gotoPage(page - 1)}
      renderItem={(item) => <PaginationItem {...item} />}
    />
  );
};

export default CustomPagination;
