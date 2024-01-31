import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getClientInfoData } from "./thunk";


export type MonitorClientState = {
    timeRange: number,
    minLabel: number,
    labels: string[],
    producerData: number[],
    consumerData: number[],
    automatic : boolean,
};

const initialState : any = {
    timeRange: 60,
    minLabel: 0,
    labels: [],
    producerData: [],
    consumerData: [],
    automatic: true,
} as MonitorClientState;

const MonitoringClientSlice = createSlice({
    name: 'monitoring-client',
    initialState,
    reducers: {
        reset: () => initialState,
        updateTimeRange: (state: MonitorClientState, action: PayloadAction<any>) => {
            state.timeRange = action.payload * 1000; // to milliseconds
    },
    },
    extraReducers: (builder) => {
        builder.addCase(getClientInfoData.fulfilled, (state:any, action:PayloadAction<any>)=>{
            if (action.payload && action.payload.label && action.payload.label.length > 0) {
                state.minLabel = action.payload.label[action.payload.label.length - 1] - state.timeRange * 1000;
                let shiftCount = 0;
                let index = 0;
                while (state.labels.length > 0 && state.labels[index++] < state.minLabel) {
                    shiftCount++;
                }
                for (let i = 0; i < shiftCount; i++) {
                    state.labels.shift();
                    state.producerData.shift();
                    state.consumerData.shift();
                    state.minLabel = state.labels[0];
                }

                state.labels.push(...action.payload.label);
                state.producerData.push(...action.payload.producer);
                state.consumerData.push(...action.payload.consumer);
            }
        });
        builder.addCase(getClientInfoData.rejected, (state: any, action: PayloadAction<any>) => {
            state.error = action.payload.error || null;
        });

    },
});

export const {
  reset,
  updateTimeRange,
} = MonitoringClientSlice.actions;

export const MonitoringClientReducer =  MonitoringClientSlice.reducer;