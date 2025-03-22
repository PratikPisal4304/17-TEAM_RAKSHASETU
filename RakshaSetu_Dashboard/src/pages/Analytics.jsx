// src/pages/Analytics.jsx
import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import CardStats from "../components/CardStats";
import IncidentSources from "../components/IncidentSources";
import IncidentMap from "../components/IncidentMap";

// Import your newly created charts
import SessionOverview from "../components/SessionOverview";
import DeviceOverview from "../components/DeviceOverview";

const Analytics = () => {
  return (
    <div className="container-fluid">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "#" },
          { label: "Analytics", href: "#", active: true },
        ]}
      />

      {/* Cards Row */}
      <div className="row g-3 mb-4">
        <div className="col-md-6 col-lg-3">
          <CardStats
            title="Active Alerts"
            value="24"
            percentage="+12%"
            status="in last 7 days"
            iconColor="bg-primary text-white"
            icon="bell"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <CardStats
            title="Response Rate"
            value="89.7%"
            percentage="+0.59%"
            status="Currently active now"
            iconColor="bg-success text-white"
            icon="check"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <CardStats
            title="Live Helpers"
            value="342"
            percentage="-11.29%"
            status="Currently active now"
            iconColor="bg-purple text-white"
            icon="users"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <CardStats
            title="Total Incidents"
            value="1,430"
            percentage="+1.29%"
            status="Currently active now"
            iconColor="bg-danger text-white"
            icon="exclamation"
          />
        </div>
      </div>

      {/* Session & Device Overviews */}
      <div className="row g-3 mb-4">
        <div className="col-lg-6">
          <SessionOverview />
        </div>
        <div className="col-lg-6">
          <DeviceOverview />
        </div>
      </div>

      {/* Incident Sources & Map */}
      <div className="row g-3">
        <div className="col-lg-6">
          <IncidentSources />
        </div>
        <div className="col-lg-6">
          <IncidentMap />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
