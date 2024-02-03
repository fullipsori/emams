import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getMonitoringSystemData as getMonitoringSystemApi,
} from "../../../app/monitoring/helpers/fakebackend_helper";

interface reqSystemType{
  serverType: string;
  sTime: number;
  eTime: number;
  msn: string;
};

export const getMonitoringSystemData = createAsyncThunk("monitoring/getMonitoringSystemData", async (params:reqSystemType) => {
  try {
    var response = getMonitoringSystemApi(params);
    return response;
  } catch (error) {
    return error;
  }
});


