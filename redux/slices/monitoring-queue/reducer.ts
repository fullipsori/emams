import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getMonitoringQueueData } from './thunk';

export type MonitorQueueState = {
    count: number,
    timeRange: number, // seconds
    queueNames: string[],
    minLabel: number,
    queueLabels: number[],
    queuePendings: number[][],
    queueTps: number[][],
    error: any,
};

export const initialState = {
    count: 3,
    timeRange: 5*60, // default: 5min
    queueNames: [],
    minLabel: 0,
    queueLabels: [],
    queuePendings:[],
    queueTps:[],
    error: {}
};

const MonitoringQueueSlice = createSlice({
  name: 'monitoring-queue',
  initialState,
  reducers: {
    reset: () => initialState,
    updateTimeRange: (state: MonitorQueueState, action: PayloadAction<any>) => {
      state.timeRange = action.payload * 1000; // to milliseconds
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMonitoringQueueData.fulfilled, (state:any, action:PayloadAction<any>) => {
        if(action.payload && action.payload.label && action.payload.label.length > 0) {
          state.minLabel = action.payload.label[action.payload.label.length-1] - state.timeRange*1000;
          let shiftCount = 0;
          let index = 0;
          while(state.queueLabels.length > 0 && state.queueLabels[index++] < state.minLabel)  {
            shiftCount++;
          }

          for(let i=0; i< shiftCount; i++) {
            state.queueLabels.shift();
            for(let j=0; j< state.queuePendings.length; j++) {
              state.queuePendings[j].shift();
              state.queueTps[j].shift();
            }
            state.minLabel = state.queueLabels[0];
          }

          state.queueNames = action.payload.names;
          state.queueLabels.push(...action.payload.label);
          for(let i=0; i< action.payload.pending.length; i++) {
            if(state.queuePendings[i]) {
              state.queuePendings[i].push(...action.payload.pending[i]);
              state.queueTps[i].push(...action.payload.tps[i]);
            }else{
              state.queuePendings[i] = [...action.payload.pending[i]];
              state.queueTps[i] = [...action.payload.tps[i]];
            }
          }
        }
    });
    builder.addCase(getMonitoringQueueData.rejected, (state:any, action:PayloadAction<any>) => {
      state.error = action.payload.error || null;
    });
  }
});

export const {
  reset,
  updateTimeRange,
} = MonitoringQueueSlice.actions;

export const MonitoringQueueReducer = MonitoringQueueSlice.reducer;
