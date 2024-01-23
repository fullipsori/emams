import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type MonitorState = {
    maxLabels: number,
    chartLabels: string[],
    chartDatas: any[][],
    automatic : boolean,
};

const initialState : any = {
  maxLabels : 20,
  chartLabels: [],
  chartDatas : [],
  automatic: true,
} as MonitorState;

const MonitoringSlice = createSlice({
  name: 'monitoring',
  initialState,
  reducers: {
    reset: () => initialState,
    addChartData: (state: MonitorState, action: PayloadAction<any>) => {
      // for test
      if(state.chartDatas[0] === undefined) {
        state.chartDatas[0] = [];
        state.chartDatas[1] = [];
        state.chartDatas[2] = [];
        state.chartDatas[3] = [];
      }
      if(state.chartLabels.length >= state.maxLabels) {
        state.chartLabels.shift();
        state.chartDatas[0].shift();
        state.chartDatas[1].shift();
        state.chartDatas[2].shift();
        state.chartDatas[3].shift();
      }
      if(false) {
        state.chartLabels.push(action.payload.xlabel);
        state.chartDatas[0].push(action.payload.ydata[0]);
        state.chartDatas[1].push(action.payload.ydata[1]);
        state.chartDatas[2].push(action.payload.ydata[2]);
        state.chartDatas[3].push(action.payload.ydata[3]);
      }else{
        const dateTime : Date = new Date(action.payload);
        const hours = dateTime.getHours().toString().padStart(2, "0");
        const minutes = dateTime.getMinutes().toString().padStart(2, "0");
        const seconds = dateTime.getSeconds().toString().padStart(2, "0");
        state.chartLabels.push(`${hours}:${minutes}:${seconds}`);
        state.chartDatas[0].push(Math.random()*100);
        state.chartDatas[1].push(Math.random()*100);
        state.chartDatas[2].push(Math.random()*100);
        state.chartDatas[3].push(Math.random()*100);
      }
    },
    updateChartData: (state: MonitorState, action: PayloadAction<any>) => {
        state.chartDatas = action.payload;
    },
    updateMode: (state: MonitorState, action: PayloadAction<boolean>) => {
      state.automatic = action.payload;
    },
  },
});

export const {
  reset,
  addChartData,
  updateChartData,
  updateMode
} = MonitoringSlice.actions;

export const MonitoringReducer =  MonitoringSlice.reducer;