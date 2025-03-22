import React, { useState, useEffect } from "react";
import {
  HiOutlineSpeakerWave,
  HiOutlineSpeakerXMark,
  HiOutlineMap,
  HiOutlineBars3,
} from "react-icons/hi2";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust path as needed

const EmergencyAlerts = () => {
  // Toggles
  const [soundOn, setSoundOn] = useState(true);
  const [mapView, setMapView] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Raw alerts from Firestore
  const [alerts, setAlerts] = useState([]);
  // Alerts merged with user data
  const [alertsWithUser, setAlertsWithUser] = useState([]);

  // 1) Listen to "sosAlerts" in real time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "sosAlerts"), (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAlerts(fetched);
    });
    return () => unsubscribe();
  }, []);

  // 2) For each alert, fetch user doc (if userId exists) and merge user data
  useEffect(() => {
    async function mergeUserData() {
      const updated = await Promise.all(
        alerts.map(async (alert) => {
          if (!alert.userId) {
            return { ...alert, userName: "Unknown User" };
          }
          try {
            const userRef = doc(db, "users", alert.userId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              const userData = userSnap.data();
              return {
                ...alert,
                userName: userData.name || "Unnamed User",
                userEmail: userData.email || "N/A",
                userPhone: userData.phone || "N/A",
              };
            } else {
              return { ...alert, userName: "User Not Found" };
            }
          } catch (error) {
            console.error("Error fetching user:", error);
            return { ...alert, userName: "Error Fetching User" };
          }
        })
      );
      setAlertsWithUser(updated);
    }

    if (alerts.length > 0) {
      mergeUserData();
    } else {
      setAlertsWithUser([]);
    }
  }, [alerts]);

  // Simple stat: total number of alerts
  const totalAlerts = alertsWithUser.length;

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

  // Helper: Format Firestore Timestamps or strings
  function formatTimestamp(ts) {
    if (ts && ts.toDate) {
      return ts.toDate().toLocaleString();
    }
    return ts;
  }

  return (
    <div className="container-fluid">
      {/* Page Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <h1 className="h3 mb-1">Emergency Alerts</h1>
          <p className="text-muted mb-0">
            Monitor and respond to emergency alerts in real-time
          </p>
        </div>

        {/* Toggles */}
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

      {/* Stats Row */}
      <div className="row g-3 mb-3">
        <div className="col-6 col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6 className="mb-2">Total SOS Alerts</h6>
              <h2 className="fw-bold text-danger">{totalAlerts}</h2>
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
              {/* Replace with an actual map component */}
              <span className="text-secondary">Map Placeholder</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-5">
          <div className="p-3 rounded-2 mb-4 bg-danger bg-opacity-10">
            <h5 className="text-danger mb-2">All SOS Alerts</h5>
            <p className="small text-muted">
              Viewing all alerts from Firestore “sosAlerts” collection
            </p>

            {/* List of alerts */}
            {alertsWithUser.map((alert) => (
              <div
                key={alert.id}
                className="bg-white p-3 rounded-2 shadow-sm mb-3 d-flex flex-column flex-md-row align-items-md-center justify-content-between"
              >
                <div className="mb-3 mb-md-0">
                  <h6 className="fw-semibold mb-1">{alert.userName}</h6>
                  <small className="text-muted">
                    Email: {alert.userEmail} | Phone: {alert.userPhone}
                  </small>
                  <br />
                  {alert.timestamp && (
                    <div className="text-muted mt-1">
                      <strong>Time:</strong> {formatTimestamp(alert.timestamp)}
                    </div>
                  )}
                  {alert.latitude && alert.longitude && (
                    <small className="text-muted">
                      Latitude: {alert.latitude} | Longitude: {alert.longitude}
                    </small>
                  )}
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-warning">Respond</button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleDetails(alert)}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}

            {alertsWithUser.length === 0 && (
              <div className="alert alert-info">No SOS alerts found.</div>
            )}
          </div>
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

// Alert Details Modal
function AlertDetailsModal({ show, alert, onClose }) {
  if (!show) return null;

  // Build a Google Maps link using latitude and longitude
  const mapLink =
    alert.latitude && alert.longitude
      ? `https://www.google.com/maps?q=${alert.latitude},${alert.longitude}`
      : "#";

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
            <h5 className="modal-title">Alert Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* SOS Message */}
            <p>
              <strong>SOS Message:</strong> RakshaSetu SOS Emergency, please help me.
            </p>
            {/* My Location Section */}
            <p>
              <strong>My Location:</strong>{" "}
              {alert.latitude && alert.longitude ? (
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  View on Map
                </a>
              ) : (
                "N/A"
              )}
            </p>
            <p>
              <strong>User Name:</strong> {alert.userName}
              <br />
              <strong>Email:</strong> {alert.userEmail}
              <br />
              <strong>Phone:</strong> {alert.userPhone}
            </p>
            {alert.timestamp && (
              <p>
                <strong>Time:</strong> {formatTimestamp(alert.timestamp)}
              </p>
            )}
            {/* Street View URLs */}
            {alert.streetViewUrls && Array.isArray(alert.streetViewUrls) && (
              <div className="mb-3">
                <strong>Street View Links:</strong>
                <ul className="list-unstyled mt-1">
                  {alert.streetViewUrls.map((url, idx) => (
                    <li key={idx}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none"
                      >
                        Street View {idx + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
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

// Helper: Format Firestore Timestamps or strings
function formatTimestamp(ts) {
  if (ts && ts.toDate) {
    return ts.toDate().toLocaleString();
  }
  return ts;
}

function handleCloseModal() {
  // Placeholder: actual state is handled in the parent component
}

export default EmergencyAlerts;
