"use client";

import React, { useState, useRef, useEffect } from "react";

interface ProgressBarProps {
  clearPercentageInputValue: number;
  raisePercentageInputValue: number;
  clearPercentageValue: (percentage: number) => void;
  raisePercentageValue: (percentage: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  clearPercentageInputValue,
  raisePercentageInputValue,
  clearPercentageValue,
  raisePercentageValue,
}) => {
  // bar의 너비와 높이
  const width = 350;
  const height = 5;
  // 퍼센트
  const [clearPercentage, setClearPercentage] = useState<number>(
    clearPercentageInputValue
  );
  const [raisePercentage, setRaisePercentage] = useState<number>(
    raisePercentageInputValue
  );
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<{ type: "clear" | "raise" | null }>({ type: null });

  const handleMouseMove = (event: MouseEvent) => {
    if (progressBarRef.current && isDragging.current.type) {
      const { left, width } = progressBarRef.current.getBoundingClientRect();
      const newPercentage =
        Math.min(Math.max(0, (event.clientX - left) / width), 1) * 100;

      if (isDragging.current.type === "clear") {
        setClearPercentage(newPercentage);
        clearPercentageValue(newPercentage);
      } else if (isDragging.current.type === "raise") {
        setRaisePercentage(newPercentage);
        raisePercentageValue(newPercentage);
      }
    }
  };

  const handleMouseUp = () => {
    isDragging.current.type = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown =
    (type: "clear" | "raise") => (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      isDragging.current.type = type;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

  // progressComponent에서 받아온 값 바로 없데이트
  useEffect(() => {
    setClearPercentage(clearPercentageInputValue);
  }, [clearPercentageInputValue]);

  useEffect(() => {
    setRaisePercentage(raisePercentageInputValue);
  }, [raisePercentageInputValue]);

  return (
    // progressBar
    <div
      ref={progressBarRef}
      style={{
        position: "relative",
        width: width,
        height: height,
        backgroundColor: "#3a3a3a",
        borderRadius: 6,
      }}
    >
      {/* clear 동그라미 */}
      <div
        onMouseDown={handleMouseDown("clear")}
        style={{
          position: "absolute",
          left: `${clearPercentage}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
          // 여기도 고정 가능 (동그라미 크기)
          width: height + 5,
          height: height + 5,
          backgroundColor: "#93be74",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      />
      {/* raise 동그라미 */}
      <div
        onMouseDown={handleMouseDown("raise")}
        style={{
          position: "absolute",
          left: `${raisePercentage}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
          // 여기도 고정 가능 (동그라미 크기)
          width: height + 5,
          height: height + 5,
          backgroundColor: "#d598ee",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      />
      {/* <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      /> */}
      {/* <p>Claer : {clearPercentValue}%</p>
      <p>Raise : {raisePercentValue}%</p> */}
    </div>
  );
};

export default ProgressBar;
