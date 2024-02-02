import { MonitorClientState } from "@/redux/slices/monitoring-client/reducer";
import { MonitorQueueState } from "@/redux/slices/monitoring-queue/reducer";
import { MonitorSystemState } from "@/redux/slices/monitoring-system/reducer";
import { createSelector } from "@reduxjs/toolkit";


const selectPendingMonitoringData = createSelector(
    (state: any) => state.MonitoringQueueReducer,
    (monitoringData: MonitorQueueState) => ({ names: monitoringData.queueNames, minLabel: monitoringData.minLabel, labels: monitoringData.queueLabels, datas: monitoringData.queuePendings })
)
const selectTpsMonitoringData = createSelector(
    (state: any) => state.MonitoringQueueReducer,
    (monitoringData: MonitorQueueState) => ({ names: monitoringData.queueNames, minLabel: monitoringData.minLabel, labels: monitoringData.queueLabels, datas: monitoringData.queueTps })
)
const selectConnMonitoringData = createSelector(
    (state: any) => state.MonitoringClientReducer,
    (monitoringData: MonitorClientState) => ({ labels: monitoringData.labels, minLabel: monitoringData.minLabel, datas: [monitoringData.producerData, monitoringData.consumerData] })
)
const selectCpuMonitoringData = createSelector(
    (selectorState: any) => selectorState.MonitoringSystemReducer,
    (monitoringData: MonitorSystemState) => ({ names: ["cpu usage"], minLabel: monitoringData.minLabel, labels: monitoringData.labels, datas: [monitoringData.cpuUsages] })
)
const selectDiskMonitoringData = createSelector(
    (selectorState: any) => selectorState.MonitoringSystemReducer,
    (monitoringData: MonitorSystemState) => ({ names: ["read", "write"], minLabel: monitoringData.minLabel, labels: monitoringData.labels, datas: monitoringData.diskIO })
)
const selectMemoryMonitoringData = createSelector(
    (selectorState: any) => selectorState.MonitoringSystemReducer,
    (monitoringData: MonitorSystemState) => ({ names: ["memory usage"], minLabel: monitoringData.minLabel, labels: monitoringData.labels, datas: [monitoringData.memoryUsages] })
)
const selectNetworkMonitoringData = createSelector(
    (selectorState: any) => selectorState.MonitoringSystemReducer,
    (monitoringData: MonitorSystemState) => ({ names: ["received", "send"], minLabel: monitoringData.minLabel, labels: monitoringData.labels, datas: monitoringData.networkIO })
)

const selectCpuStatusData = createSelector(
    (state: any) => state.MonitoringSystemReducer,
    (monitoringData: MonitorSystemState) => ({ names: ["cpu"], datas: monitoringData.cpuUsages })
)
const selectMemoryStatusData = createSelector(
    (state: any) => state.MonitoringSystemReducer,
    (monitoringData: MonitorSystemState) => ({ names: ["memory"], datas: monitoringData.memoryUsages })
)
const selectDiskStatusData = createSelector(
    (state: any) => state.MonitoringSystemReducer,
    (monitoringData: MonitorSystemState) => ({ names: ["disk"], datas: monitoringData.diskUsages })
)

const getDataSourceSelector = (sourceType: string) : any | null => {
    switch(sourceType) {
        case "pending":
            return(selectPendingMonitoringData);
        case "throughput":
            return(selectTpsMonitoringData);
        case "connection":
            return(selectConnMonitoringData);
        case "cpuUsage":
            return(selectCpuMonitoringData);
        case "diskUsage":
            return(selectDiskMonitoringData);
        case "memoryUsage":
            return(selectMemoryMonitoringData);
        case "networkUsage":
            return(selectNetworkMonitoringData);
        case "cpuStatus":
            return(selectCpuStatusData);
        case "memoryStatus":
            return(selectMemoryStatusData);
        case "diskStatus":
            return(selectDiskStatusData);
        default:
            return(null);
    }
}

export default getDataSourceSelector;