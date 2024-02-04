"use client";
import React, { useRef, useState } from "react";
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

const VpnDropdown4: React.FC = () => {
  const selectedRow = useAppSelector((state) => state.isVpn.selectedRow);
  const [gridOpen, setGridOpen] = useState(false);
  const dispatch = useAppDispatch();
  const tableRef = useRef(null);
  const [data, setData] = useState<IData[]>([
    { msgVpnName: "acme_aos_dev" },
    { msgVpnName: "acme_atp_dev" },
    { msgVpnName: "default" },
  ]);
  // const [selectedRow, setSelectedRow] = useState<IData | null>(null);

  const columns: ColumnDefinition[] = [
    {
      title: "",
      width: 40,
      formatter: "rowSelection",
      hozAlign: "center",
      headerSort: false,
    },
    { title: "Vpn", field: "msgVpnName", hozAlign: "left", width: 150 },
  ];

  const options: ReactTabulatorOptions = {
    selectable: 1,
    rowClick: (e, row) => {
      const rowData = row.getData() as IData;
      dispatch(setSelectedRow(rowData));
    },
  };

  const handleApply = () => {
    if (selectedRow) {
      dispatch(setSelectedRow(selectedRow));
    }
    console.log(selectedRow);
  };

  const handleCancel = () => {
    setSelectedRow(null);
  };

  const handleMenuClick = () => {
    setGridOpen(!gridOpen);
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
            <ReactTabulator
              ref={tableRef}
              data={data}
              columns={columns}
              options={options}
            />
            <button onClick={handleApply}>적용</button>
            <button onClick={handleCancel}>취소</button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default VpnDropdown4;
