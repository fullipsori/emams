"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import VpnBox from "./vpnBox";
import { vpnColumn, vpnData } from "@/data/gridData";
import Grid from "../../app/components/GridComponent/grid";
import PageSizeSelector from "../../app/components/footer/pageSizeSelector";
import PaginationBtn from "../../app/components/footer/paginationBtn";
import RefreshData from "../../app/components/footer/refreshData";
import axios from "axios";
import useRefreshData from "@/hook/useRefreshData";
import { formatDateTime } from "@/utils/dateTimeFormat";

const VpnPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [girdStatus, setGridStatus] = useState<boolean>(false);
  const [boxStatus, setBoxStatus] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState(10);
  const [isFirstActive, setIsFirstActive] = useState<boolean>(true);
  const [isNextActive, setIsNextActive] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const { refreshTime, refreshData } = useRefreshData(
    formatDateTime(new Date())
  );

  const handleFirstClick = () => {
    setIsFirstActive(true);
    setIsNextActive(false);
  };

  const handleNextClick = () => {
    setIsFirstActive(false);
    setIsNextActive(true);
  };

  const fetchData = async () => {
    const baseUrl = "/api/v2/msgVpns/";
    try {
      const params = {
        // count: pageSize,
        count: 100000,
        cursor: "",
        where: searchTerm,
        select:
          "msgVpnName,state,replicationEnabled,replicationRole,dmrEnabled,msgSpoolMsgCount,maxConnectionCount,serviceRestOutgoingMaxConnectionCount,maxMsgSpoolUsage,maxMsgSpoolUsage",
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

  useEffect(() => {
    fetchData();
  }, [pageSize]);

  const handleGridClick = () => {
    setGridStatus(true);
    setBoxStatus(false);
  };

  const handleBoxClick = () => {
    setBoxStatus(true);
    setGridStatus(false);
  };

  // 검색어 핸들링 함수
  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };
  // const filteredData = data.filter((item) =>
  //   item.msgVpnName.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleSearchClick = () => {
    fetchData();
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(event.target.value));
  };

  return (
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
        onClick={handleSearchClick}
      />
      <div
        style={{
          display: "flex",
          gap: 5,
          marginBottom: 10,
          justifyContent: "flex-end",
        }}
      >
        <Image
          width="25"
          height="25"
          src={"/box.png"}
          alt={"menu"}
          style={{ cursor: "pointer" }}
          onClick={handleBoxClick}
        />
        <Image
          width="23"
          height="23"
          src={"/gird.png"}
          alt={"menu"}
          style={{ cursor: "pointer" }}
          onClick={handleGridClick}
        />
      </div>
      {boxStatus && <VpnBox data={data} />}
      {girdStatus && (
        <div>
          <Grid data={data} columns={vpnColumn} />
        </div>
      )}
      {/* footer publuish 적용 */}
      <div className="sol_pagenav_footer">
        <div className="row justify-content-center">
          <PaginationBtn
            onFirstClick={handleFirstClick}
            onNextClick={handleNextClick}
            isFirstActive={isFirstActive}
            isNextActive={isNextActive}
          />
          <div className="col-md-6 d-flex justify-content-center">
            <RefreshData
              onRefreshClick={refreshData}
              refreshTime={refreshTime}
            />
            <PageSizeSelector
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VpnPage;
