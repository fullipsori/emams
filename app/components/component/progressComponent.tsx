"use client";

import React, { useState } from "react";
import ProgressBar from "./progressBar";

interface ProgressComponentProps {
  title: string;
}

const ProgressComponent: React.FC<ProgressComponentProps> = ({ title }) => {
  const [clearPercentage, setClearPercentage] = useState<number>(0);
  const [raisePercentage, setRaisePercentage] = useState<number>(0);
  const [clearShap, setClearShap] = useState<number>(0);
  const [raiseShap, setRaiseShap] = useState<number>(0);
  const [btn1Status, setBtn1Status] = useState<boolean>(true);
  const [btn2Status, setBtn2Status] = useState<boolean>(false);

  // button 상태
  const handleBtn1Click = () => {
    console.log("% 클릭함:::");
    setBtn2Status(false);
    setBtn1Status(true);
  };
  const handleBtn2Click = () => {
    console.log("# 클릭함:::");
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
  };
  const handleRaiseValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setRaisePercentage(newValue);
    if (btn1Status) {
      setRaisePercentage(newValue);
    } else if (btn2Status) {
      setRaiseShap(newValue);
    }
  };

  // ProgressBar가 주는 값
  const handleClearPercentage = (newPercentage: number) => {
    setClearPercentage(Math.round(newPercentage));
  };
  const handleRaisePercentage = (newPercentage: number) => {
    setRaisePercentage(Math.round(newPercentage));
  };

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
              //   backgroundColor: "grey",
              backgroundColor: btn1Status ? "#b4abab" : "#fff",
              borderRadius: 3,
              margin: 3,
            }}
            onClick={handleBtn1Click}
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
              Clear
              <div
                style={{
                  borderRadius: 50,
                  width: 15,
                  height: 15,
                  backgroundColor: "#93be74",
                  alignSelf: "center",
                  marginRight: 3,
                  marginLeft: 3,
                }}
              />
              :
              <input
                type="number"
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
              />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              Raise
              <div
                style={{
                  borderRadius: 50,
                  width: 15,
                  height: 15,
                  backgroundColor: "#d598ee",
                  alignSelf: "center",
                  marginRight: 3,
                  marginLeft: 3,
                }}
              />
              :
              <input
                type="number"
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
      </div>
    </div>
  );
};

export default ProgressComponent;
