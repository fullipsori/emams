import { Metadata } from "next";
import VpnState from "@/app/components/vpnState/vpnState";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Monitor() {
  return (
    <div>
      <h1>Dashboard</h1>
      <VpnState />
    </div>
  );
}
