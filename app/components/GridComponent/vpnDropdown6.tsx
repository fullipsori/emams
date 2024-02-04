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
import { RowComponent } from "tabulator-tables";

interface IData {
  msgVpnName: string;
}

const VpnDropdown6: React.FC = () => {
  const selectedRow = useAppSelector((state) => state.isVpn.selectedRow);
  const [gridOpen, setGridOpen] = useState(false);
  const dispatch = useAppDispatch();
  const tableRef = useRef(null);
  const [data, setData] = useState<IData[]>([
    { msgVpnName: "acme_aos_dev" },
    { msgVpnName: "acme_atp_dev" },
    { msgVpnName: "default" },
  ]);

  // 선택된 msgVpnName을 관리하는 상태
  const [selectedName, setSelectedName] = useState<string>("");

  const checkboxFormatter = (
    cell: any,
    formatterParams: any,
    onRendered: any
  ) => {
    const msgVpnName = cell.getRow().getData().msgVpnName;
    const isChecked = selectedName === msgVpnName;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isChecked;
    console.log("isCheckeddddd", isChecked);
    checkbox.addEventListener("change", () => {
      setSelectedName(isChecked ? "" : msgVpnName);
    });
    return checkbox;
  };

  const options: ReactTabulatorOptions = {
    // selectable: 0,
  };

  const columns: ColumnDefinition[] = [
    {
      title: "Select",
      field: "isSelected",
      headerSort: false,
      formatter: checkboxFormatter,
    },
    { title: "Vpn", field: "msgVpnName", hozAlign: "left", width: 150 },
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

export default VpnDropdown6;
