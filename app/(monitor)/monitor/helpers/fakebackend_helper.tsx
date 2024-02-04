"use client "
import axios from "axios";
import { APIClient } from "./api_helper";
import fakeBackend from "./fakeBackend";

import * as url from "./url_helper";

const api = new APIClient();

fakeBackend();

export const getAllNodes = (params: any) => axios.get(url.GET_ALL_NODES, { params : { serverType: params.serverType}});

export const getQueueList = (params: any) => axios.get(url.GET_QUEUE_LIST, { params: {
    serverType: params.serverType,
    msn: params.msn,
    mlsn: params.mlsn,
    queueType: params.queueType,
    maxCount: params.maxCount,
}});

export const getMonitoringQueueData = (params: any) => axios.get(url.GET_MONITORING_QUEUE_DATA, { params: { 
    serverType: params.serverType,
    sTime: params.sTime,
    eTime: params.eTime,
    nameList: params.nameList,
    pendingValueMode: params.pendingValueMode,
    tpsValueMode: params.tpsValueMode,
}});

export const getClientInfo = (params: any) => axios.get(url.GET_MONITORING_CLIENT_INFO, { params: { 
    serverType: params.serverType,
    sTime: params.sTime,
    eTime: params.eTime,
    mlsn: params.mlsn,
    clientList: params.clientList,
}});
export const getMonitoringSystemData = (params: any) => axios.get(url.GET_MONITORING_SYSTEM_DATA, { params: { 
    serverType: params.serverType,
    sTime: params.sTime,
    eTime: params.eTime,
    msn: params.msn,
}});
