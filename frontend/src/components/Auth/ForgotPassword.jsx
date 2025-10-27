import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetData, setResetData] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (data.success && data.requiresOTP) {
        // Show reset password screen
        setResetData({
          userId: data.userId,
          email: data.email,
        });
        setShowReset(true);
      } else if (!data.success) {
        setError(data.message || "Failed to send reset code");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show reset password screen if OTP sent
  if (showReset && resetData) {
    return (
      <ResetPassword
        userId={resetData.userId}
        email={resetData.email}
        onBack={() => {
          setShowReset(false);
          setResetData(null);
          setEmail("");
        }}
      />
    );
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="forgot-password-header">
          <div className="forgot-password-icon">🔑</div>
          <h2>Forgot Password?</h2>
          <p>No worries! Enter your email and we'll send you a reset code</p>
        </div>

        {error && <div className="forgot-password-error">{error}</div>}

        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="forgot-password-form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="forgot-password-button"
            disabled={loading}
          >
            {loading ? "Sending Code..." : "Send Reset Code"}
          </button>
        </form>

        <div className="forgot-password-footer">
          <button
            onClick={() => navigate("/login")}
            className="forgot-password-link"
            disabled={loading}
          >
            ← Back to Login
          </button>
        </div>

        <div className="forgot-password-info">
          <strong>Note:</strong> You'll receive a 6-digit OTP code via email to
          reset your password.
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
