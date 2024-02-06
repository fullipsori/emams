"use client "

import axios from "axios";
import fakeBackend from "./fakeBackend";
import * as url from "./url_helper";

const monitorAxios = axios.create({
    baseURL: 'http://localhost:9999',
    headers: { 
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
    },
    timeout: 5000,
});
monitorAxios.interceptors.response.use(
    (respose) => (respose.data)? respose.data : respose,
    (error) => {
        let message;
        switch (error.status) {
            case 500:
                message = "Internal Server Error";
                break;
            case 401:
                message = "Invalid credentials";
                break;
            case 404:
                message = "Sorry! the data you are looking for could not be found";
                break;
            default:
                message = error.message || error;
        }
        return Promise.reject(message);
    }
);

fakeBackend(monitorAxios);

export const getAllNodes = (params: any) => monitorAxios.get(url.GET_ALL_NODES, { params : { serverType: params.serverType}});

export const getQueueList = (params: any) => monitorAxios.get(url.GET_QUEUE_LIST, { params: {
    serverType: params.serverType,
    msn: params.msn,
    mlsn: params.mlsn,
    queueType: params.queueType,
    maxCount: params.maxCount,
}});

export const getMonitoringQueueData = (params: any) => monitorAxios.get(url.GET_MONITORING_QUEUE_DATA, { params: { 
    serverType: params.serverType,
    msn: params.msn,
    mlsn: params.mlsn,
    sTime: params.sTime,
    eTime: params.eTime,
    nameList: params.nameList,
    pendingValueMode: params.pendingValueMode,
    tpsValueMode: params.tpsValueMode,
}});

export const getClientInfo = (params: any) => monitorAxios.get(url.GET_MONITORING_CLIENT_INFO, { params: { 
    serverType: params.serverType,
    sTime: params.sTime,
    eTime: params.eTime,
    mlsn: params.mlsn,
    clientList: params.clientList,
}});
export const getMonitoringSystemData = (params: any) => monitorAxios.get(url.GET_MONITORING_SYSTEM_DATA, { params: { 
    serverType: params.serverType,
    sTime: params.sTime,
    eTime: params.eTime,
    msn: params.msn,
}});
