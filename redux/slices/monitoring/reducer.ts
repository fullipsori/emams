import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type MonitorState = {
    maxLabels: number,
    refreshMode: number,
    lastChartTime: number,
    timeRange: number,
};

const initialState : any = {
  maxLabels : 20,
  refreshMode: 0, //0 off, else seconds
  lastChartTime: 0, // unix-time
  timeRange: 0, //seconds
} as MonitorState;

const MonitoringSlice = createSlice({
  name: 'monitoring',
  initialState,
  reducers: {
    reset: () => initialState,
    updateChartTime: (state: MonitorState, action: PayloadAction<number>) => {
      state.lastChartTime= action.payload;
    },
    updateRefreshMode: (state: MonitorState, action: PayloadAction<number>) => {
      state.refreshMode = action.payload;
    },
    updateTimeRange: (state: MonitorState, action: PayloadAction<number>) => {
      state.timeRange = action.payload;
    }
  },
});

export const {
  reset,
  updateChartTime,
  updateRefreshMode,
  updateTimeRange
} = MonitoringSlice.actions;

export const MonitoringReducer =  MonitoringSlice.reducer;