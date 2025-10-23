import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import "./IncomeExpenseTracker.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const IncomeExpenseTracker = () => {
  const [incomeExpenseData, setIncomeExpenseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("income");

  // Form states
  const [incomeForm, setIncomeForm] = useState({
    name: "",
    amount: "",
    period: "Monthly",
  });

  const [expenseForm, setExpenseForm] = useState({
    category: "",
    amount: "",
    period: "Monthly",
  });

  const fetchIncomeExpenseData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/income-expense", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIncomeExpenseData(data.data);
      }
    } catch (error) {
      console.error("Error fetching income/expense data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeExpenseData();
  }, []);

  const addIncomeSource = async (e) => {
    e.preventDefault();
    if (!incomeForm.name || !incomeForm.amount) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/income-expense/income",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(incomeForm),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIncomeExpenseData(data.data);
        setIncomeForm({ name: "", amount: "", period: "Monthly" });
      }
    } catch (error) {
      console.error("Error adding income source:", error);
    }
  };

  const addExpenseCategory = async (e) => {
    e.preventDefault();
    if (!expenseForm.category || !expenseForm.amount) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/income-expense/expense",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expenseForm),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIncomeExpenseData(data.data);
        setExpenseForm({ category: "", amount: "", period: "Monthly" });
      }
    } catch (error) {
      console.error("Error adding expense category:", error);
    }
  };

  const deleteIncomeSource = async (incomeId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/income-expense/income/${incomeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIncomeExpenseData(data.data);
      }
    } catch (error) {
      console.error("Error deleting income source:", error);
    }
  };

  const deleteExpenseCategory = async (expenseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/income-expense/expense/${expenseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIncomeExpenseData(data.data);
      }
    } catch (error) {
      console.error("Error deleting expense category:", error);
    }
  };

  // Assets handlers
  const [assetForm, setAssetForm] = useState({
    type: "MutualFund",
    name: "",
    currentValue: "",
  });
  const [editingAssetId, setEditingAssetId] = useState(null);

  const addOrUpdateAsset = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (editingAssetId) {
        const response = await fetch(
          `http://localhost:5000/api/income-expense/asset/${editingAssetId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...assetForm,
              currentValue: Number(assetForm.currentValue),
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIncomeExpenseData(data.data);
          setAssetForm({ type: "MutualFund", name: "", currentValue: "" });
          setEditingAssetId(null);
        }
      } else {
        const response = await fetch(
          "http://localhost:5000/api/income-expense/asset",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...assetForm,
              currentValue: Number(assetForm.currentValue),
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIncomeExpenseData(data.data);
          setAssetForm({ type: "MutualFund", name: "", currentValue: "" });
        }
      }
    } catch (error) {
      console.error("Error adding/updating asset:", error);
    }
  };

  const editAsset = (asset) => {
    setEditingAssetId(asset._id);
    setAssetForm({
      type: asset.type,
      name: asset.name,
      currentValue: asset.currentValue,
    });
    setActiveSection("assets");
  };

  const deleteAsset = async (assetId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/income-expense/asset/${assetId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIncomeExpenseData(data.data);
      }
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  const generateIncomeChartData = () => {
    if (!incomeExpenseData || !incomeExpenseData.incomes.length) return null;

    return {
      labels: incomeExpenseData.incomes.map((income) => income.name),
      datasets: [
        {
          data: incomeExpenseData.incomes.map((income) => income.monthlyAmount),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#FF6384",
            "#C9CBCF",
          ],
          borderWidth: 2,
        },
      ],
    };
  };

  const generateExpenseChartData = () => {
    if (!incomeExpenseData || !incomeExpenseData.expenses.length) return null;

    return {
      labels: incomeExpenseData.expenses.map((expense) => expense.category),
      datasets: [
        {
          data: incomeExpenseData.expenses.map(
            (expense) => expense.monthlyAmount
          ),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#FF6384",
            "#C9CBCF",
          ],
          borderWidth: 2,
        },
      ],
    };
  };

  const generateAssetChartData = () => {
    if (!incomeExpenseData || !incomeExpenseData.assets || !incomeExpenseData.assets.length) return null;

    return {
      labels: incomeExpenseData.assets.map((asset) => asset.name),
      datasets: [
        {
          data: incomeExpenseData.assets.map((asset) => asset.currentValue),
          backgroundColor: [
            "#8B5CF6",
            "#10B981",
            "#F59E0B",
            "#EF4444",
            "#3B82F6",
            "#EC4899",
            "#6366F1",
            "#84CC16",
          ],
          borderWidth: 2,
        },
      ],
    };
  };

  const generateSavingsPlanChartData = () => {
    if (!incomeExpenseData) return null;

    return {
      labels: ["Essentials (50%)", "Savings (20%)", "Discretionary (30%)"],
      datasets: [
        {
          label: "Amount (₹)",
          data: [
            incomeExpenseData.savingsPlan.essentials,
            incomeExpenseData.savingsPlan.savings,
            incomeExpenseData.savingsPlan.discretionary,
          ],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          borderWidth: 2,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `₹${context.parsed.toLocaleString()}`;
          },
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `₹${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return "₹" + value.toLocaleString();
          },
        },
      },
    },
  };

  if (loading) {
    return <div className="loading">Loading income and expense data...</div>;
  }

  return (
    <div className="income-expense-tracker">
      <div className="tracker-header">
        <h2>💰 Income & Expense Tracker</h2>
        <p>
          Track your income sources and expenses to get personalized financial
          insights
        </p>
      </div>

      <div className="tracker-tabs">
        <button
          className={`tracker-tab ${activeSection === "income" ? "active" : ""
            }`}
          onClick={() => setActiveSection("income")}
        >
          📈 Income
        </button>
        <button
          className={`tracker-tab ${activeSection === "expenses" ? "active" : ""
            }`}
          onClick={() => setActiveSection("expenses")}
        >
          📊 Expenses
        </button>
        <button
          className={`tracker-tab ${activeSection === "assets" ? "active" : ""
            }`}
          onClick={() => setActiveSection("assets")}
        >
          🧾 Assets
        </button>
        <button
          className={`tracker-tab ${activeSection === "analysis" ? "active" : ""
            }`}
          onClick={() => setActiveSection("analysis")}
        >
          📋 Analysis
        </button>
      </div>

      {activeSection === "income" && (
        <div className="income-section">
          <div className="section-grid">
            <div className="form-container">
              <h3>Add Income Source</h3>
              <form onSubmit={addIncomeSource} className="income-form">
                <div className="form-group">
                  <label>Source Name *</label>
                  <input
                    type="text"
                    value={incomeForm.name}
                    onChange={(e) =>
                      setIncomeForm({ ...incomeForm, name: e.target.value })
                    }
                    placeholder="e.g., Salary, Freelancing"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Amount (₹) *</label>
                  <input
                    type="number"
                    value={incomeForm.amount}
                    onChange={(e) =>
                      setIncomeForm({ ...incomeForm, amount: e.target.value })
                    }
                    placeholder="Enter amount"
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Period</label>
                  <select
                    value={incomeForm.period}
                    onChange={(e) =>
                      setIncomeForm({ ...incomeForm, period: e.target.value })
                    }
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
                <button type="submit" className="add-btn">
                  Add Income Source
                </button>
              </form>
            </div>

            <div className="data-container">
              <h3>Income Sources</h3>
              {incomeExpenseData && incomeExpenseData.incomes.length > 0 ? (
                <div className="data-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Source</th>
                        <th>Amount</th>
                        <th>Period</th>
                        <th>Monthly</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {incomeExpenseData.incomes.map((income) => (
                        <tr key={income._id}>
                          <td>{income.name}</td>
                          <td>₹{income.amount.toLocaleString()}</td>
                          <td>{income.period}</td>
                          <td>₹{income.monthlyAmount.toLocaleString()}</td>
                          <td>
                            <button
                              onClick={() => deleteIncomeSource(income._id)}
                              className="delete-btn"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="total-row">
                    <strong>
                      Total Monthly Income: ₹
                      {incomeExpenseData.totalMonthlyIncome.toLocaleString()}
                    </strong>
                  </div>
                </div>
              ) : (
                <p className="no-data">
                  No income sources added yet. Add your first income source!
                </p>
              )}
            </div>
          </div>

          {incomeExpenseData && incomeExpenseData.incomes.length > 0 && (
            <div className="chart-container full-width">
              <h3>Income Distribution</h3>
              <div className="chart-wrapper">
                <Pie data={generateIncomeChartData()} options={chartOptions} />
              </div>
            </div>
          )}
        </div>
      )}

      {activeSection === "expenses" && (
        <div className="expenses-section">
          <div className="section-grid">
            <div className="form-container">
              <h3>Add Expense Category</h3>
              <form onSubmit={addExpenseCategory} className="expense-form">
                <div className="form-group">
                  <label>Category Name *</label>
                  <input
                    type="text"
                    value={expenseForm.category}
                    onChange={(e) =>
                      setExpenseForm({
                        ...expenseForm,
                        category: e.target.value,
                      })
                    }
                    placeholder="e.g., Rent, Groceries, Utilities"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Amount (₹) *</label>
                  <input
                    type="number"
                    value={expenseForm.amount}
                    onChange={(e) =>
                      setExpenseForm({ ...expenseForm, amount: e.target.value })
                    }
                    placeholder="Enter amount"
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Period</label>
                  <select
                    value={expenseForm.period}
                    onChange={(e) =>
                      setExpenseForm({ ...expenseForm, period: e.target.value })
                    }
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
                <button type="submit" className="add-btn">
                  Add Expense Category
                </button>
              </form>
            </div>

            <div className="data-container">
              <h3>Expense Categories</h3>
              {incomeExpenseData && incomeExpenseData.expenses.length > 0 ? (
                <div className="data-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Period</th>
                        <th>Monthly</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {incomeExpenseData.expenses.map((expense) => (
                        <tr key={expense._id}>
                          <td>{expense.category}</td>
                          <td>₹{expense.amount.toLocaleString()}</td>
                          <td>{expense.period}</td>
                          <td>₹{expense.monthlyAmount.toLocaleString()}</td>
                          <td>
                            <button
                              onClick={() => deleteExpenseCategory(expense._id)}
                              className="delete-btn"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="total-row">
                    <strong>
                      Total Monthly Expenses: ₹
                      {incomeExpenseData.totalMonthlyExpenses.toLocaleString()}
                    </strong>
                  </div>
                </div>
              ) : (
                <p className="no-data">
                  No expense categories added yet. Add your first expense
                  category!
                </p>
              )}
            </div>
          </div>

          {incomeExpenseData && incomeExpenseData.expenses.length > 0 && (
            <div className="chart-container full-width">
              <h3>Expense Distribution</h3>
              <div className="chart-wrapper">
                <Pie data={generateExpenseChartData()} options={chartOptions} />
              </div>
            </div>
          )}
        </div>
      )}

      {activeSection === "assets" && (
        <div className="assets-section">
          <div className="section-grid">
            <div className="form-container">
              <h3>Add / Edit Asset</h3>
              <form onSubmit={addOrUpdateAsset} className="asset-form">
                <div className="form-group">
                  <label>Type</label>
                  <select
                    value={assetForm.type}
                    onChange={(e) =>
                      setAssetForm({ ...assetForm, type: e.target.value })
                    }
                  >
                    <option value="MutualFund">Mutual Fund</option>
                    <option value="Equity">Equity / Stocks</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    value={assetForm.name}
                    onChange={(e) =>
                      setAssetForm({ ...assetForm, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Current Value (₹) *</label>
                  <input
                    type="number"
                    value={assetForm.currentValue}
                    onChange={(e) =>
                      setAssetForm({
                        ...assetForm,
                        currentValue: e.target.value,
                      })
                    }
                    min="0"
                    required
                  />
                </div>
                <button type="submit" className="add-btn">
                  {editingAssetId ? "Update Asset" : "Add Asset"}
                </button>
                {editingAssetId && (
                  <button
                    type="button"
                    className="add-btn"
                    onClick={() => {
                      setEditingAssetId(null);
                      setAssetForm({
                        type: "MutualFund",
                        name: "",
                        currentValue: "",
                      });
                    }}
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>

            <div className="data-container">
              <h3>Your Assets</h3>
              {incomeExpenseData &&
                incomeExpenseData.assets &&
                incomeExpenseData.assets.length > 0 ? (
                <div className="data-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Current Value</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {incomeExpenseData.assets.map((asset) => (
                        <tr key={asset._id}>
                          <td>{asset.type}</td>
                          <td>{asset.name}</td>
                          <td>₹{asset.currentValue.toLocaleString()}</td>
                          <td>
                            <button
                              onClick={() => editAsset(asset)}
                              className="edit-btn"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteAsset(asset._id)}
                              className="delete-btn"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="total-row">
                    <strong>
                      Total Asset Value: ₹
                      {(
                        incomeExpenseData.totalAssetValue || 0
                      ).toLocaleString()}
                    </strong>
                  </div>
                </div>
              ) : (
                <p className="no-data">
                  No assets added yet. Add your first asset!
                </p>
              )}
            </div>
          </div>

          {incomeExpenseData && incomeExpenseData.assets && incomeExpenseData.assets.length > 0 && (
            <div className="chart-container full-width">
              <h3>Asset Distribution</h3>
              <div className="chart-wrapper">
                <Pie data={generateAssetChartData()} options={chartOptions} />
              </div>
            </div>
          )}
        </div>
      )}

      {activeSection === "analysis" && incomeExpenseData && (
        <div className="analysis-section">
          <div className="summary-cards">
            <div className="summary-card income">
              <h3>📈 Total Monthly Income</h3>
              <div className="amount">
                ₹{incomeExpenseData.totalMonthlyIncome.toLocaleString()}
              </div>
            </div>
            <div className="summary-card expense">
              <h3>📊 Total Monthly Expenses</h3>
              <div className="amount">
                ₹{incomeExpenseData.totalMonthlyExpenses.toLocaleString()}
              </div>
            </div>
            <div className="summary-card savings">
              <h3>💰 Monthly Savings</h3>
              <div
                className={`amount ${incomeExpenseData.monthlySavings >= 0
                    ? "positive"
                    : "negative"
                  }`}
              >
                ₹{incomeExpenseData.monthlySavings.toLocaleString()}
              </div>
            </div>
            <div className="summary-card assets">
              <h3>🧾 Total Assets</h3>
              <div className="amount">
                ₹{(incomeExpenseData.totalAssetValue || 0).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="savings-plan">
            <h3>💡 Suggested 50/20/30 Savings Plan</h3>
            <p>
              Based on your total monthly income of ₹
              {incomeExpenseData.totalMonthlyIncome.toLocaleString()}
            </p>

            <div className="plan-breakdown">
              <div className="plan-item">
                <div className="plan-label">🏠 Essentials (50%)</div>
                <div className="plan-amount">
                  ₹{incomeExpenseData.savingsPlan.essentials.toLocaleString()}
                </div>
                <div className="plan-description">
                  Housing, utilities, groceries, transportation
                </div>
              </div>
              <div className="plan-item">
                <div className="plan-label">💰 Savings (20%)</div>
                <div className="plan-amount">
                  ₹{incomeExpenseData.savingsPlan.savings.toLocaleString()}
                </div>
                <div className="plan-description">
                  Emergency fund, investments, retirement
                </div>
              </div>
              <div className="plan-item">
                <div className="plan-label">🎯 Discretionary (30%)</div>
                <div className="plan-amount">
                  ₹
                  {incomeExpenseData.savingsPlan.discretionary.toLocaleString()}
                </div>
                <div className="plan-description">
                  Entertainment, dining out, hobbies
                </div>
              </div>
            </div>

            <div className="chart-container full-width">
              <h4>Suggested Budget Allocation</h4>
              <div className="chart-wrapper">
                <Bar
                  data={generateSavingsPlanChartData()}
                  options={barChartOptions}
                />
              </div>
            </div>

            {incomeExpenseData.monthlySavings <
              incomeExpenseData.savingsPlan.savings && (
                <div className="savings-alert">
                  <h4>⚠️ Savings Alert</h4>
                  <p>
                    Your current savings (₹
                    {incomeExpenseData.monthlySavings.toLocaleString()}) are below
                    the recommended 20% (₹
                    {incomeExpenseData.savingsPlan.savings.toLocaleString()}).
                    Consider reducing discretionary spending or increasing income
                    sources.
                  </p>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeExpenseTracker;
