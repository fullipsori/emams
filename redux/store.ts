import { configureStore } from "@reduxjs/toolkit";
import vpnReducer from "./vpnSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { MonitoringReducer } from "./slices/monitoring/reducer";
import { MonitoringClientReducer } from "./slices/monitoring-client/reducer";
import { MonitoringQueueReducer } from "./slices/monitoring-queue/reducer";
import { MonitoringSystemReducer } from "./slices/monitoring-system/reducer";

// Persist의 설정
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, vpnReducer);
// const monitoringReducer= persistReducer(persistConfig, MonitoringReducer);
// const monitoringClientReducer = persistReducer(persistConfig, MonitoringClientReducer);
// const monitoringQueueReducer = persistReducer(persistConfig, MonitoringQueueReducer);
// const monitoringSystemReducer = persistReducer(persistConfig, vpnReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      isVpn: persistedReducer,
      MonitoringReducer,
      MonitoringClientReducer,
      MonitoringQueueReducer,
      MonitoringSystemReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["store"]["getState"]>;
export type AppDispatch = AppStore["store"]["dispatch"];
