import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getClientInfo as getClientInfoApi,
} from "../../../app/monitoring/helpers/fakebackend_helper";

interface ClientInfoParam {
    mlsn: string,
    period: string
}

export const getClientInfoData = createAsyncThunk("monitoring/getClientInfoData", async (params:any) => {
  try {
    var response;
    if (params.period === "now") {
      response = getClientInfoApi(params.mlsn);
    }
    return response;
  } catch (error) {
    return error;
  }
});


