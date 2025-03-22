// src/components/IncidentMap.jsx
import React from "react";

const IncidentMap = () => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">Incident Map</h5>
          <button className="btn btn-sm text-secondary">•••</button>
        </div>
        <div
          className="border border-secondary border-opacity-25 rounded d-flex align-items-center justify-content-center"
          style={{ height: "200px", backgroundColor: "#f8f9fa" }}
        >
          {/* Replace with an actual map or chart */}
          <span className="text-secondary">Map Placeholder</span>
        </div>
        <div className="mt-2 small text-muted d-flex gap-3">
          <span>
            <span className="badge bg-danger">&nbsp;</span> Active Alerts
          </span>
          <span>
            <span className="badge bg-warning">&nbsp;</span> Pending Reports
          </span>
          <span>
            <span className="badge bg-success">&nbsp;</span> Resolved Cases
          </span>
        </div>
      </div>
    </div>
  );
};

export default IncidentMap;
