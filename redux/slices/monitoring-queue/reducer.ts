import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getMonitoringQueueData, getMonitoringQueueList } from './thunk';
import { dataSourceType } from "@/app/(monitor)/monitor/common/data/DataSource";

export type MonitorQueueState = {
    count: number;
    timeRange: { period?: number, fixedRange?: { sTime: number, eTime: number } };
    queueNames: string[];
    pendingMinLabel: number;
    pendingLabels: number[];
    pending: number[][];
    pendingValueMode: string;
    tpsMinLabel: number;
    tpsLabels: number[],
    tps: number[][];
    tpsValueMode: string;
    error: any;
};

export const initialState = {
    count: 3,
    timeRange: { period: 5 * 60 }, // in seconds
    queueNames: [],
    pendingMinLabel: 0,
    pendingLabels: [],
    pending:[],
    pendingValueMode: "count",
    tpsMinLabel: 0,
    tpsLabels: [],
    tps:[],
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
        state.pendingLabels = [];
        state.pendingMinLabel = 0;
        state.pending = [];
      }else{
        state.tpsValueMode = action.payload.valueMode;
        state.tpsLabels = [];
        state.tpsMinLabel = 0;
        state.tps = [];
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
            state.pendingLabels = action.payload.label;
            state.pending = action.payload.pending;
            state.pendingMinLabel = action.payload.pendingLabels[0];
            state.tpsLabels = [...action.payload.label]; // reference 임으로 하나는 복사.
            state.tps = action.payload.tps;
            state.tpsMinLabel = action.payload.tpsLabels[0];
          }else{
            state.queueNames = action.payload.names;
            /* pending chart */
            state.pendingMinLabel = action.payload.label[action.payload.label.length - 1] - (state.timeRange.period ?? 5 * 60) * 1000;
            let shiftCount = 0;
            let index = 0;
            while (state.pendingLabels.length > 0 && state.pendingLabels[index++] < state.pendingMinLabel) {
              shiftCount++;
            }

            for (let i = 0; i < shiftCount; i++) {
              state.pendingLabels.shift();
              for (let j = 0; j < state.pending.length; j++) {
                state.pending[j].shift();
              }
              state.pendingMinLabel = state.pendingLabels[0];
            }

            state.pendingLabels.push(...action.payload.label);
            if(state.pending[0]) {
              for (let i = 0; i < action.payload.pending.length; i++) {
                state.pending[i].push(...action.payload.pending[i]);
              }
            }else{
              state.pending= action.payload.pending;
            }

            /* tps chart */
            state.tpsMinLabel = action.payload.label[action.payload.label.length - 1] - (state.timeRange.period ?? 5 * 60) * 1000;
            shiftCount = 0;
            index = 0;
            while (state.tpsLabels.length > 0 && state.tpsLabels[index++] < state.tpsMinLabel) {
              shiftCount++;
            }

            for (let i = 0; i < shiftCount; i++) {
              state.tpsLabels.shift();
              for (let j = 0; j < state.tps.length; j++) {
                state.tps[j].shift();
              }
              state.tpsMinLabel = state.tpsLabels[0];
            }

            state.tpsLabels.push(...action.payload.label);
            if(state.tps[0]) {
              for (let i = 0; i < action.payload.tps.length; i++) {
                state.tps[i].push(...action.payload.tps[i]);
              }
            }else{
              state.tps= action.payload.tps;
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
  updateCount,
  updateValueMode
} = MonitoringQueueSlice.actions;

export const MonitoringQueueReducer = MonitoringQueueSlice.reducer;
