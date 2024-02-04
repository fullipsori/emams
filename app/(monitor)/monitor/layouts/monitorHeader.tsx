"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Col, Label, Row } from 'reactstrap';

import { useAppDispatch, useAppSelector } from '@/hook/hook';
import { MonitorState, reset as resetMonitor, updateNode, updateRefreshMode, updateTimeRange as updateMonitorTimeRange } from '@/redux/slices/monitoring/reducer';
import { reset as resetClientData, updateTimeRange as updateClientTimeRange } from '@/redux/slices/monitoring-client/reducer';
import { MonitorQueueState, reset as resetQueueData, updateTimeRange as updateQueueTimeRange } from '@/redux/slices/monitoring-queue/reducer';
import { reset as resetSystemData, updateTimeRange as updateSystemTimeRange  } from '@/redux/slices/monitoring-system/reducer';
import Select from 'react-select';

import { getClientInfoData } from '@/redux/slices/monitoring-client/thunk';
import { getMonitoringSystemData } from '@/redux/slices/monitoring-system/thunk';
import { getMonitoringQueueData, getMonitoringQueueList } from '@/redux/slices/monitoring-queue/thunk';
import { getMonitoringAllNodes } from '@/redux/slices/monitoring/thunk';
import { createSelector } from '@reduxjs/toolkit';
import { fullscreen } from '../common/FullScreen';

interface BreadCrumbProps {
    title: string;
    pageTitle: string;
}

export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback)

    // Remember the latest callback if it changes.
    //useIsomorphicLayoutEffect
    React.useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        // Don't schedule if no delay is specified.
        // Note: 0 is a valid value for delay.
        if (!delay && delay !== 0) {
            return
        }
        const id = setInterval(() => savedCallback.current(), delay)
        return () => {
            clearInterval(id)
        }
    }, [delay])
}

/* display queue types*/
const queuesOptions = [
    { value: 'order', label: 'Top5. Name Order' },
    { value: 'pending', label: 'Top5. Pending Queues' },
    { value: 'hrate', label: 'Top5. 60s High Message In Rate' },
    { value: 'lrate', label: 'Top5. 60s Low Message In Rate' },
];
/* x-axis time range */
const timeRangeOptions = [
    { value: 5 * 60, label: 'last 5 mins' },
    { value: 14 * 60, label: 'last 15 mins' },
    { value: 29 * 60, label: 'last 30 mins' },
    { value: 0 * 3600, label: 'last 1 hour' },
    { value: 2 * 3600, label: 'last 3 hours' },
    { value: 5 * 3600, label: 'last 6 hours' },
    { value: 11 * 3600, label: 'last 12 hours' },
    { value: 23 * 3600, label: 'last 24 hours' },
    { value: 1 * 86400, label: 'last 2 days' },
    { value: 7 * 86400, label: 'last 7 days' }
];

const refreshOptions = [
    { value: 0, label: 'off' },
    { value: 1, label: '1s' },
    { value: 5, label: '5s' },
    { value: 10, label: '10s' },
    { value: 30, label: '30s' },
    { value: 1 * 60, label: '1m' },
    { value: 5 * 60, label: '5m' },
    { value: 15 * 60, label: '15m' },
    { value: 30 * 60, label: '30m' },
    { value: 3600, label: '1h' },
    { value: 2 * 3600, label: '2h' },
    { value: 86400, label: '1d' }
];

const MonitorHeader = () => {
    const dispatch: any = useAppDispatch();
    const selectNodeData = createSelector(
        (state: any) => state.MonitoringReducer,
        (monitoringData: MonitorState) => ({ serverType: monitoringData.serverType, nodeInfo: monitoringData.nodeInfo })
    )
    const monitoringData = useAppSelector(selectNodeData);    
    const selectQueueData = createSelector(
        (state: any) => state.MonitoringQueueReducer,
        (monitoringData: MonitorQueueState) => ({ queueNames: monitoringData.queueNames, pendingValueMode: monitoringData.pendingValueMode, tpsValueMode: monitoringData.tpsValueMode })
    )
    const monitoringQueueData = useAppSelector(selectQueueData);    


    const [mlsnOptions, setMlsnOptions] = useState<any[]>([]);
    const [curNode, setCurNode] = useState<any>(null);
    const [queueType, setQueueType] = useState(queuesOptions[0]);
    // const [timeRange, setTimeRange] = useState<{ period?: number, fixedRange?: { sTime: number, eTime: number}}>({period: timeRangeOptions[0].value});
    const [timeRange, setTimeRange] = useState(timeRangeOptions[0]);
    const [refreshMode, setRefreshMode] = useState(refreshOptions[1]);

    const [chartTime, setChartTime] = useState<number|null>(0);


    /* initial loading */
    useEffect(() => {
        console.log("called")
        dispatch(getMonitoringAllNodes({
            serverType: monitoringData.serverType
        }));
        return () => {
            dispatch(resetQueueData());
            dispatch(resetClientData());
            dispatch(resetSystemData());
            dispatch(resetMonitor());
        }
    }, [dispatch]);

    useEffect(() => {
        if(monitoringData.nodeInfo.length > 0) {
            const data: any[] = [];
            for (let n of monitoringData.nodeInfo) {
                for (let lsn of n.mlsns) {
                    data.push({ value: { msn: n.msn, mlsn: lsn }, label: `${n.msn} > ${lsn}` });
                }
            }
            if (data.length > 0) {
                setMlsnOptions(data);
            }
        }
    }, [monitoringData.nodeInfo]);

    useEffect(() => {
        if(curNode) {
            dispatch(updateNode(curNode.value))
            dispatch(resetQueueData());
            dispatch(resetClientData());
            dispatch(resetSystemData());
        }
    },[curNode]);
    
    useEffect(() => {
        if(curNode && curNode.value.mlsn) {
            dispatch(getMonitoringQueueList({
                serverType: monitoringData.serverType,
                msn: curNode.value.msn,
                mlsn: curNode.value.mlsn,
                queueType: queueType.value,
                maxCount: 3,
            }));
        }
    },[curNode, queueType]);

    useEffect(() => {
        const tRange = {
            period: timeRange.value
        }
        dispatch(updateMonitorTimeRange(tRange));
        dispatch(updateQueueTimeRange(tRange));
        dispatch(updateSystemTimeRange(tRange));
        dispatch(updateClientTimeRange(tRange));
    }, [timeRange]);

    useEffect(() => {
        dispatch(updateRefreshMode(refreshMode.value));
    },[refreshMode]);

    /* 헤더에서 chart update 용 timer 를 구동한다. */
    useEffect(() => {
        if (chartTime && (timeRange.value > 0)) {
            dispatch(getMonitoringQueueData({
                serverType: monitoringData.serverType,
                sTime: chartTime - 1000*refreshMode.value,
                eTime: chartTime,
                nameList: monitoringQueueData.queueNames,
                pendingValueMode: monitoringQueueData.pendingValueMode,
                tpsValueMode: monitoringQueueData.tpsValueMode,

             }));
            dispatch(getClientInfoData({
                serverType: monitoringData.serverType,
                sTime: chartTime - 1000*refreshMode.value,
                eTime: chartTime,
                mlsn: curNode.value.mlsn,
                clientList: ["producer", "consumer"],
            }));
            dispatch(getMonitoringSystemData({
                serverType: monitoringData.serverType,
                sTime: chartTime - 1000*refreshMode.value,
                eTime: chartTime,
                msn: curNode.value.msn,
            }));
        }
    }, [chartTime])

    /** 시간 변경시 정상적으로 바뀌는지 확인 한다. */
    const timerFunction = () => {
        setChartTime((new Date()).getTime());
    };

    useEffect(() => {
        if (!curNode || !refreshMode || refreshMode.value==0) {
            return
        }
        const id = setInterval(() => timerFunction(), refreshMode.value * 1000)
        return () => {
            clearInterval(id)
        }
    }, [curNode, refreshMode])

    {/* <button onClick={()=> fullscreen(document.getElementById("layout-wrapper"))}>Make FullScreen</button>
<button onClick={() => exitFullScreen()}>Exit FullScreen</button> */}

    return (
        <React.Fragment>
            <Row className="m-page-title-box">
                <Col lg={3} className='d-sm-flex align-items-center'>
                    <Label htmlFor="choices-mlsn" className="form-label text-muted mb-0 fs-5">Message VPN</Label>
                    <Select id="choices-mlsn" className='mb-0 ml-3 p-3 w-50' 
                        value={curNode}
                        onChange={(selected: any) => { setCurNode(selected); }}
                        placeholder="Select mlsn"
                        options={mlsnOptions} />
                </Col>
                <Col lg={4} className='d-sm-flex align-items-center'>
                    <Label htmlFor="choices-queues" className="form-label text-muted mb-0 fs-5">Queues</Label>
                    <Select id="choices-queues" className='mb-0 ml-3 p-3 w-50'
                        value={queueType}
                        onChange={(selected: any) => { setQueueType(selected); }}
                        placeholder="Select Queue Type"
                        options={queuesOptions} />
                </Col>
                <Col lg={5} className='d-sm-flex  align-items-center justify-content-end'>
                    <div className='d-sm-flex ml-auto'>
                        <div className="flex-shrink-0 ">
                            <span className="p-3">
                                <i className="psi-monitor-3" onClick={()=>fullscreen(document.getElementById("layout-wrapper"))}></i>
                            </span>
                        </div>
                        <Select id="choices-time-ranges" className='mb-0 ml-3 w-100'
                            value={timeRange}
                            onChange={(selected: any) => { setTimeRange(selected); }}
                            placeholder="Select Time Ranges"
                            options={timeRangeOptions} />

                        <div className="flex-shrink-0 avatar-xs ml-3 ml_4">
                            <span className="avatar-title  p-1 rounded-circle">
                                <i className="psi-resize"></i>
                            </span>
                        </div>
                        <div className="flex-shrink-0 avatar-xs ml-3 ml-4">
                            <span className="avatar-title p-1 ">
                                <i className="psi-reload"></i>
                            </span>
                        </div>
                        <Select id="choices-refresh" className='mb-0 ml-0 w-75'
                            value={refreshMode}
                            onChange={(selected: any) => { setRefreshMode(selected); }}
                            placeholder="Select period"
                            options={refreshOptions} />
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export { MonitorHeader, queuesOptions, timeRangeOptions, refreshOptions };
