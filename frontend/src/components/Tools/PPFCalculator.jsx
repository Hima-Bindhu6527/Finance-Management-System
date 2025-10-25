import React, { useState, useEffect } from "react";
import { PiggyBank } from "lucide-react";
import "./PPFCalculator.css";

export default function PPFCalculator() {
  const [yearlyInvestment, setYearlyInvestment] = useState(100000);
  const [timePeriod, setTimePeriod] = useState(15);
  const [rateOfInterest, setRateOfInterest] = useState(7.1);
  const [results, setResults] = useState({
    invested: 0,
    interest: 0,
    total: 0,
  });

  useEffect(() => {
    calculatePPF();
  }, [yearlyInvestment, timePeriod, rateOfInterest]);

  const calculatePPF = () => {
    const P = yearlyInvestment;
    const r = rateOfInterest / 100;
    const n = timePeriod;

    const maturityAmount = P * ((Math.pow(1 + r, n) - 1) / r);
    const totalInvested = P * n;
    const totalInterest = maturityAmount - totalInvested;

    setResults({
      invested: totalInvested,
      interest: totalInterest,
      total: maturityAmount,
    });
  };

  const percentage = (results.invested / results.total) * 100 || 0;

  return (
    <div className="ppf-container">
      <div className="ppf-wrapper">
        <div className="ppf-card">
          <div className="ppf-header">
            <PiggyBank className="ppf-icon" />
            <h1 className="ppf-title">PPF Calculator</h1>
          </div>

          <div className="ppf-content">
            <div className="inputs-section">
              <div className="ppf-input-group">
                <label className="input-label">
                  <span className="label-text">Yearly Investment</span>
                  <span className="label-value">
                    ₹{yearlyInvestment.toLocaleString()}
                  </span>
                </label>
                <input
                  type="range"
                  min="500"
                  max="150000"
                  step="500"
                  value={yearlyInvestment}
                  onChange={(e) => setYearlyInvestment(Number(e.target.value))}
                  className="slider"
                />
                <div className="range-labels">
                  <span>₹500</span>
                  <span>₹1,50,000</span>
                </div>
              </div>

              <div className="ppf-input-group">
                <label className="input-label">
                  <span className="label-text">Time Period (Years)</span>
                  <span className="label-value">{timePeriod}</span>
                </label>
                <input
                  type="range"
                  min="15"
                  max="50"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="slider"
                />
                <div className="range-labels">
                  <span>15 Years</span>
                  <span>50 Years</span>
                </div>
              </div>

              <div className="ppf-input-group">
                <label className="input-label">
                  <span className="label-text">Rate of Interest</span>
                  <span className="label-value">{rateOfInterest}%</span>
                </label>
                <input
                  type="range"
                  min="6"
                  max="9"
                  step="0.1"
                  value={rateOfInterest}
                  onChange={(e) => setRateOfInterest(Number(e.target.value))}
                  className="slider"
                />
                <div className="range-labels">
                  <span>6%</span>
                  <span>9%</span>
                </div>
              </div>

              <div className="results-box">
                <div className="result-row">
                  <span className="result-label">Invested Amount</span>
                  <span className="result-value">
                    ₹
                    {results.invested.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">Interest Earned</span>
                  <span className="result-value returns">
                    ₹
                    {results.interest.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="result-row total">
                  <span className="result-label">Maturity Value</span>
                  <span className="result-value total-value">
                    ₹
                    {results.total.toLocaleString("en-IN", {
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
                    stroke="#D1FAE5"
                    strokeWidth="40"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="40"
                    strokeDasharray={`${percentage * 5.03} 503`}
                    strokeLinecap="round"
                    className="progress-circle"
                  />
                </svg>
                <div className="chart-center">
                  <div className="chart-value">{percentage.toFixed(0)}%</div>
                  <div className="chart-label">Invested</div>
                </div>
              </div>

              <div className="legend">
                <div className="legend-item">
                  <div className="legend-color invested"></div>
                  <span className="legend-text">
                    Principal: ₹{(results.invested / 100000).toFixed(2)}L
                  </span>
                </div>
                <div className="legend-item">
                  <div className="legend-color returns"></div>
                  <span className="legend-text">
                    Interest: ₹{(results.interest / 100000).toFixed(2)}L
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h2 className="info-title">About PPF Calculator</h2>
            <p className="info-text">
              The Public Provident Fund (PPF) is a long-term savings scheme
              backed by the Government of India. It offers attractive interest
              rates with the benefit of tax deductions under Section 80C of the
              Income Tax Act.
            </p>
            <h3 className="info-subtitle">Key Features:</h3>
            <ul className="info-list">
              <li>Minimum investment: ₹500 per year</li>
              <li>Maximum investment: ₹1,50,000 per year</li>
              <li>
                Lock-in period: 15 years (extendable in blocks of 5 years)
              </li>
              <li>Tax-free returns under EEE (Exempt-Exempt-Exempt) status</li>
              <li>Interest rate revised quarterly by the Government</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
