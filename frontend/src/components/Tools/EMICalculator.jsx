import React, { useState, useEffect } from "react";
import { Calculator } from "lucide-react";
import "./EMICalculator.css";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [rateOfInterest, setRateOfInterest] = useState(9);
  const [loanTenure, setLoanTenure] = useState(5);
  const [results, setResults] = useState({
    emi: 0,
    totalInterest: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, rateOfInterest, loanTenure]);

  const calculateEMI = () => {
    const P = loanAmount;
    const r = rateOfInterest / 100 / 12;
    const n = loanTenure * 12;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    setResults({
      emi: emi,
      totalInterest: totalInterest,
      totalAmount: totalAmount,
    });
  };

  const principalPercentage = (loanAmount / results.totalAmount) * 100 || 0;

  return (
    <div className="emi-container">
      <div className="emi-wrapper">
        <div className="emi-card">
          <div className="emi-header">
            <Calculator className="emi-icon" />
            <h1 className="emi-title">EMI Calculator</h1>
          </div>

          <p className="emi-subtitle">
            Calculate your loan EMI (Equated Monthly Installment)
          </p>

          <div className="emi-content">
            <div className="inputs-section">
              <div className="emi-input-group">
                <label className="input-label">
                  <span className="label-text">Loan Amount :</span>
                  <span className="label-value">
                    ₹{loanAmount.toLocaleString()}
                  </span>
                </label>
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="slider"
                />
              </div>

              <div className="emi-input-group">
                <label className="input-label">
                  <span className="label-text">Rate of Interest (p.a.)</span>
                  <span className="label-value">{rateOfInterest}%</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="0.5"
                  value={rateOfInterest}
                  onChange={(e) => setRateOfInterest(Number(e.target.value))}
                  className="slider"
                />
              </div>

              <div className="emi-input-group">
                <label className="input-label">
                  <span className="label-text">Loan Tenure</span>
                  <span className="label-value">{loanTenure} Years</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="slider"
                />
              </div>

              <div className="results-box">
                <div className="result-row emi-row">
                  <span className="result-label">Monthly EMI</span>
                  <span className="result-value emi-value">
                    ₹
                    {results.emi.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="result-divider"></div>
                <div className="result-row">
                  <span className="result-label">Principal Amount</span>
                  <span className="result-value">
                    ₹{loanAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">Total Interest</span>
                  <span className="result-value interest">
                    ₹
                    {results.totalInterest.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">Total Amount</span>
                  <span className="result-value">
                    ₹
                    {results.totalAmount.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="chart-section">
              <div className="chart-wrapper">
                <svg viewBox="0 0 200 200" className="donut-chart">
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#FED7AA"
                    strokeWidth="40"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="40"
                    strokeDasharray={`${principalPercentage * 5.03} 503`}
                    strokeLinecap="round"
                    className="progress-circle"
                  />
                </svg>
                <div className="chart-center">
                  <div className="chart-value">
                    ₹{(results.emi / 1000).toFixed(1)}K
                  </div>
                  <div className="chart-label">Monthly EMI</div>
                </div>
              </div>

              <div className="legend">
                <div className="legend-item">
                  <div className="legend-color principal"></div>
                  <span className="legend-text">
                    Principal: ₹{(loanAmount / 100000).toFixed(2)}L (
                    {principalPercentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="legend-item">
                  <div className="legend-color interest"></div>
                  <span className="legend-text">
                    Interest: ₹{(results.totalInterest / 100000).toFixed(2)}L (
                    {(100 - principalPercentage).toFixed(1)}%)
                  </span>
                </div>
              </div>

              <div className="total-payable-card">
                <div className="payable-label">Total Payable</div>
                <div className="payable-value">
                  ₹{(results.totalAmount / 100000).toFixed(2)}L
                </div>
                <div className="payable-period">over {loanTenure} years</div>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h2 className="info-title">What is EMI?</h2>
            <p className="info-text">
              EMI (Equated Monthly Installment) is a fixed payment amount made
              by a borrower to a lender at a specified date each calendar month.
              EMIs are used to pay off both interest and principal each month,
              so that over a specified number of years, the loan is paid off in
              full.
            </p>
            <h3 className="info-subtitle">Factors Affecting Your EMI:</h3>
            <ul className="info-list">
              <li>
                <strong>Loan Amount:</strong> Higher loan amount means higher
                EMI
              </li>
              <li>
                <strong>Interest Rate:</strong> Lower interest rates reduce your
                EMI burden
              </li>
              <li>
                <strong>Loan Tenure:</strong> Longer tenure means lower EMI but
                more total interest
              </li>
              <li>
                <strong>Type of Interest:</strong> Fixed vs floating interest
                rates affect EMI stability
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
