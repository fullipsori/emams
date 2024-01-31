import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getMonitoringQueueData } from './thunk';

export type MonitorQueueState = {
    timeRange: number, // seconds
    maxLabels: number,
    queueNames: string[],
    minLabel: number,
    queueLabels: number[],
    queuePendings: number[][],
    queueTps: number[][],
    error: any,
};

export const initialState = {
    timeRange: 5*50, // default: 5min
    maxLabels: 20,
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
          /* ordered 되어 있음으로 while 문으로 구현 */
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
            /* 항상 처음 element 를 갖어야 한다. */
            state.minLabel = state.queueLabels[0];
          }

          //add data
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