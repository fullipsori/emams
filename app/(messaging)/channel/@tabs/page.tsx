import CylinderChart from "@/app/components/cylinderChart/cylinderChart";

export default function QueueSummaryPage() {

  // const boxSizeVal = {
  //   width: 200, // Canvas를 감싸고 있는 영역 넓이
  //   height: 150, // Canvas를 감싸고 있는 영역 높이
  //   boxW: 110, // Canvas 높이
  //   boxH: 170, // Canvas 넓이
  // };

  // const boxSizeVal = {
  //   width: 300, // Canvas를 감싸고 있는 영역 넓이
  //   height: 200, // Canvas를 감싸고 있는 영역 높이
  //   boxW: 150, // Canvas 높이
  //   boxH: 300, // Canvas 넓이
  //   radius: 60 // radius 값
  // };

  const accessType = 'Exclusive';
  const msgQueuePer = '37.4';
  const msgQueueMsgs = '12,682';
  const msgQueueMb = '37.4';
  const msgQueueQuota = '100.0';

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <CylinderChart
          radius={80}
          percentage={90}
          heightVal={300} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            marginLeft: 30,
            marginRight: 200,
            width: 400,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 700 }}>Access Type : {accessType}</div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Messages Queued (%) : {msgQueuePer}</div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Messages Queued (msgs) : {msgQueueMsgs}</div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Messages Queued (MB) : {msgQueueMb}</div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Messages Quota (MB) : {msgQueueQuota}</div>
        </div>
      </div>
    </>
  );
}