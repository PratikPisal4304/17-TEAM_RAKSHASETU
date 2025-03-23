import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineBellAlert,
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineExclamationCircle,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Sidebar = ({ isDrawerActive, onClose }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  // State for current user from Firebase Auth
  const [user, setUser] = useState(null);
  // State for user role fetched from Firestore
  const [userRole, setUserRole] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch the additional user info from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      }
    });
    return () => unsubscribe();
  }, [auth, db]);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  // Define navigation links for Police users (excluding JobListings)
  const policeNavLinks = [
    { name: "Dashboard", path: "/dashboard", icon: HiOutlineHome },
    { name: "Emergency Alerts", path: "/emergency-alerts", icon: HiOutlineBellAlert },
    { name: "FIR", path: "/FIR", icon: HiOutlineExclamationCircle },
    { name: "Users", path: "/users", icon: HiOutlineUsers },
    { name: "Analytics", path: "/analytics", icon: HiOutlineChartBar },
    { name: "Settings", path: "/Settings", icon: HiOutlineCog },
  ];

  // For Admin, show only JobListings and Settings
  const adminNavLinks = [
    { name: "JobListings", path: "/jobs", icon: HiOutlineCog },
    { name: "CounselorsManagement", path: "/Counselors", icon: HiOutlineCog},
    { name: "Settings", path: "/Settings", icon: HiOutlineCog },
  ];

  // Select the nav links to render based on userRole
  const navLinks = userRole === "admin" ? adminNavLinks : policeNavLinks;

  return (
    <aside
      className="d-flex flex-column bg-white border-end"
      style={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
        transition: "transform 0.3s ease",
        transform: isDrawerActive ? "translateX(0)" : "translateX(-100%)",
      }}
    >
      {/* Brand Identity */}
      <div className="border-bottom p-3 d-flex align-items-center gap-2">
        <span className="text-danger">
          <HiOutlineExclamationCircle size={24} />
        </span>
        <h1 className="h5 m-0">RakshaSetu</h1>
      </div>

      {/* User Section */}
      <div className="border-bottom p-3">
        <div className="d-flex align-items-center gap-2">
          <div
            className="bg-secondary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center text-dark fw-bold"
            style={{ width: "40px", height: "40px" }}
          >
            {user && user.displayName ? user.displayName.charAt(0).toUpperCase() : "A"}
          </div>
          <div>
            <p className="m-0 fw-semibold">
              {user && user.displayName ? user.displayName : "Admin"}
            </p>
            <small className="text-muted">
              {user && user.email ? user.email : "admin@safeguard.com"}
            </small>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow-1 overflow-auto p-3">
        <ul className="nav flex-column gap-1">
          {navLinks.map((link) => (
            <li key={link.name} className="nav-item">
              <NavLink
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 rounded ${
                    isActive
                      ? "bg-danger bg-opacity-10 text-danger fw-semibold"
                      : "text-dark"
                  }`
                }
              >
                <link.icon size={20} />
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Section */}
      <div className="border-top p-3 mt-auto">
        <button
          className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2"
          onClick={handleLogout}
        >
          <HiOutlineArrowRightOnRectangle size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
