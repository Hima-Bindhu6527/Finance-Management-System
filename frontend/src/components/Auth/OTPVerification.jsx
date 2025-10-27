import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { verifyOTP, resendOTP } from "../../utils/api";
import "./OTPVerification.css";

const OTPVerification = ({
  userId,
  email,
  userName,
  isSignup = false,
  onBack,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    // Countdown timer for resend
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) {
      setError("Please paste only numbers");
      return;
    }

    const newOtp = pastedData.split("");
    while (newOtp.length < 6) newOtp.push("");
    setOtp(newOtp);

    // Focus last filled input or last input
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setError("Please enter complete OTP");
      return;
    }

    setLoading(true);

    try {
      const data = await verifyOTP({ userId, otp: otpString });

      if (data.success) {
        // Update auth context with user data
        setUser(data.user);

        setSuccessMessage(
          isSignup
            ? "Account verified! Redirecting..."
            : "Login successful! Redirecting..."
        );
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (err) {
      const message = err.response?.data?.message || "Invalid OTP";
      setError(message);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend || resendLoading) return;

    setResendLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const data = await resendOTP(userId);

      if (data.success) {
        setSuccessMessage("New OTP sent to your email!");
        setResendTimer(60);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to resend OTP";
      setError(message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <div className="otp-header">
          <div className="otp-icon">🔐</div>
          <h2>Verify Your Email</h2>
          <p>We've sent a 6-digit verification code to</p>
          <p className="otp-email">{email}</p>
        </div>

        {error && <div className="otp-error-message">{error}</div>}

        {successMessage && (
          <div className="otp-success-message">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-inputs-wrapper">
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="otp-input"
                  disabled={loading}
                  autoComplete="off"
                />
              ))}
            </div>
            {resendTimer <= 30 && (
              <div
                className={`otp-timer ${resendTimer <= 10 ? "warning" : ""}`}
              >
                Time remaining: {resendTimer}s
              </div>
            )}
          </div>

          <button
            type="submit"
            className="otp-submit-button"
            disabled={loading || otp.join("").length !== 6}
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>
        </form>

        <div className="otp-actions">
          <div className="otp-resend-section">
            <p
              style={{
                margin: "0 0 0.5rem 0",
                color: "#666",
                fontSize: "0.9rem",
              }}
            >
              Didn't receive the code?
            </p>
            {canResend ? (
              <button
                onClick={handleResend}
                className="otp-resend-button"
                disabled={resendLoading}
              >
                {resendLoading ? "Sending..." : "Resend Code"}
              </button>
            ) : (
              <p className="otp-resend-timer">
                Resend available in {resendTimer}s
              </p>
            )}
          </div>

          <button
            onClick={onBack}
            className="otp-back-button"
            disabled={loading}
          >
            ← Back to {isSignup ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
