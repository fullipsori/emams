"use client";

import React, { useEffect, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";
import "tabulator-tables/dist/css/tabulator.min.css";
import "@/styles/style.css";

const Table11: React.FC = () => {
  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const tempData: any = [];
    for (let i = 1; i <= 100; i++) {
      tempData.push({
        id: i,
        name: `User ${i}`,
        age: Math.floor(Math.random() * 50) + 20,
        job: `Job ${i}`,
      });
    }
    setTableData(tempData);
  }, [pageSize]);

  const createFooter = function () {
    var button = document.createElement("button");
    button.textContent = "test";
    return button;
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
  };

  const fnNextPage = () => {
    alert("aaa");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <ReactTabulator
          data={tableData}
          columns={[
            {
              title: "ID",
              field: "id",
              width: 100,
              sorter: "number",
              headerFilter: "input",
            },
            {
              title: "Name",
              field: "name",
              //   width: 200,
              sorter: "string",
              headerFilter: "input",
            },
            {
              title: "Age",
              field: "age",
              //   width: 100,
              sorter: "number",
              headerFilter: "input",
            },
            {
              title: "Job",
              field: "job",
              //   width: 200,
              sorter: "string",
              headerFilter: "input",
            },
          ]}
          options={{
            addRowPos: "top",
            layout: "fitColumns",
            placeholder: "데이터가 없습니다",
            pagination: "local",
            paginationSize: pageSize,
            // 이걸 해줘야함
            paginationElement: document.getElementById("table-pagination"),
            // paginationSizeSelector: [5, 10, 20, 50],
            // 숫자 버튼 개수 설정
            paginationButtonCount: 0,
            // columns 이동
            movableColumns: true,
            // 필터링 (columns에도 추가해줘야함)
            headerFilterLiveFilter: true,
            headerFilterPlaceholder: "Filter...",
            // footerElement: false,
          }}
        />
      </div>
      {/* 하단 footer 임시 생성 */}
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
        {/* tabulator pagination */}
        <div>
          <select
            id="pagesize"
            onChange={handlePageSizeChange}
            value={pageSize}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>

          <button onClick={() => fnNextPage()}>next</button>
        </div>
        <div id="table-pagination" style={{ display: "none" }}></div>
      </div>
    </div>
  );
};

export default Table11;
