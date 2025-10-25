import React from "react";

const FinancialPlansList = ({ plans, onPlansChange, loading }) => {
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <div>Loading financial plans...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            color: "#333",
            marginBottom: "0.5rem",
            fontWeight: "600",
          }}
        >
          My Financial Plans
        </h2>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>
          Manage your comprehensive financial plans
        </p>
      </div>

      {plans.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            background: "white",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📊</div>
          <h3
            style={{ color: "#333", marginBottom: "1rem", fontSize: "1.5rem" }}
          >
            No Financial Plans Found
          </h3>
          <p style={{ color: "#666", fontSize: "1.1rem" }}>
            Start by creating your first comprehensive financial plan!
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "2rem",
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan._id}
              style={{
                background: "white",
                borderRadius: "15px",
                padding: "1.5rem",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e2e8f0",
              }}
            >
              <h3
                style={{
                  color: "#333",
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                {plan.planName}
              </h3>

              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span style={{ color: "#666" }}>Created:</span>
                  <span style={{ color: "#333", fontWeight: "500" }}>
                    {new Date(plan.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span style={{ color: "#666" }}>Goals:</span>
                  <span style={{ color: "#333", fontWeight: "500" }}>
                    {plan.goals?.length || 0}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ color: "#666" }}>Status:</span>
                  <span
                    style={{
                      color: plan.isCompleted ? "#10b981" : "#f59e0b",
                      fontWeight: "500",
                    }}
                  >
                    {plan.isCompleted ? "Completed" : "In Progress"}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginTop: "1rem",
                }}
              >
                <button
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    border: "none",
                    borderRadius: "8px",
                    background: "#f0f4f8",
                    color: "#667eea",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                  onClick={() => alert("View details not implemented yet")}
                >
                  View Details
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    border: "none",
                    borderRadius: "8px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                  onClick={async () => {
                    const newName = window.prompt(
                      "Enter new plan name",
                      plan.planName
                    );
                    if (!newName || newName.trim() === "") return;
                    try {
                      const token = localStorage.getItem("token");
                      const res = await fetch(
                        `http://localhost:5000/api/financial-plans/${plan._id}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({ planName: newName }),
                        }
                      );
                      const data = await res.json();
                      if (res.ok) {
                        alert("Plan updated");
                        if (onPlansChange) onPlansChange();
                      } else {
                        alert(data.message || "Failed to update plan");
                      }
                    } catch (err) {
                      console.error(err);
                      alert("Network error while updating plan");
                    }
                  }}
                >
                  Edit Plan
                </button>

                <button
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    border: "none",
                    borderRadius: "8px",
                    background: "#ffe4e6",
                    color: "#c53030",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                  onClick={async () => {
                    if (
                      !window.confirm(
                        "Are you sure you want to delete this financial plan?"
                      )
                    )
                      return;
                    try {
                      const token = localStorage.getItem("token");
                      const res = await fetch(
                        `http://localhost:5000/api/financial-plans/${plan._id}`,
                        {
                          method: "DELETE",
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );
                      const data = await res.json();
                      if (res.ok) {
                        alert("Plan deleted");
                        if (onPlansChange) onPlansChange();
                      } else {
                        alert(data.message || "Failed to delete plan");
                      }
                    } catch (err) {
                      console.error(err);
                      alert("Network error while deleting plan");
                    }
                  }}
                >
                  Delete Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FinancialPlansList;
