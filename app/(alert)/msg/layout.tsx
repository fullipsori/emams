import "./style.css";
import type { ReactNode } from "react";
import Link from "next/link.js";
import { Tab, TabList, TabPanel, Tabs } from "./tabs";

export default function Layout(props: { tabs: ReactNode }) {
  return (
    <main className="main">
      <h1 className="heading">Anomalies Detected</h1>
      <div className="wrapper">
        <Tabs>
          <TabList>
            <Tab href="/msg">Anomalies Detected</Tab>
          </TabList>
          <TabPanel>{props.tabs}</TabPanel>
        </Tabs>
      </div>
    </main>
  );
}