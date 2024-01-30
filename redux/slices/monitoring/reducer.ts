import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type MonitorState = {
    maxLabels: number,
    automatic : boolean,
    updateCount: number,
};

const initialState : any = {
  maxLabels : 20,
  automatic: true,
  updateCount: 0,
} as MonitorState;

const MonitoringSlice = createSlice({
  name: 'monitoring',
  initialState,
  reducers: {
    reset: () => initialState,
    updateChart: (state: MonitorState) => {
      if(state.automatic) state.updateCount = (state.updateCount + 1) % 100;
    },
  },
});

export const {
  reset,
  updateChart,
} = MonitoringSlice.actions;

export const MonitoringReducer =  MonitoringSlice.reducer;