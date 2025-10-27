import React, { useState } from "react";
import "./GoalsList.css";

const GoalsList = ({ goals, onGoalsChange, loading }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
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

  const [showHistory, setShowHistory] = useState(false);
  const [historyEntries, setHistoryEntries] = useState([]);
  const [historyGoalName, setHistoryGoalName] = useState("");
  const [historyLoading, setHistoryLoading] = useState(false);

  if (loading) {
    return (
      <div className="goals-list-container">
        <div className="loading">Loading goals...</div>
      </div>
    );
  }

  const fetchHistory = async (goalId, goalName) => {
    setHistoryLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/api/goals/${goalId}/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok && data.data) {
        // Get progress history and sort newest first
        const progressHistory = Array.isArray(data.data.progressHistory)
          ? data.data.progressHistory
          : [];
        progressHistory.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setHistoryEntries(progressHistory);
        setHistoryGoalName(goalName || "History");
        setShowHistory(true);
      } else {
        alert(data.message || "Failed to fetch history");
      }
    } catch (err) {
      console.error("Error fetching history", err);
      alert("Network error while fetching history");
    } finally {
      setHistoryLoading(false);
    }
  };

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
                    const newName = window.prompt(
                      "Enter new goal name",
                      goal.goalName
                    );
                    if (!newName || newName.trim() === "") return;
                    try {
                      const token = localStorage.getItem("token");
                      const res = await fetch(
                        `http://localhost:5000/api/goals/${goal._id}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({ goalName: newName }),
                        }
                      );

                      const data = await res.json();
                      if (res.ok) {
                        alert("Goal updated");
                        if (onGoalsChange) onGoalsChange();
                      } else {
                        alert(data.message || "Failed to update goal");
                      }
                    } catch (err) {
                      console.error(err);
                      alert("Network error while updating goal");
                    }
                  }}
                >
                  Edit
                </button>

                <button
                  className="action-btn delete-btn"
                  onClick={async () => {
                    if (
                      !window.confirm(
                        "Are you sure you want to delete this goal?"
                      )
                    )
                      return;
                    try {
                      const token = localStorage.getItem("token");
                      const res = await fetch(
                        `http://localhost:5000/api/goals/${goal._id}`,
                        {
                          method: "DELETE",
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );
                      const data = await res.json();
                      if (res.ok) {
                        alert("Goal deleted");
                        if (onGoalsChange) onGoalsChange();
                      } else {
                        alert(data.message || "Failed to delete goal");
                      }
                    } catch (err) {
                      console.error(err);
                      alert("Network error while deleting goal");
                    }
                  }}
                >
                  Delete
                </button>

                <button
                  className="action-btn history-btn"
                  onClick={async () => {
                    await fetchHistory(goal._id, goal.goalName);
                  }}
                >
                  History
                </button>

                <button
                  className="action-btn progress-btn"
                  onClick={async () => {
                    // Prompt for an amount to ADD to the current amount (increment)
                    const val = window.prompt(
                      `Current Amount: ${formatCurrency(
                        goal.currentAmount || 0
                      )}\n\nEnter amount to add:`,
                      "0"
                    );
                    if (val === null) return;
                    const num = parseFloat(val);
                    if (isNaN(num) || num < 0) {
                      alert("Please enter a valid non-negative number");
                      return;
                    }

                    // Optional note for this contribution
                    const note = window.prompt("Add a note (optional):", "");

                    try {
                      const token = localStorage.getItem("token");
                      const payload = { currentAmount: num };
                      if (note && note.trim()) {
                        payload.note = note.trim();
                      }

                      const res = await fetch(
                        `http://localhost:5000/api/goals/${goal._id}/progress`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(payload),
                        }
                      );
                      const data = await res.json();
                      if (res.ok) {
                        const newTotal = (goal.currentAmount || 0) + num;
                        alert(
                          `Progress updated!\n\n` +
                            `Previous: ${formatCurrency(
                              goal.currentAmount || 0
                            )}\n` +
                            `Added: ${formatCurrency(num)}\n` +
                            `New Total: ${formatCurrency(newTotal)}\n\n` +
                            `This update has been saved to your history.`
                        );
                        if (onGoalsChange) onGoalsChange();
                      } else {
                        alert(data.message || "Failed to update progress");
                      }
                    } catch (err) {
                      console.error(err);
                      alert("Network error while updating progress");
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

      {showHistory && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
          onClick={() => setShowHistory(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "90%",
              maxWidth: "600px",
              background: "white",
              borderRadius: "8px",
              padding: "1rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <h3 style={{ margin: 0 }}>{historyGoalName} - History</h3>
              <button
                className="history-btn"
                onClick={() => setShowHistory(false)}
                style={{ padding: "0.25rem 0.5rem" }}
              >
                Close
              </button>
            </div>

            {historyLoading ? (
              <div>Loading history...</div>
            ) : historyEntries.length === 0 ? (
              <div
                style={{ padding: "1rem", textAlign: "center", color: "#666" }}
              >
                <p>No progress updates yet for this goal.</p>
                <p style={{ fontSize: "0.9rem" }}>
                  Updates will appear here when you add contributions.
                </p>
              </div>
            ) : (
              <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
                <div
                  style={{
                    marginBottom: "1rem",
                    padding: "0.75rem",
                    background: "#f3f4f6",
                    borderRadius: "4px",
                  }}
                >
                  <strong>Total Contributions:</strong> {historyEntries.length}
                </div>
                {historyEntries.map((entry, idx) => (
                  <div
                    key={idx}
                    style={{
                      borderBottom: "1px solid #eee",
                      padding: "0.75rem 0",
                      background: idx % 2 === 0 ? "#fafafa" : "white",
                      marginBottom: "0.25rem",
                      borderRadius: "4px",
                      paddingLeft: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                        fontWeight: "bold",
                        color: "#1f2937",
                      }}
                    >
                      <span>#{historyEntries.length - idx}</span>
                      <span
                        style={{
                          fontSize: "0.9rem",
                          color: "#6b7280",
                          fontWeight: "normal",
                        }}
                      >
                        {new Date(entry.timestamp).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "0.25rem",
                          }}
                        >
                          Previous Amount
                        </div>
                        <div
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: "500",
                            color: "#374151",
                          }}
                        >
                          {formatCurrency(entry.previousAmount || 0)}
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "0.25rem",
                          }}
                        >
                          Added
                        </div>
                        <div
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            color: entry.amount >= 0 ? "#10b981" : "#ef4444",
                          }}
                        >
                          {entry.amount >= 0 ? "+" : ""}
                          {formatCurrency(entry.amount || 0)}
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "0.25rem",
                          }}
                        >
                          New Total
                        </div>
                        <div
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            color: "#1f2937",
                          }}
                        >
                          {formatCurrency(entry.newAmount || 0)}
                        </div>
                      </div>
                    </div>

                    {entry.action && (
                      <div style={{ marginTop: "0.5rem" }}>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            padding: "0.25rem 0.5rem",
                            background:
                              entry.action === "contribution"
                                ? "#dbeafe"
                                : "#fef3c7",
                            color:
                              entry.action === "contribution"
                                ? "#1e40af"
                                : "#92400e",
                            borderRadius: "12px",
                            textTransform: "capitalize",
                          }}
                        >
                          {entry.action}
                        </span>
                      </div>
                    )}

                    {entry.note && (
                      <div
                        style={{
                          marginTop: "0.5rem",
                          fontSize: "0.9rem",
                          color: "#4b5563",
                          fontStyle: "italic",
                          padding: "0.5rem",
                          background: "#f9fafb",
                          borderLeft: "3px solid #d1d5db",
                          borderRadius: "2px",
                        }}
                      >
                        💬 {entry.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsList;
