"use client";

import React, { useEffect, useState } from "react";
import GaugeChart from "./gauge";

const GaugeTest = () => {
  const [gaugeValue, setGaugeValue] = useState(70);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10) || 0;
    setGaugeValue(newValue);
  };

  return (
    <div>
      <GaugeChart value={gaugeValue} />
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

export default GaugeTest;
