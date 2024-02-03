import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getMonitoringQueueData, getMonitoringQueueList } from './thunk';
import { dataSourceType } from "@/app/monitoring/common/data/DataSource";

export type MonitorQueueState = {
    count: number;
    timeRange: { period?: number, fixedRange?: { sTime: number, eTime: number } };
    queueNames: string[];
    minLabel: number;
    queueLabels: number[];
    queuePendings: number[][];
    pendingValueMode: string;
    queueTps: number[][];
    tpsValueMode: string;
    error: any;
};

export const initialState = {
    count: 3,
    timeRange: { period: 5 * 60 }, // in seconds
    queueNames: [],
    minLabel: 0,
    queueLabels: [],
    queuePendings:[],
    pendingValueMode: "count",
    queueTps:[],
    tpsValueMode: "count",
    error: {}
};

const MonitoringQueueSlice = createSlice({
  name: 'monitoring-queue',
  initialState,
  reducers: {
    reset: () => initialState,
    updateCount: (state:MonitorQueueState, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    updateValueMode: (state:MonitorQueueState, action: PayloadAction<any>) => {
      if(action.payload.dataSourceType === dataSourceType.PENDING)  {
        state.pendingValueMode = action.payload.valueMode;
      }else{
        state.tpsValueMode = action.payload.valueMode;
      }
    },
    updateTimeRange: (state: MonitorQueueState, action: PayloadAction<any>) => {
      state.timeRange = action.payload;
    }
  },
  extraReducers: (builder) => {
      builder.addCase(getMonitoringQueueList.fulfilled, (state: MonitorQueueState, action: PayloadAction<any>) => {
        return {...initialState, queueNames: action.payload.queueList};
    });
    builder.addCase(getMonitoringQueueList.rejected, (state: MonitorQueueState, action:PayloadAction<any>) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getMonitoringQueueData.fulfilled, (state: MonitorQueueState, action:PayloadAction<any>) => {
        if(action.payload && action.payload.label && action.payload.label.length > 0) {
          if(state.timeRange.fixedRange) {
            state.queueNames = action.payload.names;
            state.queueLabels = action.payload.label;
            state.queuePendings = action.payload.pending;
            state.queueTps = action.payload.tps;
          }else{
            state.minLabel = action.payload.label[action.payload.label.length - 1] - (state.timeRange.period ?? 5 * 60) * 1000;
            let shiftCount = 0;
            let index = 0;
            while (state.queueLabels.length > 0 && state.queueLabels[index++] < state.minLabel) {
              shiftCount++;
            }

            for (let i = 0; i < shiftCount; i++) {
              state.queueLabels.shift();
              for (let j = 0; j < state.queuePendings.length; j++) {
                state.queuePendings[j].shift();
                state.queueTps[j].shift();
              }
              state.minLabel = state.queueLabels[0];
            }

            state.queueNames = action.payload.names;
            state.queueLabels.push(...action.payload.label);
            if(state.queuePendings[0]) {
              for (let i = 0; i < action.payload.pending.length; i++) {
                state.queuePendings[i].push(...action.payload.pending[i]);
                state.queueTps[i].push(...action.payload.tps[i]);
              }
            }else{
              state.queuePendings = action.payload.pending;
              state.queueTps = action.payload.tps;
            }
          }
        }
    });
    builder.addCase(getMonitoringQueueData.rejected, (state: MonitorQueueState, action:PayloadAction<any>) => {
      state.error = action.payload.error || null;
    });
  }
});

export const {
  reset,
  updateTimeRange,
  updateCount
} = MonitoringQueueSlice.actions;

export const MonitoringQueueReducer = MonitoringQueueSlice.reducer;
