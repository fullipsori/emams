import { GridValueType } from "@/types/grid";
import { ColumnDefinition } from "react-tabulator";

export const columns = [
  { title: "Name", field: "name", width: 300 },
  { title: "Size", field: "size", align: "left", width: 200 },
];

export const data = [
  { name: "수연", size: 30 },
  { name: "붕어빵", size: 25 },
  { name: "계란빵", size: 40 },
  { name: "John Doe", size: 30 },
  { name: "호두과자", size: 67 },
  { name: "Jane Doe", size: 24 },
  { name: "호두과자", size: 24 },
  { name: "옥수수빵", size: 51 },
  { name: "Bob Smith", size: 40 },
];

export const topData1: GridValueType[] = [
  { key: "MES01 > edpVPN > Q/RECV>M01", value: "0/121건" },
  { key: "EOPS1 > edpVPN > Q/RECV>M99", value: "0/1,123건" },
  { key: "EDP01 > edpVPN > Q/RECV>F01", value: "16/233건" },
  { key: "MES02 > edpVPN > Q/RECV>E01", value: "111/326건" },
  { key: "MES03 > edpVPN > Q/RECV>M99", value: "181/326건" },
];

export const topColumns: ColumnDefinition[] = [
  { title: "key", field: "key", width: 300 },
  { title: "value", field: "value", width: 120, hozAlign: "right" },
];

export const topData2: GridValueType[] = [
  { key: "MES01 > edpVPN > Q/RECV>M01", value: "0/121건 660%" },
  { key: "EOPS1 > edpVPN > Q/RECV>M99", value: "0/1,123건 890%" },
  { key: "EDP01 > edpVPN > Q/RECV>F01", value: "16/233건 19%" },
  { key: "MES02 > edpVPN > Q/RECV>E01", value: "111/326건 20%" },
  { key: "MES03 > edpVPN > Q/RECV>M99", value: "181/326건 10%" },
];

export const topData3: GridValueType[] = [
  { key: "MES01 > edpVPN > Q/RECV>M01", value: "56,607건" },
  { key: "EOPS1 > edpVPN > Q/RECV>M99", value: "1,123건" },
  { key: "EDP01 > edpVPN > Q/RECV>F01", value: "233건" },
  { key: "MES02 > edpVPN > Q/RECV>E01", value: "326건" },
  { key: "MES03 > edpVPN > Q/RECV>M99", value: "1,326건" },
];

export const statusData = [
  { status: [true, false], value: "MES01" },
  { status: true, value: "EOPS1" },
  { status: [null, null], value: "EDP01" },
  { status: [true, false], value: "MES02" },
  { status: null, value: "MES03" },
];

// function statusFormatter(cell: any) {
//   var value = cell.getValue();
//   var element = document.createElement("span");

//   if (value === true) {
//     element.className += "circle_g";
//   } else if (value === false) {
//     element.className += "circle_r";
//   } else {
//     element.className += "circle_y";
//   }
//   return element;
// }

// export const statusData = [
//   { status: true, value: "MES01" },
//   { status: null, value: "EOPS1" },
//   { status: true, value: "EDP01" },
//   { status: false, value: "MES02" },
//   { status: null, value: "MES03" },
// ];

// export const statusColumns = [
//   {
//     title: "status",
//     field: "status",
//     formatter: statusFormatter,
//     width: 50,
//   },
//   { title: "value", field: "value", width: 120, hozAlign: "right" },
// ];

export const vpnColumn = [
  {
    title: "Message VPN",
    field: "msgVpnName",
    width: 150,
    hozAlign: "right",
    sorter: "string",
  },
  {
    title: "Local State",
    field: "state",
    width: 120,
    hozAlign: "right",
    sorter: "string",
  },
  {
    title: "Replication",
    field: "replicationEnabled",
    width: 120,
    hozAlign: "right",
    sorter: "boolean",
  },
  {
    title: "DMR",
    field: "dmrEnabled",
    width: 80,
    hozAlign: "right",
    sorter: "string",
  },
  {
    title: "Queues and Topic Endpoints",
    field: "msgSpoolCurrentQueuesAndTopicEndpoints",
    // width: 120,
    hozAlign: "right",
    sorter: "number",
  },
  {
    title: "Messages Queued",
    field: "msgSpoolMsgCount",
    // width: 120,
    hozAlign: "right",
    sorter: "number",
  },
  {
    title: "Incoming Connections",
    field: "msgVpnConnections",
    // width: 120,
    hozAlign: "right",
    sorter: "number",
  },
  {
    title: "Outgoing REST Connections",
    field: "msgVpnConnectionsServiceRestOutgoing",
    // width: 120,
    hozAlign: "right",
    sorter: "number",
  },
  // {
  //   title: "value",
  //   field: "maxConnectionCount",
  //   width: 120,
  //   hozAlign: "right",
  // },
  // { title: "value", field: "maxMsgSpoolUsage", width: 120, hozAlign: "right" },
  // { title: "value", field: "replicationRole", width: 120, hozAlign: "right" },
  // {
  //   title: "value",
  //   field: "serviceRestOutgoingMaxConnectionCount",
  //   width: 120,
  //   hozAlign: "right",
  // },
];

export const vpnListData = [
  {
    id: 1,
    msgVpnName: "acme_aos_dev",
  },
  {
    id: 2,
    msgVpnName: "acme_atp_dev",
  },
  {
    id: 3,
    msgVpnName: "default",
  },
];

export const vpnColumns = [
  {
    title: "ID",
    field: "id",
    width: 100,
    sorter: "number",
  },
  {
    title: "Name",
    field: "name",
    sorter: "string",
  },
  {
    title: "Age",
    field: "age",
    sorter: "number",
  },
  {
    title: "Job",
    field: "job",
    sorter: "string",
    // headerFilter: "input",
  },
];

export const vpnData = [
  {
    dmrEnabled: false,
    maxConnectionCount: 100,
    maxMsgSpoolUsage: 0,
    msgSpoolCurrentQueuesAndTopicEndpoints: 11,
    msgSpoolMsgCount: 0,
    msgVpnConnections: 2,
    msgVpnConnectionsServiceRestOutgoing: 3,
    msgVpnName: "acme_aos_dev",
    replicationEnabled: false,
    replicationRole: "standby",
    serviceRestOutgoingMaxConnectionCount: 100,
    state: "up",
  },
  {
    dmrEnabled: false,
    maxConnectionCount: 100,
    maxMsgSpoolUsage: 0,
    msgSpoolCurrentQueuesAndTopicEndpoints: 3,
    msgSpoolMsgCount: 0,
    msgVpnConnections: 2,
    msgVpnConnectionsServiceRestOutgoing: 0,
    msgVpnName: "acme_atp_dev",
    replicationEnabled: false,
    replicationRole: "standby",
    serviceRestOutgoingMaxConnectionCount: 100,
    state: "up",
  },
  {
    dmrEnabled: true,
    maxConnectionCount: 100,
    maxMsgSpoolUsage: 1500,
    msgSpoolCurrentQueuesAndTopicEndpoints: 30,
    msgSpoolMsgCount: 32,
    msgVpnConnections: 3,
    msgVpnConnectionsServiceRestOutgoing: 0,
    msgVpnName: "default",
    replicationEnabled: false,
    replicationRole: "standby",
    serviceRestOutgoingMaxConnectionCount: 100,
    state: "up",
  },
];

export const ProgressData = {
  dmrEnabled: true,
  enabled: true,
  eventConnectionCountThreshold: {
    clearPercent: 60,
    setPercent: 80,
  },
  eventEgressFlowCountThreshold: {
    clearPercent: 60,
    setPercent: 80,
  },
  eventEgressMsgRateThreshold: {
    clearValue: 3000000,
    setValue: 4000000,
  },
  eventEndpointCountThreshold: {
    clearPercent: 60,
    setPercent: 80,
  },
  eventIngressFlowCountThreshold: {
    clearPercent: 60,
    setPercent: 80,
  },
  eventIngressMsgRateThreshold: {
    clearValue: 3000000,
    setValue: 4000000,
  },
  eventLargeMsgThreshold: 1024,
  eventLogTag: "",
  eventMsgSpoolUsageThreshold: {
    clearPercent: 60,
    setPercent: 80,
  },
  eventPublishClientEnabled: false,
  eventPublishMsgVpnEnabled: false,
  eventPublishSubscriptionMode: "off",
  eventPublishTopicFormatMqttEnabled: false,
  eventPublishTopicFormatSmfEnabled: true,
  eventSubscriptionCountThreshold: {
    clearPercent: 60,
    setPercent: 80,
  },
  eventTransactedSessionCountThreshold: {
    clearPercent: 60,
    setPercent: 80,
  },
  eventTransactionCountThreshold: {
    clearPercent: 60,
    setPercent: 80,
  },
  exportSubscriptionsEnabled: false,
  maxConnectionCount: 100,
  maxEgressFlowCount: 1000,
  maxEndpointCount: 1000,
  maxIngressFlowCount: 1000,
  maxMsgSpoolUsage: 1500,
  maxSubscriptionCount: 500000,
  maxTransactedSessionCount: 1000,
  maxTransactionCount: 5000,
  msgVpnName: "default",
  sempOverMsgBusAdminClientEnabled: true,
  sempOverMsgBusAdminDistributedCacheEnabled: true,
  sempOverMsgBusAdminEnabled: true,
  sempOverMsgBusEnabled: true,
  sempOverMsgBusShowEnabled: true,
};

export const ActionData = [
  { id: 1, title: "Summary 이동", url: "/mlsnm" },
  { id: 2, title: "Settings", url: "/mlsnm/settings" },
  // { id: 3, title: "Stats | Message Stats", url: "/mlsnm/stats" },
  { id: 4, title: "Monitoring 이동", url: "/monitor" },
  // { id: 5, title: "Message Queud 이동", url: "/channelList" },
  { id: 6, title: "Delete", url: "" },
];

export const MessageVpnData = [
  { id: 1, title: "Summary", url: "summary" },
  { id: 2, title: "Settings", url: "settings" },
  { id: 3, title: "Services", url: "services" },
  { id: 4, title: "Replication", url: "replication" },
  { id: 5, title: "Proxies", url: "proxies" },
  { id: 6, title: "Stats", url: "stats" },
];

export const ConfigStatusData = [
  { id: 1, title: "Replication", value: "Off" },
  { id: 2, title: "DMR", value: "Off" },
  { id: 3, title: "Subscriptions", value: "8" },
  { id: 4, title: "Replay", value: "State" },
];

export const ConfigData = [
  {
    status: "Active",
    statusData: "ON",
    contents: "mes-broker1 192.168.19.808",
  },
  {
    status: "Standby",
    statusData: "OFF",
    contents: "mes-broker2 192.168.19.808",
  },
  {
    status: "Monitor",
    statusData: "ON",
    contents: "mes-broker3 192.168.19.808",
  },
];

export const InformationData = [
  {
    key1: "Messages Queued",
    key2: "Messages Quota",
    value1: "174.4 MB",
    value2: "100.0 MB",
    percentage: 32,
  },
  {
    key1: "Incomming Connections",
    key2: "Configured Limit",
    value1: "1",
    value2: "100",
    percentage: 32,
  },
  {
    key1: "Queue REST Connections",
    key2: "Configured Limit",
    value1: "1",
    value2: "100",
    percentage: 12,
  },
  {
    key1: "Current Consumers",
    key2: "Configured Limit",
    value1: "174.4 MB",
    value2: "100.0 MB",
    percentage: 49,
  },
];
