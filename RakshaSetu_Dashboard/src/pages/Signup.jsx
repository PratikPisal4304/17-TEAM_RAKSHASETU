import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

const Signup = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin"); // default to Admin; changeable to "police"
  const [policeId, setPoliceId] = useState(""); // extra field for police role
  const [adminCode, setAdminCode] = useState(""); // extra field for admin verification
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // For basic client-side validation & error display
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation: Check required fields
    if (!name || !email || !password || !confirmPass || !role) {
      setError("Please fill in all fields.");
      return;
    }

    // Validate role-specific fields
    if (role === "police" && !policeId) {
      setError("Please enter your Police ID.");
      return;
    }
    
    if (role === "admin" && !adminCode) {
      setError("Please enter the admin verification code.");
      return;
    }

    if (password !== confirmPass) {
      setError("Passwords do not match.");
      return;
    }
    
    // Example admin verification: check if the entered code matches a predetermined value.
    if (role === "admin" && adminCode !== "SECRET_ADMIN_CODE") {
      setError("Invalid admin verification code.");
      return;
    }

    try {
      // Firebase Authentication: Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update the user's display name
      await updateProfile(userCredential.user, { displayName: name });

      // Create the user document object, conditionally including role-specific details
      const userData = {
        uid: userCredential.user.uid,
        name,
        email,
        role,
        createdAt: serverTimestamp(),
      };

      if (role === "police") {
        userData.policeId = policeId;
      }
      
      // Optionally, you might want to store the admin code or just use it for verification
      if (role === "admin") {
        userData.adminVerified = true; // Mark as verified if the admin code is correct
      }

      // Save additional user info including the role in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), userData);

      // Navigate to login or dashboard
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: "100vh" }}>
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-4">
          <div className="mb-3">
            <span
              className="d-inline-flex align-items-center justify-content-center bg-danger text-white rounded-circle"
              style={{ width: "50px", height: "50px" }}
            >
              <HiOutlineUserPlus size={24} />
            </span>
          </div>
          <h3 className="mb-1">RakshaSetu</h3>
          <p className="text-muted mb-0">Sign up for an account</p>
        </div>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="nameInput"
              className="form-control"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="emailInput"
              className="form-control"
              placeholder="admin@safeguard.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="roleInput" className="form-label">
              Role
            </label>
            <select
              id="roleInput"
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="police">Police</option>
            </select>
          </div>

          {role === "police" && (
            <div className="mb-3">
              <label htmlFor="policeIdInput" className="form-label">
                Police ID
              </label>
              <input
                type="text"
                id="policeIdInput"
                className="form-control"
                placeholder="Enter your Police ID"
                value={policeId}
                onChange={(e) => setPoliceId(e.target.value)}
              />
            </div>
          )}

          {role === "admin" && (
            <div className="mb-3">
              <label htmlFor="adminCodeInput" className="form-label">
                Admin Verification Code
              </label>
              <input
                type="text"
                id="adminCodeInput"
                className="form-control"
                placeholder="Enter the admin code"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
              />
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="passwordInput"
              className="form-control"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmInput" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmInput"
              className="form-control"
              placeholder=""
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-danger w-100 fw-semibold mb-3">
            Sign Up
          </button>

          <div className="text-center">
            <small className="text-muted">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none">
                Log in
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
