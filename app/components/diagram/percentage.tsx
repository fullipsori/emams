"use client";
import React, { useRef, useEffect } from "react";

interface CylinderProps {
  radius: number;
  height: number;
  percentage: number;
}

const CylinderChart: React.FC<CylinderProps> = ({
  radius,
  height,
  percentage,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCylinder = (ctx: CanvasRenderingContext2D) => {
    const x = 100; // 원통의 중심 x 좌표
    const y = 100; // 원통의 중심 y 좌표
    const waterHeight = percentage; // 물이 차 있는 높이

    // 상단 원
    ctx.beginPath();
    ctx.ellipse(x, y, radius, radius / 2, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(135, 206, 235)";
    ctx.fill();
    ctx.stroke();

    // 원통의 측면 (물이 차있지 않은 공간)
    ctx.beginPath();
    // 측면 사각형
    ctx.rect(x - radius, y, 2 * radius, height);
    // ctx.fillStyle = "rgba(70, 130, 180, 0.7)";
    ctx.fillStyle = "rgba(135, 206, 235)";
    ctx.fill();
    // ctx.stroke();

    // 오른쪽과 왼쪽 변에만 테두리 적용
    // 90도 회전하기 전으로 생각해야함
    ctx.beginPath();
    ctx.moveTo(x - radius, y); // 왼쪽 상단 시작점
    ctx.lineTo(x - radius, y + height); // 왼쪽 하단
    ctx.moveTo(x + radius, y); // 오른쪽 상단 시작점
    ctx.lineTo(x + radius, y + height); // 오른쪽 하단
    ctx.stroke();

    // 물이 차 있는 부분의 하단 반원
    ctx.beginPath();
    ctx.ellipse(
      x,
      y + height - waterHeight,
      radius,
      radius / 2,
      0,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "rgba(65, 105, 225)";
    ctx.fill();
    ctx.stroke();
    // ctx.beginPath();
    // ctx.ellipse(x, y + height - waterHeight, radius, radius / 2, 0, 0, Math.PI);
    // ctx.fillStyle = "rgba(65, 105, 225)";
    // ctx.fill();

    // 물이 차 있는 부분의 상단 직사각형
    ctx.beginPath();
    ctx.rect(x - radius, y + height - waterHeight, 2 * radius, waterHeight);
    ctx.fillStyle = "rgba(65, 105, 225)";
    ctx.fill();
    // ctx.stroke();
    // 마찬가지로 오른쪽 왼쪽만 border 적용
    ctx.beginPath();
    ctx.moveTo(x - radius, y); // 왼쪽 상단 시작점
    ctx.lineTo(x - radius, y + height); // 왼쪽 하단
    ctx.moveTo(x + radius, y); // 오른쪽 상단 시작점
    ctx.lineTo(x + radius, y + height); // 오른쪽 하단
    ctx.stroke();

    // // 물이 차 있는 부분에 텍스트 추가
    // // ctx.save();
    // ctx.font = "40px";
    // ctx.fillStyle = "#000";
    // // ctx.rotate(-Math.PI / 2);
    // // ctx.textAlign = "center";
    // // ctx.rotate(Math.PI / 2);

    // // 텍스트 위치
    // const textX = x - radius / 2;
    // const textY = y + height - waterHeight + 20;
    // ctx.fillText(`${percentage}%`, textX, textY);
    // // ctx.restore();

    // 하단 원
    ctx.beginPath();
    ctx.ellipse(x, y + height, radius, radius / 2, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(65, 105, 225)";
    ctx.fill();
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      // 캔버스 클리어
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      // 원통 그리기
      drawCylinder(context);
    }
  }, [radius, height, percentage]);

  return (
    <div>
      <div style={{ rotate: "270deg", justifyContent: "center" }}>
        <canvas ref={canvasRef} width="160" height={150 + height} />
        <div
          style={{
            rotate: "-270deg",
            fontSize: 15,
            fontWeight: 700,
            right: 50,
            position: "absolute",
          }}
        >
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default CylinderChart;
