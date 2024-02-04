import VpnState from "@/app/components/vpnState/vpnState";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statistics",
};

export default function Service() {
  return (
    <div>
      <h1>Statistics</h1>
      <VpnState />
    </div>
  );
}
