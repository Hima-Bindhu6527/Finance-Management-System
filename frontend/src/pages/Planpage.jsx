import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import CreateGoal from "../components/CreateGoal";
import CreateFinancialPlan from "../components/CreateFinancialPlan";
import GoalsList from "../components/GoalsList";
import FinancialPlansList from "../components/FinancialPlansList";
import IncomeExpenseTracker from "../components/IncomeExpenseTracker";
import "./Planpage.css";

const PlanPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [goals, setGoals] = useState([]);
  const [financialPlans, setFinancialPlans] = useState([]);
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

  const fetchFinancialPlans = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/financial-plans",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFinancialPlans(data.data);
      }
    } catch (error) {
      console.error("Error fetching financial plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const location = useLocation();

  // Apply tab from navigation state or query only when the location changes.
  useEffect(() => {
    try {
      const stateTab = location && location.state && location.state.tab;
      const params = new URLSearchParams(location && location.search ? location.search : window.location.search);
      const queryTab = params.get('tab');
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

  // Fetch data when activeTab changes. Separate effect prevents location-state from
  // overriding user tab switches after navigation.
  useEffect(() => {
    if (activeTab === "overview" || activeTab === "goals") {
      fetchGoals();
    }
    if (activeTab === "overview" || activeTab === "financial-plans") {
      fetchFinancialPlans();
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
                <div className="card-icon">📊</div>
                <h3>Create Financial Plan</h3>
                <p>
                  Build a comprehensive financial plan tailored to your needs
                </p>
                <button
                  className="card-button"
                  onClick={() => setActiveTab("create-plan")}
                >
                  Create Financial Plan
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
                <h4>Financial Plans</h4>
                <span className="stat-number">{financialPlans.length}</span>
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

      case "create-plan":
        return (
          <CreateFinancialPlan
            onPlanCreated={() => {
              fetchFinancialPlans();
              setActiveTab("financial-plans");
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

      case "financial-plans":
        return (
          <FinancialPlansList
            plans={financialPlans}
            onPlansChange={fetchFinancialPlans}
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
      <div className="plan-header">
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
          className={`tab-button ${activeTab === "financial-plans" ? "active" : ""
            }`}
          onClick={() => setActiveTab("financial-plans")}
        >
          Financial Plans
        </button>
        <button
          className={`tab-button ${activeTab === "create-goal" ? "active" : ""
            }`}
          onClick={() => setActiveTab("create-goal")}
        >
          Create Goal
        </button>
        <button
          className={`tab-button ${activeTab === "create-plan" ? "active" : ""
            }`}
          onClick={() => setActiveTab("create-plan")}
        >
          Create Plan
        </button>
        <button
          className={`tab-button ${activeTab === "income-expense" ? "active" : ""
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
