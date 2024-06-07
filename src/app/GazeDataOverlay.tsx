"use client";
import { useGaze } from "./GazeContext";
import { GazePoint } from "@/types";
import { useEffect, useState, useRef } from "react";

export default function GazeDataOverlay() {
  const { gazeData, showGazeData } = useGaze();
  const [displayedGazeData, setDisplayedGazeData] = useState<GazePoint[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showGazeData && containerRef.current) {
      let index = 0;
      setDisplayedGazeData([]);
      const containerRect = containerRef.current.getBoundingClientRect();

      const interval = setInterval(() => {
        if (index < gazeData.length) {
          const point = gazeData[index];
          if (point && point.x !== undefined && point.y !== undefined) {
            const adjustedPoint = {
              x: point.x - containerRect.left,
              y: point.y - containerRect.top,
            };
            setDisplayedGazeData((prev) => [...prev, adjustedPoint]);
          }
          index++;
        } else {
          clearInterval(interval);
        }
      }, 200);

      return () => clearInterval(interval);
    }
  }, [showGazeData, gazeData]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {showGazeData &&
        displayedGazeData.map((point, index) => (
          <div
            key={index}
            className="absolute w-[10px] h-[10px] rounded-full bg-red-500 opacity-70"
            style={{
              top: `${point.y}px`,
              left: `${point.x}px`,
            }}
          />
        ))}
    </div>
  );
}
