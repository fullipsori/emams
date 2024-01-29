"use client "
import axios from "axios";
import { APIClient } from "./api_helper";
import fakeBackend from "./fakeBackend";

import * as url from "./url_helper";

const api = new APIClient();

fakeBackend();
// export const getMonitoringQueueData = async (queueCount: number) => api.get(url.GET_MONITORING_QUEUE_DATA, { params: { count: queueCount}});
export const getMonitoringQueueData = (queueCount: number) => axios.get(url.GET_MONITORING_QUEUE_DATA, { params: { count: queueCount}});
