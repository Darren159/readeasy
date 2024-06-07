"use client";
import { FCC, GazePoint } from "@/types";
import { createContext, useContext, useState } from "react";

type GazeContextProps = {
  gazeData: GazePoint[];
  showGazeData: boolean;
  setShowGazeData: (show: boolean) => void;
  addGazeData: (data: GazePoint) => void;
  clearGazeData: () => void;
};

const GazeContext = createContext<GazeContextProps | undefined>(undefined);

const GazeProvider: FCC = ({ children }) => {
  const [gazeData, setGazeData] = useState<GazePoint[]>([]);
  const [showGazeData, setShowGazeData] = useState(false);
  const addGazeData = (data: GazePoint) => {
    setGazeData((prevData) => [...prevData, data]);
  };
  const clearGazeData = () => {
    setGazeData([]);
  };

  return (
    <GazeContext.Provider value={{ gazeData, showGazeData, setShowGazeData, addGazeData, clearGazeData }}>
      {children}
    </GazeContext.Provider>
  );
};

const useGaze = () => {
  const context = useContext(GazeContext);
  if (!context) {
    throw new Error("useGaze must be used within a GazeProvider");
  }
  return context;
};
export { useGaze, GazeProvider };
