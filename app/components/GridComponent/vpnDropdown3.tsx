"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { ReactTabulator, ColumnDefinition } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator.min.css";
import { setSelectedRow } from "@/redux/vpnSlice";
import { useAppSelector, useAppDispatch } from "@/hook/hook";

interface IData {
  msgVpnName: string;
  isSelected: boolean;
}

const VpnDropdown3: React.FC = () => {
  const selectedRow = useAppSelector((state) => state.isVpn.selectedRow);
  const dispatch = useAppDispatch();
  const tableRef = useRef(null);
  const [gridOpen, setGridOpen] = useState(false);
  // const [selectedRow, setSelectedRow] = useState<IData | null>(null);
  const [data, setData] = useState<IData[]>([
    {
      msgVpnName: "acme_aos_dev",
      isSelected: false,
    },
    {
      msgVpnName: "acme_atp_dev",
      isSelected: false,
    },
    {
      msgVpnName: "default",
      isSelected: false,
    },
  ]);

  const handleMenuClick = () => {
    setGridOpen(!gridOpen);
  };

  // 셀 클릭 이벤트 핸들러
  const handleCellClick = (e: any, cell: any) => {
    const clickedRowData = cell.getRow().getData() as IData;
    setData(
      data.map((row) =>
        row.msgVpnName === clickedRowData.msgVpnName
          ? { ...row, isSelected: !row.isSelected }
          : { ...row, isSelected: false }
      )
    );

    dispatch(setSelectedRow(clickedRowData.isSelected ? null : clickedRowData));
  };

  console.log(selectedRow);

  // 체크박스 포매터 함수
  const checkboxFormatter = (cell: any) => {
    const isChecked = cell.getValue();
    return `<input type='radio' ${isChecked ? "checked" : ""}/>`;
  };

  // 셀 클릭 이벤트 핸들러
  // const handleCellClick = (e: any, cell: any) => {
  //   const clickedRowData = cell.getRow().getData() as IData;
  //   setData(
  //     data.map((row) =>
  //       row.msgVpnName === clickedRowData.msgVpnName
  //         ? { ...row, isSelected: !row.isSelected }
  //         : { ...row, isSelected: false }
  //     )
  //   );
  //   setSelectedRow(clickedRowData.isSelected ? null : clickedRowData);
  // };

  const columns: ColumnDefinition[] = [
    {
      title: "",
      field: "isSelected",
      width: 50,
      hozAlign: "center",
      headerSort: false,
      formatter: checkboxFormatter,
      cellClick: handleCellClick,
    },
    { title: "Vpn", field: "msgVpnName", hozAlign: "left", width: 150 },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) =>
    item.msgVpnName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 검색어 핸들링 함수
  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div
      style={{
        zIndex: 10,
        // borderRadius: 20,
        backgroundColor: "#fff",
        width: 200,
        height: 30,
        marginRight: 30,
        cursor: "pointer",
      }}
      onClick={handleMenuClick}
    >
      <p style={{ paddingLeft: 5 }}>
        {selectedRow ? selectedRow.msgVpnName : "None"}
      </p>
      <div
        style={{
          borderColor: "gray",
          borderWidth: 2,
          borderRadius: 10,
          backgroundColor: "#d8d8d8",
          minWidth: 200,
        }}
      >
        {gridOpen ? (
          <div>
            <input
              style={{ borderRadius: 20, padding: 7 }}
              placeholder="search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Image
              width="25"
              height="25"
              src={"/search.png"}
              alt={"menu"}
              style={{ cursor: "pointer" }}
            />
            <div style={{ marginTop: 0 }}>
              <ReactTabulator
                key={filteredData.length}
                ref={tableRef}
                data={filteredData}
                columns={columns}
                tooltips={true}
                layout={"fitData"}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: 5,
                gap: 8,
              }}
            >
              {/* <button
                style={{
                  borderStyle: "solid",
                  borderRadius: 10,
                  borderColor: "transparent",
                }}
              >
                적용
              </button> */}
              <button
                style={{
                  borderStyle: "solid",
                  borderRadius: 10,
                  borderColor: "transparent",
                }}
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default VpnDropdown3;
