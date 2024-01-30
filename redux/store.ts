import { configureStore } from "@reduxjs/toolkit";
import { MonitoringReducer } from "./slices/monitoring/reducer";
import { MonitoringClientReducer } from "./slices/monitoring-client/reducer";
import { MonitoringQueueReducer } from "./slices/monitoring-queue/reducer";

export const makeStore = () => {
    return configureStore({
        reducer: {
            MonitoringReducer,
            MonitoringClientReducer,
            MonitoringQueueReducer,
        },
        devTools: process.env.NODE_ENV !== 'production',
    });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
