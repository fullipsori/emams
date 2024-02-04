import "./style.css";
import type { ReactNode } from "react";
import { Tab, TabList, TabPanel, Tabs } from "./tabs";
import HeaderGrid from "@/app/components/GridComponent/headerGrid";

export default function Layout(props: { tabs: ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <HeaderGrid />
      </div>
      <h1 className="heading">Channel</h1>
      <Tabs>
        <TabList>
          <Tab href="/mlsnm">summary</Tab>
          <Tab href="/mlsnm/settings">settings</Tab>
          {/* <Tab href="/mlsnm/services">services</Tab>
          <Tab href="/mlsnm/replication">replication</Tab>
          <Tab href="/mlsnm/proxies">proxies</Tab>
          <Tab href="/mlsnm/stats">stats</Tab> */}
        </TabList>
        <TabPanel>{props.tabs}</TabPanel>
      </Tabs>
    </div>
  );
}
