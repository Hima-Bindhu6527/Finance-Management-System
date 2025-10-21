import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import PlanPage from "./pages/Planpage";
// Investment Category Components
import MutualFund from "./components/Investment/Categories/MutualFund";
import ULIP from "./components/Investment/Categories/ULIP";
import Gold from "./components/Investment/Categories/Gold";
import PMS from "./components/Investment/Categories/PMS";
import LiquiLoans from "./components/Investment/Categories/LiquiLoans";
import Insurance from "./components/Investment/Categories/Insurance";
import Protection from "./components/Investment/Categories/Protection";
import UnlistedStocks from "./components/Investment/Categories/UnlistedStocks";
// import About from "./components/about";
import "./App.css";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect to dashboard if logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

function AppRoutes() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-container">
                <div className="home-content">
                  {/* <h1>Welcome to FinCart</h1>
                  <p>Your personal finance management solution</p> */}
                  <div>
                    <h2>SOFTWARE ENGINEERING (IT303)</h2>
                    <h1>PERSONEL FINANCE MANAGEMENT</h1>
                    <div>
                      <p>Carried out by</p>
                      <p>Student 1 - Somanlingam Neelesh - 231IT074</p>
                      <p>Student 2 - Karthik Dodda - 231IT021</p>
                      <p>Student 3 - BK Hima Bindu - 231IT014</p>
                    </div>
                  </div>
                  <div className="home-buttons">
                    <a href="/login" className="home-button primary">
                      Get Started
                    </a>
                    <a href="/signup" className="home-button secondary">
                      Sign Up
                    </a>
                  </div>
                </div>
                <div className="about-content">{/* <About /> */}</div>
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plan"
            element={
              <ProtectedRoute>
                <PlanPage />
              </ProtectedRoute>
            }
          />
          {/* Investment Category Routes */}
          <Route
            path="/invest/mutual-fund"
            element={
              <ProtectedRoute>
                <MutualFund />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invest/ulip"
            element={
              <ProtectedRoute>
                <ULIP />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invest/gold"
            element={
              <ProtectedRoute>
                <Gold />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invest/pms"
            element={
              <ProtectedRoute>
                <PMS />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invest/liquiloans"
            element={
              <ProtectedRoute>
                <LiquiLoans />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invest/insurance"
            element={
              <ProtectedRoute>
                <Insurance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invest/protection"
            element={
              <ProtectedRoute>
                <Protection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invest/unlisted-stocks"
            element={
              <ProtectedRoute>
                <UnlistedStocks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invest"
            element={
              <ProtectedRoute>
                <div className="placeholder-page">
                  <h1>💰 Invest Page</h1>
                  <p>
                    Select an investment category from the dropdown menu above.
                  </p>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <div className="placeholder-page">
                  <h1>💳 Report Page</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tools"
            element={
              <ProtectedRoute>
                <div className="placeholder-page">
                  <h1>🎯 Tools Page</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
