import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getClientInfo as getClientInfoApi,
} from "../../../app/monitoring/helpers/fakebackend_helper";

interface reqClientType {
    serverType: string;
    sTime: number;
    eTime: number;
    mlsn: string;
    clientList: string[];
}

export const getClientInfoData = createAsyncThunk("monitoring/getClientInfoData", async (params:reqClientType) => {
  try {
    var response = getClientInfoApi(params);
    return response;
  } catch (error) {
    return error;
  }
});


