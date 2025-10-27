import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { resendOTP } from "../../utils/api";
import "./ResetPassword.css";
import "./OTPVerification.css";

const ResetPassword = ({ userId, email, onBack }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [step, setStep] = useState(1); // 1: OTP, 2: New Password

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 1 && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [step]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleOtpChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
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

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setError("Please enter complete OTP");
      return;
    }

    setStep(2);
    setError("");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            otp: otp.join(""),
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccessMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Failed to reset password");
        // If OTP is invalid, go back to step 1
        if (data.message.includes("OTP")) {
          setStep(1);
          setOtp(["", "", "", "", "", ""]);
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
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
        setStep(1);
        inputRefs.current[0]?.focus();

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
    <div className={step === 1 ? "otp-container" : "reset-password-container"}>
      <div className={step === 1 ? "otp-card" : "reset-password-card"}>
        <div className={step === 1 ? "otp-header" : "reset-password-header"}>
          <div className={step === 1 ? "otp-icon" : "reset-password-icon"}>
            {step === 1 ? "🔐" : "🔑"}
          </div>
          <h2>{step === 1 ? "Verify Your Email" : "Create New Password"}</h2>
          {step === 1 ? (
            <>
              <p>We've sent a 6-digit verification code to</p>
              <p className="otp-email">{email}</p>
            </>
          ) : (
            <p>Enter your new password below</p>
          )}
        </div>

        {error && (
          <div
            className={
              step === 1 ? "otp-error-message" : "reset-password-error"
            }
          >
            {error}
          </div>
        )}

        {successMessage && (
          <div
            className={
              step === 1 ? "otp-success-message" : "reset-password-success"
            }
          >
            {successMessage}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleVerifyOtp} className="otp-form">
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
                    onChange={(e) => handleOtpChange(index, e.target.value)}
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
              {loading ? "Verifying..." : "Continue to Reset Password"}
            </button>

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
                    type="button"
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
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="reset-password-form">
            <div className="reset-password-form-group">
              <label htmlFor="newPassword">New Password *</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 6 characters)"
                required
                autoFocus
              />
            </div>

            <div className="reset-password-form-group">
              <label htmlFor="confirmPassword">Confirm New Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                required
              />
            </div>

            <div className="reset-password-requirements">
              <h4>Password Requirements:</h4>
              <ul>
                <li className={newPassword.length >= 6 ? "" : "invalid"}>
                  At least 6 characters
                </li>
                <li
                  className={
                    newPassword === confirmPassword && newPassword
                      ? ""
                      : "invalid"
                  }
                >
                  Passwords match
                </li>
              </ul>
            </div>

            <button
              type="submit"
              className="reset-password-button"
              disabled={loading}
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        )}

        <div className={step === 1 ? "otp-actions" : "reset-password-footer"}>
          <button
            onClick={onBack}
            className={step === 1 ? "otp-back-button" : "reset-password-link"}
            disabled={loading}
          >
            ← Back to Forgot Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
