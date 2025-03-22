// src/components/Header.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { HiOutlineBars3, HiOutlineBell, HiOutlineLockClosed } from "react-icons/hi2";

const Header = () => {
  const location = useLocation();

  // Define a mapping of routes to header titles
  const routeTitles = {
    "/dashboard": "Dashboard",
    "/analytics": "Analytics",
    "/incidents": "Incidents",
    "/users": "Users",
    "/safe-zones": "Safe Zones",
    "/settings": "Settings",
  };

  // Get the title based on the current pathname, default to 'Dashboard' if not found
  const title = routeTitles[location.pathname] || "Dashboard";

  return (
    <header className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom bg-white shadow-sm">
      {/* Left: Sidebar Toggle + Dynamic Page Title */}
      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-link text-secondary p-0">
          <HiOutlineBars3 size={24} />
        </button>
        <h2 className="h5 mb-0">{title}</h2>
      </div>

      {/* Right: Icons + Date Dropdown */}
      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-link text-secondary p-0">
          <HiOutlineLockClosed size={24} />
        </button>
        <button className="btn btn-link text-secondary p-0">
          <HiOutlineBell size={24} />
        </button>

        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dateDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            14 Mar 2025
          </button>
          <ul className="dropdown-menu" aria-labelledby="dateDropdown">
            <li>
              <button className="dropdown-item">13 Mar 2025</button>
            </li>
            <li>
              <button className="dropdown-item">12 Mar 2025</button>
            </li>
            <li>
              <button className="dropdown-item">11 Mar 2025</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
