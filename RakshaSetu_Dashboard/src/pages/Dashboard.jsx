// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import {
  HiOutlineExclamationCircle,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineUsers,
} from "react-icons/hi2";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust path as needed
import { Link } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const Dashboard = () => {
  // Live data states
  const [incidents, setIncidents] = useState([]);
  const [registeredUsersCount, setRegisteredUsersCount] = useState(0);
  const [pendingReports, setPendingReports] = useState(0);
  const [resolvedCases, setResolvedCases] = useState(0);

  // State for modal
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch all incidents from "incident_reports" collection
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "incident_reports"), (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      // Sort by timestamp descending (if available)
      fetched.sort((a, b) => {
        if (a.timestamp && b.timestamp) {
          return b.timestamp.seconds - a.timestamp.seconds;
        }
        return 0;
      });
      setIncidents(fetched);
    });
    return () => unsubscribe();
  }, []);

  // Compute active incidents from incident_reports:
  // If status is not "pending" or "resolved", treat it as "active"
  const computedActiveCount = incidents.filter((incident) => {
    const s = incident.status;
    return !s || (s !== "pending" && s !== "resolved");
  }).length;

  // Fetch pending reports from "incident_reports" where status is "pending"
  useEffect(() => {
    const q = query(collection(db, "incident_reports"), where("status", "==", "pending"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPendingReports(snapshot.size);
    });
    return () => unsubscribe();
  }, []);

  // Fetch resolved cases from "incident_reports" where status is "resolved"
  useEffect(() => {
    const q = query(collection(db, "incident_reports"), where("status", "==", "resolved"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setResolvedCases(snapshot.size);
    });
    return () => unsubscribe();
  }, []);

  // Fetch registered users count from "users" collection
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      setRegisteredUsersCount(snapshot.size);
    });
    return () => unsubscribe();
  }, []);

  // Total incidents count from incident_reports
  const totalCount = incidents.length;

  // Handler to show the modal with the selected incident details
  const handleView = (incident) => {
    setSelectedIncident(incident);
    setShowModal(true);
  };

  return (
    <div className="container-fluid">
      {/* Page Title & Subtitle */}
      <div className="mb-4">
        <h1 className="h3 mb-1">Women Safety Dashboard</h1>
        <p className="text-muted mb-0">Overview and real-time monitoring</p>
      </div>

      {/* Stats Cards Row */}
      <div className="row g-3 mb-4">
        {/* Active Incidents */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">Active Incidents</h5>
                <div
                  className="rounded-circle bg-danger d-flex align-items-center justify-content-center text-white"
                  style={{ width: "36px", height: "36px" }}
                >
                  <HiOutlineExclamationCircle size={20} />
                </div>
              </div>
              <h2 className="fw-bold">{computedActiveCount}</h2>
              <Link to="/fir?status=active" className="text-danger">
                View all active incidents
              </Link>
            </div>
          </div>
        </div>

        {/* Pending Reports */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">Pending Reports</h5>
                <div
                  className="rounded-circle bg-warning d-flex align-items-center justify-content-center text-white"
                  style={{ width: "36px", height: "36px" }}
                >
                  <HiOutlineClock size={20} />
                </div>
              </div>
              <h2 className="fw-bold">{pendingReports}</h2>
              <Link to="/fir?status=pending" className="text-warning">
                View pending reports
              </Link>
            </div>
          </div>
        </div>

        {/* Resolved Cases */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">Resolved Cases</h5>
                <div
                  className="rounded-circle bg-success d-flex align-items-center justify-content-center text-white"
                  style={{ width: "36px", height: "36px" }}
                >
                  <HiOutlineCheckCircle size={20} />
                </div>
              </div>
              <h2 className="fw-bold">{resolvedCases}</h2>
              <Link to="/fir?status=resolved" className="text-success">
                View all resolved cases
              </Link>
            </div>
          </div>
        </div>

        {/* Registered Users */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">Registered Users</h5>
                <div
                  className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white"
                  style={{ width: "36px", height: "36px" }}
                >
                  <HiOutlineUsers size={20} />
                </div>
              </div>
              <h2 className="fw-bold">{registeredUsersCount}</h2>
              <Link to="/users" className="text-primary">
                View all users
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Incidents Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">Recent Incidents</h5>
            <Link to="/fir" className="text-decoration-none">
              View all incidents
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">Reported By</th>
                  <th scope="col">Type</th>
                  <th scope="col">Location</th>
                  <th scope="col">Time</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident) => {
                  const { docId, id, reportedBy, incidentType, location, time, status } = incident;
                  const displayId = id || docId;
                  // Compute status: if status is not pending or resolved then active.
                  const computedStatus = status === "pending" || status === "resolved" ? status : "active";

                  return (
                    <tr key={docId}>
                      <td>{reportedBy || "N/A"}</td>
                      <td>{incidentType || "N/A"}</td>
                      <td>{location || "N/A"}</td>
                      <td>{time || "N/A"}</td>
                      <td>
                        <span className={`badge ${getStatusBadge(computedStatus)}`}>
                          {computedStatus}
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleView(incident)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Incident Details Modal */}
      {showModal && selectedIncident && (
        <IncidentDetailsModal
          incident={selectedIncident}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

function formatTimestamp(value) {
  if (!value) return "";
  if (value.toDate) {
    return value.toDate().toLocaleString();
  }
  if (value.seconds !== undefined) {
    const millis = value.seconds * 1000 + (value.nanoseconds || 0) / 1000000;
    return new Date(millis).toLocaleString();
  }
  if (typeof value === "string") {
    return value;
  }
  return "";
}

function getStatusBadge(status) {
  if (status === "pending") return "bg-warning text-dark";
  if (status === "resolved") return "bg-success";
  return "bg-danger"; // active
}

// IncidentDetailsModal Component
const IncidentDetailsModal = ({ incident, onClose }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const storage = getStorage();

  // Fetch images from Firebase Storage using attachedImages (assumed to be storage paths)
  useEffect(() => {
    async function fetchImageUrls() {
      if (incident.attachedImages && Array.isArray(incident.attachedImages)) {
        const promises = incident.attachedImages.map(async (path) => {
          try {
            const imageRef = ref(storage, path);
            const url = await getDownloadURL(imageRef);
            return url;
          } catch (error) {
            console.error("Error fetching image:", error);
            return null;
          }
        });
        const urls = await Promise.all(promises);
        setImageUrls(urls.filter((url) => url !== null));
      }
    }
    fetchImageUrls();
  }, [incident.attachedImages, storage]);

  const displayTime = formatTimestamp(incident.timestamp) || "N/A";
  const displayRelativeTime = formatTimestamp(incident.relativeTime) || "";

  // Handler to update the incident's status in Firestore
  const handleStatusUpdate = async (newStatus) => {
    try {
      const incidentRef = doc(db, "incident_reports", incident.docId);
      await updateDoc(incidentRef, { status: newStatus });
      onClose();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Incident Details</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p><strong>Incident ID:</strong> {incident.id || incident.docId}</p>
            <p><strong>Type:</strong> {incident.incidentType || "N/A"}</p>
            <p><strong>Description:</strong> {incident.description || "N/A"}</p>
            <p><strong>Reported By:</strong> {incident.reportedBy || "N/A"}</p>
            <p><strong>Location:</strong> {incident.location || "N/A"}</p>
            {incident.coordinates && (
              <p><strong>Coordinates:</strong> {incident.coordinates}</p>
            )}
            <p><strong>Time:</strong> {displayTime}</p>
            {displayRelativeTime && (
              <p><strong>Relative Time:</strong> {displayRelativeTime}</p>
            )}
            <p><strong>Status:</strong> {incident.status || "active"}</p>
            {/* Attached Images */}
            <div>
              <strong>Attached Images:</strong>
              {imageUrls.length > 0 ? (
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {imageUrls.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Attachment ${idx + 1}`}
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted">No images available.</p>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-warning" onClick={() => handleStatusUpdate("pending")}>
              Pending
            </button>
            <button className="btn btn-success" onClick={() => handleStatusUpdate("resolved")}>
              Resolved
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
