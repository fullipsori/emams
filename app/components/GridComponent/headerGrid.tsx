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
  const [data, setData] = useState<IData[]>([
    { msgVpnName: "acme_aos_dev" },
    { msgVpnName: "acme_atp_dev" },
    { msgVpnName: "default" },
  ]);

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
  };

  const columns: ColumnDefinition[] = [
    {
      title: "",
      field: "isSelected",
      headerSort: false,
      hozAlign: "center",
      width: 50,
      formatter: checkboxFormatter,
    },
    { title: "Vpn", field: "msgVpnName", hozAlign: "left", width: 180 },
  ];

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
          borderRadius: 20,
          backgroundColor: "#fff",
          width: 200,
          height: 30,
          marginRight: 30,
          cursor: "pointer",
          borderStyle: "solid",
        }}
        onClick={handleMenuClick}
      >
        <p
          style={{
            paddingLeft: 5,
            color: "gray",
          }}
        >
          {selectedRow ? selectedRow.msgVpnName : "None"}
        </p>
      </div>
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
          <div style={{ position: "absolute", backgroundColor: "#fff" }}>
            <ReactTabulator
              ref={tableRef}
              data={data}
              columns={columns}
              options={options}
            />
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
