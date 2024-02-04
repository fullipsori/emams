"use client";

import React from "react";

interface PaginationButtonsProps {
  onFirstClick: () => void;
  onNextClick: () => void;
  isFirstActive: boolean;
  isNextActive: boolean;
}

const PaginationBtn: React.FC<PaginationButtonsProps> = ({
  onFirstClick,
  onNextClick,
  isFirstActive,
  isNextActive,
}) => {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <button
        style={{
          borderColor: "transparent",
          backgroundColor: "transparent",
          fontSize: 14,
          color: isFirstActive ? "#fff" : "gray",
        }}
        onClick={onFirstClick}
      >
        {"< first"}
      </button>
      <button
        style={{
          borderColor: "transparent",
          backgroundColor: "transparent",
          fontSize: 14,
          color: isNextActive ? "#fff" : "gray",
        }}
        onClick={onNextClick}
      >
        {"next >"}
      </button>
    </div>
  );
};

export default PaginationBtn;
