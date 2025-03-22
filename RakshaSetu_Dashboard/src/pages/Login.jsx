import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // For basic client-side validation & error display
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple client-side validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // After successful login, fetch the user role from Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // If user is admin, redirect to JobListings; otherwise, use the dashboard
        if (userData.role === "admin") {
          navigate("/jobs");
        } else {
          navigate("/dashboard");
        }
      } else {
        // Fallback in case user document doesn't exist
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-4">
          <div className="mb-3">
            <span
              className="d-inline-flex align-items-center justify-content-center bg-danger text-white rounded-circle"
              style={{ width: "50px", height: "50px" }}
            >
              <HiOutlineLockClosed size={24} />
            </span>
          </div>
          <h3 className="mb-1">RakshaSetu</h3>
          <p className="text-muted mb-0">Sign in to the admin dashboard</p>
        </div>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
              autoFocus
            />
          </div>

          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="passwordInput"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <Link to="/forgot-password" className="text-decoration-none">
                Forgot password?
              </Link>
            </div>
          </div>

          <button type="submit" className="btn btn-danger w-100 fw-semibold">
            Login
          </button>
        </form>

        {/* Signup Button */}
        <div className="text-center mt-3">
          <span className="me-2">Don't have an account?</span>
          <Link to="/signup" className="btn btn-outline-secondary">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
