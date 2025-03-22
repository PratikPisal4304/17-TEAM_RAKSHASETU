// src/components/DeviceOverview.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const DeviceOverview = () => {
  const data = {
    labels: ["Mobile", "Desktop", "Tablet", "Wearable"],
    datasets: [
      {
        data: [1624, 1267, 878, 443],
        backgroundColor: ["#3b82f6", "#ef4444", "#10b981", "#a855f7"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Device Overview",
      },
    },
  };

  return (
    <div className="card shadow-sm" style={{ height: "400px" }}>
      <div className="card-body">
        <h5 className="card-title">Device Overview</h5>
        <p className="text-muted small">
          Device Overview Analyzing Your Safety App Activity
        </p>
        <div style={{ height: "250px" }}>
          <Doughnut data={data} options={options} />
        </div>
        {/* Additional stats row */}
        <div className="row text-center mt-3">
          <div className="col">
            <p className="mb-1 fw-semibold">Mobile</p>
            <small className="text-muted">1,624</small>
          </div>
          <div className="col">
            <p className="mb-1 fw-semibold">Desktop</p>
            <small className="text-muted">1,267</small>
          </div>
          <div className="col">
            <p className="mb-1 fw-semibold">Tablet</p>
            <small className="text-muted">878</small>
          </div>
          <div className="col">
            <p className="mb-1 fw-semibold">Wearable</p>
            <small className="text-muted">443</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceOverview;
