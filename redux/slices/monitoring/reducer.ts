import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getMonitoringAllNodes } from "./thunk";

export type MonitorState = {
  serverType: string;
  nodeInfo: any[];
  curNode: any;
  maxLabels: number;
  timeRange: { period?: number, fixedRange?: { sTime: number, eTime: number}};
  refreshMode: number;
};

const initialState : any = {
  serverType: "solace",
  nodeInfo: [],
  curNode: null,
  maxLabels : 20,
  timeRange: { period: 5*60 }, // in seconds
  refreshMode: 1, //0 off, in seconds
} as MonitorState;

const MonitoringSlice = createSlice({
  name: 'monitoring',
  initialState,
  reducers: {
    reset: () => initialState,
    updateRefreshMode: (state: MonitorState, action: PayloadAction<number>) => {
      state.refreshMode = action.payload;
    },
    updateTimeRange: (state: MonitorState, action: PayloadAction<{period?: number, fixedRange?: { sTime: number, eTime: number}}>) => {
      state.timeRange = action.payload;
    },
    updateNode: (state: MonitorState, action: PayloadAction<any>) => {
      state.curNode = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMonitoringAllNodes.fulfilled, (state:any, action:PayloadAction<any>) => {
      state.nodeInfo = action.payload.nodes;
    });
    builder.addCase(getMonitoringAllNodes.rejected, (state:any, action:PayloadAction<any>) => {
      state.error = action.payload.error || null;
    });
  }
});

export const {
  reset,
  updateRefreshMode,
  updateTimeRange,
  updateNode
} = MonitoringSlice.actions;

export const MonitoringReducer =  MonitoringSlice.reducer;