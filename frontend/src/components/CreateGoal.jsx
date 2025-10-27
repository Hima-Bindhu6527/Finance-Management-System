import React, { useState } from "react";
import "./CreateGoal.css";

const CreateGoal = ({ onGoalCreated }) => {
  const [formData, setFormData] = useState({
    goalName: "",
    targetAmount: "",
    monthlyContribution: "",
    targetDate: "",
    priority: "Medium",
    category: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const categories = [
    "Emergency Fund",
    "Education",
    "House",
    "Car",
    "Vacation",
    "Retirement",
    "Investment",
    "Other",
  ];

  const priorities = ["High", "Medium", "Low"];

  const validateForm = () => {
    const newErrors = {};

    // Goal name validation
    if (!formData.goalName.trim()) {
      newErrors.goalName = "Goal name is required";
    } else if (formData.goalName.length > 100) {
      newErrors.goalName = "Goal name cannot exceed 100 characters";
    }

    // Target amount validation
    if (!formData.targetAmount) {
      newErrors.targetAmount = "Target amount is required";
    } else if (parseFloat(formData.targetAmount) <= 0) {
      newErrors.targetAmount = "Target amount must be greater than 0";
    } else if (isNaN(parseFloat(formData.targetAmount))) {
      newErrors.targetAmount = "Target amount must be a valid number";
    }

    // Monthly contribution validation
    if (!formData.monthlyContribution) {
      newErrors.monthlyContribution = "Monthly contribution is required";
    } else if (parseFloat(formData.monthlyContribution) <= 0) {
      newErrors.monthlyContribution =
        "Monthly contribution must be greater than 0";
    } else if (isNaN(parseFloat(formData.monthlyContribution))) {
      newErrors.monthlyContribution =
        "Monthly contribution must be a valid number";
    }

    // Target date validation
    if (!formData.targetDate) {
      newErrors.targetDate = "Target date is required";
    } else {
      const targetDate = new Date(formData.targetDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (targetDate <= today) {
        newErrors.targetDate = "Target date must be in the future";
      }
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    // Description validation (optional but with length limit)
    if (formData.description && formData.description.length > 500) {
      newErrors.description = "Description cannot exceed 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          targetAmount: parseFloat(formData.targetAmount),
          monthlyContribution: parseFloat(formData.monthlyContribution),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Goal created successfully!");
        // Reset form
        setFormData({
          goalName: "",
          targetAmount: "",
          monthlyContribution: "",
          targetDate: "",
          priority: "Medium",
          category: "",
          description: "",
        });
        setErrors({});

        if (onGoalCreated) {
          onGoalCreated();
        }
      } else {
        if (data.errors && Array.isArray(data.errors)) {
          alert("Validation errors: " + data.errors.join(", "));
        } else {
          alert(data.message || "Failed to create goal");
        }
      }
    } catch (error) {
      console.error("Error creating goal:", error);
      alert("An error occurred while creating the goal");
    } finally {
      setLoading(false);
    }
  };

  const calculateMonthsToGoal = () => {
    if (
      formData.targetAmount &&
      formData.monthlyContribution &&
      parseFloat(formData.targetAmount) > 0 &&
      parseFloat(formData.monthlyContribution) > 0
    ) {
      const months = Math.ceil(
        parseFloat(formData.targetAmount) /
          parseFloat(formData.monthlyContribution)
      );
      return months;
    }
    return null;
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <div className="create-goal-container">
      <div className="create-goal-header">
        <h2>Create New Goal</h2>
        <p>Set up a new financial goal and track your progress</p>
      </div>

      <form onSubmit={handleSubmit} className="create-goal-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="goalName">Goal Name *</label>
            <input
              type="text"
              id="goalName"
              name="goalName"
              value={formData.goalName}
              onChange={handleInputChange}
              placeholder="e.g., Emergency Fund, New Car"
              className={errors.goalName ? "error" : ""}
              maxLength={100}
            />
            {errors.goalName && (
              <span className="error-message">{errors.goalName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={errors.category ? "error" : ""}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="error-message">{errors.category}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="targetAmount">Target Amount (₹) *</label>
            <input
              type="number"
              id="targetAmount"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleInputChange}
              placeholder="10000"
              min="1"
              step="0.01"
              className={errors.targetAmount ? "error" : ""}
            />
            {errors.targetAmount && (
              <span className="error-message">{errors.targetAmount}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="monthlyContribution">
              Monthly Contribution (₹) *
            </label>
            <input
              type="number"
              id="monthlyContribution"
              name="monthlyContribution"
              value={formData.monthlyContribution}
              onChange={handleInputChange}
              placeholder="500"
              min="1"
              step="0.01"
              className={errors.monthlyContribution ? "error" : ""}
            />
            {errors.monthlyContribution && (
              <span className="error-message">
                {errors.monthlyContribution}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="targetDate">Target Date *</label>
            <input
              type="date"
              id="targetDate"
              name="targetDate"
              value={formData.targetDate}
              onChange={handleInputChange}
              min={getMinDate()}
              className={errors.targetDate ? "error" : ""}
            />
            {errors.targetDate && (
              <span className="error-message">{errors.targetDate}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description (Optional)</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Additional details about your goal..."
            rows={4}
            maxLength={500}
            className={errors.description ? "error" : ""}
          />
          <small className="char-count">
            {formData.description.length}/500 characters
          </small>
          {errors.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>

        {calculateMonthsToGoal() && (
          <div className="calculation-info">
            <div className="info-card">
              <h4>Goal Projection</h4>
              <p>
                At ₹{formData.monthlyContribution}/month, you'll reach your goal
                of ₹{formData.targetAmount} in approximately{" "}
                <strong>{calculateMonthsToGoal()} months</strong>.
              </p>
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Creating Goal..." : "Create Goal"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGoal;
