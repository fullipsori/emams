"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import VpnBox from "./vpnBox";
import { vpnColumn, vpnData } from "@/data/gridData";
import Grid from "../../GridComponent/grid";
import PageSizeSelector from "../../footer/pageSizeSelector";
import PaginationBtn from "../../footer/paginationBtn";
import RefreshData from "../../footer/refreshData";
import axios from "axios";

const VpnPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [girdStatus, setGridStatus] = useState<boolean>(false);
  const [boxStatus, setBoxStatus] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState(10);
  const [isFirstActive, setIsFirstActive] = useState<boolean>(true);
  const [isNextActive, setIsNextActive] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  // format YYYY-MM-DD HH:MM:SS
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const dateTimeString =
    `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")} ` +
    `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const [refreshTime, setRefreshTime] = useState<string>(dateTimeString);

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
        count: pageSize,
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
  }, [pageSize, refreshTime]);

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

  const handleRefreshClick = () => {
    fetchData();
    setRefreshTime(dateTimeString);
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
      {/* 하단 footer 임시 생성 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "fixed",
          bottom: 0,
          left: 220,
          width: "calc(100% - 220px)",
          background: "#2e353d",
          padding: "10px",
          borderTop: "1px solid #2e353d",
          boxSizing: "border-box",
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <PaginationBtn
          onFirstClick={handleFirstClick}
          onNextClick={handleNextClick}
          isFirstActive={isFirstActive}
          isNextActive={isNextActive}
        />
        <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <RefreshData
            onRefreshClick={handleRefreshClick}
            refreshTime={refreshTime}
          />
          <div style={{ color: "#e9e9e9", fontSize: 14 }}>Show |</div>
          <PageSizeSelector
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default VpnPage;
