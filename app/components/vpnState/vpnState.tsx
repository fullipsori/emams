"use client";

import { useAppSelector } from "@/hook/hook";

const VpnState = () => {
  const selectedRow = useAppSelector((state) => state.isVpn.selectedRow);

  return (
    <div>
      {selectedRow && <div>{selectedRow ? selectedRow.msgVpnName : ""}</div>}
    </div>
  );
};

export default VpnState;
