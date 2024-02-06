"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ColumnDefinition,
  ReactTabulator,
  ReactTabulatorOptions,
} from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator.min.css";
import { useAppDispatch, useAppSelector } from "@/hook/hook";
import { setSelectedRow } from "@/redux/vpnSlice";
import axios from "axios";

interface IData {
  msgVpnName: string;
}

const HeaderGrid: React.FC = () => {
  const selectedRow = useAppSelector((state) => state.isVpn.selectedRow);
  // const isSelected = selectedRow?.isSelected;
  console.log("headerGrid msgVpnName:::", selectedRow?.msgVpnName);
  const [gridOpen, setGridOpen] = useState(false);
  const dispatch = useAppDispatch();
  const tableRef = useRef(null);
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [selectedName, setSelectedName] = useState<string>("");

  const checkboxFormatter = (
    cell: any,
    formatterParams: any,
    onRendered: any
  ) => {
    const msgVpnName = cell.getRow().getData().msgVpnName;
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "selection";
    radio.checked = selectedName === msgVpnName;
    radio.addEventListener("change", () => {
      setSelectedName(msgVpnName);
    });
    return radio;
  };

  const options: ReactTabulatorOptions = {
    layout: "fitColumns",
    placeholder: "데이터가 없습니다",
    placeholderColor: "#fff",
  };

  const columns: ColumnDefinition[] = [
    {
      title: "선택",
      field: "isSelected",
      headerSort: false,
      hozAlign: "center",
      width: 50,
      formatter: checkboxFormatter,
    },
    { title: "Broker", field: "broker", hozAlign: "left", width: 100 },
    { title: "Vpn", field: "msgVpnName", hozAlign: "left", width: 100 },
  ];

  const fetchData = async () => {
    const baseUrl = "/api/v2/msgVpns/";
    try {
      const params = {
        count: 100,
        cursor: "",
        where: searchTerm,
        select: "msgVpnName",
      };

      const response = await axios.get(baseUrl, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
        params,
      });
      const DataVal = response.data.data;
      console.log("데이터:", DataVal);
      setData(DataVal);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  // 검색어 핸들링 함수
  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    fetchData();
  };

  const handleApply = () => {
    dispatch(setSelectedRow({ msgVpnName: selectedName }));
    setGridOpen(false);
  };

  const handleCancel = () => {
    setSelectedName("");
    setGridOpen(false);
  };

  const handleMenuClick = () => {
    setGridOpen(!gridOpen);
  };

  return (
    <div>
      <div
        style={{
          zIndex: 10,
          borderRadius: 8,
          backgroundColor: "#fff",
          width: 120,
          padding: 5,
          cursor: "pointer",
          borderStyle: "solid",
          borderWidth: 2,
        }}
        onClick={handleMenuClick}
      >
        + Change Vpn
        {/* <p
          style={{
            paddingLeft: 5,
            color: "gray",s
          }}
        >
          {selectedRow ? selectedRow.msgVpnName : "None"}
        </p> */}
      </div>
      <div
        style={{
          borderColor: "gray",
          borderWidth: 2,
          borderRadius: 10,
          backgroundColor: "#d8d8d8",
          width: 250,
        }}
      >
        {gridOpen ? (
          <div
            style={{
              position: "absolute",
              backgroundColor: "#d8d8d8",
              width: 250,
            }}
          >
            <input
              style={{ width: "100%" }}
              placeholder="search..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchClick();
                }
              }}
            />
            <ReactTabulator
              ref={tableRef}
              data={data}
              columns={columns}
              options={options}
            />
            <p
              style={{
                color: "#ff4a4a",
                paddingRight: 5,
                paddingLeft: 5,
                paddingTop: 5,
              }}
            >
              검색 결과는 최대 100건이며, 원하는 검색 결과가 없을 경우 상세한
              명칭을 입력바랍니다.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 5,
                padding: 3,
              }}
            >
              <button
                style={{ borderColor: "transparent", borderRadius: 10 }}
                onClick={handleApply}
              >
                적용
              </button>
              <button
                style={{ borderColor: "transparent", borderRadius: 10 }}
                onClick={handleCancel}
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

export default HeaderGrid;
