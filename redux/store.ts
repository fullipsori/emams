import { configureStore } from "@reduxjs/toolkit";
import { MonitoringReducer } from "./slices/monitoring/reducer";
import { MonitoringClientReducer } from "./slices/monitoring-client/reducer";
import { MonitoringQueueReducer } from "./slices/monitoring-queue/reducer";
import { MonitoringSystemReducer } from "./slices/monitoring-system/reducer";

export const makeStore = () => {
    return configureStore({
        reducer: {
            MonitoringReducer,
            MonitoringClientReducer,
            MonitoringQueueReducer,
            MonitoringSystemReducer,
        },
        devTools: process.env.NODE_ENV !== 'production',
    });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
