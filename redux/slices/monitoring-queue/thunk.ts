import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getMonitoringQueueData as getMonitoringQueueApi,
} from "../../../app/monitoring/helpers/fakebackend_helper";

export const getMonitoringQueueData = createAsyncThunk("monitoring/getMonitoringQueueData", async (params:any) => {
  try {
    var response;
    if (params.period === "now") {
      response = getMonitoringQueueApi(params.queueCount);
    }
    return response;
  } catch (error) {
    return error;
  }
});


