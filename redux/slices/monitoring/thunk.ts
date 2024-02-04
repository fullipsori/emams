import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllNodes as getAllNodesApi,
}from "@/app/(monitor)/monitor/helpers/fakebackend_helper";

interface reqNodeType {
  serverType: string;
}

export const getMonitoringAllNodes = createAsyncThunk("monitoring/getMonitoringAllNodes", async (params:reqNodeType) => {
  try {
    var response = getAllNodesApi(params);
    return response;
  } catch (error) {
    return error;
  }
});


