import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Incidents from "./pages/Incidents";
import Users from "./pages/Users";

const App = () => {
  return (
    <Routes>
      {/* 1) Redirect the root path ("/") to "/login" */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* 2) Login page route (NO sidebar/header) */}
      <Route path="/login" element={<Login />} />

      {/* 3) Protected routes with sidebar/header */}
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
                  <Route path="/Analytics" element={<Analytics />} />
                  <Route path="/incidents" element={<Incidents />} />
                  <Route path="/users" element={<Users />} />
                  {/* If any unknown path is visited, redirect to dashboard */}
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
