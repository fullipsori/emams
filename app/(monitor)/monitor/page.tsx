import VpnState from "@/app/components/vpnState/vpnState";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monitor",
};

export default function Monitor() {

  return (
    <div>
      <VpnState />
    </div>
  );
}
