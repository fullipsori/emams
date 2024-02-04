export interface GridProps {
  title?: string;
  data: any[];
  columns: any[];
}

export interface GridValueType {
  key: string;
  value: string;
}

export interface vpnDataType {
  dmrEnabled: boolean;
  maxConnectionCount: number;
  maxMsgSpoolUsage: number;
  msgSpoolCurrentQueuesAndTopicEndpoints: number;
  msgSpoolMsgCount: number;
  msgVpnConnections: number;
  msgVpnConnectionsServiceRestOutgoing: number;
  msgVpnName: string;
  replicationEnabled: boolean;
  replicationRole: string;
  serviceRestOutgoingMaxConnectionCount: number;
  state: string;
}

export interface CongigurationProps {
  status: string;
  statusData: string;
  contents: string;
}

export interface InformationProps {
  key1: string;
  key2: string;
  value1: string;
  value2: string;
  percentage: number;
}
