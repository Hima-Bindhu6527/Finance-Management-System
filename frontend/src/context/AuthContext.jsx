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
  const sessionCheckIntervalRef = useRef(null);

  // Function to check if session is still valid
  const checkSessionValidity = async () => {
    const token = localStorage.getItem("token");
    if (!token || !user) return;

    try {
      // Make a lightweight API call to verify token
      await axios.get("http://localhost:5000/api/auth/me", {
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

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Set up periodic session validity check (every 30 seconds)
    if (user) {
      // Initial check
      checkSessionValidity();

      // Set up interval
      sessionCheckIntervalRef.current = setInterval(
        checkSessionValidity,
        30000
      );

      // Check session when tab becomes visible
      const handleVisibilityChange = () => {
        if (!document.hidden) {
          checkSessionValidity();
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      // Cleanup
      return () => {
        if (sessionCheckIntervalRef.current) {
          clearInterval(sessionCheckIntervalRef.current);
          sessionCheckIntervalRef.current = null;
        }
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
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      setError(null);
      const data = await loginApi({ email, password });
      setUser(data.user);
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
