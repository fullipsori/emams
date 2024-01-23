"use client";

import React, { useEffect, useState } from "react";
import GaugeChart from "./gauge";
import DubleGaugeChart from "./dubleGauge";

const DubleGaugeTest = () => {
  const [gaugeValue, setGaugeValue] = useState(80);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10) || 0;
    setGaugeValue(newValue);
  };

  return (
    <div>
      <DubleGaugeChart value1={[100, 80, 60]} value2={gaugeValue} />
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

export default DubleGaugeTest;
