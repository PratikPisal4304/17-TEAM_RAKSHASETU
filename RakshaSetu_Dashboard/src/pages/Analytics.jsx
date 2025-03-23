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
  // State for Active Alerts (from sosAlerts)
  const [activeAlerts, setActiveAlerts] = useState(0);
  // State for Total Incidents and Resolved Incidents (from incident_reports)
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [resolvedIncidents, setResolvedIncidents] = useState(0);
  // State for Live Helpers (from helpers collection)
  const [liveHelpers, setLiveHelpers] = useState(0);

  // Fetch Active Alerts from "sosAlerts"
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "sosAlerts"), (snapshot) => {
      setActiveAlerts(snapshot.size);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Total Incidents from "incident_reports"
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "incident_reports"), (snapshot) => {
      setTotalIncidents(snapshot.size);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Resolved Incidents from "incident_reports" (where status is "resolved")
  useEffect(() => {
    const q = query(collection(db, "incident_reports"), where("status", "==", "resolved"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setResolvedIncidents(snapshot.size);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Live Helpers from "helpers" collection (if available)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "helpers"), (snapshot) => {
      setLiveHelpers(snapshot.size);
    });
    return () => unsubscribe();
  }, []);

  // Compute dynamic percentages
  const activeAlertsPercentage =
    totalIncidents > 0 ? (((activeAlerts) / totalIncidents) * 100).toFixed(1) + "%" : "0%";
  const responseRate =
    totalIncidents > 0 ? ((resolvedIncidents / totalIncidents) * 100).toFixed(1) + "%" : "0%";
  // For Live Helpers, without historical baseline we simply show the count; or you can compute a percentage if needed.
  const liveHelpersPercentage = ""; // Not computed dynamically here
  const totalIncidentsPercentage = "100%"; // Always 100% by definition

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
            percentage={activeAlertsPercentage}
            status="in last 7 days"
            iconColor="bg-primary text-white"
            icon="bell"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <CardStats
            title="Response Rate"
            value={responseRate}
            percentage={responseRate}
            status="Currently active now"
            iconColor="bg-success text-white"
            icon="check"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <CardStats
            title="Live Helpers"
            value={liveHelpers}
            percentage={liveHelpersPercentage}
            status="Currently active now"
            iconColor="bg-purple text-white"
            icon="users"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <CardStats
            title="Total Incidents"
            value={totalIncidents}
            percentage={totalIncidentsPercentage}
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
