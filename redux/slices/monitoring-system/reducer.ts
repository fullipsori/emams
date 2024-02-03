import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getMonitoringSystemData } from './thunk';

export type MonitorSystemState = {
    count: number;
    timeRange: { period?: number, fixedRange?: { sTime: number, eTime: number } };
    minLabel: number;
    labels: number[];
    cpuUsages: number[];
    memoryUsages: number[];
    diskUsages: number[];
    coreCount: number;
    memorySize: number;
    diskIO: number[][];
    networkIO: number[][];
    automatic : boolean;
    error: any;
};

export const initialState = {
    count: 1,
    timeRange: { period: 5 * 60 }, // in seconds
    minLabel: 0,
    labels: [],
    cpuUsages: [],
    memoryUsages: [],
    diskUsages: [],
    coreCount: 0,
    memorySize: 256,
    diskIO: [],
    networkIO: [],
    automatic: true,
    error: {}
};


const MonitoringSystemSlice = createSlice({
  name: 'monitoring-system',
  initialState,
  reducers: {
    reset: () => initialState,
    updateCount: (state: MonitorSystemState, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    updateTimeRange: (state: MonitorSystemState, action: PayloadAction<any>) => {
      state.timeRange = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMonitoringSystemData.fulfilled, (state:MonitorSystemState, action:PayloadAction<any>) => {
      if (action.payload && action.payload.label && action.payload.label.length > 0) {
        if(state.timeRange.fixedRange) {
          state.labels = action.payload.label;
          state.cpuUsages = action.payload.cpuUsage;
          state.memoryUsages = action.payload.memoryUsage;
          state.diskUsages = action.payload.diskUsage;
          state.coreCount = action.payload.coreCount;
          state.memorySize = action.payload.memorySize;
          state.diskIO[0] = [...action.payload.diskRead];
          state.diskIO[1] = [...action.payload.diskWrite];
          state.networkIO[0] = [...action.payload.networkRead];
          state.networkIO[1] = [...action.payload.networkWrite];
        }else{

          state.minLabel = action.payload.label[action.payload.label.length - 1] - (state.timeRange.period ?? 5*60) * 1000;
          let shiftCount = 0;
          let index = 0;
          while (state.labels.length > 0 && state.labels[index++] < state.minLabel) {
            shiftCount++;
          }

          for (let i = 0; i < shiftCount; i++) {
            state.labels.shift();
            state.labels.shift();
            state.cpuUsages.shift();
            state.memoryUsages.shift();
            state.diskUsages.shift();
            state.diskIO[0].shift();
            state.diskIO[1].shift();
            state.networkIO[0].shift();
            state.networkIO[1].shift();
            state.minLabel = state.labels[0];
          }

          state.labels.push(...action.payload.label);
          state.cpuUsages.push(...action.payload.cpuUsage);
          state.memoryUsages.push(...action.payload.memoryUsage);
          state.diskUsages.push(...action.payload.diskUsage);
          state.coreCount = action.payload.coreCount;
          state.memorySize = action.payload.memorySize;
          if (state.diskIO[0]) {
            state.diskIO[0].push(...action.payload.diskRead);
            state.diskIO[1].push(...action.payload.diskWrite);
            state.networkIO[0].push(...action.payload.networkRead);
            state.networkIO[1].push(...action.payload.networkWrite);
          } else {
            state.diskIO[0] = [...action.payload.diskRead];
            state.diskIO[1] = [...action.payload.diskWrite];
            state.networkIO[0] = [...action.payload.networkRead];
            state.networkIO[1] = [...action.payload.networkWrite];
          }
        }
      }

    });
    builder.addCase(getMonitoringSystemData.rejected, (state:MonitorSystemState, action:PayloadAction<any>) => {
      state.error = action.payload.error || null;
    });
  }
});

export const {
  reset,
  updateCount,
  updateTimeRange,
} = MonitoringSystemSlice.actions;

export const MonitoringSystemReducer= MonitoringSystemSlice.reducer;