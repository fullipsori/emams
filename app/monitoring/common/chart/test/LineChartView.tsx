// "use client"

import React from "react";
import 'chart.js/auto'
import {Chart} from 'chart.js';

Chart.register();
const LineChartView = ({ canvasCallback, height} : any) => {
  return (
    <div>
        <canvas id="canvas" ref={canvasCallback} height={height} width={400}></canvas>
    </div>
  )
}

export default LineChartView;