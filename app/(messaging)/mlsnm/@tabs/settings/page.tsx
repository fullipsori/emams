"use client";

import RefreshData from "@/app/components/footer/refreshData";
import Advenced from "@/constant/setting/advenced";
import Information from "@/constant/setting/information";
import { useAppSelector } from "@/hook/hook";
import useRefreshData from "@/hook/useRefreshData";
import { formatDateTime } from "@/utils/dateTimeFormat";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const selectedRow = useAppSelector((state) => state.isVpn.selectedRow);
  const msgVpns = selectedRow?.msgVpnName;
  const [data, setData] = useState<any>({});
  const [isEditStatus, setIsEditStatus] = useState<boolean>(false);
  const [hiddenMenu, setHiddenMenu] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(true);
  const { refreshTime, refreshData } = useRefreshData(
    formatDateTime(new Date())
  );

  const handleEditChange = (isEditing: boolean) => {
    setIsEditStatus(!isEditing);
  };

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditStatus(event.target.checked);
  };

  const handleHiddenMenu = () => {
    setHiddenMenu(!hiddenMenu);
  };

  const handleTipsClick = () => {
    setShowTips(!showTips);
  };

  const fetchData = async () => {
    const baseUrl = `/api/v2/msgVpns/${msgVpns}`;
    try {
      const params = {
        select:
          "msgVpnName,msgSpoolMsgCount,maxConnectionCount,eventConnectionCountThreshold,serviceRestOutgoingMaxConnectionCount,msgSpoolUsage,maxMsgSpoolUsage,eventMsgSpoolUsageThreshold,maxEndpointCount,eventEndpointCountThreshold,maxEgressFlowCount,state,replicationEnabled,replicationRole,rxMsgRate,rxByteRate,txMsgRate,txByteRate,msgReplayInitializingCount,msgReplayActiveCount,msgReplayPendingCompleteCount,msgReplayFailedCount,dmrEnabled,kafkaBrokerConnectionCount,maxKafkaBrokerConnectionCount",
      };

      const response = await axios.get(baseUrl, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
        params,
      });
      const DataVal = response.data.data;
      setData(DataVal);
      console.log("데이터:", DataVal);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const testData = {
    data: {
      msgVpnName: "default",
      msgSpoolMsgCount: 6,
      maxConnectionCount: 100,
      eventConnectionCountThreshold: {
        clearPercent: 60,
        setPercent: 80,
      },
      serviceRestOutgoingMaxConnectionCount: 100,
      msgSpoolUsage: 780,
      maxMsgSpoolUsage: 1500,
      eventMsgSpoolUsageThreshold: {
        clearPercent: 60,
        setPercent: 80,
      },
      maxEndpointCount: 1002,
      eventEndpointCountThreshold: {
        clearPercent: 60,
        setPercent: 80,
      },
      maxEgressFlowCount: 1003,
      state: "up",
      replicationEnabled: false,
      replicationRole: "standby",
      rxMsgRate: 0,
      rxByteRate: 0,
      txMsgRate: 0,
      txByteRate: 0,
      msgReplayInitializingCount: 0,
      msgReplayActiveCount: 0,
      msgReplayPendingCompleteCount: 0,
      msgReplayFailedCount: 0,
      dmrEnabled: true,
      kafkaBrokerConnectionCount: 0,
      maxKafkaBrokerConnectionCount: 0,
    },
    meta: {
      request: {
        method: "GET",
        uri: "http://192.168.10.7:8080/SEMP/v2/monitor/msgVpns/default?select=msgVpnName,msgSpoolMsgCount,maxConnectionCount,eventConnectionCountThreshold,serviceRestOutgoingMaxConnectionCount,msgSpoolUsage,maxMsgSpoolUsage,eventMsgSpoolUsageThreshold,maxEndpointCount,eventEndpointCountThreshold,maxEgressFlowCount,state,replicationEnabled,replicationRole,rxMsgRate,rxByteRate,txMsgRate,txByteRate,msgReplayInitializingCount,msgReplayActiveCount,msgReplayPendingCompleteCount,msgReplayFailedCount,dmrEnabled,kafkaBrokerConnectionCount,maxKafkaBrokerConnectionCount",
      },
      responseCode: 200,
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: 30,
        gap: 70,
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: 700,
        }}
      >
        <label
          style={{
            display: "flex",
            gap: 3,
            marginTop: 20,
            justifyContent: "flex-end",
          }}
        >
          <input
            type="checkbox"
            checked={isEditStatus}
            onChange={handleToggleChange}
          />
          <div style={{ fontSize: 14, fontWeight: 700, alignSelf: "center" }}>
            Edit
          </div>
        </label>
        <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 10 }}>
          Basic Information
          <div
            style={{
              borderStyle: "solid",
              borderColor: "gray",
              borderWidth: 0.5,
              marginBottom: 10,
              marginTop: 5,
            }}
          />
        </div>
        <Information
          isEditStatus={!isEditStatus}
          onEditChange={handleEditChange}
          isEnableStatus={data.dmrEnabled}
        />
        <div
          style={{
            borderStyle: "solid",
            borderColor: "gray",
            borderWidth: 0.5,
            marginTop: 50,
            marginBottom: 10,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 50 }}>
            Advenced Configuration & Settings
          </div>
          <Image
            src={"/dropdownMenu.png"}
            alt={"menu"}
            width={24}
            height={24}
            onClick={handleHiddenMenu}
            style={{
              cursor: "pointer",
              transform: hiddenMenu ? "rotate(0deg)" : "rotate(180deg)",
            }}
          />
        </div>
        <Advenced
          hiddenMenu={hiddenMenu}
          isEditStatus={!isEditStatus}
          data={data}
        />
      </div>
      <div>
        {showTips ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 200,
              height: "100%",
              backgroundColor: "#dfdfdf",
              padding: 10,
              whiteSpace: "normal",
              overflowWrap: "break-word",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                cursor: "pointer",
                alignItems: "center",
                gap: 10,
              }}
              onClick={handleTipsClick}
            >
              <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 10 }}>
                tips
              </div>
              <Image src={"/arrow.png"} alt={"arrow"} width={16} height={16} />
            </div>
            <div>ef</div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              cursor: "pointer",
              alignItems: "center",
              gap: 10,
            }}
            onClick={handleTipsClick}
          >
            <Image
              src={"/arrow.png"}
              alt={"arrow"}
              width={16}
              height={16}
              style={{ transform: "rotate(180deg)" }}
            />
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 10 }}>
              tips
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
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
        <RefreshData onRefreshClick={refreshData} refreshTime={refreshTime} />
      </div>
    </div>
  );
}
