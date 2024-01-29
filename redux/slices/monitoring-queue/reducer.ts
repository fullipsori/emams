import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getMonitoringQueueData } from './thunk';

export type MonitorQueueState = {
    maxLabels: number,
    queueNames: string[],
    queueLabels: string[],
    queuePendings: number[][],
    queueTps: number[][],
    automatic : boolean,
    error: any,
};

export const initialState = {
    maxLabels: 20,
    queueNames: [],
    queueLabels: [],
    queuePendings:[],
    queueTps:[],
    automatic: true,
    error: {}
};


const MonitoringQueueSlice = createSlice({
  name: 'monitoring-queue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMonitoringQueueData.fulfilled, (state:any, action:PayloadAction<any>) => {
        if(action.payload && action.payload.label) {
            if (state.queueLabels.length >= state.maxLabels) {
                state.queueLabels.shift();
                for(var step=0; step < action.payload.pending.length; step++) {
                    state.queuePendings[step].shift();
                    state.queueTps[step].shift();
                }
            }
            state.queueNames = action.payload.names;
            state.queueLabels.push(action.payload.label);
            for(var step=0; step < action.payload.pending.length; step++){
              if(state.queuePendings[step]) {
                state.queuePendings[step].push(action.payload.pending[step]);
                state.queueTps[step].push(action.payload.tps[step]);
                
              }else{
                state.queuePendings[step] = [action.payload.pending[step]];
                state.queueTps[step] = [action.payload.tps[step]];
              }
            } 
        }
    });
    builder.addCase(getMonitoringQueueData.rejected, (state:any, action:PayloadAction<any>) => {
      state.error = action.payload.error || null;
    });
  }
});

export const MonitoringQueueReducer = MonitoringQueueSlice.reducer;