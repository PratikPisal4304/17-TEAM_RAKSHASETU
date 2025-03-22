import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiOutlineUserPlus } from "react-icons/hi2";

const Signup = () => {
  const navigate = useNavigate();

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // For basic client-side validation
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simple client-side checks
    if (!name || !email || !password || !confirmPass) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPass) {
      setError("Passwords do not match.");
      return;
    }

    // In production, you'd call an API to create a new account
    // For demonstration, assume success if all fields are filled and passwords match
    // Then navigate to login (or automatically log the user in)
    navigate("/login");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <div className="mb-3">
            {/* Logo / Icon */}
            <span
              className="d-inline-flex align-items-center justify-content-center bg-danger text-white rounded-circle"
              style={{ width: "50px", height: "50px" }}
            >
              <HiOutlineUserPlus size={24} />
            </span>
          </div>
          <h3 className="mb-1">SafeGuard</h3>
          <p className="text-muted mb-0">Sign up for an admin account</p>
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
              placeholder="Jane Doe"
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

          <div className="mb-3">
            <label htmlFor="confirmInput" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmInput"
              className="form-control"
              placeholder="••••••••"
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
