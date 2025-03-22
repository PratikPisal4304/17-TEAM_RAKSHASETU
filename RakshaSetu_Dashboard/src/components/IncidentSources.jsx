// src/components/IncidentSources.jsx
import React from "react";

const IncidentSources = () => {
  const sources = [
    { label: "SOS Button", value: 546, color: "text-primary" },
    { label: "Report Form", value: 412, color: "text-danger" },
    { label: "Voice Command", value: 287, color: "text-purple" },
    { label: "Guardian Alert", value: 185, color: "text-warning" },
  ];

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">Incident Sources</h5>
          <button className="btn btn-sm text-secondary">•••</button>
        </div>
        <ul className="list-group list-group-flush">
          {sources.map((src) => (
            <li
              key={src.label}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span className={`fw-semibold ${src.color}`}>{src.label}</span>
              <span className="fw-medium">{src.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IncidentSources;
