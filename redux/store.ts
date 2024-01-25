import { configureStore } from "@reduxjs/toolkit";
import { MonitoringReducer } from "./slices/monitoring/reducer";

export const makeStore = () => {
    return configureStore({
        reducer: {
            MonitoringReducer,
        },
        devTools: process.env.NODE_ENV !== 'production',
    });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
