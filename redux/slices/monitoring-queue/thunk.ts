import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getQueueList as getMonitoringQueueListApi,
    getMonitoringQueueData as getMonitoringQueueApi,
} from "../../../app/monitoring/helpers/fakebackend_helper";

interface reqQueueListType {
  serverType: string;
  msn: string;
  mlsn: string;
  queueType: string;
  maxCount: number;
}

interface reqQueueType {
  serverType: string,
  sTime: number,
  eTime: number,
  nameList: string[],
  pendingValueMode: string,
  tpsValueMode: string
}

export const getMonitoringQueueList = createAsyncThunk("monitoring/getMonitoringQueueList", async (params:reqQueueListType) => {
  try {
    var response = getMonitoringQueueListApi(params);
    return response;
  } catch (error) {
    return error;
  }
});

export const getMonitoringQueueData = createAsyncThunk("monitoring/getMonitoringQueueData", async (params:reqQueueType) => {
  try {
    var response = getMonitoringQueueApi(params);
    return response;
  } catch (error) {
    return error;
  }
});


