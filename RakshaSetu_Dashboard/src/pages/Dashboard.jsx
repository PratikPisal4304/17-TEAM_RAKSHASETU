import React, { useState, useEffect } from "react";
import {
  HiOutlineExclamationCircle,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineUsers,
} from "react-icons/hi2";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust path as needed

const Dashboard = () => {
  // Live data states
  const [activeAlertsCount, setActiveAlertsCount] = useState(0);
  const [registeredUsersCount, setRegisteredUsersCount] = useState(0);

  // Static sample for pending, resolved, and other incidents
  const pendingReports = 8;
  const resolvedCases = 87;

  // Static sample data for Recent Incidents (kept as is)
  const incidents = [
    {
      user: "U1298",
      type: "SOS",
      location: "Koramangala, Bangalore",
      time: "09/03/2025 at 15:32",
      status: "active",
    },
    {
      user: "U2371",
      type: "Harassment",
      location: "HSR Layout, Bangalore",
      time: "09/03/2025 at 14:15",
      status: "active",
    },
    {
      user: "U1587",
      type: "Unsafe Area",
      location: "Indiranagar, Bangalore",
      time: "09/03/2025 at 12:07",
      status: "pending",
    },
    {
      user: "U1655",
      type: "SOS",
      location: "BTM Layout, Bangalore",
      time: "09/03/2025 at 10:45",
      status: "resolved",
    },
    {
      user: "U2190",
      type: "Stalking",
      location: "Whitefield, Bangalore",
      time: "08/03/2025 at 22:18",
      status: "resolved",
    },
  ];

  // Fetch active alerts count from "sosAlerts" where status is "active"
  useEffect(() => {
    const q = query(collection(db, "sosAlerts"), where("status", "==", "active"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setActiveAlertsCount(snapshot.size);
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

  return (
    <div className="container-fluid">
      {/* Page Title & Subtitle */}
      <div className="mb-4">
        <h1 className="h3 mb-1">Women Safety Dashboard</h1>
        <p className="text-muted mb-0">Overview and real-time monitoring</p>
      </div>

      {/* Stats Cards Row */}
      <div className="row g-3 mb-4">
        {/* Active Alerts */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">Active Alerts</h5>
                <div
                  className="rounded-circle bg-danger d-flex align-items-center justify-content-center text-white"
                  style={{ width: "36px", height: "36px" }}
                >
                  <HiOutlineExclamationCircle size={20} />
                </div>
              </div>
              <h2 className="fw-bold">{activeAlertsCount}</h2>
              <a href="#active-alerts" className="text-danger">
                View all active alerts
              </a>
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
              <a href="#pending-reports" className="text-warning">
                View pending reports
              </a>
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
              <a href="#resolved-cases" className="text-success">
                View all resolved cases
              </a>
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
              <a href="#registered-users" className="text-primary">
                View all users
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Incidents Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">Recent Incidents</h5>
            <a href="#all-incidents" className="text-decoration-none">
              View all incidents
            </a>
          </div>
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Type</th>
                  <th scope="col">Location</th>
                  <th scope="col">Time</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident, idx) => (
                  <tr key={idx}>
                    <td>{incident.user}</td>
                    <td>{incident.type}</td>
                    <td>{incident.location}</td>
                    <td>{incident.time}</td>
                    <td>
                      {incident.status === "active" && (
                        <span className="badge bg-danger">{incident.status}</span>
                      )}
                      {incident.status === "pending" && (
                        <span className="badge bg-warning text-dark">{incident.status}</span>
                      )}
                      {incident.status === "resolved" && (
                        <span className="badge bg-success">{incident.status}</span>
                      )}
                    </td>
                    <td className="text-end">
                      <a href="#view-incident" className="text-decoration-none">
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
