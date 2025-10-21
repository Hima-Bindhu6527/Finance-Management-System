import React from "react";
import "./GoalsList.css";

const GoalsList = ({ goals, onGoalsChange, loading }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateProgress = (current, target) => {
    if (target <= 0) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#ef4444";
      case "Medium":
        return "#f59e0b";
      case "Low":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  if (loading) {
    return (
      <div className="goals-list-container">
        <div className="loading">Loading goals...</div>
      </div>
    );
  }

  return (
    <div className="goals-list-container">
      <div className="goals-list-header">
        <h2>My Goals</h2>
        <p>Track your financial goals and progress</p>
      </div>

      {goals.length === 0 ? (
        <div className="no-goals">
          <div className="no-goals-icon">🎯</div>
          <h3>No Goals Found</h3>
          <p>Start by creating your first financial goal!</p>
        </div>
      ) : (
        <div className="goals-grid">
          {goals.map((goal) => (
            <div key={goal._id} className="goal-card">
              <div className="goal-header">
                <h3 className="goal-name">{goal.goalName}</h3>
                <span
                  className="goal-priority"
                  style={{ backgroundColor: getPriorityColor(goal.priority) }}
                >
                  {goal.priority}
                </span>
              </div>

              <div className="goal-category">
                <span className="category-badge">{goal.category}</span>
              </div>

              <div className="goal-amounts">
                <div className="amount-row">
                  <span>Current:</span>
                  <span className="amount">
                    {formatCurrency(goal.currentAmount || 0)}
                  </span>
                </div>
                <div className="amount-row">
                  <span>Target:</span>
                  <span className="amount">
                    {formatCurrency(goal.targetAmount)}
                  </span>
                </div>
                <div className="amount-row">
                  <span>Monthly:</span>
                  <span className="amount">
                    {formatCurrency(goal.monthlyContribution)}
                  </span>
                </div>
              </div>

              <div className="progress-section">
                <div className="progress-header">
                  <span>Progress</span>
                  <span className="progress-percentage">
                    {calculateProgress(
                      goal.currentAmount || 0,
                      goal.targetAmount
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${calculateProgress(
                        goal.currentAmount || 0,
                        goal.targetAmount
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="goal-dates">
                <div className="date-info">
                  <span>Target Date:</span>
                  <span>{formatDate(goal.targetDate)}</span>
                </div>
                <div className="date-info">
                  <span>Created:</span>
                  <span>{formatDate(goal.createdAt)}</span>
                </div>
              </div>

              {goal.description && (
                <div className="goal-description">
                  <p>{goal.description}</p>
                </div>
              )}

              {goal.isCompleted && (
                <div className="completed-badge">✅ Completed</div>
              )}

              <div className="goal-actions">
                <button
                  className="action-btn edit-btn"
                  onClick={async () => {
                    const newName = window.prompt('Enter new goal name', goal.goalName);
                    if (!newName || newName.trim() === '') return;
                    try {
                      const token = localStorage.getItem('token');
                      const res = await fetch(`http://localhost:5000/api/goals/${goal._id}`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ goalName: newName }),
                      });

                      const data = await res.json();
                      if (res.ok) {
                        alert('Goal updated');
                        if (onGoalsChange) onGoalsChange();
                      } else {
                        alert(data.message || 'Failed to update goal');
                      }
                    } catch (err) {
                      console.error(err);
                      alert('Network error while updating goal');
                    }
                  }}
                >
                  Edit
                </button>

                <button
                  className="action-btn progress-btn"
                  onClick={async () => {
                    const val = window.prompt('Enter new current amount', String(goal.currentAmount || 0));
                    if (val === null) return;
                    const num = parseFloat(val);
                    if (isNaN(num) || num < 0) {
                      alert('Please enter a valid non-negative number');
                      return;
                    }
                    try {
                      const token = localStorage.getItem('token');
                      const res = await fetch(`http://localhost:5000/api/goals/${goal._id}/progress`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ currentAmount: num }),
                      });
                      const data = await res.json();
                      if (res.ok) {
                        alert('Progress updated');
                        if (onGoalsChange) onGoalsChange();
                      } else {
                        alert(data.message || 'Failed to update progress');
                      }
                    } catch (err) {
                      console.error(err);
                      alert('Network error while updating progress');
                    }
                  }}
                >
                  Update Progress
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalsList;
