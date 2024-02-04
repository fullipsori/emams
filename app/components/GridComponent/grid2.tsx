// "use client";

// import { ActionData } from "@/data/gridData";
// import { useAppDispatch } from "@/hook/hook";
// import { setSelectedRow } from "@/redux/vpnSlice";
// import { GridProps } from "@/types/grid";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { useEffect, useRef, useState } from "react";
// import {
//   ColumnDefinition,
//   ReactTabulator,
//   ReactTabulatorOptions,
// } from "react-tabulator";
// import "react-tabulator/lib/styles.css";
// import { RowComponent } from "tabulator-tables";

// const Grid: React.FC<GridProps> = ({ data, columns }) => {
//   const router = useRouter();

//   const menuList = columns.map((item: any) => item.field);
//   const dispatch = useAppDispatch();
//   // const onRef = useRef<ReactTabulatorOptions | null>(null);
//   let tableRef = React.useRef<any>();
//   const [gridData, setGridData] = useState<any[]>([]);
//   const [pageSize, setPageSize] = useState(5);
//   const [showToggleMenu, setShowToggleMenu] = useState<boolean>(false);
//   const [showToggleAction, setShowToggleAction] = useState<boolean>(false);
//   const [visibleColumns, setVisibleColumns] = useState<any[]>(menuList);
//   const [selectedRows, setSelectedRows] = useState<string[]>([]);
//   const tableKey = JSON.stringify({ visibleColumns, pageSize });
//   const [selectedVpn, setSelectedVpn] = useState<string>("");
//   const [checkedRows, setCheckedRows] = useState(new Set());
//   const filteredColumns = columns.filter((col) =>
//     visibleColumns.includes(col.field)
//   );

//   // columns를 체크박스와 데이터로 분리해서 합침!
//   const checkboxColumn: ColumnDefinition = {
//     title: "",
//     titleFormatter: "rowSelection",
//     formatter: "rowSelection",
//     // formatter: checkboxFormatter,
//     width: 40,
//     hozAlign: "center",
//     cssClass: "text-center",
//     headerSort: false,
//     // cellClick: (e: any, cell: any) => cell.getRow().toggleSelect(),
//     cellClick: function (_e, cell) {
//       const row = cell.getRow();
//       const rowData = row.getData();
//       const rowId = rowData.id;
//       console.log(checkedRows.size);
//     },
//   };

//   // useEffect(() => {
//   //   console.log(checkedRows.size);
//   // }, [checkedRows]);

//   // 기존 columns에 체크박스 column을 추가함@
//   const allColumns = [checkboxColumn, ...filteredColumns];

//   const handleToggleColumn = (columnField: string) => {
//     setVisibleColumns((prev) =>
//       prev.includes(columnField)
//         ? prev.filter((field) => field !== columnField)
//         : [...prev, columnField]
//     );
//   };
//   useEffect(() => {}, [gridData, menuList]);

//   useEffect(() => {}, [selectedRows, selectedVpn]);

//   console.log("checked된 rows", selectedRows);

//   const handlePageSizeChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const newPageSize = parseInt(event.target.value, 10);
//     setPageSize(newPageSize);
//   };

//   useEffect(() => {
//     setGridData(data);
//   }, [data]);

//   const handleToogleMenuClick = () => {
//     setShowToggleMenu(!showToggleMenu);
//     setShowToggleAction(false);
//   };

//   const handleActionClick = () => {
//     setShowToggleAction(!showToggleAction);
//     setShowToggleMenu(false);
//   };

//   const handleActionTitleClick = (item: any) => {
//     console.log("actionMenuClick", item);
//     if (item.title === "Delete") {
//       alert("삭제하시겠습니까?");
//       setShowToggleAction(false);
//     } else if (item.id === 5) {
//       router.push(`${item.url}`);
//       setShowToggleAction(false);
//     } else if (item.id === 4) {
//       router.push(`${item.url}`);
//       setShowToggleAction(false);
//     } else if (item.id === 3) {
//       router.push(`${item.url}`);
//       setShowToggleAction(false);
//     } else if (item.id === 2) {
//       router.push(`${item.url}`);
//       dispatch(setSelectedRow({ msgVpnName: selectedVpn }));
//       setShowToggleAction(false);
//     } else if (item.id === 1) {
//       router.push(`${item.url}`);
//       dispatch(setSelectedRow({ msgVpnName: selectedVpn }));
//       setShowToggleAction(false);
//     }
//   };

//   // react-tabulator footer 없애는 로직
//   const renderStarted = async (e: any) => {
//     const el = document.getElementsByClassName(
//       "tabulator-footer"
//     )[0] as HTMLElement;
//     console.log(el);
//     el.style.display = "none";
//   };

//   // footer button
//   const handlePrevBtnClick = () => {
//     console.log("이전 버튼 클릭");
//   };

//   const handleNextBtnClick = () => {
//     console.log("다음 버튼 클릭");
//   };

//   // 백그라운드 클릭했을 때 모달 닫히도록 설정
//   const dropdownRef = useRef<HTMLDivElement | null>(null);
//   useEffect(() => {
//     const handleOutsideClick = (event: { target: any }) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowToggleAction(false);
//         setShowToggleMenu(false);
//       }
//     };

//     document.addEventListener("mousedown", handleOutsideClick);

//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, []);

//   // row 클릭
//   const rowClick = (e: any, row: any) => {
//     e.preventDefault();
//     const tableInfo = tableRef.current;
//     const rowClickData = row.getData().msgVpnName;
//     if (tableInfo) {
//       console.log(rowClickData);
//       setSelectedVpn(rowClickData);
//       row.select();
//     }

//     // 수동으로 isChecked인 row 값 알아내는 방법!
//     setSelectedRows((prevSelectedRows) => {
//       if (prevSelectedRows.includes(rowClickData)) {
//         return prevSelectedRows.filter((item) => item !== rowClickData);
//       } else {
//         return [...prevSelectedRows, rowClickData];
//       }
//     });
//   };

//   // row 우클릭
//   const rowContext = (e: any, row: any) => {
//     e.preventDefault();
//     const rowClickData = row.getData().msgVpnName;
//     const tableInfo = tableRef.current;
//     if (tableInfo) {
//       // tableInfo.deselectRow();
//       row.select();
//     }
//   };

//   return (
//     <div ref={dropdownRef as React.RefObject<HTMLDivElement>}>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           gap: 20,
//           marginBottom: 10,
//         }}
//       >
//         <Image
//           src={"/dotMenu.png"}
//           alt={"toggleIcon"}
//           height={20}
//           width={20}
//           onClick={handleToogleMenuClick}
//           style={{ cursor: "pointer" }}
//         />
//         <div
//           style={{
//             marginRight: 10,
//             borderColor: "gray",
//             borderStyle: "solid",
//             borderRadius: 10,
//             paddingRight: 2,
//             paddingLeft: 2,
//             cursor: "pointer",
//           }}
//           onClick={handleActionClick}
//         >
//           Action
//         </div>
//       </div>
//       {/* Toggle columns UI */}
//       {showToggleMenu ? (
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             position: "fixed",
//             zIndex: 10,
//             backgroundColor: "#fffae8",
//             borderColor: "gray",
//             borderWidth: "1px 3px 3px 1px",
//             borderStyle: "solid",
//             borderRadius: 8,
//           }}
//         >
//           {columns.map((col) => (
//             <label key={col.field}>
//               <input
//                 type="checkbox"
//                 checked={visibleColumns.includes(col.field)}
//                 onChange={() => handleToggleColumn(col.field)}
//               />
//               {col.title}
//             </label>
//           ))}
//         </div>
//       ) : (
//         <div></div>
//       )}
//       {showToggleAction ? (
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             position: "fixed",
//             zIndex: 10,
//             backgroundColor: "#fffae8",
//             borderColor: "gray",
//             borderWidth: "1px 3px 3px 1px",
//             borderStyle: "solid",
//             borderRadius: 8,
//             cursor: "pointer",
//           }}
//         >
//           {ActionData.map((actionItem) => (
//             <div
//               key={actionItem.id}
//               onClick={(event) => {
//                 event.stopPropagation();
//                 handleActionTitleClick(actionItem);
//               }}
//             >
//               {actionItem.title}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div></div>
//       )}

//       <ReactTabulator
//         key={tableKey}
//         onRef={(ref) => (tableRef = ref)}
//         data={gridData}
//         columns={allColumns}
//         options={{
//           layout: "fitColumns",
//           placeholder: "데이터가 없습니다",
//           pagination: "local",
//           paginationSize: pageSize,
//           paginationSizeSelector: [5, 10, 20, 50],
//           paginationButtonCount: 0,
//           movableColumns: true,
//           selectable: false,
//         }}
//         layout={"fitData"}
//         events={{
//           renderStarted: renderStarted,
//           rowClick: rowClick,
//           rowContext: rowContext,
//         }}
//       />
//       {/* 하단 footer 임시 생성 */}
//       <div
//         id="table-footer"
//         style={{
//           position: "fixed",
//           bottom: 0,
//           left: 250,
//           width: "100%",
//           background: "#2e353d",
//           padding: "10px",
//           borderTop: "1px solid #2e353d",
//         }}
//       >
//         {/* tabulator pagination */}
//         <div>
//           <select
//             id="pagesize"
//             onChange={handlePageSizeChange}
//             value={pageSize}
//           >
//             <option value="5">5</option>
//             <option value="10">10</option>
//             <option value="20">20</option>
//             <option value="50">50</option>
//           </select>
//           <button
//             style={{
//               borderColor: "transparent",
//               backgroundColor: "transparent",
//             }}
//             onClick={handlePrevBtnClick}
//           >
//             prev
//           </button>
//           <button
//             style={{
//               borderColor: "transparent",
//               backgroundColor: "transparent",
//             }}
//             onClick={handleNextBtnClick}
//           >
//             next
//           </button>
//           <div
//             onContextMenu={(e) => {
//               e.preventDefault();
//               console.log("우클릭!");
//             }}
//           >
//             우클릭!
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Grid;
