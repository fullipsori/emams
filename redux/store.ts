import { configureStore } from "@reduxjs/toolkit";
import { MonitoringReducer } from "./slices/monitoring/reducer";

export const store = configureStore({
    reducer: {
        MonitoringReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
