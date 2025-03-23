import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust path as needed

const IncidentSources = () => {
  // Initialize counts for the two keys we need
  const [sosButtonCount, setSosButtonCount] = useState(0);
  const [reportFormCount, setReportFormCount] = useState(0);

  // Fetch SOS Button count from the "sosAlerts" collection
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "sosAlerts"), (snapshot) => {
      setSosButtonCount(snapshot.size);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Report Form count from the "incident_reports" collection
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "incident_reports"), (snapshot) => {
      let count = 0;
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        // If the source field is defined, count only if it equals "Report Form".
        // If it's undefined, assume it's from Report Form.
        if (!data.source || data.source === "Report Form") {
          count++;
        }
      });
      setReportFormCount(count);
    });
    return () => unsubscribe();
  }, []);

  // Create an array for rendering the sources with styling.
  const sources = [
    { label: "SOS Button", value: sosButtonCount, color: "text-primary" },
    { label: "Report Form", value: reportFormCount, color: "text-danger" },
  ];

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">Incident Sources</h5>
          <button className="btn btn-sm text-secondary">•••</button>
        </div>
        <ul className="list-group list-group-flush">
          {sources.length > 0 ? (
            sources.map((src) => (
              <li
                key={src.label}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span className={`fw-semibold ${src.color}`}>{src.label}</span>
                <span className="fw-medium">{src.value}</span>
              </li>
            ))
          ) : (
            <li className="list-group-item text-center">No sources found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default IncidentSources;
