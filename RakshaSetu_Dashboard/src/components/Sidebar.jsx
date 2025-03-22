// src/components/Sidebar.jsx
import React from "react";
import {
  HiOutlineBellAlert,
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineMapPin,
  HiOutlineCog,
  HiOutlineArrowRightOnRectangle, // Updated logout icon
  HiOutlineExclamationCircle
} from "react-icons/hi2";

const Sidebar = () => {
  return (
    <aside className="d-flex flex-column bg-white border-end" style={{ width: "250px" }}>
      {/* Brand / Logo */}
      <div className="border-bottom p-3">
        <h1 className="h5 m-0 d-flex align-items-center gap-2">
          <span className="text-danger">
            <HiOutlineExclamationCircle size={24} />
          </span>
          SafeGuard
        </h1>
      </div>

      {/* User Info + Emergency Alert */}
      <div className="border-bottom p-3">
        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="bg-secondary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center text-dark fw-bold" style={{ width: "40px", height: "40px" }}>
            A
          </div>
          <div>
            <p className="m-0 fw-semibold">Admin</p>
            <small className="text-muted">admin@safeguard.com</small>
          </div>
        </div>
        <button className="btn btn-danger w-100 fw-semibold">
          Emergency Alert
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow-1 p-3">
        <ul className="list-unstyled">
          <li>
            <a href="#dashboard" className="d-flex align-items-center gap-2 text-dark p-2 rounded mb-1 text-decoration-none">
              <HiOutlineHome size={20} />
              Dashboard
            </a>
          </li>
          <li>
            <a href="#emergency-alerts" className="d-flex align-items-center gap-2 text-dark p-2 rounded mb-1 text-decoration-none">
              <HiOutlineBellAlert size={20} />
              Emergency Alerts
            </a>
          </li>
          <li>
            <a href="#incidents" className="d-flex align-items-center gap-2 text-dark p-2 rounded mb-1 text-decoration-none">
              <HiOutlineExclamationCircle size={20} />
              Incidents
            </a>
          </li>
          <li>
            <a href="#users" className="d-flex align-items-center gap-2 text-dark p-2 rounded mb-1 text-decoration-none">
              <HiOutlineUsers size={20} />
              Users
            </a>
          </li>
          <li>
            <a href="#safe-zones" className="d-flex align-items-center gap-2 text-dark p-2 rounded mb-1 text-decoration-none">
              <HiOutlineMapPin size={20} />
              Safe Zones
            </a>
          </li>
          <li>
            <a href="#settings" className="d-flex align-items-center gap-2 text-dark p-2 rounded mb-1 text-decoration-none">
              <HiOutlineCog size={20} />
              Settings
            </a>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="border-top p-3">
        <button className="btn btn-outline-secondary w-100 d-flex align-items-center gap-2 justify-content-center">
          <HiOutlineArrowRightOnRectangle size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
