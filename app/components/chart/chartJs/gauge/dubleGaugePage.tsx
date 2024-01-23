"use client";

import React, { useEffect, useState } from "react";
import { gauageChartData, gaugeLabels2 } from "@/data/chartData";
import DubleGauge1 from "./dubleGauge1";
import DubleGauge2 from "./dubleGauge2";

const DubleGaugePage = () => {
  const gauageData = [65, 25, 15];
  const [gaugeValue, setGaugeValue] = useState<number>(70);
  const [gaugeMaxValue, setGaugeMaxValue] = useState<number>(30);
  const [gaugeArr, setGaugeArr] = useState([gaugeValue, gaugeMaxValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10) || 0;
    setGaugeValue(newValue);
    setGaugeMaxValue(100 - newValue);
    setGaugeArr([newValue, 100 - newValue]);
  };

  return (
    <div style={{ position: "relative", margin: "20px" }}>
      <div style={{ position: "absolute", top: "50px", left: "50px" }}>
        <DubleGauge1 data={gauageData} labels={gaugeLabels2} />
      </div>
      <div style={{ position: "absolute", top: "65px", left: "60px" }}>
        <DubleGauge2
          data={gaugeArr}
          labels={gaugeLabels2}
          gaugeValue={gaugeValue}
        />
      </div>
      <div>
        <label>Gauge Value:</label>
        <input
          type="number"
          value={gaugeValue}
          onChange={handleInputChange}
          min={0}
          max={100}
        />
      </div>
    </div>
  );
};

export default DubleGaugePage;
