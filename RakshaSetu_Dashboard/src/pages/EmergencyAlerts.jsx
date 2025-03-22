import React, { useState } from "react";
import {
  HiOutlineSpeakerWave,
  HiOutlineSpeakerXMark,
  HiOutlineMap,
  HiOutlineBars3,
} from "react-icons/hi2";

// Sample alert data
const ACTIVE_ALERTS = [
  {
    name: "Priya Sharma",
    alertType: "SOS Alert",
    time: "19:32",
    relativeTime: "-304 min ago",
    location: "Brigade Road, Bangalore",
    deviceInfo: "mobile - Battery 42%",
    severity: "critical", // or "high", "medium", "low"
    status: "active",
  },
  {
    name: "Ananya Singh",
    alertType: "Panic Button Alert",
    time: "19:28",
    relativeTime: "-300 min ago",
    location: "MG Road Metro Station, Bangalore",
    deviceInfo: "wearable - Battery 65%",
    severity: "critical",
    status: "active",
  },
];

const RESPONDING_ALERTS = [
  {
    name: "Divya Joshi",
    alertType: "Fall Detection Alert",
    time: "19:15",
    relativeTime: "-287 min ago",
    location: "HSR Layout, Bangalore",
    deviceInfo: "Responder: Officer Arun Kumar",
    severity: "high",
    status: "responding",
  },
];

const RESOLVED_ALERTS = [
  {
    name: "Priya Sharma",
    alertType: "SOS Alert",
    time: "19:32",
    relativeTime: "-303 min ago",
    location: "Brigade Road, Bangalore",
    deviceInfo: "Resolved by: Officer Jane Doe",
    severity: "",
    status: "resolved",
  },
  {
    name: "Kavita Patel",
    alertType: "SOS Alert",
    time: "13:05",
    relativeTime: "-377 min ago",
    location: "Indiranagar 100ft Road, Bangalore",
    deviceInfo: "Resolved by: Officer Rahul Singh",
    severity: "",
    status: "resolved",
  },
];

const EmergencyAlerts = () => {
  // States for toggles
  const [soundOn, setSoundOn] = useState(true);
  const [mapView, setMapView] = useState(false);

  // Stats
  const activeCount = ACTIVE_ALERTS.length;
  const respondingCount = RESPONDING_ALERTS.length;
  const resolvedTodayCount = RESOLVED_ALERTS.length;

  return (
    <div className="container-fluid">
      {/* Page Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <h1 className="h3 mb-1">Emergency Alerts <span className="badge bg-danger ms-1">NEW</span></h1>
          <p className="text-muted mb-0">
            Monitor and respond to emergency alerts in real-time
          </p>
        </div>

        <div className="d-flex gap-2 mt-3 mt-sm-0">
          {/* Sound toggle */}
          <button
            className="btn btn-light d-flex align-items-center gap-1"
            onClick={() => setSoundOn(!soundOn)}
          >
            {soundOn ? (
              <>
                <HiOutlineSpeakerWave /> Sound On
              </>
            ) : (
              <>
                <HiOutlineSpeakerXMark /> Sound Off
              </>
            )}
          </button>

          {/* View toggle */}
          <button
            className={`btn ${mapView ? "btn-light" : "btn-primary"} d-flex align-items-center gap-1`}
            onClick={() => setMapView(false)}
          >
            <HiOutlineBars3 /> List View
          </button>
          <button
            className={`btn ${mapView ? "btn-primary" : "btn-light"} d-flex align-items-center gap-1`}
            onClick={() => setMapView(true)}
          >
            <HiOutlineMap /> Map View
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-3">
        <div className="col-6 col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6 className="mb-2">Active Alerts</h6>
              <h2 className="fw-bold text-danger">{activeCount}</h2>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6 className="mb-2">Responding</h6>
              <h2 className="fw-bold text-warning">{respondingCount}</h2>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6 className="mb-2">Resolved Today</h6>
              <h2 className="fw-bold text-success">{resolvedTodayCount}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle between list view and map view */}
      {mapView ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Map View</h5>
            <div
              className="border border-secondary border-opacity-25 rounded d-flex align-items-center justify-content-center"
              style={{ height: "300px", backgroundColor: "#f8f9fa" }}
            >
              {/* Replace with actual map component */}
              <span className="text-secondary">Map Placeholder</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-5">
          {/* Active Alerts */}
          <Section
            title="Active Alerts"
            subtitle="Requires immediate attention"
            bgColor="bg-danger bg-opacity-10"
            textColor="text-danger"
            alerts={ACTIVE_ALERTS}
            actionLabel="Respond"
            actionVariant="warning"
          />

          {/* Responding */}
          <Section
            title="Responding"
            subtitle="Response in progress"
            bgColor="bg-warning bg-opacity-10"
            textColor="text-warning"
            alerts={RESPONDING_ALERTS}
            actionLabel="Resolve"
            actionVariant="success"
          />

          {/* Resolved */}
          <Section
            title="Resolved"
            subtitle="Completed alerts"
            bgColor="bg-success bg-opacity-10"
            textColor="text-success"
            alerts={RESOLVED_ALERTS}
            actionLabel="View"
            actionVariant="secondary"
          />
        </div>
      )}
    </div>
  );
};

// A reusable component for each alert section
function Section({
  title,
  subtitle,
  bgColor,
  textColor,
  alerts,
  actionLabel,
  actionVariant,
}) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className={`p-3 rounded-2 mb-4 ${bgColor}`}>
      <h5 className={`${textColor} mb-2`}>{title}</h5>
      <p className="small text-muted">{subtitle}</p>

      {alerts.map((alert, idx) => (
        <div
          key={idx}
          className="bg-white p-3 rounded-2 shadow-sm mb-3 d-flex flex-column flex-md-row align-items-md-center justify-content-between"
        >
          <div className="mb-3 mb-md-0">
            <h6 className="fw-semibold mb-1">
              {alert.name}{" "}
              {alert.status && (
                <span className={`badge bg-${getStatusColor(alert.status)} ms-1`}>
                  {alert.status}
                </span>
              )}
              {alert.severity && (
                <span className={`badge bg-${getSeverityColor(alert.severity)} ms-1`}>
                  {alert.severity}
                </span>
              )}
            </h6>
            <small className="text-muted">
              {alert.alertType} - {alert.time} {alert.relativeTime}
            </small>
            <br />
            <small className="text-muted">{alert.location}</small>
            <br />
            <small className="text-muted">{alert.deviceInfo}</small>
          </div>
          <div className="d-flex gap-2">
            {/* Primary action */}
            <button className={`btn btn-${actionVariant}`}>
              {actionLabel}
            </button>
            {/* Details button */}
            <button className="btn btn-outline-secondary">Details</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Map a status to a bootstrap color
function getStatusColor(status) {
  switch (status) {
    case "active":
      return "danger";
    case "responding":
      return "warning text-dark";
    case "resolved":
      return "success";
    default:
      return "secondary";
  }
}

// Map a severity to a bootstrap color
function getSeverityColor(severity) {
  switch (severity) {
    case "critical":
      return "danger";
    case "high":
      return "warning text-dark";
    case "medium":
      return "info text-dark";
    case "low":
      return "secondary";
    default:
      return "secondary";
  }
}

export default EmergencyAlerts;
