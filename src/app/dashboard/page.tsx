"use client";
import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("All");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof (typeof students)[0];
    direction: "ascending" | "descending";
  }>({ key: "name", direction: "ascending" });

  const tabs = ["All", "Class A", "Class B", "Class C"];

  const students = [
    { name: "John Doe", class: "Class A", recommendedForFollowUp: true },
    { name: "Jane Smith", class: "Class B", recommendedForFollowUp: false },
    { name: "Michael Johnson", class: "Class C", recommendedForFollowUp: true },
    { name: "Emily Davis", class: "Class A", recommendedForFollowUp: false },
    { name: "David Lee", class: "Class B", recommendedForFollowUp: true },
  ];

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

  const getArrow = (key: keyof (typeof students)[0]) => {
    if (sortConfig.key !== key) {
      return "↕";
    }
    return sortConfig.direction === "ascending" ? "↑" : "↓";
  };

  const followUpCounts = filteredStudents.reduce(
    (acc, student) => {
      if (student.recommendedForFollowUp) {
        acc["Recommended for Follow-Up"]++;
      } else {
        acc["Cleared"]++;
      }
      return acc;
    },
    {
      "Recommended for Follow-Up": 0,
      Cleared: 0,
    }
  );

  return (
    <main className="relative flex flex-col items-center min-h-screen py-12 px-4">
      <div className="container mx-auto px-0 md:px-6">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold mb-6 self-center ">Dashboard</h2>
          <div className="p-4 bg-white rounded-lg shadow h-min">
            <h3 className="text-lg font-semibold mb-4">Summary</h3>
            <ul>
              <li className="flex items-center gap-2">
                <FaCircle color="#EF4444" size={10} />
                Recommended for Follow-Up: {followUpCounts["Recommended for Follow-Up"]}
              </li>
              <li className="flex items-center gap-2">
                <FaCircle color="#10B981" size={10} />
                Cleared: {followUpCounts["Cleared"]}
              </li>
            </ul>
          </div>
        </div>

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
                <th className="w-3/10 px-6 py-3" onClick={() => requestSort("recommendedForFollowUp")}>
                  Status {getArrow("recommendedForFollowUp")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {sortedStudents.map((student, index) => (
                <tr key={index} className={`hover:bg-gray-100 ${student.recommendedForFollowUp ? "bg-red-100" : ""}`}>
                  <td className="flex items-center gap-2 px-6 py-4">
                    {student.recommendedForFollowUp && <FiAlertCircle color="#EF4444" size={20} />}
                    {student.name}
                  </td>
                  {activeTab === "All" && <td className="px-6 py-4">{student.class}</td>}
                  <td className="px-6 py-4">
                    {student.recommendedForFollowUp ? "Recommended for Follow-Up" : "Cleared"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
