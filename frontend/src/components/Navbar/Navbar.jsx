import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isInvestDropdownOpen, setIsInvestDropdownOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const investDropdownRef = useRef(null);
  const toolsDropdownRef = useRef(null);

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

  const calculators = [
    { name: "SIP Calculator", route: "sip-calculator" },
    { name: "PPF Calculator", route: "ppf-calculator" },
    { name: "EMI Calculator", route: "emi-calculator" },
    { name: "FD Calculator", route: "fd-calculator" },
    { name: "SWP Calculator", route: "swp-calculator" },
  ];

  const toggleInvestDropdown = () => {
    setIsInvestDropdownOpen(!isInvestDropdownOpen);
    setIsToolsDropdownOpen(false);
  };

  const toggleToolsDropdown = () => {
    setIsToolsDropdownOpen(!isToolsDropdownOpen);
    setIsInvestDropdownOpen(false);
  };

  const handleCategoryClick = (category) => {
    const route = `/invest/${category.toLowerCase().replace(/\s+/g, "-")}`;
    navigate(route);
    setIsInvestDropdownOpen(false);
  };

  const handleCalculatorClick = (calculatorRoute) => {
    navigate(`/tools/${calculatorRoute}`);
    setIsToolsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        investDropdownRef.current &&
        !investDropdownRef.current.contains(event.target)
      ) {
        setIsInvestDropdownOpen(false);
      }
      if (
        toolsDropdownRef.current &&
        !toolsDropdownRef.current.contains(event.target)
      ) {
        setIsToolsDropdownOpen(false);
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
              <li
                className="navbar-item navbar-dropdown"
                ref={investDropdownRef}
              >
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
              <li
                className="navbar-item navbar-dropdown"
                ref={toolsDropdownRef}
              >
                <button
                  className="navbar-link dropdown-toggle"
                  onClick={toggleToolsDropdown}
                >
                  Tools <span className="dropdown-arrow">▼</span>
                </button>
                {isToolsDropdownOpen && (
                  <ul className="dropdown-menu">
                    {calculators.map((calculator, index) => (
                      <li key={index} className="dropdown-item">
                        <button
                          className="dropdown-link"
                          onClick={() =>
                            handleCalculatorClick(calculator.route)
                          }
                        >
                          {calculator.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
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
