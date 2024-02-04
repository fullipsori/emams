"use client";

import Link from 'next/link';
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState, KeyboardEvent } from 'react';
import { ReactTabulator, ReactTabulatorOptions, ColumnDefinition, reactFormatter } from "react-tabulator";
import axios from "axios";
import qs from "qs";
import { useAppDispatch, useAppSelector } from '@/hook/hook';
import { useRouter, usePathname } from "next/navigation";
import { selectQueueList } from "@/data/selectType";
import { setSelectedQueue } from '@/redux/vpnSlice';

axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params, { arrayFormat: "repeat" });
};

export default function QueueList() {

  let tableRef = React.useRef<any>();
  const dispatch = useAppDispatch();
  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const tableKey = JSON.stringify({ pageSize });
  const [searchTerm, setSearchTerm] = useState("");
  const [nextUrl, setNextUrl] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const selectedVpn = useAppSelector((state) => state.isVpn.selectedRow);
  console.log(selectedVpn)

  const selectedQueue = useAppSelector((state) => state.isVpn.selectedQueue);
  console.log(selectedQueue)

  const headerInfo = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  };

  const columns: ColumnDefinition[] = [
    { title: "", width: 40, formatter: "rowSelection", titleFormatter: "rowSelection", hozAlign: "center", frozen: true, headerSort: false, cssClass: 'text-center' },
    { title: "Queue Name", field: "queueName", headerTooltip: true, hozAlign: "right" },
    { title: "Incoming", field: "alias", headerTooltip: true, hozAlign: "left" },
    { title: "Outgoing", field: "status", headerTooltip: true, hozAlign: "center" },
    { title: "Access Type", field: "accessType", headerTooltip: true, hozAlign: "left" },
    { title: "Partition Count", field: "partitionCount", headerTooltip: true, hozAlign: "left" },
    { title: "Messages Queued (%)", field: "alias", headerTooltip: true, hozAlign: "left" },
    { title: "Messages Queued (msgs)", field: "alias", headerTooltip: true, hozAlign: "left" },
    { title: "Messages Queued Quota (MB)", field: "alias", headerTooltip: true, hozAlign: "left" },
    { title: "Consumers", field: "alias", headerTooltip: true, hozAlign: "left" },
    { title: "Replay State", field: "replayState", headerTooltip: true, hozAlign: "left" },
    { title: "Durable", field: "durable", headerTooltip: true, hozAlign: "left" },
  ];

  const options: ReactTabulatorOptions = {
    layout: "fitDataTable",
    pagination: true,
    paginationSize: pageSize,
    paginationSizeSelector: [10, 20, 50, 100],
    paginationButtonCount: 0,
    maxHeight: 500,
    placeholder: "No data found.",
  };

  const [searchInfo, setSearchInfo] = useState({
    sQueueNm: ""
  });
  const { sQueueNm } = searchInfo;

  function onChangeSearch(e: { target: { value: any; name: any } }) {
    console.log(e.target)
    const { value, name } = e.target;
    setSearchInfo({
      ...searchInfo,
      [name]: value,
    });
  }

  const fetchTableData = async () => {
    try {
      const baseUrl = '/api/v2/msgVpns/';
      const getQueueUrl = baseUrl.concat('/queues');
      
      console.log(pageSize)
      console.log(sQueueNm)
      console.log(searchInfo.sQueueNm)
      console.log(selectedVpn)

      const getParamsVal = {
        count: pageSize,
        cursor: '',
        where: sQueueNm,
        select: selectQueueList,
        msgVpnName: selectedVpn
      };

      console.log(getParamsVal)

      await axios.get(getQueueUrl, {
        params: getParamsVal,
        headers: headerInfo,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      })
        .then(function (response) {
          const resCode = response.data.meta.responseCode;
          console.log(resCode)
          console.log(response.data.data)
          console.log(response.data.meta.paging)
          if (resCode === 200) {
            const dataVal = response.data.data;
            const nextUrlVal = response.data.meta.paging.nextPageUri;
            console.log(nextUrlVal)
            setTableData(dataVal);
            setNextUrl(nextUrlVal);
          }
        })
        .catch(function (error) {
          console.log(error)
        })

      // TestJson
      // const datas = require('/data/queue/queueList.json');
      // console.log(datas)
      // const dataVal = datas.data;

      // setTableData(dataVal)

    } catch (err) {
      console.error("Error fetching table data:", err);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [pageSize]);

  const nextTableData = async () => {
    try {
      console.log(pageSize)

      const vpnNm = 'default';
      // const getNextUrl = '';

      const urlParams = new URL(nextUrl).searchParams;

      console.log(urlParams.get('cursor'))
      console.log(urlParams.get('count'))
      console.log(urlParams.get('where'))

      console.log(nextUrl)

      await axios.get(nextUrl, {
        headers: headerInfo,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      })
        .then(function (response) {
          const resCode = response.data.meta.responseCode;
          console.log(resCode)
          console.log(response.data.data)
          if (resCode === 200) {
            const dataVal = response.data.data;
            const nextUrlVal = response.data.meta.paging.nextPageUri;
            console.log(nextUrlVal)
            setTableData(dataVal);
            setNextUrl(nextUrlVal);
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (err) {
      console.error("Error fetching table data:", err);
    }
  };

  const submitQueueSearch = () => {
    fetchTableData();
  }

  const handleKeydownInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return;
    if (e.code !== 'Enter') return;

    fetchTableData();
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
  };

  const handleNextBtnClick = () => {
    console.log("다음 버튼 클릭");

    nextTableData();


  };

  const renderStarted = async (e: any) => {
    const el = document.getElementsByClassName("tabulator-footer")[0] as HTMLElement;
    el.style.display = 'none';
  };

  const rowClick = (e: any, row: any) => {
    const queueNm = row.getData().queueName;
    dispatch(setSelectedQueue({ queueName: queueNm }));

    router.push("/channel");
  };

  const rowContext = (e: any, row: any) => {
    e.preventDefault();
    const tableInfo = tableRef.current;
    tableInfo.deselectRow()
    row.select()
  }

  return (
    <>
      <div>
        <input
          type="text"
          className="form-control"
          id="sQueueNm"
          name="sQueueNm"
          placeholder="search..."
          onChange={onChangeSearch}
          onKeyDown={handleKeydownInput}
        />
        <Image
          width="25"
          height="25"
          src={"/search.png"}
          alt={"menu"}
          onClick={() => submitQueueSearch()}
          style={{ cursor: "pointer" }}
        />
      </div>
      <ReactTabulator
        key={tableKey}
        onRef={(ref) => (tableRef = ref)}
        autoResize={false}
        data={tableData}
        columns={columns}
        options={options}
        events={{
          renderStarted: renderStarted,
          rowClick: rowClick,
          rowContext: rowContext
        }}
      />

      <div id="table-footer" style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        background: "#9399AA",
        padding: "10px",
      }}
      >
        <div>
          <select id="pagesize" onChange={handlePageSizeChange} value={pageSize}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>

          <button style={{ borderColor: "transparent", backgroundColor: "transparent" }} onClick={handleNextBtnClick}>
            next
          </button>
        </div>
      </div>
    </>
  );
}
