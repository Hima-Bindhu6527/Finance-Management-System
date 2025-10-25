import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CreateGoal from "../components/CreateGoal";
import GoalsList from "../components/GoalsList";
import IncomeExpenseTracker from "../components/IncomeExpenseTracker";
import "./Planpage.css";

const PlanPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/goals", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setGoals(data.data);
      }
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setLoading(false);
    }
  };

  const location = useLocation();

  // Apply tab from navigation state or query only when the location changes.
  useEffect(() => {
    try {
      const stateTab = location && location.state && location.state.tab;
      const params = new URLSearchParams(
        location && location.search ? location.search : window.location.search
      );
      const queryTab = params.get("tab");
      if (stateTab) {
        setActiveTab(stateTab);
        return;
      }
      if (queryTab) {
        setActiveTab(queryTab);
        return;
      }
    } catch (e) {
      // ignore
    }
  }, [location]);

  useEffect(() => {
    if (activeTab === "overview" || activeTab === "goals") {
      fetchGoals();
    }
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="overview-container">
            <div className="overview-header">
              <h2>Your Vision, Our Strategy: A Plan for Financial Success</h2>
              <p>
                Take control of your financial future with our comprehensive
                planning tools
              </p>
            </div>

            <div className="overview-cards">
              <div className="overview-card">
                <div className="card-icon">🎯</div>
                <h3>Create New Goal</h3>
                <p>
                  Set and track your financial goals with our easy-to-use goal
                  creator
                </p>
                <button
                  className="card-button"
                  onClick={() => setActiveTab("create-goal")}
                >
                  Create Goal
                </button>
              </div>

              <div className="overview-card">
                <div className="card-icon">💰</div>
                <h3>Track Income & Expenses</h3>
                <p>
                  Monitor your income sources and expenses with detailed
                  analytics
                </p>
                <button
                  className="card-button"
                  onClick={() => setActiveTab("income-expense")}
                >
                  Income & Expenses
                </button>
              </div>
            </div>

            <div className="quick-stats">
              <div className="stat-item">
                <h4>Active Goals</h4>
                <span className="stat-number">
                  {goals.filter((goal) => !goal.isCompleted).length}
                </span>
              </div>
              <div className="stat-item">
                <h4>Completed Goals</h4>
                <span className="stat-number">
                  {goals.filter((goal) => goal.isCompleted).length}
                </span>
              </div>
            </div>
          </div>
        );

      case "create-goal":
        return (
          <CreateGoal
            onGoalCreated={() => {
              fetchGoals();
              setActiveTab("goals");
            }}
          />
        );

      case "goals":
        return (
          <GoalsList
            goals={goals}
            onGoalsChange={fetchGoals}
            loading={loading}
          />
        );

      case "income-expense":
        return <IncomeExpenseTracker />;

      default:
        return null;
    }
  };

  return (
    <div className="plan-page">
      <div className="Plan-Header">
        <h1>Financial Planning</h1>
        <p>Manage your goals and create comprehensive financial plans</p>
      </div>

      <div className="plan-tabs">
        <button
          className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === "goals" ? "active" : ""}`}
          onClick={() => setActiveTab("goals")}
        >
          My Goals
        </button>
        <button
          className={`tab-button ${
            activeTab === "create-goal" ? "active" : ""
          }`}
          onClick={() => setActiveTab("create-goal")}
        >
          Create Goal
        </button>
        <button
          className={`tab-button ${
            activeTab === "income-expense" ? "active" : ""
          }`}
          onClick={() => setActiveTab("income-expense")}
        >
          Income & Expenses
        </button>
      </div>

      <div className="plan-content">{renderTabContent()}</div>
    </div>
  );
};

export default PlanPage;
