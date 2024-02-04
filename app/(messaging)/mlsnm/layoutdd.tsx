"use client";

import HeaderGrid from "@/app/components/GridComponent/headerGrid";
import { MessageVpnData } from "@/data/gridData";
import { useAppSelector } from "@/hook/hook";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Layout() {
  const router = useRouter();
  const selectedRow = useAppSelector((state) => state.isVpn.selectedRow);
  const [selectedTitleId, setSelectedTitleId] = useState<number | null>(1);

  const handleActionTitleClick = (item: any) => {
    console.log("actionMenuClick", item);
    setSelectedTitleId(item.id);
    router.push(`/mlsnm/${item.url}`);
    if (item.id === 6) {
      // alert("Stats");
    } else if (item.id === 5) {
      // alert("Proxies");
    } else if (item.id === 4) {
      // alert("Replication");
    } else if (item.id === 3) {
      // alert("Services");
    } else if (item.id === 2) {
      // alert("Settings");
    } else if (item.id === 1) {
      // alert("Summary");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <HeaderGrid />
      </div>
      {/* <h1>MLSN Management</h1> */}
      <div style={{ display: "flex", gap: 20, cursor: "pointer" }}>
        {MessageVpnData.map((actionItem) => (
          <div
            onClick={(event) => {
              event.stopPropagation();
              handleActionTitleClick(actionItem);
            }}
            key={actionItem.id}
            style={{ color: "Gray", fontSize: 16, position: "relative" }}
          >
            {actionItem.title}
            {selectedTitleId === actionItem.id && (
              <div
                style={{
                  height: 2,
                  backgroundColor: "gray",
                  position: "absolute",
                  left: 0,
                  right: 0,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
