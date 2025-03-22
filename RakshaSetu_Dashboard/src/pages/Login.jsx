import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiOutlineLockClosed } from "react-icons/hi2";

const Login = () => {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // For basic client-side validation
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simple client-side checks
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // For demonstration, let's assume a "valid" login is a specific user/password
    // In production, you'd call an API to validate credentials
    if (email === "admin@safeguard.com" && password === "password") {
      // Optionally store token/credentials in localStorage or context
      // localStorage.setItem("authToken", "some_token_here");

      // Redirect to /dashboard
      navigate("/dashboard");
    } else {
      setError("Invalid email or password. Try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: "100vh" }}>
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-4">
          <div className="mb-3">
            {/* Logo / Icon */}
            <span className="d-inline-flex align-items-center justify-content-center bg-danger text-white rounded-circle" style={{ width: "50px", height: "50px" }}>
              <HiOutlineLockClosed size={24} />
            </span>
          </div>
          <h3 className="mb-1">SafeGuard</h3>
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
      </div>
    </div>
  );
};

export default Login;
