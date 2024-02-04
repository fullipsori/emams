import "./style.css";
import type { ReactNode } from "react";
import Link from "next/link.js";
import { Tab, TabList, TabPanel, Tabs } from "./tabs";

export default function Layout(props: { tabs: ReactNode }) {
  return (
    <main className="main">
      <h1 className="heading">Queues</h1>
      <div className="wrapper">
        <Tabs>
          <TabList>
            <Tab href="/channelList">Queues</Tab>
            {/* <Tab href="/channel/settings">settings</Tab> */}
          </TabList>
          <TabPanel>
            {props.tabs}
          </TabPanel>
        </Tabs>
      </div>
    </main>
  );
}