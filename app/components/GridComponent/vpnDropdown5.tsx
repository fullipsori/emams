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

const VpnDropdown5: React.FC = () => {
  const selectedRow = useAppSelector((state) => state.isVpn.selectedRow);
  const [gridOpen, setGridOpen] = useState(false);
  const dispatch = useAppDispatch();
  const tableRef = useRef(null);
  const [data, setData] = useState<IData[]>([
    { msgVpnName: "acme_aos_dev" },
    { msgVpnName: "acme_atp_dev" },
    { msgVpnName: "default" },
  ]);

  // 선택된 msgVpnNames을 관리하는 상태 (다중 선택)
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const checkboxFormatter = (cell: any) => {
    const msgVpnName = cell.getRow().getData().msgVpnName;
    const isChecked = selectedNames.includes(msgVpnName);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isChecked;
    checkbox.addEventListener("change", () => {
      handleCheckboxChange(msgVpnName);
    });
    return checkbox;
  };

  const handleCheckboxChange = (msgVpnName: string) => {
    setSelectedNames((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(msgVpnName)) {
        newSelected.delete(msgVpnName);
      } else {
        newSelected.add(msgVpnName);
      }
      return Array.from(newSelected);
    });
  };

  const handleSelectAll = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      setSelectedNames(data.map((item) => item.msgVpnName));
    } else {
      setSelectedNames([]);
    }
  };

  useEffect(() => {
    const allSelected = data.length === selectedNames.length;
  }, [selectedNames, data]);

  const columns: ColumnDefinition[] = [
    {
      title: "Select",
      field: "isSelected",
      headerSort: false,
      formatter: checkboxFormatter,
      titleFormatter: () => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", handleSelectAll as EventListener);
        return checkbox;
      },
    },
    { title: "Vpn", field: "msgVpnName", hozAlign: "left", width: 150 },
  ];

  const options: ReactTabulatorOptions = {
    selectable: true,
  };

  const handleApply = () => {
    // dispatch(setSelectedRow({ msgVpnNames: selectedNames }));
    console.log("Selected VPN Names:", selectedNames);
    setGridOpen(false);
  };

  const handleCancel = () => {
    setSelectedNames([]);
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

export default VpnDropdown5;
