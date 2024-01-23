import { GridValueType } from "@/types/grid";

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

export const topColumns = [
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
