"use client"

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as url from "./url_helper";
// import { accessToken, nodeApiToken } from "../jwt-token-access/accessToken";


const fakeBackend = () => {
  const mock = new MockAdapter(axios);

  mock.onGet(url.GET_MONITORING_QUEUE_DATA).reply((config: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          if(true) {
            const dateTime: Date = new Date();
            const hours = dateTime.getHours().toString().padStart(2, "0");
            const minutes = dateTime.getMinutes().toString().padStart(2, "0");
            const seconds = dateTime.getSeconds().toString().padStart(2, "0");
            const resultData = {
                label: `${hours}:${minutes}:${seconds}`,
                names: Array.from({length: config.params.count}, (_, index) => `queue-${index}`),
                pending: Array.from({length: config.params.count}, () => Math.random()*100),
                tps: Array.from({length: config.params.count}, () => Math.random()*1000),
            }
            resolve([200, resultData]);
          }else{
              reject([400, "rejected "]);
          }
        });
    });
  });

  mock.onGet(url.GET_MONITORING_CLIENT_INFO).reply((config: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          if(true) {
            const dateTime: Date = new Date();
            const hours = dateTime.getHours().toString().padStart(2, "0");
            const minutes = dateTime.getMinutes().toString().padStart(2, "0");
            const seconds = dateTime.getSeconds().toString().padStart(2, "0");
            const resultData = {
                label: `${hours}:${minutes}:${seconds}`,
                producer: Math.random()*100,
                consumer: Math.random()*100,
            }
            resolve([200, resultData])
          }else{
              reject([400, "rejected "]);
          }
        });
    });
  });


};

export default fakeBackend;
