"use client";

import React, { useEffect, useState } from "react";
import ProgressBar from "./progressBar";

interface ProgressComponentProps {
  title: string;
  isEditStatus?: boolean;
  proData: any;
}

const ProgressComponent: React.FC<ProgressComponentProps> = ({
  title,
  isEditStatus,
  proData,
}) => {
  const [proDataVal, setProDataVal] = useState<any>(proData);
  const [clearPercentage, setClearPercentage] = useState<number>(
    proDataVal.clearPercent
  );
  const [raisePercentage, setRaisePercentage] = useState<number>(
    proDataVal.setPercent
  );
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [clearShap, setClearShap] = useState<number>(0);
  const [raiseShap, setRaiseShap] = useState<number>(0);
  const [btn1Status, setBtn1Status] = useState<boolean>(true);
  const [btn2Status, setBtn2Status] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(true);

  // button 상태
  const handleBtn1Click = () => {
    setBtn2Status(false);
    setBtn1Status(true);
  };
  const handleBtn2Click = () => {
    setBtn1Status(false);
    setBtn2Status(true);
  };

  //  ProgressComponent 입력 값
  const handleClearValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (btn1Status) {
      setClearPercentage(newValue);
    } else if (btn2Status) {
      setClearShap(newValue);
    }
    if (newValue > raisePercentage) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  };
  const handleRaiseValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (btn1Status) {
      setRaisePercentage(newValue);
    } else if (btn2Status) {
      setRaiseShap(newValue);
    }
    if (newValue < clearPercentage) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  };

  // ProgressBar가 주는 값
  const handleClearPercentage = (newPercentage: number) => {
    setClearPercentage(Math.round(newPercentage));
  };
  const handleRaisePercentage = (newPercentage: number) => {
    setRaisePercentage(Math.round(newPercentage));
  };

  // useEffect(() => {
  //   setIsEdit(isEditStatus);
  //   setProDataVal(proData);
  // }, [proData, isEditStatus]);

  useEffect(() => {
    setIsEdit(!isEditStatus);
  }, [isEditStatus]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          display: "flex",
          marginRight: 50,
          gap: 10,
          alignSelf: "center",
        }}
      >
        <div style={{ alignSelf: "center", fontWeight: 500 }}>{title}</div>
        <div
          style={{
            display: "flex",
            borderRadius: 3,
            borderWidth: 2,
            borderColor: "#b4abab",
            width: 65,
            justifyContent: "space-evenly",
            height: 35,
          }}
        >
          <button
            style={{
              width: 25,
              backgroundColor: btn1Status ? "#b4abab" : "#fff",
              borderRadius: 3,
              margin: 3,
            }}
            onClick={handleBtn1Click}
            disabled={!isEdit}
          >
            %
          </button>
          <button
            style={{
              width: 25,
              backgroundColor: btn2Status ? "#b4abab" : "#fff",
              borderRadius: 3,
              margin: 3,
            }}
            onClick={handleBtn2Click}
            disabled={!isEdit}
          >
            #
          </button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 20,
            gap: 20,
          }}
        >
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              Clear :
              <input
                type="text"
                value={btn1Status ? clearPercentage : clearShap}
                onChange={handleClearValueChange}
                style={{
                  marginLeft: 10,
                  paddingRight: 10,
                  paddingLeft: 10,
                  borderWidth: 2,
                  borderColor: "gray",
                  width: 80,
                }}
                // disabled={!isEdit}
                disabled={true}
              />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              Raise :
              <input
                type="text"
                value={btn1Status ? raisePercentage : raiseShap}
                //   value={raisePercentage}
                onChange={handleRaiseValueChange}
                style={{
                  marginLeft: 10,
                  paddingRight: 10,
                  paddingLeft: 10,
                  borderWidth: 2,
                  borderColor: "gray",
                  width: 80,
                }}
                // disabled={!isEdit}
                disabled={true}
              />
            </div>
          </div>
        </div>
        {btn1Status && (
          <ProgressBar
            clearPercentageValue={handleClearPercentage}
            raisePercentageValue={handleRaisePercentage}
            clearPercentageInputValue={clearPercentage}
            raisePercentageInputValue={raisePercentage}
          />
        )}
        {showWarning && (
          <p style={{ color: "red" }}>
            경고: Clear 값은 Raise 값보다 클 수 없습니다!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgressComponent;
