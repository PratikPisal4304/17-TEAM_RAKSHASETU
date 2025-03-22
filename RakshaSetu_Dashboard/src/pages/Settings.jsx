import React, { useState } from "react";

const Settings = () => {
  // Default settings (static data)
  const defaultSettings = {
    siteName: "My Safety App",
    supportEmail: "support@example.com",
    enableNotifications: true,
    theme: "light",
  };

  // Local state for settings data
  const [settings, setSettings] = useState(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Simulate saving settings (e.g., by using a timeout)
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    // Simulate an API call delay
    setTimeout(() => {
      setSaving(false);
      setMessage("Settings saved successfully!");
    }, 1000);
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4">Settings</h1>
      {message && <div className="alert alert-success">{message}</div>}
      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label htmlFor="siteName" className="form-label">
            Site Name
          </label>
          <input
            type="text"
            id="siteName"
            name="siteName"
            className="form-control"
            value={settings.siteName}
            onChange={handleChange}
            placeholder="Enter site name"
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
            placeholder="support@example.com"
          />
        </div>

        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="enableNotifications"
            name="enableNotifications"
            checked={settings.enableNotifications}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="enableNotifications">
            Enable Notifications
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="theme" className="form-label">
            Theme
          </label>
          <select
            className="form-select"
            id="theme"
            name="theme"
            value={settings.theme}
            onChange={handleChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
};

export default Settings;
