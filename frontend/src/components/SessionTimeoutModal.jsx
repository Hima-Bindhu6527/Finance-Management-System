import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./SessionTimeoutModal.css";

const SessionTimeoutModal = () => {
  const { showSessionTimeout, extendSession, handleSessionTimeout } = useAuth();
  const [countdown, setCountdown] = useState(5 * 60); // 5 minutes in seconds

  useEffect(() => {
    if (showSessionTimeout) {
      setCountdown(5 * 60);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSessionTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showSessionTimeout]);

  if (!showSessionTimeout) return null;

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="session-timeout-overlay">
      <div className="session-timeout-modal">
        <div className="session-timeout-icon">⏰</div>
        <h2>Session Timeout Warning</h2>
        <p>Your session is about to expire due to inactivity.</p>
        <p className="session-timeout-countdown">
          Time remaining:{" "}
          <strong>
            {minutes}:{seconds.toString().padStart(2, "0")}
          </strong>
        </p>
        <p className="session-timeout-message">
          Would you like to continue your session?
        </p>
        <div className="session-timeout-buttons">
          <button className="session-btn extend-btn" onClick={extendSession}>
            ✓ Continue Session
          </button>
          <button
            className="session-btn logout-btn"
            onClick={handleSessionTimeout}
          >
            ✕ Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeoutModal;
