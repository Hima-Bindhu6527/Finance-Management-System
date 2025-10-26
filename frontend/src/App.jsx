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
import ToolsPage from "./pages/ToolsPage";
import ProfilePage from "./pages/ProfilePage";
// Investment Category Components
import MutualFund from "./components/Investment/Categories/MutualFund";
import Gold from "./components/Investment/Categories/Gold";
import Insurance from "./components/Investment/Categories/Insurance";
import Stocks from "./components/Investment/Categories/Stocks";
import Cryptocurrency from "./components/Investment/Categories/Cryptocurrency";
import ETF from "./components/Investment/Categories/ETF";
import Bonds from "./components/Investment/Categories/Bonds";
import FixedDeposits from "./components/Investment/Categories/FixedDeposits";
import RealEstate from "./components/Investment/Categories/RealEstate";
import Report from "./pages/Report";
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
                      <p>Student 1 - Somalingam Neelesh - 231IT074</p>
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
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
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
            path="/invest/gold"
            element={
              <ProtectedRoute>
                <Gold />
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
            path="/invest/stocks"
            element={
              <ProtectedRoute>
                <Stocks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invest/cryptocurrency"
            element={
              <ProtectedRoute>
                <Cryptocurrency />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invest/etf"
            element={
              <ProtectedRoute>
                <ETF />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invest/bonds"
            element={
              <ProtectedRoute>
                <Bonds />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invest/fixed-deposits"
            element={
              <ProtectedRoute>
                <FixedDeposits />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invest/real-estate"
            element={
              <ProtectedRoute>
                <RealEstate />
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
                <Report /> {/* ✅ Navigates to Report.jsx */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/tools/:calculator"
            element={
              <ProtectedRoute>
                <ToolsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tools"
            element={
              <ProtectedRoute>
                <Navigate to="/tools/sip-calculator" replace />
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
