import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import FIR from "./pages/FIR";
import Analytics from "./pages/Analytics";
import EmergencyAlerts from "./pages/EmergencyAlerts";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Settings from "./pages/Settings";
import JobListings from "./pages/JobListings";
import CounselorsManagement from "./pages/CounselorsManagement";

const App = () => {
  return (
    <Routes>
      {/* 1) Redirect the root path ("/") to "/login" */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* 2) Login page route (NO sidebar/header) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes: wrap them in your layout */}
      <Route
        path="/*"
        element={
          <div className="d-flex vh-100 bg-light">
            <Sidebar />
            <div className="flex-grow-1 d-flex flex-column">
              <Header />
              <main className="p-3 p-md-4 overflow-auto">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/FIR" element={<FIR />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/emergency-alerts" element={<EmergencyAlerts />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/jobs" element={<JobListings />} />
                  <Route path="/counselors" element={<CounselorsManagement />} />
                  <Route path="/Settings" element={<Settings />} />
                  {/* Add more routes as needed */}
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </main>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
