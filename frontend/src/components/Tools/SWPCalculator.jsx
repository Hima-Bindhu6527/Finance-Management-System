import React, { useState, useEffect } from "react";
import { Wallet } from "lucide-react";
import "./SWPCalculator.css";

export default function SWPCalculator() {
  const [totalInvestment, setTotalInvestment] = useState(500000);
  const [withdrawalAmount, setWithdrawalAmount] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [timePeriod, setTimePeriod] = useState(10);
  const [results, setResults] = useState({
    totalWithdrawn: 0,
    finalValue: 0,
    totalValue: 0,
  });

  useEffect(() => {
    calculateSWP();
  }, [totalInvestment, withdrawalAmount, expectedReturn, timePeriod]);

  const calculateSWP = () => {
    let balance = totalInvestment;
    const monthlyRate = expectedReturn / 100 / 12;
    const months = timePeriod * 12;
    let totalWithdrawn = 0;

    for (let i = 0; i < months; i++) {
      balance = balance * (1 + monthlyRate) - withdrawalAmount;
      totalWithdrawn += withdrawalAmount;

      if (balance < 0) {
        balance = 0;
        break;
      }
    }

    setResults({
      totalWithdrawn: totalWithdrawn,
      finalValue: Math.max(0, balance),
      totalValue: totalWithdrawn + Math.max(0, balance),
    });
  };

  return (
    <div className="swp-container">
      <div className="swp-wrapper">
        <div className="swp-card">
          <div className="swp-header">
            <Wallet className="swp-icon" />
            <h1 className="swp-title">SWP Calculator</h1>
          </div>

          <p className="swp-subtitle">Systematic Withdrawal Plan Calculator</p>

          <div className="swp-content">
            <div className="inputs-section">
              <div className="swp-input-group">
                <label className="input-label">
                  <span className="label-text">Total Investment</span>
                  <span className="label-value">
                    ₹{totalInvestment.toLocaleString()}
                  </span>
                </label>
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="10000"
                  value={totalInvestment}
                  onChange={(e) => setTotalInvestment(Number(e.target.value))}
                  className="slider"
                />
              </div>

              <div className="swp-input-group">
                <label className="input-label">
                  <span className="label-text">Withdrawal per Month</span>
                  <span className="label-value">
                    ₹{withdrawalAmount.toLocaleString()}
                  </span>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
                  className="slider"
                />
              </div>

              <div className="swp-input-group">
                <label className="input-label">
                  <span className="label-text">
                    Expected Return Rate (p.a.)
                  </span>
                  <span className="label-value">{expectedReturn}%</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="slider"
                />
              </div>

              <div className="swp-input-group">
                <label className="input-label">
                  <span className="label-text">Time Period</span>
                  <span className="label-value">{timePeriod} Years</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="slider"
                />
              </div>

              <div className="results-box">
                <div className="result-row">
                  <span className="result-label">Total Investment</span>
                  <span className="result-value">
                    ₹{totalInvestment.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">Total Withdrawn</span>
                  <span className="result-value withdrawn">
                    ₹
                    {results.totalWithdrawn.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">Final Value</span>
                  <span className="result-value returns">
                    ₹
                    {results.finalValue.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="chart-section">
              <div className="summary-card">
                <div className="summary-header">
                  <div className="summary-icon">💰</div>
                  <h3 className="summary-title">Investment Summary</h3>
                </div>

                <div className="summary-items">
                  <div className="summary-item">
                    <div className="summary-label">Monthly Withdrawal</div>
                    <div className="summary-value">
                      ₹{withdrawalAmount.toLocaleString()}
                    </div>
                  </div>

                  <div className="summary-item">
                    <div className="summary-label">Total Withdrawn</div>
                    <div className="summary-value">
                      ₹{(results.totalWithdrawn / 100000).toFixed(2)}L
                    </div>
                  </div>

                  <div className="summary-item">
                    <div className="summary-label">Remaining Balance</div>
                    <div className="summary-value balance">
                      ₹{(results.finalValue / 100000).toFixed(2)}L
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h2 className="info-title">What is a SWP Calculator?</h2>
            <p className="info-text">
              A Systematic Withdrawal Plan (SWP) calculator helps you plan
              regular withdrawals from your mutual fund investments. It shows
              how long your investment will last based on your withdrawal amount
              and expected returns.
            </p>
            <h3 className="info-subtitle">Benefits of SWP:</h3>
            <ul className="info-list">
              <li>Regular income stream from your investments</li>
              <li>Tax efficiency compared to traditional income sources</li>
              <li>Flexibility to change withdrawal amount</li>
              <li>Capital appreciation potential on remaining balance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
