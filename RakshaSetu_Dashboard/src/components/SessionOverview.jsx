// src/components/SessionOverview.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SessionOverview = () => {
  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        label: "Views",
        data: [30, 50, 40, 60, 55, 70, 65, 75, 80, 60, 50, 70],
        backgroundColor: "#3b82f6", // Blue
      },
      {
        label: "Followers",
        data: [10, 20, 15, 25, 30, 35, 20, 15, 25, 20, 15, 25],
        backgroundColor: "#ef4444", // Red
      },
      {
        label: "Sessions",
        data: [5, 10, 8, 12, 10, 15, 12, 10, 18, 15, 10, 20],
        backgroundColor: "#a855f7", // Purple
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Session Overview",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="card shadow-sm" style={{ height: "400px" }}>
      <div className="card-body">
        <h5 className="card-title">Session Overview</h5>
        <p className="text-muted small">
          Session Metrics Report, Providing Detailed Insights into Your Recent Activities
        </p>
        <div style={{ height: "300px" }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default SessionOverview;
