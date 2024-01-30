import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getClientInfoData } from "./thunk";


export type MonitorClientState = {
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
} as MonitorClientState;

const MonitoringClientSlice = createSlice({
    name: 'monitoring-client',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getClientInfoData.fulfilled, (state:any, action:PayloadAction<any>)=>{
            if(action.payload && action.payload.label){
                if (state.chartLabels.length >= state.maxLabels) {
                    state.chartLabels.shift();
                    state.producerData.shift();
                    state.consumerData.shift();
                }
                state.chartLabels.push(action.payload.label);
                state.producerData.push(action.payload.producer);
                state.consumerData.push(action.payload.consumer);
            }
        });
        builder.addCase(getClientInfoData.rejected, (state: any, action: PayloadAction<any>) => {
            state.error = action.payload.error || null;
        });

    },
});

export const {
  reset,
} = MonitoringClientSlice.actions;

export const MonitoringClientReducer =  MonitoringClientSlice.reducer;