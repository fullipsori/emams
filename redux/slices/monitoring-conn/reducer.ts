import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type MonitorConnState = {
    maxLabels: number,
    chartLabels: string[],
    producerData: number[],
    consumerData: number[],
    automatic : boolean,
};

const initialState : any = {
  maxLabels : 20,
  chartLabels: [],
  producerData: [],
  consumerData: [],
  automatic: true,
} as MonitorConnState;

const MonitoringConnSlice = createSlice({
    name: 'monitoring-connections',
    initialState,
    reducers: {
        reset: () => initialState,
        addChartData: (state: MonitorConnState, action: PayloadAction<any>) => {
            // for test
            if (state.chartLabels.length >= state.maxLabels) {
                state.chartLabels.shift();
                state.producerData.shift();
                state.consumerData.shift();
            }
            const dateTime: Date = new Date(action.payload);
            const hours = dateTime.getHours().toString().padStart(2, "0");
            const minutes = dateTime.getMinutes().toString().padStart(2, "0");
            const seconds = dateTime.getSeconds().toString().padStart(2, "0");
            state.chartLabels.push(`${hours}:${minutes}:${seconds}`);
            state.producerData.push(Math.random() * 100);
            state.consumerData.push(Math.random() * 100);
        },
        updateChartData: (state: MonitorConnState, action: PayloadAction<any>) => {
            // state.chartDatas = action.payload;
        },
        updateMode: (state: MonitorConnState, action: PayloadAction<boolean>) => {
            state.automatic = action.payload;
        },
    },
});

export const {
  reset,
  addChartData,
  updateChartData,
  updateMode
} = MonitoringConnSlice.actions;

export const MonitoringConnReducer =  MonitoringConnSlice.reducer;