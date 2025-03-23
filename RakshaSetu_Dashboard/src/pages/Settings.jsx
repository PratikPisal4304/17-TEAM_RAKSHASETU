import React, { useState, useEffect } from "react";

const AdminSettings = () => {
  const defaultSettings = {
    // General Settings
    panelTitle: "RakshaSetu Police Panel",
    supportEmail: "police-support@rakshasetu.com",

    // Profile Section
    profileFullName: "Officer John Doe",
    profileBadgeNumber: "PD123456",
    profileContactNumber: "9876543210",
    profilePassword: "",
    profileConfirmPassword: "",

    // Data & Map Settings
    defaultMapView: "satellite", // "satellite" or "roadmap"
    defaultMapZoom: 12, // zoom level 1-20
    mapCenterLat: 28.7041, // example: New Delhi latitude
    mapCenterLng: 77.1025, // example: New Delhi longitude
    showIncidentClusters: true,
    enableHeatmap: false,
    autoRefreshSOS: true,
    sosRefreshInterval: 30, // seconds
    autoRefreshFIR: true,
    firRefreshInterval: 60, // seconds

    // Alerts Settings
    enableSoundAlerts: true,
    alertVolume: 50, // 0-100
    enableSMSAlerts: true,
    notificationThreshold: 5, // trigger alert if more than 5 SOS received

    // Advanced Settings
    autoLogoutTimeout: 15, // minutes
    loggingLevel: "Info", // Options: "Error", "Warning", "Info", "Debug"
    enableDebugMode: false,
  };

  const [settings, setSettings] = useState(defaultSettings);
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load saved settings from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem("adminSettings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  // Generic change handler for all inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === "checkbox" ? checked : value;
    // Convert to number for numeric fields
    if (
      [
        "sosRefreshInterval",
        "firRefreshInterval",
        "alertVolume",
        "defaultMapZoom",
        "mapCenterLat",
        "mapCenterLng",
        "notificationThreshold",
        "autoLogoutTimeout",
      ].includes(name)
    ) {
      newValue = parseFloat(value);
    }
    setSettings((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Basic validation functions
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const validateSettings = () => {
    // Validate General
    if (!isValidEmail(settings.supportEmail)) {
      setError("Please enter a valid support email.");
      return false;
    }
    // Validate Profile Section
    if (!settings.profileFullName) {
      setError("Full Name is required.");
      return false;
    }
    if (!settings.profileBadgeNumber) {
      setError("Badge Number is required.");
      return false;
    }
    if (
      settings.profileContactNumber &&
      !/^\d{7,15}$/.test(settings.profileContactNumber)
    ) {
      setError("Please enter a valid contact number (7-15 digits).");
      return false;
    }
    if (settings.profilePassword || settings.profileConfirmPassword) {
      if (settings.profilePassword !== settings.profileConfirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
    }
    // Validate Data & Map Settings
    if (settings.sosRefreshInterval <= 0) {
      setError("SOS refresh interval must be a positive number.");
      return false;
    }
    if (settings.firRefreshInterval <= 0) {
      setError("FIR refresh interval must be a positive number.");
      return false;
    }
    if (settings.defaultMapZoom < 1 || settings.defaultMapZoom > 20) {
      setError("Map zoom level must be between 1 and 20.");
      return false;
    }
    if (settings.mapCenterLat < -90 || settings.mapCenterLat > 90) {
      setError("Map center latitude must be between -90 and 90.");
      return false;
    }
    if (settings.mapCenterLng < -180 || settings.mapCenterLng > 180) {
      setError("Map center longitude must be between -180 and 180.");
      return false;
    }
    // Validate Alerts Settings
    if (settings.alertVolume < 0 || settings.alertVolume > 100) {
      setError("Alert volume must be between 0 and 100.");
      return false;
    }
    if (settings.notificationThreshold < 0) {
      setError("Notification threshold must be a positive number.");
      return false;
    }
    // Validate Advanced Settings
    if (settings.autoLogoutTimeout <= 0) {
      setError("Auto logout timeout must be a positive number.");
      return false;
    }
    return true;
  };

  // Simulate saving settings (with delay to mimic an API call)
  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (!validateSettings()) return;

    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      localStorage.setItem("adminSettings", JSON.stringify(settings));
      setMessage("Settings saved successfully!");
    } catch (err) {
      setError("Error saving settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Reset settings to default
  const handleReset = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("adminSettings");
    setMessage("Settings have been reset to default.");
    setError("");
  };

  // Simulate testing a sound alert
  const handleTestSoundAlert = () => {
    if (settings.enableSoundAlerts) {
      alert("Sound alert test triggered!");
    }
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Admin Panel Settings</h1>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Tab Navigation */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeTab === "data" ? "active" : ""}`}
            onClick={() => setActiveTab("data")}
          >
            Data & Map
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeTab === "alerts" ? "active" : ""}`}
            onClick={() => setActiveTab("alerts")}
          >
            Alerts
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeTab === "advanced" ? "active" : ""}`}
            onClick={() => setActiveTab("advanced")}
          >
            Advanced
          </button>
        </li>
      </ul>

      <form onSubmit={handleSave}>
        {/* General Settings Tab */}
        {activeTab === "general" && (
          <div className="card mt-3">
            <div className="card-header">General Settings</div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="panelTitle" className="form-label">
                  Panel Title
                </label>
                <input
                  type="text"
                  id="panelTitle"
                  name="panelTitle"
                  className="form-control"
                  value={settings.panelTitle}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="supportEmail" className="form-label">
                  Support Email
                </label>
                <input
                  type="email"
                  id="supportEmail"
                  name="supportEmail"
                  className="form-control"
                  value={settings.supportEmail}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}

        {/* Profile Settings Tab */}
        {activeTab === "profile" && (
          <div className="card mt-3">
            <div className="card-header">Profile Settings</div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="profileFullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="profileFullName"
                  name="profileFullName"
                  className="form-control"
                  value={settings.profileFullName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="profileBadgeNumber" className="form-label">
                  Badge Number
                </label>
                <input
                  type="text"
                  id="profileBadgeNumber"
                  name="profileBadgeNumber"
                  className="form-control"
                  value={settings.profileBadgeNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="profileContactNumber" className="form-label">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="profileContactNumber"
                  name="profileContactNumber"
                  className="form-control"
                  value={settings.profileContactNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="profilePassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  id="profilePassword"
                  name="profilePassword"
                  className="form-control"
                  value={settings.profilePassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="profileConfirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="profileConfirmPassword"
                  name="profileConfirmPassword"
                  className="form-control"
                  value={settings.profileConfirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>
        )}

        {/* Data & Map Settings Tab */}
        {activeTab === "data" && (
          <div className="card mt-3">
            <div className="card-header">Data & Map Settings</div>
            <div className="card-body">
              <div className="form-check form-switch mb-3">
                <input
                  type="checkbox"
                  id="autoRefreshSOS"
                  name="autoRefreshSOS"
                  className="form-check-input"
                  checked={settings.autoRefreshSOS}
                  onChange={handleChange}
                />
                <label htmlFor="autoRefreshSOS" className="form-check-label">
                  Auto-refresh SOS Data
                </label>
              </div>
              {settings.autoRefreshSOS && (
                <div className="mb-3">
                  <label htmlFor="sosRefreshInterval" className="form-label">
                    SOS Refresh Interval (seconds)
                  </label>
                  <input
                    type="number"
                    id="sosRefreshInterval"
                    name="sosRefreshInterval"
                    className="form-control"
                    value={settings.sosRefreshInterval}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="form-check form-switch mb-3">
                <input
                  type="checkbox"
                  id="autoRefreshFIR"
                  name="autoRefreshFIR"
                  className="form-check-input"
                  checked={settings.autoRefreshFIR}
                  onChange={handleChange}
                />
                <label htmlFor="autoRefreshFIR" className="form-check-label">
                  Auto-refresh FIR Data
                </label>
              </div>
              {settings.autoRefreshFIR && (
                <div className="mb-3">
                  <label htmlFor="firRefreshInterval" className="form-label">
                    FIR Refresh Interval (seconds)
                  </label>
                  <input
                    type="number"
                    id="firRefreshInterval"
                    name="firRefreshInterval"
                    className="form-control"
                    value={settings.firRefreshInterval}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="defaultMapView" className="form-label">
                  Default Map View
                </label>
                <select
                  id="defaultMapView"
                  name="defaultMapView"
                  className="form-select"
                  value={settings.defaultMapView}
                  onChange={handleChange}
                >
                  <option value="satellite">Satellite</option>
                  <option value="roadmap">Roadmap</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="defaultMapZoom" className="form-label">
                  Default Map Zoom (1-20)
                </label>
                <input
                  type="number"
                  id="defaultMapZoom"
                  name="defaultMapZoom"
                  className="form-control"
                  value={settings.defaultMapZoom}
                  onChange={handleChange}
                  min="1"
                  max="20"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mapCenterLat" className="form-label">
                  Map Center Latitude (-90 to 90)
                </label>
                <input
                  type="number"
                  id="mapCenterLat"
                  name="mapCenterLat"
                  className="form-control"
                  value={settings.mapCenterLat}
                  onChange={handleChange}
                  step="0.0001"
                  min="-90"
                  max="90"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mapCenterLng" className="form-label">
                  Map Center Longitude (-180 to 180)
                </label>
                <input
                  type="number"
                  id="mapCenterLng"
                  name="mapCenterLng"
                  className="form-control"
                  value={settings.mapCenterLng}
                  onChange={handleChange}
                  step="0.0001"
                  min="-180"
                  max="180"
                />
              </div>
              <div className="form-check form-switch mb-3">
                <input
                  type="checkbox"
                  id="showIncidentClusters"
                  name="showIncidentClusters"
                  className="form-check-input"
                  checked={settings.showIncidentClusters}
                  onChange={handleChange}
                />
                <label
                  htmlFor="showIncidentClusters"
                  className="form-check-label"
                >
                  Show Incident Clusters
                </label>
              </div>
              <div className="form-check form-switch mb-3">
                <input
                  type="checkbox"
                  id="enableHeatmap"
                  name="enableHeatmap"
                  className="form-check-input"
                  checked={settings.enableHeatmap}
                  onChange={handleChange}
                />
                <label htmlFor="enableHeatmap" className="form-check-label">
                  Enable Heatmap
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Alerts Settings Tab */}
        {activeTab === "alerts" && (
          <div className="card mt-3">
            <div className="card-header">Alerts Settings</div>
            <div className="card-body">
              <div className="form-check form-switch mb-3">
                <input
                  type="checkbox"
                  id="enableSoundAlerts"
                  name="enableSoundAlerts"
                  className="form-check-input"
                  checked={settings.enableSoundAlerts}
                  onChange={handleChange}
                />
                <label htmlFor="enableSoundAlerts" className="form-check-label">
                  Enable Sound Alerts
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="alertVolume" className="form-label">
                  Alert Volume ({settings.alertVolume})
                </label>
                <input
                  type="range"
                  id="alertVolume"
                  name="alertVolume"
                  className="form-range"
                  min="0"
                  max="100"
                  value={settings.alertVolume}
                  onChange={handleChange}
                />
              </div>
              <div className="form-check form-switch mb-3">
                <input
                  type="checkbox"
                  id="enableSMSAlerts"
                  name="enableSMSAlerts"
                  className="form-check-input"
                  checked={settings.enableSMSAlerts}
                  onChange={handleChange}
                />
                <label htmlFor="enableSMSAlerts" className="form-check-label">
                  Enable SMS Alerts
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="notificationThreshold" className="form-label">
                  Notification Threshold (SOS count)
                </label>
                <input
                  type="number"
                  id="notificationThreshold"
                  name="notificationThreshold"
                  className="form-control"
                  value={settings.notificationThreshold}
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                className="btn btn-info"
                onClick={handleTestSoundAlert}
                disabled={!settings.enableSoundAlerts}
              >
                Test Sound Alert
              </button>
            </div>
          </div>
        )}

        {/* Advanced Settings Tab */}
        {activeTab === "advanced" && (
          <div className="card mt-3">
            <div className="card-header">Advanced Settings</div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="autoLogoutTimeout" className="form-label">
                  Auto Logout Timeout (minutes)
                </label>
                <input
                  type="number"
                  id="autoLogoutTimeout"
                  name="autoLogoutTimeout"
                  className="form-control"
                  value={settings.autoLogoutTimeout}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="loggingLevel" className="form-label">
                  Logging Level
                </label>
                <select
                  id="loggingLevel"
                  name="loggingLevel"
                  className="form-select"
                  value={settings.loggingLevel}
                  onChange={handleChange}
                >
                  <option value="Error">Error</option>
                  <option value="Warning">Warning</option>
                  <option value="Info">Info</option>
                  <option value="Debug">Debug</option>
                </select>
              </div>
              <div className="form-check form-switch mb-3">
                <input
                  type="checkbox"
                  id="enableDebugMode"
                  name="enableDebugMode"
                  className="form-check-input"
                  checked={settings.enableDebugMode}
                  onChange={handleChange}
                />
                <label htmlFor="enableDebugMode" className="form-check-label">
                  Enable Debug Mode
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            Reset to Default
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
