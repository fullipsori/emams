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
    <div className="col-md-6">
      <button
        type="button"
        className="btn btn-outline-light sol_mr_6"
        onClick={onFirstClick}
      >
        <i className="sol_i_first sol_mr_6"></i>First
      </button>
      <button type="button" className="btn btn-outline-light sol_mr_6">
        <i className="sol_i_prev sol_mr_6"></i>Prev
      </button>
      <button
        type="button"
        className="btn btn-outline-light"
        onClick={onNextClick}
      >
        Next<i className="sol_i_next sol_ml_6"></i>
      </button>
    </div>
  );
};

export default PaginationBtn;
