"use client";

import { ConfigStatusData } from "@/data/gridData";
import { CongigurationProps } from "@/types/grid";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface DataProps {
  data: CongigurationProps[];
}

const ConfigBox: React.FC<DataProps> = ({ data }) => {
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 버튼 클릭했을 때 모달 보이도록 설정
  const handleMenuClick = (
    event: React.MouseEvent,
    item: any,
    index: number
  ) => {
    event.stopPropagation();
    setOpenModal((prev) => (prev === index ? null : index));
  };

  // 백그라운드 클릭했을 때 모달 닫히도록 설정
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleOutsideClick = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenModal(null);
        setHoveredIndex(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef as React.RefObject<HTMLDivElement>}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        {data.map((item, index) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderStyle: "solid",
              borderWidth: 2,
              borderColor: "gray",
              width: 100,
              position: "relative",
              backgroundColor: "#f3f3f3",
              cursor: "default",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                padding: 5,
                justifyContent: "space-between",
              }}
            >
              <div>{item.status}</div>:
              <div
                style={{
                  color: item.statusData === "ON" ? "red" : "yellowgreen",
                }}
              >
                {item.statusData}
              </div>
              <Image
                width="10"
                height="10"
                src={"/dotMenu.png"}
                alt={"menu"}
                style={{
                  cursor: "pointer",
                  rotate: "90deg",
                  alignSelf: "center",
                }}
                // onClick={(event) => handleMenuClick(event, item, index)}
              />
            </div>
            <div
              style={{
                borderStyle: "solid",
                borderColor: "gray",
                borderWidth: 0.5,
              }}
            />
            <div style={{ padding: 5, whiteSpace: "pre-wrap" }}>
              {/* {"mes-broker\n192.168.19.808"} */}
              {item.contents}
            </div>
            {openModal === index ||
              (hoveredIndex === index && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    zIndex: 10,
                    backgroundColor: "#fffae8",
                    borderColor: "gray",
                    borderWidth: "1px 3px 3px 1px",
                    borderStyle: "solid",
                    borderRadius: 8,
                    // cursor: "pointer",
                    left: 60,
                    top: 20,
                  }}
                >
                  {ConfigStatusData.map((item) => (
                    <div
                      key={item.id}
                      // onClick={(event) => {
                      //   event.stopPropagation();
                      //   handleActionTitleClick(actionItem);
                      // }}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfigBox;
