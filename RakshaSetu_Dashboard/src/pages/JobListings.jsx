// src/pages/JobListings.jsx
import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust path as needed

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    companyLocation: "",
    salaryRange: "",
    workMode: "",
    detailedDescription: "",
    applyBefore: "", // if you still want the 'apply before' field
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch job listings in real time from "jobListings" collection
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "jobListings"), (snapshot) => {
      const fetchedJobs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Optionally sort jobs by postedAt descending
      fetchedJobs.sort((a, b) => {
        if (a.postedAt && b.postedAt) {
          return b.postedAt.seconds - a.postedAt.seconds;
        }
        return 0;
      });
      setJobs(fetchedJobs);
    });
    return () => unsubscribe();
  }, []);

  // Handler for form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler to post a new job
  const handlePostJob = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Basic validation
    if (
      !newJob.title ||
      !newJob.companyLocation ||
      !newJob.salaryRange ||
      !newJob.workMode ||
      !newJob.detailedDescription
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "jobListings"), {
        ...newJob,
        postedAt: serverTimestamp(),
      });

      setMessage("Job posted successfully!");
      
      // Reset form fields
      setNewJob({
        title: "",
        companyLocation: "",
        salaryRange: "",
        workMode: "",
        detailedDescription: "",
        applyBefore: "",
      });

    } catch (err) {
      console.error("Error posting job:", err);
      setError("Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
};

  // Handler to delete a job
  const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;
    try {
      await deleteDoc(doc(db, "jobListings", jobId));
      setMessage("Job deleted successfully!");
    } catch (err) {
      console.error("Error deleting job:", err);
      setError("Failed to delete job. Please try again.");
    }
  };

  // Helper: format Firestore Timestamp to a readable string
  const formatTimestamp = (ts) => {
    if (ts && ts.toDate) {
      return ts.toDate().toLocaleString();
    }
    return ts;
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Government Job Listings for Women</h1>

      {/* Job Posting Form */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header">Post a New Job</div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}
          <form onSubmit={handlePostJob}>
            {/* Job Title */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Job Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={newJob.title}
                onChange={handleInputChange}
              />
            </div>

            {/* Company + Location */}
            <div className="mb-3">
              <label htmlFor="companyLocation" className="form-label">
                Company &amp; Location
              </label>
              <input
                type="text"
                id="companyLocation"
                name="companyLocation"
                className="form-control"
                value={newJob.companyLocation}
                onChange={handleInputChange}
                placeholder="e.g. TechSolutions India - Bangalore"
              />
            </div>

            {/* Salary Range */}
            <div className="mb-3">
              <label htmlFor="salaryRange" className="form-label">
                Salary Range
              </label>
              <input
                type="text"
                id="salaryRange"
                name="salaryRange"
                className="form-control"
                value={newJob.salaryRange}
                onChange={handleInputChange}
                placeholder="e.g. ₹18-25L"
              />
            </div>

            {/* Work Mode */}
            <div className="mb-3">
              <label htmlFor="workMode" className="form-label">
                Work Mode
              </label>
              <select
                id="workMode"
                name="workMode"
                className="form-select"
                value={newJob.workMode}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="On-Site">On-Site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Detailed Description */}
            <div className="mb-3">
              <label htmlFor="detailedDescription" className="form-label">
                Detailed Description
              </label>
              <textarea
                id="detailedDescription"
                name="detailedDescription"
                className="form-control"
                rows="4"
                value={newJob.detailedDescription}
                onChange={handleInputChange}
                placeholder="Enter the full job description..."
              ></textarea>
            </div>

            {/* Apply Before (Optional) */}
            <div className="mb-3">
              <label htmlFor="applyBefore" className="form-label">
                Apply Before
              </label>
              <input
                type="date"
                id="applyBefore"
                name="applyBefore"
                className="form-control"
                value={newJob.applyBefore}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="btn btn-danger" disabled={loading}>
              {loading ? "Posting..." : "Post Job"}
            </button>
          </form>
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="card shadow-sm">
        <div className="card-header">Available Job Listings</div>
        <div className="card-body">
          {jobs.length === 0 ? (
            <p>No job listings found.</p>
          ) : (
            <div className="list-group">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5 className="mb-1">{job.title}</h5>
                    {/* Example: "TechSolutions India - Bangalore" */}
                    <p className="mb-1">
                      <strong>Company &amp; Location:</strong>{" "}
                      {job.companyLocation}
                    </p>
                    <p className="mb-1">
                      <strong>Salary Range:</strong> {job.salaryRange} <br />
                      <strong>Work Mode:</strong> {job.workMode}
                    </p>
                    <p className="mb-1">
                      <strong>Details:</strong> {job.detailedDescription}
                    </p>
                    <small>
                      {job.applyBefore && (
                        <>
                          <strong>Apply Before:</strong> {job.applyBefore} |{" "}
                        </>
                      )}
                      <strong>Posted:</strong>{" "}
                      {job.postedAt ? formatTimestamp(job.postedAt) : "N/A"}
                    </small>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteJob(job.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListings;
