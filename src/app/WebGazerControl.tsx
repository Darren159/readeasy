"use client";
import { useState } from "react";
import { FaRegCircleDot, FaRegCircleStop, FaEye, FaEyeSlash } from "react-icons/fa6";
import { useGaze } from "./GazeContext";

export default function WebGazerControl() {
  const [isRunning, setIsRunning] = useState(false);
  const { gazeData, addGazeData, clearGazeData, showGazeData, setShowGazeData } = useGaze();

  const startWebGazer = async () => {
    if (typeof window !== undefined) {
      clearGazeData();
      const webgazer = (await import("webgazer")).default;
      window.webgazer = webgazer; // Attach webgazer to the window object

      webgazer
        .setRegression("ridge")
          .setGazeListener((data: any, elapsedTime: number) => {
            console.log(data, elapsedTime);
          if (data == null) {
            console.log("No gaze data received");
            return;
          }
          addGazeData({ x: data.x, y: data.y });
        })
        .begin();

      webgazer
        .showVideoPreview(true) // Show the video preview
        .showPredictionPoints(true); // Show the prediction points
      setIsRunning(true); // Set the state to indicate WebGazer is running
    }
  };

  const stopWebGazer = () => {
    if (typeof window !== "undefined" && window.webgazer) {
      window.webgazer.end();
      setIsRunning(false); // Set the state to indicate WebGazer has stopped
    }
    };
    
    const toggleWebGazer = () => {
      if (isRunning) {
        stopWebGazer();
      } else {
        startWebGazer();
      }
    };

  return (
    <div className="flex self-end w-1/5">
      <button onClick={toggleWebGazer} className="flex flex-col items-center gap-2 w-1/2">
        {isRunning ? (
          <>
            <FaRegCircleStop color="#FF5A5F" size={30} />
            Stop Eye Tracking
          </>
        ) : (
          <>
            <FaRegCircleDot color="#FF5A5F" size={30} />
            Start Eye Tracking
          </>
        )}
      </button>
      <button
        onClick={() => setShowGazeData(!showGazeData)}
        disabled={gazeData.length < 1 || isRunning}
        className={`flex flex-col items-center gap-2 w-1/2 ${
          (gazeData.length < 1 || isRunning) && "opacity-20 grayscale"
        }`}
      >
        {showGazeData ? (
          <>
            <FaEyeSlash color="#FF5A5F" size={30} />
            Hide Gaze Data
          </>
        ) : (
          <>
            <FaEye color="#FF5A5F" size={30} />
            Show Gaze Data
          </>
        )}
      </button>
    </div>
  );
}
