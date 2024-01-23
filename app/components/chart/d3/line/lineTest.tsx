"use client";

import { useState } from "react";
import RandomLineChart from "./randomLine";

const StatusLine = () => {
  const data = [
    { name: "Series 1", year: 1, n: 30 },
    { name: "Series 1", year: 2, n: 40 },
    { name: "Series 1", year: 3, n: 25 },

    { name: "Series 2", year: 1, n: 21 },
    { name: "Series 2", year: 2, n: 13 },
    { name: "Series 2", year: 3, n: 9 },

    { name: "Series 3", year: 1, n: 29 },
    { name: "Series 3", year: 2, n: 15 },
    { name: "Series 3", year: 3, n: 35 },

    { name: "Series 4", year: 1, n: 22 },
    { name: "Series 4", year: 2, n: 45 },
    { name: "Series 4", year: 3, n: 5 },
  ];

  const [isZoomed, setIsZoomed] = useState(false);
  const [count, setCount] = useState<number>(2);
  const [widthVal, setWidthVal] = useState<number>(400);
  const [heightVal, setHeightVal] = useState<number>(200);
  const [legendCount, setLegendCount] = useState<number>(50);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10) || 0;
    setCount(newValue);
  };

  const handleLegendChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10) || 0;
    setLegendCount(newValue);
  };

  const getRandomData = (count: number) => {
    return Array.from({ length: legendCount }, () => Math.random() * 100);
  };

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
    console.log(" 줌 했음 ", isZoomed);
    if (isZoomed) {
      setWidthVal(400);
      setHeightVal(200);
    } else if (!isZoomed) {
      setWidthVal(800);
      setHeightVal(400);
    }
  };

  const handleReset = () => {};

  return (
    <div
      style={{
        ...(isZoomed && {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#ffd8e7",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //   padding: 120,
        }),
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 20,
        }}
      >
        <input
          type="number"
          value={legendCount}
          onChange={handleLegendChange}
          min={0}
          max={100}
        />
        <input
          type="number"
          value={count}
          onChange={handleInputChange}
          min={0}
          max={100}
        />

        <button
          style={{
            backgroundColor: "rgb(177, 197, 141, 0.5)",
            paddingRight: 6,
            paddingLeft: 6,
            borderWidth: 2,
            borderColor: "#636161",
            borderRadius: 8,
            marginRight: 10,
            fontSize: 10,
            color: "#636161",
          }}
          onClick={handleReset}
        >
          reset
        </button>
        <button
          style={{
            width: 20,
            marginRight: 10,
          }}
          onClick={handleZoom}
        >
          {isZoomed ? (
            <img src="/zoom_out.png" alt="ZoomOut" />
          ) : (
            <img src="/zoom.png" alt="Zoom" />
          )}
        </button>
      </div>
      <RandomLineChart data={data} widthVal={widthVal} heightVal={heightVal} />
    </div>
  );
};

export default StatusLine;
