"use client"

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as url from "./url_helper";
// import { accessToken, nodeApiToken } from "../jwt-token-access/accessToken";

const fakeBackend = () => {
  const mock = new MockAdapter(axios);

  mock.onGet(url.GET_ALL_NODES).reply((config: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          if(config.params.serverType === 'solace') {
            const resultData = {
              nodes : [ 
                { msn: "broker-1", mlsns: [ "default", "vpn1", "vpn2" ] },
                { msn: "broker-2", mlsns: [ "default", "vpn1", "vpn2", "vpn3" ] },
                { msn: "broker-3", mlsns: [ "default", "vpn1", "vpn2", "vpn4" ] },
              ],
            }
            resolve([200, resultData]);
          }else{
            reject([400, "unknown server type"]);
          }
        });
    }) 
  });

  mock.onGet(url.GET_QUEUE_LIST).reply((config: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          if(config.params.serverType === 'solace') {
            const resultData = {
              queueList : Array.from({length: config.params.maxCount}, (_, index) => {
                return `${config.params.msn}-${config.params.mlsn}-${config.params.queueType}-q-${index}`;
              })
            }
            resolve([200, resultData]);
          }else{
            reject([400, "unknown server type"]);
          }
        });
    }) 
  });

  const refreshUnit = 1000; //seconds
  mock.onGet(url.GET_MONITORING_QUEUE_DATA).reply((config: any) => {
    return new Promise((resolve, reject) => {
      console.log("nameList:" + config.params.nameList)
        setTimeout(() => {
          if(config.params.serverType === 'solace') {
            const count = (config.params.eTime - config.params.sTime)/refreshUnit;
            console.log("lCount:" + count);
            const resultData = {
              label: Array.from({ length: count }, (_, index) => config.params.sTime + refreshUnit * (index+1)),
              names: [...config.params.nameList],
              pending: (config.params.pendingValueMode === "count") ?
                Array.from({ length: config.params.nameList.length }, () => {
                  return Array.from({ length: count }, () => Math.round(Math.random() * 100));
                })
                : Array.from({ length: config.params.nameList.length }, () => {
                  return Array.from({ length: count }, () => Math.random() * 100 / 100);
                }),
              tps: (config.params.tpsValueMode === "count") ?
                Array.from({ length: config.params.nameList.length }, () => {
                  return Array.from({ length: count }, () => Math.round(Math.random() * 100));
                })
                : Array.from({ length: config.params.nameList.length }, () => {
                  return Array.from({ length: count }, () => Math.random() * 100 / 100);
                }) 
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
          if(config.params.serverType === 'solace') {
            const count = (config.params.eTime - config.params.sTime)/refreshUnit;
            const resultData = {
              label: Array.from({ length: count }, (_, index) => config.params.sTime + refreshUnit * (index+1)),
              names: [...config.params.clientList],
              datas: Array.from({ length: config.params.clientList.length }, () => {
                  return Array.from({ length: count }, () => Math.round(Math.random()*1000));
              })
            }
            resolve([200, resultData])
          }else{
            reject([400, "rejected "]);
          }
        });
    });
  });

  mock.onGet(url.GET_MONITORING_SYSTEM_DATA).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(config.params.serverType === 'solace') {
          const count = (config.params.eTime - config.params.sTime) / refreshUnit;
          const resultData = {
            label: Array.from({ length: count }, (_, index) => config.params.sTime + refreshUnit * (index+1)),
            cpuUsage: Array.from({length:count}, ()=> Math.random()*100),
            memoryUsage: Array.from({length:count}, ()=> Math.random()*100),
            diskUsage: Array.from({length:count}, ()=> Math.random()*100),
            coreCount: 4,
            memorySize: 256,
            diskRead: Array.from({length:count}, ()=> Math.round(Math.random()*10000)),
            diskWrite: Array.from({length:count}, ()=> Math.round(Math.random()*10000)),
            networkRead: Array.from({length:count}, ()=> Math.round(Math.random()*10000)),
            networkWrite: Array.from({length:count}, ()=> Math.round(Math.random()*10000)),
          }
          resolve([200, resultData])
        } else {
          reject([400, "rejected "]);
        }
      });
    });
  });
};

export default fakeBackend;
