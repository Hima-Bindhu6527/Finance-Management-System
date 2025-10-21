import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isInvestDropdownOpen, setIsInvestDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const investmentCategories = [
    "Mutual Fund",
    "ULIP",
    "Gold",
    "PMS",
    "LiquiLoans",
    "Insurance",
    "Protection",
    "Unlisted Stocks",
  ];

  const toggleInvestDropdown = () => {
    setIsInvestDropdownOpen(!isInvestDropdownOpen);
  };

  const handleCategoryClick = (category) => {
    const route = `/invest/${category.toLowerCase().replace(/\s+/g, "-")}`;
    navigate(route);
    setIsInvestDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsInvestDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">💰</span>
          FinCart
        </Link>

        <ul className="navbar-menu">
          {isAuthenticated ? (
            <>
              <li className="navbar-item">
                <Link to="/dashboard" className="navbar-link">
                  Dashboard
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/plan" className="navbar-link">
                  Plan
                </Link>
              </li>
              <li className="navbar-item navbar-dropdown" ref={dropdownRef}>
                <button
                  className="navbar-link dropdown-toggle"
                  onClick={toggleInvestDropdown}
                >
                  Invest <span className="dropdown-arrow">▼</span>
                </button>
                {isInvestDropdownOpen && (
                  <ul className="dropdown-menu">
                    {investmentCategories.map((category, index) => (
                      <li key={index} className="dropdown-item">
                        <button
                          className="dropdown-link"
                          onClick={() => handleCategoryClick(category)}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className="navbar-item">
                <Link to="/report" className="navbar-link">
                  Report
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/tools" className="navbar-link">
                  Tools
                </Link>
              </li>
              <li className="navbar-item navbar-user">
                <span className="user-welcome">Hello, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="navbar-button logout-btn"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/signup" className="navbar-button">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
