import { configureStore } from "@reduxjs/toolkit";
import { MonitoringReducer } from "./slices/monitoring/reducer";
import { MonitoringConnReducer } from "./slices/monitoring-conn/reducer";
import { MonitoringQueueReducer } from "./slices/monitoring-queue/reducer";

export const makeStore = () => {
    return configureStore({
        reducer: {
            MonitoringReducer,
            MonitoringConnReducer,
            MonitoringQueueReducer,
        },
        devTools: process.env.NODE_ENV !== 'production',
    });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
