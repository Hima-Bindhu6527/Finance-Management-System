import React, { createContext, useState, useContext, useEffect } from "react";
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

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

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
