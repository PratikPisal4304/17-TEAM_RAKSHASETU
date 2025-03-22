// src/pages/FIR.jsx

import React, { useState, useEffect, useMemo } from "react";
import { HiOutlineMagnifyingGlass, HiOutlinePlus } from "react-icons/hi2";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust the path as needed

const FIR = () => {
  // State to hold incident reports from Firestore
  const [reports, setReports] = useState([]);

  // Search term for filtering
  const [searchTerm, setSearchTerm] = useState("");

  // 1) Fetch incident_reports in real time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "incident_reports"), (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      setReports(fetched);
    });

    return () => unsubscribe();
  }, []);

  // 2) Filter data based on search term
  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      // Adjust fields as needed
      const incidentId = report.incidentId || report.id || report.docId || "";
      const incidentType = report.incidentType || "";
      const location = report.location || "";
      const description = report.description || "";
      const reportContent = report.reportContent || "";

      const term = searchTerm.toLowerCase();

      // If searchTerm is found in any of these fields, we keep the item
      return (
        incidentId.toLowerCase().includes(term) ||
        incidentType.toLowerCase().includes(term) ||
        location.toLowerCase().includes(term) ||
        description.toLowerCase().includes(term) ||
        reportContent.toLowerCase().includes(term)
      );
    });
  }, [reports, searchTerm]);

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4">FIR Dashboard</h1>

      {/* Search & Add Incident Row */}
      <div className="row g-2 align-items-center mb-4">
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="input-group">
            <span className="input-group-text" id="search-icon">
              <HiOutlineMagnifyingGlass />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search incidents..."
              aria-label="Search"
              aria-describedby="search-icon"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="col-auto">
          <button className="btn btn-danger d-flex align-items-center gap-1">
            <HiOutlinePlus />
            Add Incident
          </button>
        </div>
      </div>

      {/* Incident Reports Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Incident Reports</h5>
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">Incident ID</th>
                  <th scope="col">Incident Type</th>
                  <th scope="col">Location</th>
                  <th scope="col">Description</th>
                  <th scope="col">Incident Time</th>
                  <th scope="col">Recording?</th>
                  <th scope="col">Images</th>
                  <th scope="col">Timestamp</th>
                  <th scope="col" style={{ minWidth: "200px" }}>Report Content</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => {
                  const {
                    docId,
                    id,
                    incidentId,
                    incidentType,
                    location,
                    description,
                    incidentTime,
                    hasRecording,
                    imageCount,
                    attachedImages,
                    timestamp,
                    reportContent,
                  } = report;

                  // Choose an ID to display
                  const displayId = incidentId || id || docId;
                  const displayType = incidentType || "N/A";
                  const displayLocation = location || "N/A";
                  const displayDescription = description || "N/A";
                  const displayTime = incidentTime || "N/A";
                  const displayRecording = hasRecording ? "Yes" : "No";
                  const displayImages = Array.isArray(attachedImages)
                    ? attachedImages.length
                    : imageCount || 0;
                  const displayTimestamp = timestamp || "N/A";
                  const displayReportContent = reportContent || "";

                  return (
                    <tr key={docId}>
                      <td>{displayId}</td>
                      <td>{displayType}</td>
                      <td>{displayLocation}</td>
                      <td
                        style={{
                          maxWidth: "200px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {displayDescription}
                      </td>
                      <td>{displayTime}</td>
                      <td>{displayRecording}</td>
                      <td>{displayImages}</td>
                      <td>{displayTimestamp}</td>
                      <td
                        style={{
                          maxWidth: "200px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {displayReportContent}
                      </td>
                    </tr>
                  );
                })}

                {filteredReports.length === 0 && (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      No incident reports found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FIR;
