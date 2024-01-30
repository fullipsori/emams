"use client"

import React, { useState, useEffect, useRef } from "react";

import { useAppDispatch } from "@/redux/hooks";
import { addChartData as addQueueChartData , updateChart } from "@/redux/slices/monitoring/reducer";
import BreadCrumb from "./common/BreadCrumb";
import Footer from "./layouts/Footer";
import "./monitoring.css"

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  //useIsomorphicLayoutEffect
  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

const Monitoring = (props: any) => {
    const dispatch: any = useAppDispatch();
    const [chartData, setChartData] = useState<any>();

    useEffect(() => {
        if(chartData) {
            dispatch(updateChart());
            dispatch(addQueueChartData(chartData));
        }
    }, [chartData])

    useEffect(() => {
        console.log("dispatch effect");
        // dispatch(getBalanceChartsData("today"));
    }, [dispatch]);

    const timerFunction = () => {
        setChartData((new Date()).getTime());
    };

    useInterval(() => { timerFunction() }, 1000);

    return (
        <React.Fragment>
            <div className="m-page-content">
                <BreadCrumb title="EMAMS" pageTitle="Monitoring" />
                {/* {props.children} */}
            </div>
        </React.Fragment>
    );
}

export default Monitoring;