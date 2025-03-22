// src/pages/Analytics.jsx
import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import CardStats from "../components/CardStats";
import IncidentSources from "../components/IncidentSources";
import IncidentMap from "../components/IncidentMap";
import SessionOverview from "../components/SessionOverview";
import DeviceOverview from "../components/DeviceOverview";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Analytics = () => {
  // State for dynamic metrics
  const [activeAlerts, setActiveAlerts] = useState(0);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [resolvedIncidents, setResolvedIncidents] = useState(0);
  const [liveHelpers, setLiveHelpers] = useState(0);

  // Active Alerts from "sosAlerts" collection
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "sosAlerts"), (snapshot) => {
      setActiveAlerts(snapshot.size);
    });
    return () => unsubscribe();
  }, []);

  // Total Incidents from "incident_reports" collection
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "incident_reports"), (snapshot) => {
      setTotalIncidents(snapshot.size);
    });
    return () => unsubscribe();
  }, []);

  // Resolved Incidents from "incident_reports" collection where status is "resolved"
  useEffect(() => {
    const q = query(collection(db, "incident_reports"), where("status", "==", "resolved"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setResolvedIncidents(snapshot.size);
    });
    return () => unsubscribe();
  }, []);

  // Live Helpers from "helpers" collection (adjust if needed)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "helpers"), (snapshot) => {
      setLiveHelpers(snapshot.size);
    });
    return () => unsubscribe();
  }, []);

  // Compute Response Rate: (resolved / total) * 100
  const responseRate =
    totalIncidents > 0 ? ((resolvedIncidents / totalIncidents) * 100).toFixed(1) + "%" : "0%";

  return (
    <div className="container-fluid">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "#" },
          { label: "Analytics", href: "#", active: true },
        ]}
      />

      {/* Cards Row */}
      <div className="row g-3 mb-4">
        <div className="col-md-6 col-lg-3">
          <CardStats
            title="Active Alerts"
            value={activeAlerts}
            percentage="+12%"
            status="in last 7 days"
            iconColor="bg-primary text-white"
            icon="bell"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <CardStats
            title="Response Rate"
            value={responseRate}
            percentage="+0.59%"
            status="Currently active now"
            iconColor="bg-success text-white"
            icon="check"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <CardStats
            title="Live Helpers"
            value={liveHelpers}
            percentage="-11.29%"
            status="Currently active now"
            iconColor="bg-purple text-white"
            icon="users"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <CardStats
            title="Total Incidents"
            value={totalIncidents}
            percentage="+1.29%"
            status="Currently active now"
            iconColor="bg-danger text-white"
            icon="exclamation"
          />
        </div>
      </div>

      {/* Session & Device Overviews */}
      <div className="row g-3 mb-4">
        <div className="col-lg-6">
          <SessionOverview />
        </div>
        <div className="col-lg-6">
          <DeviceOverview />
        </div>
      </div>

      {/* Incident Sources & Map */}
      <div className="row g-3">
        <div className="col-lg-6">
          <IncidentSources />
        </div>
        <div className="col-lg-6">
          <IncidentMap />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
