"use client";

import RefreshData from "@/app/components/footer/refreshData";
import Advenced from "@/constant/setting/advenced";
import Information from "@/constant/setting/information";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [isEditStatus, setIsEditStatus] = useState<boolean>(false);
  const [hiddenMenu, setHiddenMenu] = useState<boolean>(true);
  const [showTips, setShowTips] = useState<boolean>(true);
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

  const handleEditChange = (isEditing: boolean) => {
    setIsEditStatus(!isEditing);
  };

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditStatus(event.target.checked);
  };

  const handleHiddenMenu = () => {
    setHiddenMenu(!hiddenMenu);
  };

  const handleRefreshClick = () => {
    // fetchData();
    setRefreshTime(dateTimeString);
  };

  const handleTipsClick = () => {
    setShowTips(!showTips);
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
        <Advenced hiddenMenu={hiddenMenu} isEditStatus={!isEditStatus} />
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
            <div>dudlfkdsaflkjsdlfkjasldkjfa;lsjdf;ljaksfdasdf</div>
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
        <RefreshData
          onRefreshClick={handleRefreshClick}
          refreshTime={refreshTime}
        />
      </div>
    </div>
  );
}
