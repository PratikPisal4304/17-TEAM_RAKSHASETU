import React, { useState, useMemo } from "react";
import { HiOutlineMagnifyingGlass, HiOutlinePlus, HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

// Sample data
const INITIAL_INCIDENTS = [
  {
    id: "INC1001",
    type: "SOS",
    reporterName: "Priya Sharma",
    reporterInitials: "PS",
    userId: "USR1001",
    location: "Brigade Road, Bangalore",
    coordinates: "12.9716, 77.5946",
    time: "19:32",
    relativeTime: "-301 min ago",
    status: "active",
    priority: "high",
  },
  {
    id: "INC1002",
    type: "Harassment",
    reporterName: "Ananya Singh",
    reporterInitials: "AS",
    userId: "USR1002",
    location: "MG Road Metro Station, Bangalore",
    coordinates: "12.9767, 77.6096",
    time: "18:15",
    relativeTime: "-224 min ago",
    status: "active",
    priority: "high",
  },
  {
    id: "INC1003",
    type: "Stalking",
    reporterName: "Kavita Patel",
    reporterInitials: "KP",
    userId: "USR1003",
    location: "Indiranagar 100ft Road, Bangalore",
    coordinates: "12.9784, 77.6408",
    time: "16:45",
    relativeTime: "-134 min ago",
    status: "pending",
    priority: "medium",
  },
  {
    id: "INC1004",
    type: "Unsafe Area",
    reporterName: "Meera Reddy",
    reporterInitials: "MR",
    userId: "USR1004",
    location: "BTM Layout, Bangalore",
    coordinates: "12.9712, 77.6101",
    time: "14:22",
    relativeTime: "-9 min ago",
    status: "pending",
    priority: "low",
  },
  {
    id: "INC1005",
    type: "SOS",
    reporterName: "Divya Joshi",
    reporterInitials: "DJ",
    userId: "USR1005",
    location: "HSR Layout, Bangalore",
    coordinates: "12.9116, 77.6321",
    time: "23:15",
    relativeTime: "-15 hours ago",
    status: "resolved",
    priority: "high",
  },
  {
    id: "INC1006",
    type: "Harassment",
    reporterName: "Priya Sharma",
    reporterInitials: "PS",
    userId: "USR1001",
    location: "Koramangala 5th Block, Bangalore",
    coordinates: "12.9344, 77.6248",
    time: "20:10",
    relativeTime: "-18 hours ago",
    status: "resolved",
    priority: "medium",
  },
];

const Incidents = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Filtered data
  const filteredIncidents = useMemo(() => {
    return INITIAL_INCIDENTS.filter((incident) => {
      // Search filter
      const matchesSearch =
        incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.reporterName.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === "all" || incident.status === statusFilter;

      // Type filter
      const matchesType = typeFilter === "all" || incident.type === typeFilter;

      // Priority filter
      const matchesPriority = priorityFilter === "all" || incident.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesType && matchesPriority;
    });
  }, [searchTerm, statusFilter, typeFilter, priorityFilter]);

  // Stats
  const activeCount = filteredIncidents.filter((i) => i.status === "active").length;
  const pendingCount = filteredIncidents.filter((i) => i.status === "pending").length;
  const resolvedCount = filteredIncidents.filter((i) => i.status === "resolved").length;
  const totalCount = filteredIncidents.length;

  return (
    <div className="container-fluid">
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="h3 mb-1">Incident Management</h1>
        <p className="text-muted mb-0">Track and manage reported safety incidents</p>
      </div>

      {/* Filter Row */}
      <div className="row g-2 align-items-center mb-4">
        <div className="col-sm-6 col-md-3">
          <div className="input-group">
          <span className="input-group-text" id="search-icon"><HiOutlineMagnifyingGlass /></span>
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
        <div className="col-sm-6 col-md-2">
          <select
            className="form-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
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
                  <th scope="col">Reported By</th>
                  <th scope="col">Location</th>
                  <th scope="col">Time</th>
                  <th scope="col">Status</th>
                  <th scope="col">Priority</th>
                </tr>
              </thead>
              <tbody>
                {filteredIncidents.map((incident) => (
                  <tr key={incident.id}>
                    <td>{incident.id}</td>
                    <td>
                      <span
                        className="me-2 d-inline-block rounded-circle"
                        style={{
                          width: "1rem",
                          height: "1rem",
                          backgroundColor: getTypeColor(incident.type),
                        }}
                      />
                      {incident.type}
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="rounded-circle bg-secondary bg-opacity-25 d-flex align-items-center justify-content-center fw-bold"
                          style={{ width: "32px", height: "32px" }}
                        >
                          {incident.reporterInitials}
                        </div>
                        <div>
                          <div className="fw-semibold mb-0">{incident.reporterName}</div>
                          <small className="text-muted">{incident.userId}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      {incident.location}
                      <br />
                      <small className="text-muted">{incident.coordinates}</small>
                    </td>
                    <td>
                      {incident.time}
                      <br />
                      <small className="text-muted">{incident.relativeTime}</small>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(incident.status)}`}>
                        {incident.status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getPriorityBadge(incident.priority)}`}>
                        {incident.priority}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredIncidents.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No incidents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility functions
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
  switch (status) {
    case "active":
      return "bg-danger";
    case "pending":
      return "bg-warning text-dark";
    case "resolved":
      return "bg-success";
    default:
      return "bg-secondary";
  }
}

function getPriorityBadge(priority) {
  switch (priority) {
    case "high":
      return "bg-danger";
    case "medium":
      return "bg-warning text-dark";
    case "low":
      return "bg-info text-dark";
    default:
      return "bg-secondary";
  }
}

export default Incidents;
