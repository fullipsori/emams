"use client";

import { ActionData } from "@/data/gridData";
import { useAppDispatch } from "@/hook/hook";
import { setSelectedRow } from "@/redux/vpnSlice";
import { GridProps } from "@/types/grid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useRef, useState } from "react";
import {
  ColumnDefinition,
  ReactTabulator,
  ReactTabulatorOptions,
} from "react-tabulator";
import "react-tabulator/lib/styles.css";

const Grid: React.FC<GridProps> = ({ data, columns }) => {
  const router = useRouter();

  const menuList = columns.map((item: any) => item.field);
  const dispatch = useAppDispatch();
  const onRef = useRef<ReactTabulatorOptions | null>(null);
  let tableRef = React.useRef<any>();

  const [gridData, setGridData] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [showToggleMenu, setShowToggleMenu] = useState<boolean>(false);
  const [showToggleAction, setShowToggleAction] = useState<boolean>(false);
  const [visibleColumns, setVisibleColumns] = useState<any[]>(menuList);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const tableKey = JSON.stringify({ visibleColumns, pageSize });
  const [selectedVpn, setSelectedVpn] = useState<string>("");
  const [rightClick, setRightClick] = useState<boolean>(false);
  const [rightClickPosition, setRightClickPosition] = useState({ x: 0, y: 0 });

  const filteredColumns = columns.filter((col) =>
    visibleColumns.includes(col.field)
  );

  // columns를 체크박스와 데이터로 분리해서 합침!
  const checkboxColumn: ColumnDefinition = {
    title: "",
    titleFormatter: "rowSelection",
    formatter: "rowSelection",
    width: 40,
    hozAlign: "center",
    cssClass: "text-center",
    headerSort: false,
  };

  // 기존 columns에 체크박스 column을 추가함@
  const allColumns = [checkboxColumn, ...filteredColumns];

  const handleToggleColumn = (columnField: string) => {
    setVisibleColumns((prev) =>
      prev.includes(columnField)
        ? prev.filter((field) => field !== columnField)
        : [...prev, columnField]
    );
  };
  useEffect(() => {}, [gridData, menuList]);

  useEffect(() => {
    console.log("selectedVpn이 업데이트됨:", selectedVpn);
    if (selectedVpn) {
      dispatch(setSelectedRow({ msgVpnName: selectedVpn }));
    }
  }, [selectedVpn]);

  useEffect(() => {
    console.log("체크박스 클릭", selectedRows);
  }, [selectedRows]);

  useEffect(() => {
    console.log("오른쪽 클릭", rightClickPosition);
  }, [rightClickPosition]);

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
  };

  useEffect(() => {
    setGridData(data);
  }, [data]);

  const handleToogleMenuClick = () => {
    setShowToggleMenu(!showToggleMenu);
    setShowToggleAction(false);
  };

  const handleActionClick = () => {
    setShowToggleAction(!showToggleAction);
    setShowToggleMenu(false);
    if (tableRef.current) {
      const selectedDataValue = tableRef.current.getSelectedData();
      console.log(selectedDataValue);
      setSelectedRows(selectedDataValue);
    }
  };

  const handleDeleteClick = () => {
    alert(`VPN ${selectedVpn}를 삭제하시겠습니까?`);
    setRightClick(false);
  };

  const handleActionTitleClick = (item: any) => {
    if (tableRef.current) {
      const selectedDataValue = tableRef.current.getSelectedData();
      if (selectedDataValue.length === 1) {
        setSelectedVpn(selectedDataValue[0].msgVpnName);
      }
      console.log(selectedDataValue[0].msgVpnName);
    }

    if (item.id === 6) {
      handleDeleteClick();
      setShowToggleAction(false);
    } else if (item.id === 5) {
      router.push(`${item.url}`);
      setShowToggleAction(false);
    } else if (item.id === 4) {
      router.push(`${item.url}`);
      setShowToggleAction(false);
    } else if (item.id === 3) {
      router.push(`${item.url}`);
      setShowToggleAction(false);
    } else if (item.id === 2) {
      router.push(`${item.url}`);
      setShowToggleAction(false);
    } else if (item.id === 1) {
      router.push(`${item.url}`);
      setShowToggleAction(false);
    }
  };

  // react-tabulator footer 없애는 로직
  const renderStarted = async (e: any) => {
    const el = document.getElementsByClassName(
      "tabulator-footer"
    )[0] as HTMLElement;
    el.style.display = "none";
  };

  // footer button
  const handlePrevBtnClick = () => {
    console.log("이전 버튼 클릭");
  };

  const handleNextBtnClick = () => {
    console.log("다음 버튼 클릭");
  };

  // 백그라운드 클릭했을 때 모달 닫히도록 설정
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleOutsideClick = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowToggleAction(false);
        setShowToggleMenu(false);
        setRightClick(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // row 클릭
  const rowClick = (e: any, row: any) => {
    const rowClickData = row.getData().msgVpnName;
    setSelectedVpn(rowClickData);
    dispatch(setSelectedRow({ msgVpnName: rowClickData }));
    router.push("/mlsnm");
  };

  // row 우클릭
  const rowContext = (e: any, row: any) => {
    e.preventDefault();
    const tableInfo = tableRef.current;
    console.log(tableInfo);
    const rowClickData = row.getData().msgVpnName;
    setSelectedVpn(rowClickData);
    if (tableInfo) {
      tableInfo.deselectRow();
      row.select();
      // 마우스 위치를 가져옴
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      setRightClickPosition({ x: mouseX, y: mouseY });
      setRightClick(true);
    }
  };

  return (
    <div ref={dropdownRef as React.RefObject<HTMLDivElement>}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          marginBottom: 10,
        }}
      >
        <Image
          src={"/dotMenu.png"}
          alt={"toggleIcon"}
          height={20}
          width={20}
          onClick={handleToogleMenuClick}
          style={{ cursor: "pointer" }}
        />
        <div
          style={{
            marginRight: 10,
            borderColor: "gray",
            borderStyle: "solid",
            borderRadius: 10,
            paddingRight: 2,
            paddingLeft: 2,
            cursor: "pointer",
          }}
          onClick={handleActionClick}
        >
          Action
        </div>
      </div>
      {/* Toggle columns UI */}
      {showToggleMenu ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: 10,
            backgroundColor: "#fffae8",
            borderColor: "gray",
            borderWidth: "1px 3px 3px 1px",
            borderStyle: "solid",
            borderRadius: 8,
          }}
        >
          {columns.map((col) => (
            <label key={col.field}>
              <input
                type="checkbox"
                checked={visibleColumns.includes(col.field)}
                onChange={() => handleToggleColumn(col.field)}
              />
              {col.title}
            </label>
          ))}
        </div>
      ) : null}
      {showToggleAction ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: 10,
            backgroundColor: "#fffae8",
            borderColor: "gray",
            borderWidth: "1px 3px 3px 1px",
            borderStyle: "solid",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          {ActionData.map((actionItem) => (
            <div
              key={actionItem.id}
              onClick={(event) => {
                if (
                  selectedRows.length > 1 &&
                  [1, 2, 3, 4, 5].includes(actionItem.id)
                ) {
                  event.preventDefault();
                  return;
                }
                event.stopPropagation();
                handleActionTitleClick(actionItem);
              }}
              style={{
                cursor:
                  selectedRows.length > 1 &&
                  [1, 2, 3, 4, 5].includes(actionItem.id)
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  selectedRows.length > 1 &&
                  [1, 2, 3, 4, 5].includes(actionItem.id)
                    ? 0.5
                    : 1,
              }}
            >
              {actionItem.title}
            </div>
          ))}

          {/* {ActionData.map((actionItem) => (
            <div
              key={actionItem.id}
              onClick={(event) => {
                event.stopPropagation();
                handleActionTitleClick(actionItem);
              }}
            >
              {actionItem.title}
            </div>
          ))} */}
        </div>
      ) : null}
      {rightClick && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            left: `${rightClickPosition.x}px`,
            top: `${rightClickPosition.y}px`,
            zIndex: 10,
            backgroundColor: "#fffae8",
            borderColor: "gray",
            borderWidth: "1px 3px 3px 1px",
            borderStyle: "solid",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          {ActionData.map((actionItem) => (
            <div
              key={actionItem.id}
              onClick={(event) => {
                event.stopPropagation();
                handleActionTitleClick(actionItem);
              }}
            >
              {actionItem.title}
            </div>
          ))}
        </div>
      )}
      <ReactTabulator
        key={tableKey}
        onRef={(ref) => (tableRef.current = ref.current)}
        data={gridData}
        columns={allColumns}
        options={{
          layout: "fitColumns",
          placeholder: "데이터가 없습니다",
          pagination: "local",
          paginationSize: pageSize,
          paginationSizeSelector: [5, 10, 20, 50],
          paginationButtonCount: 0,
          movableColumns: true,
          selectable: true,
        }}
        layout={"fitData"}
        events={{
          renderStarted: renderStarted,
          rowClick: rowClick,
          rowContext: rowContext,
        }}
      />
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
          <button
            style={{
              borderColor: "transparent",
              backgroundColor: "transparent",
            }}
            onClick={handlePrevBtnClick}
          >
            prev
          </button>
          <button
            style={{
              borderColor: "transparent",
              backgroundColor: "transparent",
            }}
            onClick={handleNextBtnClick}
          >
            next
          </button>
          {/* <div
            onContextMenu={(e) => {
              e.preventDefault();
              console.log("우클릭!");
            }}
          >
            우클릭!
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Grid;
