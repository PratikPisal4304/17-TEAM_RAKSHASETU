// src/App.jsx
import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Analytics from "./pages/Analytics";

const App = () => {
  return (
    <div className="d-flex vh-100 bg-light">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="d-flex flex-column flex-grow-1">
        <Header />
        <div className="p-3 p-md-4 overflow-auto">
          <Analytics />
        </div>
      </div>
    </div>
  );
};

export default App;
