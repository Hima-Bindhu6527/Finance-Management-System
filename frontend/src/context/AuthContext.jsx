import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
import {
  login as loginApi,
  signup as signupApi,
  logout as logoutApi,
} from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSessionTimeout, setShowSessionTimeout] = useState(false);
  const sessionCheckIntervalRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const lastActivityRef = useRef(Date.now());

  // Session timeout duration (1 hour = 3600000 ms)
  const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 hour
  const WARNING_TIME = 5 * 60 * 1000; // Show warning 5 minutes before timeout

  // Update last activity time
  const updateActivity = () => {
    lastActivityRef.current = Date.now();
    localStorage.setItem("lastActivity", Date.now().toString());
  };

  // Reset inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    // Set timer to show warning before session expires
    inactivityTimerRef.current = setTimeout(() => {
      setShowSessionTimeout(true);
    }, SESSION_TIMEOUT - WARNING_TIME);
  };

  // Extend session
  const extendSession = () => {
    updateActivity();
    setShowSessionTimeout(false);
    resetInactivityTimer();
  };

  // Handle session timeout
  const handleSessionTimeout = async () => {
    setShowSessionTimeout(false);
    await logout();
    alert("Your session has expired due to inactivity. Please log in again.");
    window.location.href = "/login";
  };
  const checkSessionValidity = async () => {
    const token = localStorage.getItem("token");
    if (!token || !user) return;

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      // Make a lightweight API call to verify token
      await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      if (err.response?.data?.code === "SESSION_REPLACED") {
        // Session replaced - logout user
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        alert(
          "You have been logged out because you logged in from another device."
        );
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const lastActivity = localStorage.getItem("lastActivity");

    if (token && userData) {
      setUser(JSON.parse(userData));

      // Check if session has expired
      if (lastActivity) {
        const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
        if (timeSinceLastActivity > SESSION_TIMEOUT) {
          // Session expired
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("lastActivity");
          alert("Your session has expired. Please log in again.");
          window.location.href = "/login";
          return;
        }
        lastActivityRef.current = parseInt(lastActivity);
      } else {
        updateActivity();
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Set up periodic session validity check (every 30 seconds)
    if (user) {
      // Initial check
      checkSessionValidity();

      // Start inactivity timer
      resetInactivityTimer();

      // Set up interval
      sessionCheckIntervalRef.current = setInterval(
        checkSessionValidity,
        30000
      );

      // Track user activity
      const activityEvents = [
        "mousedown",
        "keydown",
        "scroll",
        "touchstart",
        "click",
      ];

      const handleUserActivity = () => {
        updateActivity();
        if (!showSessionTimeout) {
          resetInactivityTimer();
        }
      };

      activityEvents.forEach((event) => {
        window.addEventListener(event, handleUserActivity);
      });

      // Check session when tab becomes visible
      const handleVisibilityChange = () => {
        if (!document.hidden) {
          checkSessionValidity();

          // Check if session expired while tab was hidden
          const timeSinceLastActivity = Date.now() - lastActivityRef.current;
          if (timeSinceLastActivity > SESSION_TIMEOUT) {
            handleSessionTimeout();
          }
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      // Cleanup
      return () => {
        if (sessionCheckIntervalRef.current) {
          clearInterval(sessionCheckIntervalRef.current);
          sessionCheckIntervalRef.current = null;
        }
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current);
          inactivityTimerRef.current = null;
        }
        activityEvents.forEach((event) => {
          window.removeEventListener(event, handleUserActivity);
        });
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    } else {
      // Clear interval if user logs out
      if (sessionCheckIntervalRef.current) {
        clearInterval(sessionCheckIntervalRef.current);
        sessionCheckIntervalRef.current = null;
      }
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }
    }
  }, [user, showSessionTimeout]);

  const login = async (email, password) => {
    try {
      setError(null);
      const data = await loginApi({ email, password });
      setUser(data.user);
      updateActivity(); // Set activity timestamp on login
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      return { success: false, message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      setError(null);
      const data = await signupApi({ name, email, password });
      setUser(data.user);
      updateActivity(); // Set activity timestamp on signup
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Signup failed";
      setError(message);
      return { success: false, message };
    }
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
    localStorage.removeItem("lastActivity");
    setShowSessionTimeout(false);
  };

  const value = {
    user,
    setUser,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    showSessionTimeout,
    extendSession,
    handleSessionTimeout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
