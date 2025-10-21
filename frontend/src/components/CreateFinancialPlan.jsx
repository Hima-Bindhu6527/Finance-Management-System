import React, { useState, useEffect } from "react";
import "./CreateFinancialPlan.css";

const CreateFinancialPlan = ({ onPlanCreated }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [goals, setGoals] = useState([]);

  const [formData, setFormData] = useState({
    planName: "",
    generalDetails: {
      fullName: "",
      dateOfBirth: "",
      gender: "",
      maritalStatus: "",
      isSmoker: false,
      designation: "",
      companyName: "",
      hasChildren: false,
      numberOfChildren: 0,
      hasDependents: false,
      numberOfDependents: 0,
    },
    goals: [],
    income: {
      salary: "",
      bonuses: 0,
      otherIncome: 0,
      rentalIncome: 0,
      investmentIncome: 0,
    },
    assets: {
      mutualFunds: [],
      insurance: [],
      otherAssets: [],
      loans: [],
    },
    expenses: {
      fixedExpenses: [],
    },
  });

  const steps = [
    { id: 0, title: "General", label: "General Details" },
    { id: 1, title: "Goals", label: "Financial Goals" },
    { id: 2, title: "Income", label: "Income Sources" },
    { id: 3, title: "Asset", label: "Assets & Investments" },
    { id: 4, title: "Expenses", label: "Monthly Expenses" },
  ];

  // Fetch existing goals and general details on component mount
  useEffect(() => {
    fetchGoals();
    fetchLatestGeneralDetails();
  }, []);

  const fetchGoals = async () => {
    try {
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
    }
  };

  const fetchLatestGeneralDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/financial-plans/general-details",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.data) {
          setFormData((prev) => ({
            ...prev,
            generalDetails: { ...prev.generalDetails, ...data.data },
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching general details:", error);
    }
  };

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    // Clear error when user starts typing
    if (errors[`${section}.${field}`]) {
      setErrors((prev) => ({
        ...prev,
        [`${section}.${field}`]: "",
      }));
    }
  };

  const handleDirectInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateStep = (stepIndex) => {
    const newErrors = {};

    switch (stepIndex) {
      case 0: // General Details
        if (!formData.planName.trim()) {
          newErrors.planName = "Plan name is required";
        }
        if (!formData.generalDetails.fullName.trim()) {
          newErrors["generalDetails.fullName"] = "Full name is required";
        }
        if (!formData.generalDetails.dateOfBirth) {
          newErrors["generalDetails.dateOfBirth"] = "Date of birth is required";
        } else {
          const age =
            (new Date() - new Date(formData.generalDetails.dateOfBirth)) /
            (365.25 * 24 * 60 * 60 * 1000);
          if (age < 18 || age > 100) {
            newErrors["generalDetails.dateOfBirth"] =
              "Age must be between 18 and 100 years";
          }
        }
        if (!formData.generalDetails.gender) {
          newErrors["generalDetails.gender"] = "Gender is required";
        }
        if (!formData.generalDetails.maritalStatus) {
          newErrors["generalDetails.maritalStatus"] =
            "Marital status is required";
        }
        if (
          formData.generalDetails.hasChildren &&
          formData.generalDetails.numberOfChildren <= 0
        ) {
          newErrors["generalDetails.numberOfChildren"] =
            "Number of children is required";
        }
        if (
          formData.generalDetails.hasDependents &&
          formData.generalDetails.numberOfDependents <= 0
        ) {
          newErrors["generalDetails.numberOfDependents"] =
            "Number of dependents is required";
        }
        break;

      case 2: // Income
        if (!formData.income.salary || formData.income.salary <= 0) {
          newErrors["income.salary"] =
            "Salary is required and must be greater than 0";
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep(activeStep)) {
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/financial-plans",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Financial plan created successfully!");
        if (onPlanCreated) {
          onPlanCreated();
        }
      } else {
        if (data.errors) {
          const errorObj = {};
          data.errors.forEach((error) => {
            errorObj.general = error;
          });
          setErrors(errorObj);
        } else {
          setErrors({
            general: data.message || "Failed to create financial plan",
          });
        }
      }
    } catch (error) {
      console.error("Error creating financial plan:", error);
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const addMutualFund = () => {
    setFormData((prev) => ({
      ...prev,
      assets: {
        ...prev.assets,
        mutualFunds: [
          ...prev.assets.mutualFunds,
          {
            investmentType: "",
            schemeName: "",
            sipAmount: "",
            folioNo: "",
            currentValue: "",
            frequency: "Monthly",
            transactionSource: "",
          },
        ],
      },
    }));
  };

  const removeMutualFund = (index) => {
    setFormData((prev) => ({
      ...prev,
      assets: {
        ...prev.assets,
        mutualFunds: prev.assets.mutualFunds.filter((_, i) => i !== index),
      },
    }));
  };

  const updateMutualFund = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      assets: {
        ...prev.assets,
        mutualFunds: prev.assets.mutualFunds.map((fund, i) =>
          i === index ? { ...fund, [field]: value } : fund
        ),
      },
    }));
  };

  const addExpense = () => {
    setFormData((prev) => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        fixedExpenses: [
          ...prev.expenses.fixedExpenses,
          {
            expenseType: "Fixed",
            expenseName: "",
            amount: "",
            frequency: "Monthly",
            category: "",
          },
        ],
      },
    }));
  };

  const removeExpense = (index) => {
    setFormData((prev) => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        fixedExpenses: prev.expenses.fixedExpenses.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const updateExpense = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        fixedExpenses: prev.expenses.fixedExpenses.map((expense, i) =>
          i === index ? { ...expense, [field]: value } : expense
        ),
      },
    }));
  };

  const toggleGoalSelection = (goalId) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter((id) => id !== goalId)
        : [...prev.goals, goalId],
    }));
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return renderGeneralDetails();
      case 1:
        return renderGoals();
      case 2:
        return renderIncome();
      case 3:
        return renderAssets();
      case 4:
        return renderExpenses();
      default:
        return null;
    }
  };

  const renderGeneralDetails = () => (
    <div className="step-content">
      <h3>General Details</h3>

      <div className="form-group">
        <label>Plan Name *</label>
        <input
          type="text"
          value={formData.planName}
          onChange={(e) => handleDirectInputChange("planName", e.target.value)}
          placeholder="Enter plan name"
          className={errors.planName ? "error" : ""}
        />
        {errors.planName && (
          <span className="error-message">{errors.planName}</span>
        )}
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Full Name (As Per PAN) *</label>
          <input
            type="text"
            value={formData.generalDetails.fullName}
            onChange={(e) =>
              handleInputChange("generalDetails", "fullName", e.target.value)
            }
            placeholder="Enter full name"
            className={errors["generalDetails.fullName"] ? "error" : ""}
          />
          {errors["generalDetails.fullName"] && (
            <span className="error-message">
              {errors["generalDetails.fullName"]}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Date of Birth *</label>
          <input
            type="date"
            value={formData.generalDetails.dateOfBirth}
            onChange={(e) =>
              handleInputChange("generalDetails", "dateOfBirth", e.target.value)
            }
            className={errors["generalDetails.dateOfBirth"] ? "error" : ""}
          />
          {errors["generalDetails.dateOfBirth"] && (
            <span className="error-message">
              {errors["generalDetails.dateOfBirth"]}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Gender *</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.generalDetails.gender === "Male"}
                onChange={(e) =>
                  handleInputChange("generalDetails", "gender", e.target.value)
                }
              />
              Male
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.generalDetails.gender === "Female"}
                onChange={(e) =>
                  handleInputChange("generalDetails", "gender", e.target.value)
                }
              />
              Female
            </label>
          </div>
          {errors["generalDetails.gender"] && (
            <span className="error-message">
              {errors["generalDetails.gender"]}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Marital Status *</label>
          <select
            value={formData.generalDetails.maritalStatus}
            onChange={(e) =>
              handleInputChange(
                "generalDetails",
                "maritalStatus",
                e.target.value
              )
            }
            className={errors["generalDetails.maritalStatus"] ? "error" : ""}
          >
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
          {errors["generalDetails.maritalStatus"] && (
            <span className="error-message">
              {errors["generalDetails.maritalStatus"]}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            value={formData.generalDetails.companyName}
            onChange={(e) =>
              handleInputChange("generalDetails", "companyName", e.target.value)
            }
            placeholder="Enter company name"
          />
        </div>

        <div className="form-group">
          <label>Designation</label>
          <input
            type="text"
            value={formData.generalDetails.designation}
            onChange={(e) =>
              handleInputChange("generalDetails", "designation", e.target.value)
            }
            placeholder="e.g., Frontend developer"
          />
        </div>
      </div>

      <div className="checkbox-sections">
        <div className="checkbox-section">
          <h4>Is Smoker?</h4>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="isSmoker"
                value="true"
                checked={formData.generalDetails.isSmoker === true}
                onChange={(e) =>
                  handleInputChange(
                    "generalDetails",
                    "isSmoker",
                    e.target.value === "true"
                  )
                }
              />
              Yes
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="isSmoker"
                value="false"
                checked={formData.generalDetails.isSmoker === false}
                onChange={(e) =>
                  handleInputChange(
                    "generalDetails",
                    "isSmoker",
                    e.target.value === "true"
                  )
                }
              />
              No
            </label>
          </div>
        </div>

        <div className="checkbox-section">
          <h4>Children Details</h4>
          <div className="sub-question">
            <label>Are you Blessed with Children?</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="hasChildren"
                  value="true"
                  checked={formData.generalDetails.hasChildren === true}
                  onChange={(e) =>
                    handleInputChange(
                      "generalDetails",
                      "hasChildren",
                      e.target.value === "true"
                    )
                  }
                />
                Yes
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="hasChildren"
                  value="false"
                  checked={formData.generalDetails.hasChildren === false}
                  onChange={(e) =>
                    handleInputChange(
                      "generalDetails",
                      "hasChildren",
                      e.target.value === "true"
                    )
                  }
                />
                No
              </label>
            </div>
          </div>
          {formData.generalDetails.hasChildren && (
            <div className="form-group">
              <label>Number of Children</label>
              <input
                type="number"
                min="1"
                value={formData.generalDetails.numberOfChildren}
                onChange={(e) =>
                  handleInputChange(
                    "generalDetails",
                    "numberOfChildren",
                    parseInt(e.target.value) || 0
                  )
                }
                className={
                  errors["generalDetails.numberOfChildren"] ? "error" : ""
                }
              />
              {errors["generalDetails.numberOfChildren"] && (
                <span className="error-message">
                  {errors["generalDetails.numberOfChildren"]}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="checkbox-section">
          <h4>Financial Dependants Details</h4>
          <div className="sub-question">
            <label>Do You Have Any Dependant?</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="hasDependents"
                  value="true"
                  checked={formData.generalDetails.hasDependents === true}
                  onChange={(e) =>
                    handleInputChange(
                      "generalDetails",
                      "hasDependents",
                      e.target.value === "true"
                    )
                  }
                />
                Yes
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="hasDependents"
                  value="false"
                  checked={formData.generalDetails.hasDependents === false}
                  onChange={(e) =>
                    handleInputChange(
                      "generalDetails",
                      "hasDependents",
                      e.target.value === "true"
                    )
                  }
                />
                No
              </label>
            </div>
          </div>
          {formData.generalDetails.hasDependents && (
            <div className="form-group">
              <label>Number of Dependents</label>
              <input
                type="number"
                min="1"
                value={formData.generalDetails.numberOfDependents}
                onChange={(e) =>
                  handleInputChange(
                    "generalDetails",
                    "numberOfDependents",
                    parseInt(e.target.value) || 0
                  )
                }
                className={
                  errors["generalDetails.numberOfDependents"] ? "error" : ""
                }
              />
              {errors["generalDetails.numberOfDependents"] && (
                <span className="error-message">
                  {errors["generalDetails.numberOfDependents"]}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderGoals = () => (
    <div className="step-content">
      <h3>Financial Goals</h3>
      <p>Select the goals you want to include in this financial plan:</p>

      {goals.length === 0 ? (
        <div className="no-goals-message">
          <p>
            No goals found. Create some goals first to include them in your
            financial plan.
          </p>
        </div>
      ) : (
        <div className="goals-selection">
          {goals.map((goal) => (
            <div key={goal._id} className="goal-selection-item">
              <label className="goal-checkbox">
                <input
                  type="checkbox"
                  checked={formData.goals.includes(goal._id)}
                  onChange={() => toggleGoalSelection(goal._id)}
                />
                <div className="goal-info">
                  <h4>{goal.goalName}</h4>
                  <p>
                    Target: ${goal.targetAmount?.toLocaleString()} | Monthly: $
                    {goal.monthlyContribution?.toLocaleString()}
                  </p>
                  <p>
                    Category: {goal.category} | Priority: {goal.priority}
                  </p>
                </div>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderIncome = () => (
    <div className="step-content">
      <h3>Income Sources</h3>

      <div className="form-grid">
        <div className="form-group">
          <label>Salary *</label>
          <input
            type="number"
            min="0"
            value={formData.income.salary}
            onChange={(e) =>
              handleInputChange(
                "income",
                "salary",
                parseFloat(e.target.value) || 0
              )
            }
            placeholder="Enter annual salary"
            className={errors["income.salary"] ? "error" : ""}
          />
          {errors["income.salary"] && (
            <span className="error-message">{errors["income.salary"]}</span>
          )}
        </div>

        <div className="form-group">
          <label>Bonuses</label>
          <input
            type="number"
            min="0"
            value={formData.income.bonuses}
            onChange={(e) =>
              handleInputChange(
                "income",
                "bonuses",
                parseFloat(e.target.value) || 0
              )
            }
            placeholder="Annual bonuses"
          />
        </div>

        <div className="form-group">
          <label>Other Income</label>
          <input
            type="number"
            min="0"
            value={formData.income.otherIncome}
            onChange={(e) =>
              handleInputChange(
                "income",
                "otherIncome",
                parseFloat(e.target.value) || 0
              )
            }
            placeholder="Other income sources"
          />
        </div>

        <div className="form-group">
          <label>Rental Income</label>
          <input
            type="number"
            min="0"
            value={formData.income.rentalIncome}
            onChange={(e) =>
              handleInputChange(
                "income",
                "rentalIncome",
                parseFloat(e.target.value) || 0
              )
            }
            placeholder="Rental income"
          />
        </div>

        <div className="form-group">
          <label>Investment Income</label>
          <input
            type="number"
            min="0"
            value={formData.income.investmentIncome}
            onChange={(e) =>
              handleInputChange(
                "income",
                "investmentIncome",
                parseFloat(e.target.value) || 0
              )
            }
            placeholder="Investment returns"
          />
        </div>
      </div>

      <div className="income-summary">
        <h4>
          Total Annual Income: $
          {(
            (parseFloat(formData.income.salary) || 0) +
            (parseFloat(formData.income.bonuses) || 0) +
            (parseFloat(formData.income.otherIncome) || 0) +
            (parseFloat(formData.income.rentalIncome) || 0) +
            (parseFloat(formData.income.investmentIncome) || 0)
          ).toLocaleString()}
        </h4>
      </div>
    </div>
  );

  const renderAssets = () => (
    <div className="step-content">
      <h3>Assets & Investments</h3>

      <div className="asset-section">
        <div className="section-header">
          <h4>Mutual Funds</h4>
          <button type="button" onClick={addMutualFund} className="add-btn">
            Add
          </button>
        </div>

        {formData.assets.mutualFunds.map((fund, index) => (
          <div key={index} className="asset-item">
            <div className="form-grid">
              <div className="form-group">
                <label>Investment Type *</label>
                <select
                  value={fund.investmentType}
                  onChange={(e) =>
                    updateMutualFund(index, "investmentType", e.target.value)
                  }
                >
                  <option value="">Select...</option>
                  <option value="Equity">Equity</option>
                  <option value="Debt">Debt</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="ELSS">ELSS</option>
                </select>
              </div>

              <div className="form-group">
                <label>Scheme Name *</label>
                <input
                  type="text"
                  value={fund.schemeName}
                  onChange={(e) =>
                    updateMutualFund(index, "schemeName", e.target.value)
                  }
                  placeholder="Enter scheme name"
                />
              </div>

              <div className="form-group">
                <label>SIP Amount *</label>
                <input
                  type="number"
                  min="100"
                  value={fund.sipAmount}
                  onChange={(e) =>
                    updateMutualFund(
                      index,
                      "sipAmount",
                      parseFloat(e.target.value) || ""
                    )
                  }
                  placeholder="Enter amount you want to invest"
                />
              </div>

              <div className="form-group">
                <label>Folio No.</label>
                <input
                  type="text"
                  value={fund.folioNo}
                  onChange={(e) =>
                    updateMutualFund(index, "folioNo", e.target.value)
                  }
                  placeholder="Enter Folio No..."
                />
              </div>

              <div className="form-group">
                <label>Current Value *</label>
                <input
                  type="number"
                  min="0"
                  value={fund.currentValue}
                  onChange={(e) =>
                    updateMutualFund(
                      index,
                      "currentValue",
                      parseFloat(e.target.value) || ""
                    )
                  }
                  placeholder="Enter Value..."
                />
              </div>

              <div className="form-group">
                <label>Frequency *</label>
                <select
                  value={fund.frequency}
                  onChange={(e) =>
                    updateMutualFund(index, "frequency", e.target.value)
                  }
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Half-yearly">Half-yearly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>

              <div className="form-group">
                <label>Transaction Source *</label>
                <select
                  value={fund.transactionSource}
                  onChange={(e) =>
                    updateMutualFund(index, "transactionSource", e.target.value)
                  }
                >
                  <option value="">Select...</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="UPI">UPI</option>
                  <option value="Net Banking">Net Banking</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeMutualFund(index)}
              className="remove-btn"
            >
              Remove
            </button>
          </div>
        ))}

        {formData.assets.mutualFunds.length === 0 && (
          <p className="no-items">No Mutual Funds Found</p>
        )}
      </div>
    </div>
  );

  const renderExpenses = () => (
    <div className="step-content">
      <h3>Monthly Expenses</h3>

      <div className="expense-section">
        <div className="section-header">
          <h4>Fixed Expenses</h4>
          <button type="button" onClick={addExpense} className="add-btn">
            Add
          </button>
        </div>

        {formData.expenses.fixedExpenses.map((expense, index) => (
          <div key={index} className="expense-item">
            <div className="form-grid">
              <div className="form-group">
                <label>Expense Type *</label>
                <select
                  value={expense.expenseType}
                  onChange={(e) =>
                    updateExpense(index, "expenseType", e.target.value)
                  }
                >
                  <option value="Fixed">Fixed</option>
                  <option value="Variable">Variable</option>
                </select>
              </div>

              <div className="form-group">
                <label>What Expenses Is It? *</label>
                <select
                  value={expense.category}
                  onChange={(e) =>
                    updateExpense(index, "category", e.target.value)
                  }
                >
                  <option value="">Select...</option>
                  <option value="Housing">Housing</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Food">Food</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Expense Name *</label>
                <input
                  type="text"
                  value={expense.expenseName}
                  onChange={(e) =>
                    updateExpense(index, "expenseName", e.target.value)
                  }
                  placeholder="Enter expense name"
                />
              </div>

              <div className="form-group">
                <label>Amount (Monthly) *</label>
                <input
                  type="number"
                  min="0"
                  value={expense.amount}
                  onChange={(e) =>
                    updateExpense(
                      index,
                      "amount",
                      parseFloat(e.target.value) || ""
                    )
                  }
                  placeholder="Enter Amount"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeExpense(index)}
              className="remove-btn"
            >
              Remove
            </button>
          </div>
        ))}

        {formData.expenses.fixedExpenses.length === 0 && (
          <p className="no-items">No expenses added yet</p>
        )}

        <div className="expense-summary">
          <h4>
            Total Monthly Expenses: $
            {formData.expenses.fixedExpenses
              .reduce(
                (sum, expense) => sum + (parseFloat(expense.amount) || 0),
                0
              )
              .toLocaleString()}
          </h4>
        </div>
      </div>
    </div>
  );

  return (
    <div className="create-financial-plan">
      <div className="plan-header">
        <h2>FINANCIAL PLAN</h2>
        <div className="step-indicator">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`step ${index === activeStep ? "active" : ""} ${
                index < activeStep ? "completed" : ""
              }`}
              onClick={() => setActiveStep(index)}
            >
              {step.title}
            </div>
          ))}
        </div>
      </div>

      <div className="plan-content">
        {errors.general && <div className="error-banner">{errors.general}</div>}

        {renderStepContent()}

        <div className="form-actions">
          {activeStep > 0 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="btn btn-secondary"
            >
              Previous
            </button>
          )}

          {activeStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? "Creating Plan..." : "Save Financial Plan"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateFinancialPlan;
