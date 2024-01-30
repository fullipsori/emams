"use client";

import React, { useEffect, useRef, useState } from "react";

interface ChartProps{
    title: string;
    monitoringDataCallback: () => any;
}

const ChartHeader = (chartProps: ChartProps) => {
    const [headerTitle, setHeaderTitle] = useState(chartProps.title);
    const monitoringData = chartProps.monitoringDataCallback();

  useEffect(()=>{
    if(monitoringData && monitoringData.datas) {
        let newTitle = chartProps.title + " : ";
        for(var i=0;i < monitoringData.datas.length;i++) {
            const lastValue = Math.round(monitoringData.datas[i][monitoringData.datas[i].length-1] * 100)/100;
            newTitle += lastValue.toString();
            if(i < (monitoringData.datas.length-1)){
                newTitle += " / ";
            }
        }
        setHeaderTitle(newTitle);
    }
  }, [monitoringData]);

  return (
      <div>
          <h4 className="card-title mb-0 fw-bold"> {headerTitle}</h4>
      </div>
  );
};

export default ChartHeader;
