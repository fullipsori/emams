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
  console.log(proData);

  const [proDataVal, setProDataVal] = useState<any>(proData || {});
  const [clearPercentage, setClearPercentage] = useState<number>(
    proDataVal?.clearPercent || 0
  );
  const [raisePercentage, setRaisePercentage] = useState<number>(
    proDataVal?.setPercent || 0
  );
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [clearShap, setClearShap] = useState<number>(
    proDataVal?.clearValue || 0
  );
  const [raiseShap, setRaiseShap] = useState<number>(proDataVal?.setVaue || 0);
  const [isEdit, setIsEdit] = useState<boolean>(true);

  // 버튼 상태
  const hasPercentData =
    proData && "clearPercent" in proData && "setPercent" in proData;
  const hasValueData =
    proData && "clearValue" in proData && "setValue" in proData;

  // 버튼 상태를 관리할 상태 변수들
  const [btn1Status, setBtn1Status] = useState<boolean>(hasPercentData);
  const [btn2Status, setBtn2Status] = useState<boolean>(hasValueData);

  // title
  const componentTitle = title || "Default Title";

  // button 상태
  const handleBtn1Click = () => {
    setBtn2Status(false);
    setBtn1Status(true);
  };
  const handleBtn2Click = () => {
    setBtn1Status(false);
    setBtn2Status(true);
  };

  useEffect(() => {
    if (proData) {
      setClearPercentage(proData.clearPercent);
      setRaisePercentage(proData.setPercent);
      setClearShap(proData.clearValue);
      setRaiseShap(proData.setValue);
    }
  }, [proData]);

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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: 700,
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          marginRight: 50,
          gap: 10,
          alignSelf: "center",
        }}
      >
        <div style={{ alignSelf: "center", fontWeight: 500 }}>
          {componentTitle}
        </div>
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
              cursor: "default",
            }}
            onClick={handleBtn1Click}
            disabled={!isEditStatus || !btn1Status}
          >
            %
          </button>
          <button
            style={{
              width: 25,
              backgroundColor: btn2Status ? "#b4abab" : "#fff",
              borderRadius: 3,
              margin: 3,
              cursor: "default",
            }}
            onClick={handleBtn2Click}
            disabled={!isEditStatus || !btn2Status}
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
