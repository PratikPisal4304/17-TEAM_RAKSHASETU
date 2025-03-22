import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Incidents from "./pages/Incidents";

const App = () => {
  return (
    <div className="d-flex vh-100 bg-light">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column">
        <Header />
        <main className="p-3 p-md-4 overflow-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/incidents" element={<Incidents />} />
            {/* Redirect any unknown route to /dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
