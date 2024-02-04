"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IData {
  msgVpnName: string;
}

interface IData2 {
  queueName: string;
}

interface VpnState {
  selectedRow: IData | null;
  selectedQueue: IData2 | null;
}

const initialState: VpnState = {
  selectedRow: null,
  selectedQueue: null,
};

const vpnSlice = createSlice({
  name: "vpn",
  initialState,
  reducers: {
    setSelectedRow: (state, action: PayloadAction<IData | null>) => {
      state.selectedRow = action.payload;
    },
    setSelectedQueue: (state, action: PayloadAction<IData2 | null>) => {
      state.selectedQueue = action.payload;
    },
  },
});

export const { setSelectedRow, setSelectedQueue } = vpnSlice.actions;

export default vpnSlice.reducer;

// "use client";

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface IData {
//   msgVpnName: string;
//   isSelected?: boolean;
// }

// interface IData2 {
//   queueName: string;
// }

// interface VpnState {
//   selectedRow: IData | null;
//   selectedQueue: IData2 | null;
//   // isSelectedRow: IData | boolean;
// }

// const initialState: VpnState = {
//   selectedRow: null,
//   selectedQueue: null,
//   // isSelectedRow: false,
// };

// const vpnSlice = createSlice({
//   name: "vpn",
//   initialState,
//   reducers: {
//     setSelectedRow: (state, action: PayloadAction<IData | null>) => {
//       if (action.payload === null || action.payload.msgVpnName === null) {
//         // msgVpnName === null이면 selectedRow === null로 설정하고 isSelected === false
//         state.selectedRow = { msgVpnName: "", isSelected: false };
//       } else {
//         // msgVpnName != null이면 isSelected === true
//         state.selectedRow = { ...action.payload, isSelected: true };
//       }
//     },
//     setSelectedQueue: (state, action: PayloadAction<IData2 | null>) => {
//       state.selectedQueue = action.payload;
//     },
//   },
// });

// export const { setSelectedRow, setSelectedQueue } = vpnSlice.actions;
// export default vpnSlice.reducer;
