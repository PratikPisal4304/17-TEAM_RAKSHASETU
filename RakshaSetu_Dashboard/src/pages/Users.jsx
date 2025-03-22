import React, { useState, useMemo } from "react";
// Choose icons that actually exist in "react-icons/hi2"
import {
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineAdjustmentsHorizontal,
} from "react-icons/hi2";

// Sample user data
const INITIAL_USERS = [
  {
    userId: "USR1004",
    name: "Meera Reddy",
    dateRegistered: "10 Jan 2025",
    email: "meera.reddy@example.com",
    age: 27,
    dob: "14 Feb 1998",
    closeContacts: [
      "Sunita Reddy (Mother +91 94567 89012)",
      "Pradeep Reddy (Father +91 96578 90123)",
    ],
    location: "12.9784, 77.6408",
    status: "active",
  },
  {
    userId: "USR1002",
    name: "Ananya Singh",
    dateRegistered: "3 Oct 2024",
    email: "ananya.singh@example.com",
    age: 29,
    dob: "22 Aug 1995",
    closeContacts: [
      "Vikram Singh (Brother +91 99875 67890)",
      "Rohit Kapoor (Friend +91 98123 45678)",
    ],
    location: "12.9352, 77.6245",
    status: "active",
  },
  {
    userId: "USR1005",
    name: "Divya Joshi",
    dateRegistered: "5 Nov 2024",
    email: "divya.joshi@example.com",
    age: 30,
    dob: "8 Jul 1994",
    closeContacts: [
      "Neha Joshi (Sister +91 90412 34567)",
      "Rahul Joshi (Brother +91 90123 45678)",
    ],
    location: "12.9101, 77.6049",
    status: "active",
  },
  {
    userId: "USR1001",
    name: "Priya Sharma",
    dateRegistered: "15 Sept 2024",
    email: "priya.sharma@example.com",
    age: 32,
    dob: "15 May 1992",
    closeContacts: [
      "Rajesh Sharma (Father +91 98765 43210)",
      "Meena Sharma (Mother +91 98765 43211)",
    ],
    location: "12.9716, 77.5946",
    status: "active",
  },
  {
    userId: "USR1003",
    name: "Kavita Patel",
    dateRegistered: "22 Aug 2024",
    email: "kavita.patel@example.com",
    age: 34,
    dob: "30 Nov 1989",
    closeContacts: [
      "Amit Patel (Father +91 87654 32109)",
      "Deepa Gupta (Friend +91 90123 45678)",
    ],
    location: "13.0827, 77.5877",
    status: "inactive",
  },
];

const Users = () => {
  // States for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filtered user data
  const filteredUsers = useMemo(() => {
    return INITIAL_USERS.filter((user) => {
      // Search filter (matches userId, name, or email)
      const matchesSearch =
        user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

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
                  <th scope="col">AGE/DOB</th>
                  <th scope="col">CLOSE CONTACTS</th>
                  <th scope="col">LOCATION COORDINATES</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        {/* Circle with initials */}
                        <div
                          className="rounded-circle bg-secondary bg-opacity-25 d-flex align-items-center justify-content-center fw-bold"
                          style={{ width: "32px", height: "32px" }}
                        >
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <div className="fw-semibold mb-0">{user.name}</div>
                          <small className="text-muted">
                            Registered {user.dateRegistered}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      {user.age} years
                      <br />
                      <small className="text-muted">{user.dob}</small>
                    </td>
                    <td>
                      {user.closeContacts.map((contact, idx) => (
                        <div key={idx} className="text-muted">
                          {contact}
                        </div>
                      ))}
                    </td>
                    <td>
                      {user.location}
                      <br />
                      <a href="#map" className="text-decoration-none">
                        View on map
                      </a>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
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

export default Users;
