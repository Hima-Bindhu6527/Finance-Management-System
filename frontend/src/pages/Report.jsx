import React, { useState, useEffect } from "react";
import "./Report.css";

const ReportPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Form state for generating reports
  const [reportForm, setReportForm] = useState({
    reportType: "Comprehensive",
    startDate: "",
    endDate: "",
  });

  // Fetch reports from backend
  const fetchReports = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/reports", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReports(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Generate new report
  const handleGenerateReport = async () => {
    try {
      setGenerating(true);
      const token = localStorage.getItem("token");
      
      // Prepare the request body
      const requestBody = {
        reportType: reportForm.reportType
      };
      
      // Only add dates if they are provided
      if (reportForm.startDate) {
        requestBody.startDate = reportForm.startDate;
      }
      if (reportForm.endDate) {
        requestBody.endDate = reportForm.endDate;
      }
      
      console.log("Sending report request:", requestBody);
      
      const response = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Response status:", response.status);
      
      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        alert("Server error: Expected JSON response but got HTML. Check backend logs.");
        return;
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        alert("Report generated successfully!");
        setReportForm({
          reportType: "Comprehensive",
          startDate: "",
          endDate: "",
        });
        fetchReports();
        setActiveTab("overview");
      } else {
        alert(data.error || data.message || "Failed to generate report");
      }
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report: " + error.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setActiveTab("view-report");
  };

  const handleDeleteReport = async (reportId) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        alert("Report deleted successfully!");
        fetchReports();
        if (selectedReport?._id === reportId) {
          setSelectedReport(null);
          setActiveTab("overview");
        }
      }
    } catch (error) {
      console.error("Error deleting report:", error);
      alert("Failed to delete report");
    }
  };

  const handleDownloadPDF = async (reportId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}/download`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `financial-report-${reportId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert("Failed to download PDF");
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF");
    }
  };

  const formatCurrency = (amount) => {
    return `₹${Math.round(amount || 0).toLocaleString("en-IN")}`;
  };

  const formatPercentage = (value) => {
    return `${(value || 0).toFixed(2)}%`;
  };

  const getHealthScoreColor = (score) => {
    if (score >= 70) return "good";
    if (score >= 50) return "moderate";
    return "poor";
  };

  const getPriorityClass = (priority) => {
    return priority?.toLowerCase() || "low";
  };

  const getStatusClass = (status) => {
    const statusLower = status?.toLowerCase().replace(/\s+/g, "-") || "";
    return statusLower;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="overview-container">
            <div className="overview-header">
              <h2>Financial Reports Overview</h2>
              <p>Generate comprehensive financial reports and track your financial health</p>
            </div>

            <div className="overview-cards">
              <div className="overview-card">
                <div className="card-icon">📊</div>
                <h3>Generate Report</h3>
                <p>Create detailed financial analysis reports with insights and recommendations</p>
                <button className="card-button" onClick={() => setActiveTab("generate")}>
                  Create New Report
                </button>
              </div>

              <div className="overview-card">
                <div className="card-icon">📈</div>
                <h3>View Reports</h3>
                <p>Access your historical reports and track financial progress over time</p>
                <button className="card-button" onClick={() => setActiveTab("list")}>
                  View All Reports
                </button>
              </div>
            </div>

            {reports.length > 0 && (
              <div className="quick-stats">
                <div className="stat-item">
                  <h4>Total Reports</h4>
                  <span className="stat-number">{reports.length}</span>
                </div>
                <div className="stat-item">
                  <h4>Latest Health Score</h4>
                  <span className={`stat-number ${getHealthScoreColor(reports[0]?.reportData?.healthIndicators?.financialHealthScore)}`}>
                    {reports[0]?.reportData?.healthIndicators?.financialHealthScore?.toFixed(0) || "N/A"}/100
                  </span>
                </div>
                <div className="stat-item">
                  <h4>Net Worth</h4>
                  <span className="stat-number">{formatCurrency(reports[0]?.reportData?.summary?.netWorth)}</span>
                </div>
              </div>
            )}

            {reports.length > 0 && (
              <div className="recent-reports-section">
                <h3>Recent Reports</h3>
                <div className="recent-reports-grid">
                  {reports.slice(0, 3).map((report) => (
                    <div key={report._id} className="recent-report-card">
                      <div className="report-type-badge">{report.reportType}</div>
                      <h4>Financial Report</h4>
                      <p className="report-date">Generated: {new Date(report.generatedAt).toLocaleDateString("en-IN")}</p>
                      <div className="health-score-mini">
                        <span>Health Score:</span>
                        <strong className={getHealthScoreColor(report.reportData?.healthIndicators?.financialHealthScore)}>
                          {report.reportData?.healthIndicators?.financialHealthScore?.toFixed(0) || "N/A"}/100
                        </strong>
                      </div>
                      <button onClick={() => handleViewReport(report)} className="view-report-btn">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "generate":
        return (
          <div className="generate-report-container">
            <h2>Generate Financial Report</h2>
            <p className="subtitle">Create a comprehensive analysis based on your goals, income, expenses, and assets</p>

            <div className="report-form">
              <div className="form-group">
                <label htmlFor="reportType">Report Type *</label>
                <select
                  id="reportType"
                  name="reportType"
                  value={reportForm.reportType}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="Comprehensive">Comprehensive Report</option>
                  <option value="Income Analysis">Income Analysis</option>
                  <option value="Asset Overview">Asset Overview</option>
                  <option value="Goal Progress">Goal Progress</option>
                  <option value="Expense Analysis">Expense Analysis</option>
                  <option value="Net Worth Summary">Net Worth Summary</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startDate">Start Date (Optional)</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={reportForm.startDate}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="endDate">End Date (Optional)</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={reportForm.endDate}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setActiveTab("overview")} className="btn-secondary">
                  Cancel
                </button>
                <button type="button" onClick={handleGenerateReport} disabled={generating} className="btn-primary">
                  {generating ? "Generating..." : "Generate Report"}
                </button>
              </div>
            </div>
          </div>
        );

      case "list":
        return (
          <div className="report-list-container">
            <div className="list-header">
              <h2>All Financial Reports</h2>
              <button onClick={() => setActiveTab("generate")} className="btn-primary">
                Generate New Report
              </button>
            </div>

            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading reports...</p>
              </div>
            ) : reports.length === 0 ? (
              <div className="no-reports">
                <div className="no-reports-icon">📊</div>
                <h3>No Reports Yet</h3>
                <p>Generate your first financial report to get started</p>
                <button onClick={() => setActiveTab("generate")} className="btn-primary">
                  Generate Report
                </button>
              </div>
            ) : (
              <div className="reports-grid">
                {reports.map((report) => (
                  <div key={report._id} className="report-card">
                    <div className="report-card-header">
                      <div className="report-type-badge">{report.reportType}</div>
                      <div className="report-date-small">
                        {new Date(report.generatedAt).toLocaleDateString("en-IN")}
                      </div>
                    </div>

                    <h3>Financial Report</h3>

                    <div className="report-stats">
                      <div className="stat">
                        <span className="stat-label">Net Worth</span>
                        <span className="stat-value">{formatCurrency(report.reportData?.summary?.netWorth)}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Health Score</span>
                        <span className={`stat-value ${getHealthScoreColor(report.reportData?.healthIndicators?.financialHealthScore)}`}>
                          {report.reportData?.healthIndicators?.financialHealthScore?.toFixed(0) || "N/A"}/100
                        </span>
                      </div>
                    </div>

                    <div className="report-card-actions">
                      <button onClick={() => handleViewReport(report)} className="btn-view">
                        View Details
                      </button>
                      <button onClick={() => handleDeleteReport(report._id)} className="btn-delete">
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "view-report":
        if (!selectedReport) {
          return (
            <div className="no-report-selected">
              <p>No report selected</p>
              <button onClick={() => setActiveTab("overview")} className="btn-primary">
                Back to Overview
              </button>
            </div>
          );
        }

        const { reportData } = selectedReport;

        return (
          <div className="report-details-container">
            <div className="report-details-header">
              <div>
                <h2>{selectedReport.reportType}</h2>
                <p className="report-meta">
                  Generated: {new Date(selectedReport.generatedAt).toLocaleDateString("en-IN")}
                </p>
              </div>
              <div className="header-actions">
                <button onClick={() => setActiveTab("overview")} className="btn-secondary">
                  Back
                </button>
              </div>
            </div>

            <div className="report-sections">
              {/* Financial Summary */}
              <section className="report-section">
                <h3 className="section-title">💰 Financial Summary</h3>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-label">Monthly Income</span>
                    <span className="summary-value positive">{formatCurrency(reportData.summary?.totalIncome)}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Monthly Expenses</span>
                    <span className="summary-value negative">{formatCurrency(reportData.summary?.totalExpenses)}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Monthly Savings</span>
                    <span className={`summary-value ${reportData.summary?.monthlySavings >= 0 ? "positive" : "negative"}`}>
                      {formatCurrency(reportData.summary?.monthlySavings)}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Savings Rate</span>
                    <span className="summary-value">{formatPercentage(reportData.summary?.savingsRate)}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Total Assets</span>
                    <span className="summary-value positive">{formatCurrency(reportData.summary?.totalAssets)}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Total Liabilities</span>
                    <span className="summary-value negative">{formatCurrency(reportData.summary?.totalLiabilities)}</span>
                  </div>
                  <div className="summary-item highlight">
                    <span className="summary-label">Net Worth</span>
                    <span className={`summary-value ${reportData.summary?.netWorth >= 0 ? "positive" : "negative"}`}>
                      {formatCurrency(reportData.summary?.netWorth)}
                    </span>
                  </div>
                </div>
              </section>

              {/* Health Indicators */}
              <section className="report-section">
                <h3 className="section-title">🏥 Financial Health Indicators</h3>
                <div className="health-grid">
                  <div className="health-item">
                    <div className="health-label">Debt-to-Income Ratio</div>
                    <div className="health-value">{formatPercentage(reportData.healthIndicators?.debtToIncomeRatio)}</div>
                    <div className="health-bar">
                      <div
                        className="health-bar-fill"
                        style={{
                          width: `${Math.min(reportData.healthIndicators?.debtToIncomeRatio || 0, 100)}%`,
                          backgroundColor:
                            (reportData.healthIndicators?.debtToIncomeRatio || 0) > 40
                              ? "#e74c3c"
                              : (reportData.healthIndicators?.debtToIncomeRatio || 0) > 30
                              ? "#f39c12"
                              : "#27ae60",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="health-item">
                    <div className="health-label">Savings Rate</div>
                    <div className="health-value">{formatPercentage(reportData.healthIndicators?.savingsToIncomeRatio)}</div>
                    <div className="health-bar">
                      <div
                        className="health-bar-fill"
                        style={{
                          width: `${Math.min(reportData.healthIndicators?.savingsToIncomeRatio || 0, 100)}%`,
                          backgroundColor:
                            (reportData.healthIndicators?.savingsToIncomeRatio || 0) < 10
                              ? "#e74c3c"
                              : (reportData.healthIndicators?.savingsToIncomeRatio || 0) < 20
                              ? "#f39c12"
                              : "#27ae60",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="health-item">
                    <div className="health-label">Emergency Fund (Months)</div>
                    <div className="health-value">{(reportData.healthIndicators?.emergencyFundMonths || 0).toFixed(1)}</div>
                    <div className="health-bar">
                      <div
                        className="health-bar-fill"
                        style={{
                          width: `${Math.min(((reportData.healthIndicators?.emergencyFundMonths || 0) / 6) * 100, 100)}%`,
                          backgroundColor:
                            (reportData.healthIndicators?.emergencyFundMonths || 0) < 3
                              ? "#e74c3c"
                              : (reportData.healthIndicators?.emergencyFundMonths || 0) < 6
                              ? "#f39c12"
                              : "#27ae60",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="health-item highlight">
                    <div className="health-label">Financial Health Score</div>
                    <div className="health-score-large">
                      <span className={getHealthScoreColor(reportData.healthIndicators?.financialHealthScore)}>
                        {reportData.healthIndicators?.financialHealthScore?.toFixed(0) || 0}
                      </span>
                      <span className="score-max">/100</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Income Breakdown */}
              {reportData.incomeBreakdown && (
                <section className="report-section">
                  <h3 className="section-title">📈 Income Breakdown</h3>
                  <div className="breakdown-list">
                    {Object.entries(reportData.incomeBreakdown).map(
                      ([key, value]) =>
                        value > 0 && (
                          <div key={key} className="breakdown-item">
                            <span className="breakdown-label">
                              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                            </span>
                            <span className="breakdown-value">{formatCurrency(value)}</span>
                          </div>
                        )
                    )}
                  </div>
                </section>
              )}

              {/* Asset Allocation */}
              {reportData.assetAllocation && (
                <section className="report-section">
                  <h3 className="section-title">🏦 Asset Allocation</h3>
                  <div className="breakdown-list">
                    <div className="breakdown-item">
                      <span className="breakdown-label">Mutual Funds</span>
                      <span className="breakdown-value">{formatCurrency(reportData.assetAllocation.mutualFunds)}</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="breakdown-label">Insurance Coverage</span>
                      <span className="breakdown-value">{formatCurrency(reportData.assetAllocation.insurance)}</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="breakdown-label">Other Assets</span>
                      <span className="breakdown-value">{formatCurrency(reportData.assetAllocation.otherAssets)}</span>
                    </div>
                  </div>
                </section>
              )}

              {/* Loan Summary */}
              {reportData.loanSummary && reportData.loanSummary.totalLoans > 0 && (
                <section className="report-section">
                  <h3 className="section-title">🏠 Loan Summary</h3>
                  <div className="breakdown-list">
                    <div className="breakdown-item">
                      <span className="breakdown-label">Total Loans</span>
                      <span className="breakdown-value">{reportData.loanSummary.totalLoans}</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="breakdown-label">Total Outstanding</span>
                      <span className="breakdown-value">{formatCurrency(reportData.loanSummary.totalOutstanding)}</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="breakdown-label">Total Monthly EMI</span>
                      <span className="breakdown-value">{formatCurrency(reportData.loanSummary.totalEMI)}</span>
                    </div>
                  </div>
                  {reportData.loanSummary.loansByType && reportData.loanSummary.loansByType.length > 0 && (
                    <div className="loan-types">
                      <h4 style={{marginTop: '1rem', marginBottom: '0.5rem', fontSize: '1rem'}}>Loans by Type:</h4>
                      {reportData.loanSummary.loansByType.map((loan, idx) => (
                        <div key={idx} className="breakdown-item" style={{paddingLeft: '1rem'}}>
                          <span className="breakdown-label">{loan.loanType}</span>
                          <span className="breakdown-value">{loan.count} loan(s) - {formatCurrency(loan.totalOutstanding)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Expense Breakdown */}
              {reportData.expenseBreakdown?.length > 0 && (
                <section className="report-section">
                  <h3 className="section-title">💸 Expense Breakdown</h3>
                  <div className="breakdown-list">
                    {reportData.expenseBreakdown.map((expense, index) => (
                      <div key={index} className="breakdown-item">
                        <span className="breakdown-label">{expense.category}</span>
                        <div className="breakdown-right">
                          <span className="breakdown-value">{formatCurrency(expense.amount)}</span>
                          <span className="breakdown-percentage">({formatPercentage(expense.percentage)})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Goal Progress */}
              {reportData.goalProgress?.length > 0 && (
                <section className="report-section">
                  <h3 className="section-title">🎯 Goal Progress</h3>
                  <div className="goals-list">
                    {reportData.goalProgress.map((goal, index) => (
                      <div key={index} className="goal-item">
                        <div className="goal-header">
                          <h4>{goal.goalName}</h4>
                          <span className={`goal-status status-${getStatusClass(goal.status)}`}>
                            {goal.status}
                          </span>
                        </div>
                        <div className="goal-progress">
                          <div className="progress-bar">
                            <div
                              className="progress-bar-fill"
                              style={{
                                width: `${Math.min(goal.progressPercentage, 100)}%`,
                                backgroundColor:
                                  goal.status === "Completed"
                                    ? "#27ae60"
                                    : goal.status === "Behind"
                                    ? "#e74c3c"
                                    : goal.status === "Near Completion"
                                    ? "#f39c12"
                                    : "#3498db",
                              }}
                            ></div>
                          </div>
                          <span className="progress-percentage">{formatPercentage(goal.progressPercentage)}</span>
                        </div>
                        <div className="goal-details">
                          <span>Current: {formatCurrency(goal.currentAmount)}</span>
                          <span>Target: {formatCurrency(goal.targetAmount)}</span>
                          <span>{goal.monthsRemaining} months remaining</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Recommendations */}
              {reportData.recommendations?.length > 0 && (
                <section className="report-section">
                  <h3 className="section-title">💡 Recommendations</h3>
                  <div className="recommendations-list">
                    {reportData.recommendations.map((rec, index) => (
                      <div key={index} className={`recommendation-item priority-${getPriorityClass(rec.priority)}`}>
                        <div className="recommendation-header">
                          <span className="recommendation-category">{rec.category}</span>
                          <span className={`priority-badge priority-${getPriorityClass(rec.priority)}`}>
                            {rec.priority} Priority
                          </span>
                        </div>
                        <p className="recommendation-text">{rec.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="report-page">
      <div className="report-header">
        <h1>Financial Reports</h1>
        <p>Comprehensive analysis and insights for your financial planning</p>
      </div>

      <div className="report-tabs">
        <button className={`tab-button ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
          Overview
        </button>
        <button className={`tab-button ${activeTab === "generate" ? "active" : ""}`} onClick={() => setActiveTab("generate")}>
          Generate Report
        </button>
        <button className={`tab-button ${activeTab === "list" ? "active" : ""}`} onClick={() => setActiveTab("list")}>
          All Reports
        </button>
        {selectedReport && (
          <button className={`tab-button ${activeTab === "view-report" ? "active" : ""}`} onClick={() => setActiveTab("view-report")}>
            Report Details
          </button>
        )}
      </div>

      <div className="report-content">{loading && activeTab === "overview" ? <p>Loading...</p> : renderTabContent()}</div>
    </div>
  );
};

export default ReportPage;