import { useAppSelector } from "@/hook/hook";
import { MonitorClientState } from "@/redux/slices/monitoring-client/reducer";
import { MonitorQueueState } from "@/redux/slices/monitoring-queue/reducer";
import { MonitorSystemState } from "@/redux/slices/monitoring-system/reducer";
import { createSelector } from "@reduxjs/toolkit";

const dataSourceType = {
    PENDING: "pending",
    THROUGHPUT: "throughput",
    CONNECTION: "connection",
    CPU_USAGE: "cpuUsage",
    DISK_USAGE: "diskUsage",
    MEMORY_USAGE: "memoryUsage",
    NETWORK_USAGE: "networkUsage",
    DISK_STATUS: "diskStatus"
};

const selectPendingMonitoringData = createSelector(
    (state: any) => state.MonitoringQueueReducer,
    (monitoringData: MonitorQueueState) => ({ count: monitoringData.count, names: monitoringData.queueNames, minLabel: monitoringData.pendingMinLabel, labels: monitoringData.pendingLabels, datas: monitoringData.pending})
)
const selectTpsMonitoringData = createSelector(
    (state: any) => state.MonitoringQueueReducer,
    (monitoringData: MonitorQueueState) => ({ count: monitoringData.count, names: monitoringData.queueNames, minLabel: monitoringData.tpsMinLabel, labels: monitoringData.tpsLabels, datas: monitoringData.tps})
)
const selectConnMonitoringData = createSelector(
    (state: any) => state.MonitoringClientReducer,
    (monitoringData: MonitorClientState) => ({count: monitoringData.count, names: monitoringData.clientNames, labels: monitoringData.labels, minLabel: monitoringData.minLabel, datas: monitoringData.datas})
)
const selectCpuMonitoringData = createSelector(
    (selectorState: any) => selectorState.MonitoringSystemReducer,
    (monitoringData: MonitorSystemState) => ({count: 1, names: ["cpu usage"], minLabel: monitoringData.minLabel, labels: monitoringData.labels, datas: [monitoringData.cpuUsages] })
)
const selectDiskMonitoringData = createSelector(
    (selectorState: any) => selectorState.MonitoringSystemReducer,
    (monitoringData: MonitorSystemState) => ({count: 2, names: ["read", "write"], minLabel: monitoringData.minLabel, labels: monitoringData.labels, datas: monitoringData.diskIO })
)
const selectMemoryMonitoringData = createSelector(
    (selectorState: any) => selectorState.MonitoringSystemReducer,
    (monitoringData: MonitorSystemState) => ({count: 1, names: ["memory usage"], minLabel: monitoringData.minLabel, labels: monitoringData.labels, datas: [monitoringData.memoryUsages] })
)
const selectNetworkMonitoringData = createSelector(
    (selectorState: any) => selectorState.MonitoringSystemReducer,
    (monitoringData: MonitorSystemState) => ({count: 2, names: ["received", "send"], minLabel: monitoringData.minLabel, labels: monitoringData.labels, datas: monitoringData.networkIO })
)

const selectDiskStatusData = createSelector(
    (state: any) => state.MonitoringSystemReducer,
    (monitoringData: MonitorSystemState) => ({count: 1, names: ["disk"], datas: [monitoringData.diskUsages] })
)

const getDataSourceSelector = (sourceType: string) : any | null => {
    switch(sourceType) {
        case dataSourceType.PENDING:
            return(selectPendingMonitoringData);
        case dataSourceType.THROUGHPUT:
            return(selectTpsMonitoringData);
        case dataSourceType.CONNECTION:
            return(selectConnMonitoringData);
        case dataSourceType.CPU_USAGE:
            return(selectCpuMonitoringData);
        case dataSourceType.DISK_USAGE:
            return(selectDiskMonitoringData);
        case dataSourceType.MEMORY_USAGE:
            return(selectMemoryMonitoringData);
        case dataSourceType.NETWORK_USAGE:
            return(selectNetworkMonitoringData);
        case dataSourceType.DISK_STATUS:
            return(selectDiskStatusData);
        default:
            return(null);
    }
}

/* eslint-disable */
const getDataSourceCount = (sourceType: string) : number => {
    switch(sourceType) {
        case dataSourceType.PENDING:
            return(useAppSelector(selectPendingMonitoringData).count);
        case dataSourceType.THROUGHPUT:
            return(useAppSelector(selectTpsMonitoringData).count);
        case dataSourceType.CONNECTION:
            return(useAppSelector(selectConnMonitoringData).count);
        case dataSourceType.CPU_USAGE:
            return(useAppSelector(selectCpuMonitoringData).count);
        case dataSourceType.DISK_USAGE:
            return(useAppSelector(selectDiskMonitoringData).count);
        case dataSourceType.MEMORY_USAGE:
            return(useAppSelector(selectMemoryMonitoringData).count);
        case dataSourceType.NETWORK_USAGE:
            return(useAppSelector(selectNetworkMonitoringData).count);
        case dataSourceType.DISK_STATUS:
            return(useAppSelector(selectDiskStatusData).count);
        default:
            return(0);
    }
}

export {
    dataSourceType,
    getDataSourceCount,
    getDataSourceSelector
};