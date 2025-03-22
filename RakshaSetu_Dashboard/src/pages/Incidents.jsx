import React, { useState, useEffect, useMemo } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineAdjustmentsHorizontal,
} from "react-icons/hi2";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore"; // Added doc, updateDoc
import { db } from "../firebaseConfig"; // <-- Adjust path as needed

const Incidents = () => {
  // Firestore data
  const [incidents, setIncidents] = useState([]);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // 1) Fetch incidents from "incident_reports" in real time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "incident_reports"), (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      setIncidents(fetched);
    });

    return () => unsubscribe();
  }, []);

  // 2) Apply local filters using useMemo
  const filteredIncidents = useMemo(() => {
    return incidents.filter((inc) => {
      // Map Firestore fields to our local variables:
      const incidentId = inc.id || inc.docId || "";
      const location = inc.location || "";
      const type = inc.incidentType || "";
      const reporterName = inc.reportedBy || "";
      // Compute status: if it's "pending" or "resolved", use it; otherwise treat it as "active"
      const computedStatus = (inc.status === "pending" || inc.status === "resolved") ? inc.status : "active";

      // Search filter (matches ID, location, or reportedBy)
      const matchesSearch =
        incidentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reporterName.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter uses computedStatus
      const matchesStatus = statusFilter === "all" || computedStatus === statusFilter;

      // Type filter
      const matchesType = typeFilter === "all" || type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [incidents, searchTerm, statusFilter, typeFilter]);

  // 3) Stats: Count active/pending/resolved from filtered data using computed status
  const activeCount = filteredIncidents.filter((i) => {
    const cs = (i.status === "pending" || i.status === "resolved") ? i.status : "active";
    return cs === "active";
  }).length;
  const pendingCount = filteredIncidents.filter((i) => i.status === "pending").length;
  const resolvedCount = filteredIncidents.filter((i) => i.status === "resolved").length;
  const totalCount = filteredIncidents.length;

  // State for the selected incident and modal visibility
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Handler to show the modal with the selected incident
  const handleView = (incident) => {
    setSelectedIncident(incident);
    setShowModal(true);
  };

  // Convert Firestore Timestamp objects (or {seconds, nanoseconds} objects) to string
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

  return (
    <div className="container-fluid">
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="h3 mb-1">FIR Management</h1>
        <p className="text-muted mb-0">Track and manage reported incidents</p>
      </div>

      {/* Filter Row */}
      <div className="row g-2 align-items-center mb-4">
        <div className="col-sm-6 col-md-3">
          <div className="input-group">
            <span className="input-group-text" id="search-icon">
              <HiOutlineMagnifyingGlass />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search incidents..."
              aria-label="Search"
              aria-describedby="search-icon"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-sm-6 col-md-2">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <div className="col-sm-6 col-md-2">
          <select
            className="form-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="SOS">SOS</option>
            <option value="Harassment">Harassment</option>
            <option value="Stalking">Stalking</option>
            <option value="Unsafe Area">Unsafe Area</option>
          </select>
        </div>
        <div className="col-auto">
          <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
            <HiOutlineAdjustmentsHorizontal />
            Filters
          </button>
        </div>
        <div className="col-auto">
          <button className="btn btn-danger d-flex align-items-center gap-1">
            <HiOutlinePlus />
            Add Incident
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-sm-6 col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6 className="mb-2">Active Incidents</h6>
              <h2 className="fw-bold text-danger">{activeCount}</h2>
            </div>
          </div>
        </div>
        <div className="col-6 col-sm-6 col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6 className="mb-2">Pending Incidents</h6>
              <h2 className="fw-bold text-warning">{pendingCount}</h2>
            </div>
          </div>
        </div>
        <div className="col-6 col-sm-6 col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6 className="mb-2">Resolved Incidents</h6>
              <h2 className="fw-bold text-success">{resolvedCount}</h2>
            </div>
          </div>
        </div>
        <div className="col-6 col-sm-6 col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6 className="mb-2">Total Incidents</h6>
              <h2 className="fw-bold text-primary">{totalCount}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">Reported Incidents</h5>
            <a href="#all-incidents" className="text-decoration-none">
              View all
            </a>
          </div>
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">Incident ID</th>
                  <th scope="col">Type</th>
                  <th scope="col">Description</th>
                  <th scope="col">Reported By</th>
                  <th scope="col">Location</th>
                  <th scope="col">Time</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredIncidents.map((incident) => {
                  const {
                    docId,
                    id,
                    incidentType,
                    description,
                    reportedBy,
                    location,
                    coordinates,
                    timestamp,
                    relativeTime,
                    status,
                  } = incident;

                  const displayTime = formatTimestamp(timestamp) || "N/A";
                  const displayRelativeTime = formatTimestamp(relativeTime) || "";
                  const displayId = id || docId;
                  const computedStatus =
                    status === "pending" || status === "resolved" ? status : "active";

                  return (
                    <tr key={displayId}>
                      <td>{displayId}</td>
                      <td>{incidentType || "N/A"}</td>
                      <td>{description || "N/A"}</td>
                      <td>{reportedBy || "N/A"}</td>
                      <td>
                        {location || "N/A"}
                        <br />
                        <small className="text-muted">{coordinates || ""}</small>
                      </td>
                      <td>
                        {displayTime}
                        <br />
                        <small className="text-muted">{displayRelativeTime}</small>
                      </td>
                      <td>
                        <span className={`badge ${getStatusBadge(computedStatus)}`}>
                          {computedStatus}
                        </span>
                      </td>
                      <td>
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

                {filteredIncidents.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No incidents found.
                    </td>
                  </tr>
                )}
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

// Modal Component to show all details of the selected incident
function IncidentDetailsModal({ incident, onClose }) {
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
            <button
              className="btn btn-warning"
              onClick={() => handleStatusUpdate("pending")}
            >
              Pending
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleStatusUpdate("resolved")}
            >
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
}

// Convert Firestore Timestamp objects (or {seconds, nanoseconds} objects) to string
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

function getTypeColor(type) {
  switch (type) {
    case "SOS":
      return "#ef4444"; // Red
    case "Harassment":
      return "#f97316"; // Orange
    case "Stalking":
      return "#a855f7"; // Purple
    case "Unsafe Area":
      return "#3b82f6"; // Blue
    default:
      return "#6b7280"; // Gray
  }
}

function getStatusBadge(status) {
  if (status === "pending") return "bg-warning text-dark";
  if (status === "resolved") return "bg-success";
  return "bg-danger"; // default to active
}

export default Incidents;
