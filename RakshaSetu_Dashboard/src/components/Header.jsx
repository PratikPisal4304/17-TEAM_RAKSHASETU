// src/components/Header.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  HiOutlineBars3,
  HiOutlineBell,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import Sidebar from "./Sidebar";

const Header = () => {
  const location = useLocation();
  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const toggleDrawer = () => {
    setIsDrawerActive((prev) => !prev);
  };

  const closeDrawer = () => {
    setIsDrawerActive(false);
  };

  const toggleCalendar = () => {
    setCalendarOpen((prev) => !prev);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCalendarOpen(false);
  };

  // Define a mapping of routes to header titles
  const routeTitles = {
    "/dashboard": "Dashboard",
    "/analytics": "Analytics",
    "/emergency-alerts": "Emergency Alerts",
    "/FIR": "FIR",
    "/users": "Users",
    "/jobs": "JobListings",
    "/Counselors": "CounselorsManagement",
    "/Settings": "Settings",
  };

  // Get the title based on the current pathname, default to 'Dashboard' if not found
  const title = routeTitles[location.pathname] || "Dashboard";

  return (
    <>
      <header className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom bg-white shadow-sm">
        {/* Left: Sidebar Toggle + Dynamic Page Title */}
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-link text-secondary p-0" onClick={toggleDrawer}>
            <HiOutlineBars3 size={24} />
          </button>
          <h2 className="h5 mb-0">{title}</h2>
        </div>

        {/* Right: Icons + Calendar Dropdown */}
        <div className="d-flex align-items-center gap-3">

          {/* Calendar Dropdown */}
          <div className="position-relative">
            <button className="btn btn-primary" onClick={toggleCalendar}>
              {selectedDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </button>
            {calendarOpen && (
              <div
                className="position-absolute"
                style={{
                  zIndex: 1000,
                  top: "calc(100% + 10px)",
                  left: "auto",
                  right: 0,
                }}
              >
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  inline
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar Drawer */}
      <Sidebar isDrawerActive={isDrawerActive} onClose={closeDrawer} />

      {/* Overlay for Drawer on smaller screens */}
      {isDrawerActive && (
        <div
          className="drawer-overlay"
          onClick={closeDrawer}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 998,
          }}
        ></div>
      )}
    </>
  );
};

export default Header;
