"use client";

import { useRouter } from "next/navigation";

export default function AnomaliesDetectPage() {

  const router = useRouter();

  const fnAddAlertRule = () => {
    console.log('add alert rule');
    router.push("/addRule");
  }
  return (
    <div>
      <h1>Anomalies Detected</h1>
      <button onClick={() => fnAddAlertRule()}>Add Rule</button>
    </div>
  );
}
