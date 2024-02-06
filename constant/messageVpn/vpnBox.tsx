"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { setSelectedRow } from "@/redux/vpnSlice";
import { vpnDataType } from "@/types/grid";
import { useAppDispatch, useAppSelector } from "@/hook/hook";
import { ActionData } from "@/data/gridData";
import { useRouter } from "next/navigation";

interface BoxProps {
  data: vpnDataType[];
}

const VpnBox: React.FC<BoxProps> = ({ data }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedVpn, setSelectedVpn] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const handleMenuClick = (
    event: React.MouseEvent,
    item: any,
    index: number
  ) => {
    event.stopPropagation();
    setSelectedVpn(item.msgVpnName);
    setOpenMenu((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    console.log("메뉴 클릭", selectedVpn);
  }, [selectedVpn]);

  const handleDeleteClick = () => {
    alert(`VPN ${selectedVpn}를 삭제하시겠습니까?`);
    setOpenMenu(null);
  };

  const handleCardClick = (item: any) => {
    dispatch(setSelectedRow({ msgVpnName: item.msgVpnName }));
    router.push("/mlsnm");
  };

  const handleActionTitleClick = (item: any) => {
    console.log("actionMenuClick", item);
    if (item.id === 6) {
      // alert("삭제하시겠습니까?");
      handleDeleteClick();
      setOpenMenu(null);
    } else if (item.id === 5) {
      alert("Message Queued 이동");
      router.push(`${item.url}`);
      setOpenMenu(null);
    } else if (item.id === 4) {
      alert("monitoring 이동");
      router.push(`${item.url}`);
      setOpenMenu(null);
    } else if (item.id === 3) {
      alert("Stats | Message Stats");
      router.push(`${item.url}`);
      setOpenMenu(null);
    } else if (item.id === 2) {
      dispatch(setSelectedRow({ msgVpnName: selectedVpn }));
      router.push(`${item.url}`);
      setOpenMenu(null);
    } else if (item.id === 1) {
      dispatch(setSelectedRow({ msgVpnName: selectedVpn }));
      router.push(`${item.url}`);
      setOpenMenu(null);
    }
  };

  // 백그라운드 클릭했을 때 모달 닫히도록 설정
  const dropdownRefs = useRef<Array<HTMLDivElement | null>>([]);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const isOutside = dropdownRefs.current.every(
        (ref, idx) => !ref?.contains(event.target as Node) || openMenu !== idx
      );
      if (isOutside) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openMenu]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
      {data.map((item, index) => {
        const setDropdownRef = (element: HTMLDivElement) => {
          dropdownRefs.current[index] = element;
        };
        const IncomingValueWidth = item.msgVpnConnections * 2;
        const OutgingValueWidth = item.msgVpnConnectionsServiceRestOutgoing * 2;
        const replicationStatus = item.replicationEnabled;
        const dmrEnabledStatus = item.dmrEnabled;

        return (
          <div
            ref={setDropdownRef}
            style={{
              borderColor: "#000",
              borderWidth: 2,
              borderRadius: 10,
              borderStyle: "solid",
              cursor: "pointer",
            }}
            key={index}
            onClick={() => handleCardClick(item)}
          >
            <div style={{ padding: 10 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ color: "#000000", fontWeight: 700 }}>
                    {item.msgVpnName}
                  </div>
                  <div style={{ color: "#585858" }}>MSN Type:</div>
                  <div style={{ color: "#585858" }}>MSN Name:</div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <div style={{ color: "#727272" }}>Sattus: {item.state}</div>
                    <div style={{ borderWidth: 1, borderColor: "#dadada" }} />
                    <div style={{ color: "#727272" }}>
                      Replication: {replicationStatus ? "On" : "Off"}
                    </div>
                    <div style={{ borderWidth: 1, borderColor: "#dadada" }} />
                    <div style={{ color: "#727272" }}>
                      DMR: {dmrEnabledStatus ? "On" : "Off"}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    borderWidth: 1,
                    borderColor: "#dadada",
                  }}
                />
                <div style={{ position: "relative" }}>
                  {/* 부모 컨테이너 추가 */}
                  <Image
                    width="30"
                    height="30"
                    src={"/menu.png"}
                    alt={"menu"}
                    onClick={(event) => handleMenuClick(event, item, index)}
                    style={{ cursor: "pointer" }}
                  />
                  {openMenu === index && (
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
                      // onClick={() => handleDeleteClick(item)}
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
                </div>
              </div>
              <div style={{ color: "#585858" }}>
                {item.msgSpoolCurrentQueuesAndTopicEndpoints} Queues and Topic
                Endpoints
              </div>
              <div style={{ color: "#585858" }}>
                {item.msgSpoolMsgCount} Messages Queued
              </div>
              <div style={{ color: "#727272" }}>
                {item.msgVpnConnections} of 100
              </div>
              <div style={{ color: "#727272" }}>
                {item.msgVpnConnectionsServiceRestOutgoing} of 100
              </div>
              {/* <div style={{ display: "flex", gap: 20, marginTop: 15 }}>
                <div style={{}}>
                  <div style={{ color: "#727272" }}>Incoming Connections</div>
                  <div
                    style={{
                      borderWidth: 1,
                      borderColor: "#dadada",
                      // position: "absolute",
                      width: 200,
                      borderStyle: "solid",
                    }}
                  />
                  <div
                    style={{
                      borderWidth: IncomingValueWidth === 0 ? 0 : 3,
                      borderColor: "#00c895",
                      borderRadius: 10,
                      borderStyle: "solid",
                      width: IncomingValueWidth,
                      bottom: 3,
                      position: "relative",
                    }}
                  />
                  <div style={{ color: "#727272" }}>
                    {item.msgVpnConnections} of 100
                  </div>
                </div>
                <div
                  style={{
                    borderWidth: 1,
                    borderColor: "#dadada",
                    borderStyle: "solid",
                  }}
                />
                <div>
                  <div style={{ color: "#727272" }}>
                    Outgoing REST Connections
                  </div>
                  <div
                    style={{
                      borderWidth: 1,
                      borderColor: "#dadada",
                      borderStyle: "solid",
                      // position: "absolute",
                      width: 200,
                    }}
                  />
                  <div
                    style={{
                      borderWidth: OutgingValueWidth === 0 ? 0 : 3,
                      borderColor: "#00c895",
                      borderRadius: 10,
                      borderStyle: "solid",
                      width: OutgingValueWidth,
                      bottom: 3,
                      position: "relative",
                    }}
                  />
                  <div style={{ color: "#727272" }}>
                    {item.msgVpnConnectionsServiceRestOutgoing} of 100
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VpnBox;
