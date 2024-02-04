"use client";

import { Metadata } from "next";
import "react-tabulator/lib/styles.css";
import React, { useEffect } from "react";
import VpnPage from "@/app/components/box/messageVpn/vpnPage";
import { useAppDispatch, useAppSelector } from "@/hook/hook";
import { usePathname } from "next/navigation";
import { setSelectedRow } from "@/redux/vpnSlice";

// export const metadata: Metadata = {
//   title: "MLSN Management (Message VPN)",
// };

interface Data {
  col1: string;
  col2: number;
}

const MessageVpns = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const selectedRow = useAppSelector((state) => state.isVpn.selectedRow);
  console.log("headerGrid msgVpnName:::", selectedRow?.msgVpnName);

  useEffect(() => {
    if (pathname === "/mlsnmList") {
      dispatch(setSelectedRow({ msgVpnName: "" }));
    }
  }, [pathname, dispatch]);

  return (
    <div>
      <h1>MLSN Management (Message VPN)</h1>
      <div>
        <VpnPage />
      </div>
    </div>
  );
};

export default MessageVpns;
