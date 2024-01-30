import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getMonitoringSystemData as getMonitoringSystemApi,
} from "../../../app/monitoring/helpers/fakebackend_helper";

interface systemInfoParam {
  period: string,
  msn: string,
};

export const getMonitoringSystemData = createAsyncThunk("monitoring/getMonitoringSystemData", async (params:systemInfoParam) => {
  try {
    var response;
    if (params.period === "now") {
      response = getMonitoringSystemApi(params.msn);
    }
    return response;
  } catch (error) {
    return error;
  }
});


