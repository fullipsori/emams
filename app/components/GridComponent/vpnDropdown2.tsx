import React, { useEffect, useRef, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import { CellComponent, RowComponent } from "tabulator-tables";
import "react-tabulator/lib/styles.css";
import { toast } from "react-toastify";
import { vpnData, vpnListData } from "@/data/gridData";

interface TableDataItem {
  id: number;
  msgVpnName: string;
}

interface DropdownComponentProps {
  onSelectedServerName: (vpnName: string[]) => void;
}

const VpnDropdown2: React.FC<DropdownComponentProps> = ({
  onSelectedServerName,
}) => {
  const tableRef = useRef(null);
  const [rowData, setRowData] = useState<TableDataItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);
  const [selectedServerNames, setSelectedServerNames] = useState<string[]>([]);
  const [selectedServerCount, setSelectedServerCount] = useState<number>(0);

  useEffect(() => {
    setRowData(vpnListData);
  }, []);

  const columns = [
    {
      title: "",
      width: 40,
      formatter: (cell: CellComponent) => {
        const checkbox = document.createElement("input");
        checkbox.type = "radio";
        checkbox.addEventListener("change", () => {
          const row = cell.getRow();
          const isChecked = checkbox.checked;
          console.log(row);

          if (isChecked) {
            console.log(tableRef);
            const selectedRows = tableRef.current?.table.getSelectedRows();
            if (selectedRows) {
              selectedRows.forEach((selectedRow: RowComponent) => {
                const selectedCheckbox = selectedRow
                  .getElement()
                  .querySelector("input[type='radio']");
                if (selectedCheckbox && selectedCheckbox !== checkbox) {
                  (selectedCheckbox as HTMLInputElement).checked = false;
                  selectedRow.toggleSelect();
                }
              });
            }
          }

          row.toggleSelect();
        });

        return checkbox;
      },
      hozAlign: "center",
      headerSort: false,
      headerTooltip: true,
      cssClass: "text-center",
    },
    {
      title: "msgVpnName",
      field: "msgVpnName",
      headerTooltip: true,
      hozAlign: "left",
      width: 125,
    },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const options = {
    layout: "fitColumns",
    printAsHtml: true,
    printVisibleRowsOnly: true,
    movableColumns: true,
    placeholder: "데이터가 없습니다",
    height: 300,
  };

  const toastOptions = {
    autoClose: 2500,
    hideProgressBar: true,
    closeButton: false,
    // positiont:
  };

  // 조회 버튼 눌렀을 때
  const handleConfirm = () => {
    const selectedRows = tableRef.current?.table.getSelectedRows() || [];
    console.log("111", selectedRows);
    const selectedCount = selectedRows.length;
    const selectedItems = selectedRows.map((row: RowComponent) =>
      row.getData()
    );
    const selectedServerNames = selectedItems.map(
      (item: TableDataItem) => item.msgVpnName
    );

    if (selectedCount > 0) {
      toast.success(
        <div>
          <p>선택한 서버 수 {selectedCount}</p>
          <div>선택한 서버 {`${selectedServerNames.join(", ")}`}</div>
        </div>,
        toastOptions
      );
      onSelectedServerName(selectedServerNames);

      setSelectedServerNames(selectedServerNames);
      setSelectedServerCount(selectedCount);
    } else if (selectedCount === 0) {
      setSelectedServerNames(["server"]);
    } else {
      toast.error("No servers selected");
      setSelectedServerNames([]);
      setSelectedServerCount(0);
    }

    setDropdownMenu(false);
  };

  const handleDropdownVisible = () => {
    setSearchTerm("");
    setDropdownMenu(!dropdownMenu);
  };

  const handleCancelClick = () => {
    setDropdownMenu(false);
  };

  const dropdownText =
    selectedServerCount > 0
      ? `${selectedServerNames[0]}외 ${selectedServerCount - 1}건`
      : "server";

  const selectedOptionName =
    selectedServerCount === 1 ? selectedServerNames[0] : "";

  // 백그라운드 클릭했을 때 모달 닫히도록 설정
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleOutsideClick = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef as React.RefObject<HTMLDivElement>}>
      {/* === 입력 창 === */}
      <div className="select_box p_r">
        <div
          className="form-select"
          id="sel_server"
          style={{ cursor: "pointer" }}
          onClick={handleDropdownVisible}
        >
          {selectedServerCount === 1 ? selectedOptionName : dropdownText}
        </div>
        {/* === 드롭 다운 메뉴 === */}
        {dropdownMenu ? (
          // <div className="ems_sel_ly">
          // <div className="sel_all_cont">
          <div>
            <div>
              {/* === 검색 기능 === */}
              {/* <div className="search_area">
                <div className="col-sm-11 float-start"> */}
              <div>
                <input
                  // className="form-control input_30"
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              {/* </div> */}
              <div className="p_5 table-responsive">
                <ReactTabulator
                  key={rowData.length}
                  ref={tableRef}
                  data={rowData}
                  columns={columns}
                  options={options}
                  layout={"fitData"}
                />
              </div>
            </div>
            <div>
              {/* === 확인/취소 버튼 === */}
              <div className="bott_button">
                <div className="mt-2 mb-2 d-flex justify-content-center">
                  <button
                    onClick={handleConfirm}
                    className="btn btn-xs btn-light mr_3"
                  >
                    적용
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="btn btn-xs btn-light"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default VpnDropdown2;
