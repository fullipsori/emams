import { useAppSelector } from "@/redux/hooks";
import { MonitorClientState } from "@/redux/slices/monitoring-client/reducer";
import { MonitorQueueState } from "@/redux/slices/monitoring-queue/reducer";
import { MonitorSystemState } from "@/redux/slices/monitoring-system/reducer";
import { createSelector } from "@reduxjs/toolkit";


const selectPendingMonitoringData = createSelector(
    (state: any) => state.MonitoringQueueReducer,
    (monitoringData: MonitorQueueState) => ({ names: monitoringData.queueNames, minLabel: monitoringData.minLabel, labels: monitoringData.queueLabels, datas: monitoringData.queuePendings })
)
const getPendingMonitoringData = () => useAppSelector(selectPendingMonitoringData);

const selectTpsMonitoringData = createSelector(
    (state: any) => state.MonitoringQueueReducer,
    (monitoringData: MonitorQueueState) => ({ names: monitoringData.queueNames, minLabel: monitoringData.minLabel, labels: monitoringData.queueLabels, datas: monitoringData.queueTps })
)
const getTpsMonitoringData = () => useAppSelector(selectTpsMonitoringData);

const selectConnMonitoringData = createSelector(
    (state: any) => state.MonitoringClientReducer,
    (monitoringData: MonitorClientState) => ({ labels: monitoringData.labels, minLabel: monitoringData.minLabel, datas: [monitoringData.producerData, monitoringData.consumerData] })
)
const getConnMonitoringData = () => useAppSelector(selectConnMonitoringData);

const selectCpuMonitoringData = createSelector(
    (selectorState: any) => selectorState.MonitoringSystemReducer,
    (monitoringData: MonitorSystemState) => ({ names: ["cpu usage"], minLabel: monitoringData.minLabel, labels: monitoringData.labels, datas: [monitoringData.cpuUsages] })
)
const getCpuMonitoringData = () => useAppSelector(selectCpuMonitoringData);

const selectDiskMonitoringData = createSelector(
    (selectorState: any) => selectorState.MonitoringSystemReducer,
    (monitoringData: MonitorSystemState) => ({ names: ["read", "write"], minLabel: monitoringData.minLabel, labels: monitoringData.labels, datas: monitoringData.diskIO })
)
const getDiskMonitoringData = () => useAppSelector(selectDiskMonitoringData);

const selectMemoryMonitoringData = createSelector(
    (selectorState: any) => selectorState.MonitoringSystemReducer,
    (monitoringData: MonitorSystemState) => ({ names: ["memory usage"], minLabel: monitoringData.minLabel, labels: monitoringData.labels, datas: [monitoringData.memoryUsages] })
)
const getMemoryMonitoringData = () => useAppSelector(selectMemoryMonitoringData);

const selectNetworkMonitoringData = createSelector(
    (selectorState: any) => selectorState.MonitoringSystemReducer,
    (monitoringData: MonitorSystemState) => ({ names: ["received", "send"], minLabel: monitoringData.minLabel, labels: monitoringData.labels, datas: monitoringData.networkIO })
)
const getNetworkMonitoringData = () => useAppSelector(selectNetworkMonitoringData);


const getDataSource = (sourceType: string) : () => any | null => {


    switch(sourceType) {
        case "pending":
            return(getPendingMonitoringData);
        case "throughput":
            return(getTpsMonitoringData);
        case "connection":
            return(getConnMonitoringData);
        case "cpuUsage":
            return(getCpuMonitoringData);
        case "diskUsage":
            return(getDiskMonitoringData);
        case "memoryUsage":
            return(getMemoryMonitoringData);
        case "networkUsage":
            return(getNetworkMonitoringData);
        default:
            return(()=>null);
    }
}

export default getDataSource;