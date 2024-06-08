"use client";
import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";

enum RiskLevel {
  VeryLowRisk = "Very Low Risk",
  LowRisk = "Low Risk",
  ModerateRisk = "Moderate Risk",
  HighRisk = "High Risk",
  VeryHighRisk = "Very High Risk",
}

const riskLevels = {
  [RiskLevel.VeryLowRisk]: "#10B981",
  [RiskLevel.LowRisk]: "#22C55E",
  [RiskLevel.ModerateRisk]: "#FBBF24",
  [RiskLevel.HighRisk]: "#F97316",
  [RiskLevel.VeryHighRisk]: "#EF4444",
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("All");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof (typeof students)[0];
    direction: "ascending" | "descending";
  }>({ key: "name", direction: "ascending" });

  const tabs = ["All", "Class A", "Class B", "Class C"];

  const students = [
    { name: "John Doe", class: "Class A", prediction: 95 },
    { name: "Jane Smith", class: "Class B", prediction: 40 },
    { name: "Michael Johnson", class: "Class C", prediction: 75 },
    { name: "Emily Davis", class: "Class A", prediction: 20 },
      { name: "Sarah Brown", class: "Class C", prediction: 60 },
    { name: "David Lee", class: "Class B", prediction: 85 },
      { name: "John Michael", class: "Class C", prediction: 20 },
      { name: "Lee Mack", class: "Class C", prediction: 25 },
      {name: "Chris Angel", class: "Class A", prediction: 30},
    {name: "Jane Doe", class: "Class B", prediction: 15},
  ];

  const getRiskInfo = (percentage: number) => {
    if (percentage <= 20) return { level: RiskLevel.VeryLowRisk, color: riskLevels[RiskLevel.VeryLowRisk] };
    if (percentage <= 40) return { level: RiskLevel.LowRisk, color: riskLevels[RiskLevel.LowRisk] };
    if (percentage <= 60) return { level: RiskLevel.ModerateRisk, color: riskLevels[RiskLevel.ModerateRisk] };
    if (percentage <= 80) return { level: RiskLevel.HighRisk, color: riskLevels[RiskLevel.HighRisk] };
    return { level: RiskLevel.VeryHighRisk, color: riskLevels[RiskLevel.VeryHighRisk] };
  };


  const filteredStudents = activeTab === "All" ? students : students.filter((student) => student.class === activeTab);

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: keyof (typeof students)[0]) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "ascending" ? "descending" : "ascending",
    }));
  };

  const getArrow = (key: string) => {
    if (sortConfig.key !== key) {
      return "↕";
    }
    return sortConfig.direction === "ascending" ? "↑" : "↓";
  };

  const riskCounts = filteredStudents.reduce(
    (acc, student) => {
      const riskLevel = getRiskInfo(student.prediction).level;
      acc[riskLevel]++;
      return acc;
    },
    {
      [RiskLevel.VeryLowRisk]: 0,
      [RiskLevel.LowRisk]: 0,
      [RiskLevel.ModerateRisk]: 0,
      [RiskLevel.HighRisk]: 0,
      [RiskLevel.VeryHighRisk]: 0,
    }
  );

  return (
    <main className="relative flex flex-col items-center min-h-screen py-12 px-4">
      <div className="container mx-auto px-0 md:px-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        <div className="flex gap-4">
          <div className="w-full">
            <div>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-t ${activeTab === tab ? "bg-white text-blue-500" : "bg-gray"}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className={`bg-white shadow-lg rounded-lg p-6 ${activeTab === "All" && "rounded-tl-none"}`}>
              <table className="min-w-full table-fixed">
                <thead className="">
                  <tr className="bg-gray-50 text-left text-sm text-gray-500 uppercase tracking-wider cursor-pointer border-b border-gray-200">
                    <th className="w-2/5 px-6 py-3 tracking-wider" onClick={() => requestSort("name")}>
                      Student {getArrow("name")}
                    </th>
                    {activeTab === "All" && (
                      <th className="w-3/10 px-6 py-3" onClick={() => requestSort("class")}>
                        Class {getArrow("class")}
                      </th>
                    )}
                    <th className="w-3/10 px-6 py-3" onClick={() => requestSort("prediction")}>
                      Prediction {getArrow("prediction")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {sortedStudents.map((student, index) => {
                    const { level, color } = getRiskInfo(student.prediction);
                    const atRisk = student.prediction > 60;
                    return (
                      <tr key={index} className={`hover:bg-gray-100 ${atRisk && "bg-red-100"}`}>
                        <td className="flex items-center gap-2 px-6 py-4">
                          {atRisk && <FiAlertCircle color="#EF4444" size={20} />}
                          {student.name}
                        </td>
                        {activeTab === "All" && <td className="px-6 py-4">{student.class}</td>}
                        <td className="px-6 py-4">{`${level} [${student.prediction}%]`}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow w-1/6 h-min mt-10">
            <h3 className="text-lg font-semibold mb-4">Risk Summary</h3>
            <ul>
              {Object.entries(riskCounts).map(([riskLevel, count]) => (
                <li key={riskLevel} className="flex items-center gap-2">
                  <FaCircle color={riskLevels[riskLevel as RiskLevel]} size={12} />
                  {riskLevel}: {count}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
