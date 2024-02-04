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
  function makeRandom(min:number, max:number){
    var RandVal = Math.random()*(max-min) + min;
    return RandVal;
  }

  mock.onGet(url.GET_MONITORING_QUEUE_DATA).reply((config: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          if(config.params.serverType === 'solace') {
            const count = (config.params.eTime - config.params.sTime)/refreshUnit;
            const resultData = {
              label: Array.from({ length: count }, (_, index) => config.params.sTime + refreshUnit * (index+1)),
              names: [...config.params.nameList],
              pending: (config.params.pendingValueMode === "count") ?
                Array.from({ length: config.params.nameList.length }, () => {
                  return Array.from({ length: count }, () => Math.round(makeRandom(0,1000)));
                })
                : Array.from({ length: config.params.nameList.length }, () => {
                  return Array.from({ length: count }, () => makeRandom(0,3000));
                }),
              tps: (config.params.tpsValueMode === "count") ?
                Array.from({ length: config.params.nameList.length }, () => {
                  return Array.from({ length: count }, () => Math.round(makeRandom(300,800)));
                })
                : Array.from({ length: config.params.nameList.length }, () => {
                  return Array.from({ length: count }, () => makeRandom(2000,7000));
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
                  return Array.from({ length: count }, () => Math.round(makeRandom(30,200)));
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
            cpuUsage: Array.from({length:count}, ()=> makeRandom(50,100)),
            memoryUsage: Array.from({length:count}, ()=> makeRandom(60,100)),
            diskUsage: Array.from({length:count}, ()=> makeRandom(20,75)),
            coreCount: (config.params.msn === "broker-1")? 4 : (config.params.msn === "broker-2")? 8 : 16,
            memorySize: (config.params.msn === "broker-1")? 128 : (config.params.msn === "broker-2")? 256 : 512,
            diskRead: Array.from({length:count}, ()=> Math.round(makeRandom(1500,10000))),
            diskWrite: Array.from({length:count}, ()=> Math.round(makeRandom(3000,8000))),
            networkRead: Array.from({length:count}, ()=> Math.round(makeRandom(1500,10000))),
            networkWrite: Array.from({length:count}, ()=> Math.round(makeRandom(3000,8000))),
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
