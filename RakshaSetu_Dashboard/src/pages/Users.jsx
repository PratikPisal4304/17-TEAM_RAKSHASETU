import React, { useState, useEffect, useMemo } from "react";
import {
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineAdjustmentsHorizontal,
} from "react-icons/hi2";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig"; // <-- Update the path as needed

const Users = () => {
  // State for all users from Firestore
  const [users, setUsers] = useState([]);

  // States for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // 1) Fetch Firestore data in real time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const fetchedUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(fetchedUsers);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  // 2) Apply local filters (search & status) to the fetched data
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Search filter (matches userId, name, or email if they exist)
      const userId = user.userId || user.id || "";
      const userName = user.name || "";
      const userEmail = user.email || "";

      const matchesSearch =
        userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        userEmail.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter (if your user doc has a 'status' field)
      const currentStatus = user.status || "unknown";
      const matchesStatus =
        statusFilter === "all" || currentStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, searchTerm, statusFilter]);

  return (
    <div className="container-fluid">
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="h3 mb-1">User Management</h1>
        <p className="text-muted mb-0">
          Manage registered users and their emergency contacts
        </p>
      </div>

      {/* Filter Row */}
      <div className="row g-2 align-items-center mb-4">
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="input-group">
            <span className="input-group-text" id="search-icon">
              <HiOutlineMagnifyingGlass />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search users..."
              aria-label="Search"
              aria-describedby="search-icon"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6 col-md-2">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            {/* Add more statuses if needed */}
          </select>
        </div>

        <div className="col-auto">
          <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
            <HiOutlineAdjustmentsHorizontal />
            Filters
          </button>
        </div>

        <div className="col-auto">
          <button className="btn btn-danger d-flex align-items-center gap-1">
            <HiOutlinePlus />
            Add New User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">Registered Users</h5>
            <a href="#all-users" className="text-decoration-none">
              View all
            </a>
          </div>
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">USER ID</th>
                  <th scope="col">NAME</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">DOB</th>
                  <th scope="col">CONTACTS & PHONE</th>
                  <th scope="col">LOCATION</th>
                  <th scope="col">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  // Fallbacks if certain fields don't exist in your docs
                  const userId = user.userId || user.id;
                  const userName = user.name || "N/A";
                  const userEmail = user.email || "N/A";
                  const userDob = user.dob
                    ? formatDob(user.dob)
                    : "N/A"; // If user.dob is an object { day, month, year }
                  const userContacts = Array.isArray(user.closeContacts)
                    ? user.closeContacts
                    : [];
                  const userPhone = user.phone || "";
                  const userLocation = user.location || "N/A";
                  const userStatus = user.status || "N/A";

                  return (
                    <tr key={userId}>
                      <td>{userId}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          {/* Circle with initials */}
                          <div
                            className="rounded-circle bg-secondary bg-opacity-25 d-flex align-items-center justify-content-center fw-bold"
                            style={{ width: "32px", height: "32px" }}
                          >
                            {getInitials(userName)}
                          </div>
                          <div>
                            <div className="fw-semibold mb-0">{userName}</div>
                            {user.dateRegistered && (
                              <small className="text-muted">
                                Registered {user.dateRegistered}
                              </small>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>{userEmail}</td>
                      <td>{userDob}</td>
                      <td>
                        {userContacts.length > 0 ? (
                          userContacts.map((contact, idx) => (
                            <div key={idx} className="text-muted">
                              {contact}
                            </div>
                          ))
                        ) : (
                          <span className="text-muted">N/A</span>
                        )}
                        {/* Show phone below the contacts */}
                        {userPhone && (
                          <div className="text-muted mt-1">
                            <strong>Phone:</strong> {userPhone}
                          </div>
                        )}
                      </td>
                      <td>
                        {userLocation}
                        <br />
                        <a href="#map" className="text-decoration-none">
                          View on map
                        </a>
                      </td>
                      <td>{userStatus}</td>
                    </tr>
                  );
                })}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No users found.
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

// Helper function to extract initials from a name
function getInitials(name) {
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (
    words[0].charAt(0).toUpperCase() + words[words.length - 1].charAt(0).toUpperCase()
  );
}

// Helper function to format DOB if it's an object like { day, month, year }
function formatDob(dob) {
  if (!dob.day || !dob.month || !dob.year) return "N/A";
  return `${dob.day}-${dob.month}-${dob.year}`;
}

export default Users;
