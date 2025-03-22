import React, { useState } from "react";
import {
  HiOutlineSpeakerWave,
  HiOutlineSpeakerXMark,
  HiOutlineMap,
  HiOutlineBars3,
} from "react-icons/hi2";

// Sample alert data with extra fields for the modal
const ACTIVE_ALERTS = [
  {
    alertId: "ALERT1001",
    name: "Priya Sharma",
    userId: "USR1001",
    alertType: "SOS Alert",
    time: "19:32",
    relativeTime: "-304 min ago",
    location: "Brigade Road, Bangalore",
    coordinates: "12.9716, 77.5946",
    device: "Mobile",
    battery: "42%",
    severity: "critical", // or "high", "medium", "low"
    status: "active",
    contacts: [
      {
        name: "Vikram Sharma",
        relation: "Brother",
        phone: "+91 99875 67890",
      },
      {
        name: "Meena Sharma",
        relation: "Mother",
        phone: "+91 90123 45678",
      },
    ],
  },
  {
    alertId: "ALERT1002",
    name: "Ananya Singh",
    userId: "USR1002",
    alertType: "Panic Button Alert",
    time: "19:28",
    relativeTime: "-300 min ago",
    location: "MG Road Metro Station, Bangalore",
    coordinates: "12.9767, 77.6096",
    device: "Wearable",
    battery: "65%",
    severity: "critical",
    status: "active",
    contacts: [
      {
        name: "Vikram Singh",
        relation: "Brother",
        phone: "+91 99875 67890",
      },
    ],
  },
];

const RESPONDING_ALERTS = [
  {
    alertId: "ALERT1003",
    name: "Divya Joshi",
    userId: "USR1005",
    alertType: "Fall Detection Alert",
    time: "19:15",
    relativeTime: "-287 min ago",
    location: "HSR Layout, Bangalore",
    coordinates: "12.9116, 77.6321",
    device: "Mobile",
    battery: "78%",
    severity: "high",
    status: "responding",
    contacts: [
      {
        name: "Officer Arun Kumar",
        relation: "Responder",
        phone: "+91 98765 43210",
      },
    ],
  },
];

const RESOLVED_ALERTS = [
  {
    alertId: "ALERT1004",
    name: "Priya Sharma",
    userId: "USR1001",
    alertType: "SOS Alert",
    time: "19:32",
    relativeTime: "-303 min ago",
    location: "Brigade Road, Bangalore",
    coordinates: "12.9716, 77.5946",
    device: "Mobile",
    battery: "42%",
    severity: "",
    status: "resolved",
    contacts: [
      {
        name: "Officer Jane Doe",
        relation: "Resolved by",
        phone: "+91 91234 56789",
      },
    ],
  },
  {
    alertId: "ALERT1005",
    name: "Kavita Patel",
    userId: "USR1003",
    alertType: "SOS Alert",
    time: "13:05",
    relativeTime: "-377 min ago",
    location: "Indiranagar 100ft Road, Bangalore",
    coordinates: "12.9784, 77.6408",
    device: "Wearable",
    battery: "60%",
    severity: "",
    status: "resolved",
    contacts: [
      {
        name: "Officer Rahul Singh",
        relation: "Resolved by",
        phone: "+91 90909 80808",
      },
    ],
  },
];

const EmergencyAlerts = () => {
  // Toggles
  const [soundOn, setSoundOn] = useState(true);
  const [mapView, setMapView] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Stats
  const activeCount = ACTIVE_ALERTS.length;
  const respondingCount = RESPONDING_ALERTS.length;
  const resolvedTodayCount = RESOLVED_ALERTS.length;

  // Open modal with selected alert details
  const handleDetails = (alert) => {
    setSelectedAlert(alert);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAlert(null);
  };

  return (
    <div className="container-fluid">
      {/* Page Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <h1 className="h3 mb-1">
            Emergency Alerts <span className="badge bg-danger ms-1">NEW</span>
          </h1>
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
            onDetails={handleDetails}
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
            onDetails={handleDetails}
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
            onDetails={handleDetails}
          />
        </div>
      )}

      {/* Alert Details Modal */}
      {selectedAlert && (
        <AlertDetailsModal
          show={showModal}
          alert={selectedAlert}
          onClose={handleCloseModal}
        />
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
  onDetails,
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
            <small className="text-muted">
              {alert.device} - Battery {alert.battery}
            </small>
          </div>
          <div className="d-flex gap-2">
            {/* Primary action */}
            <button className={`btn btn-${actionVariant}`}>
              {actionLabel}
            </button>
            {/* Details button */}
            <button
              className="btn btn-outline-secondary"
              onClick={() => onDetails(alert)}
            >
              Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Alert Details Modal
function AlertDetailsModal({ show, alert, onClose }) {
  if (!show) return null;

  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      style={{ display: show ? "block" : "none", background: "rgba(0,0,0,0.5)" }}
      aria-modal={show}
      role="dialog"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Alert Details{" "}
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
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              {/* Left Column */}
              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Alert ID:</strong> {alert.alertId}
                </p>
                <p className="mb-2">
                  <strong>User:</strong> {alert.name} ({alert.userId})
                </p>
                <p className="mb-2">
                  <strong>Type:</strong> {alert.alertType}
                </p>
                <p className="mb-2">
                  <strong>Date &amp; Time:</strong> {alert.time} {alert.relativeTime}
                </p>
              </div>
              {/* Right Column */}
              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Location:</strong> {alert.location}
                  <br />
                  <small className="text-muted">{alert.coordinates}</small>
                </p>
                <p className="mb-2">
                  <strong>Device:</strong> {alert.device}
                  <br />
                  <small className="text-muted">Battery level: {alert.battery}</small>
                </p>
              </div>
            </div>
            <hr />
            <h6>Emergency Contacts</h6>
            {alert.contacts && alert.contacts.length > 0 ? (
              alert.contacts.map((c, i) => (
                <div
                  key={i}
                  className="p-2 border rounded-2 mb-2 d-flex align-items-center justify-content-between"
                >
                  <div>
                    <strong>{c.name}</strong> <small>({c.relation})</small>
                  </div>
                  <div>
                    <a href={`tel:${c.phone}`} className="text-decoration-none">
                      {c.phone}
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No contacts available.</p>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-warning">Respond to Alert</button>
          </div>
        </div>
      </div>
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
