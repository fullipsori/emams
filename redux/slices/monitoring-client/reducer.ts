import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getClientInfoData } from "./thunk";


export type MonitorClientState = {
    count: number,
    timeRange: { period?: number, fixedRange?: { sTime: number, eTime: number } };
    minLabel: number,
    labels: number[],
    clientNames: string[],
    datas: number[][],
    automatic : boolean,
    error: any,
};

const initialState : any = {
    count: 2,
    timeRange: { period: 40 }, // in seconds
    minLabel: 0,
    labels: [],
    clientNames:[],
    datas:[],
    automatic: true,
    error: {},
} as MonitorClientState;

const MonitoringClientSlice = createSlice({
    name: 'monitoring-client',
    initialState,
    reducers: {
        reset: () => initialState,
        updateCount: (state: MonitorClientState, action: PayloadAction<number>) => {
            state.count = action.payload;
        },
        updateTimeRange: (state: MonitorClientState, action: PayloadAction<any>) => {
            if(action.payload.period && action.payload.period > 40) {
                //for bar chart
                state.timeRange = {...action.payload, period: 40};
            }else{
                state.timeRange = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getClientInfoData.fulfilled, (state: MonitorClientState, action:PayloadAction<any>)=>{
            if (action.payload && action.payload.label && action.payload.label.length > 0) {
                if(state.timeRange.fixedRange) {
                    state.labels = action.payload.label;
                    state.clientNames = action.payload.names;
                    state.datas= action.payload.datas;
                }else{
                    state.minLabel = action.payload.label[action.payload.label.length - 1] - (state.timeRange.period ?? 40) * 1000;
                    let shiftCount = 0;
                    let index = 0;
                    while (state.labels.length > 0 && state.labels[index++] < state.minLabel) {
                        shiftCount++;
                    }
                    for (let i = 0; i < shiftCount; i++) {
                        state.labels.shift();
                        for(let j=0; j< state.datas.length;j++) {
                            state.datas[j].shift();
                        }
                        state.minLabel = state.labels[0];
                    }

                    state.clientNames = action.payload.names;
                    state.labels.push(...action.payload.label);
                    if(state.datas[0]) {
                        for (let i = 0; i < state.datas.length; i++) {
                            state.datas[i].push(...action.payload.datas[i]);
                        }
                    }else{
                        state.datas = action.payload.datas;
                    }
                }
            }
        });
        builder.addCase(getClientInfoData.rejected, (state: MonitorClientState, action: PayloadAction<any>) => {
            state.error = action.payload.error || null;
        });

    },
});

export const {
  reset,
  updateCount,
  updateTimeRange,
} = MonitoringClientSlice.actions;

export const MonitoringClientReducer =  MonitoringClientSlice.reducer;