import React, { useState, useEffect } from "react";
import { Landmark } from "lucide-react";
import "./FDCalculator.css";

export default function FDCalculator() {
  const [totalInvestment, setTotalInvestment] = useState(100000);
  const [rateOfInterest, setRateOfInterest] = useState(6.5);
  const [timePeriod, setTimePeriod] = useState(5);
  const [results, setResults] = useState({
    invested: 0,
    interest: 0,
    maturity: 0,
  });

  useEffect(() => {
    calculateFD();
  }, [totalInvestment, rateOfInterest, timePeriod]);

  const calculateFD = () => {
    const P = totalInvestment;
    const r = rateOfInterest / 100;
    const n = 4; // Quarterly compounding
    const t = timePeriod;

    const maturityAmount = P * Math.pow(1 + r / n, n * t);
    const interestEarned = maturityAmount - P;

    setResults({
      invested: P,
      interest: interestEarned,
      maturity: maturityAmount,
    });
  };

  const percentage = (results.invested / results.maturity) * 100 || 0;

  return (
    <div className="fd-container">
      <div className="fd-wrapper">
        <div className="fd-card">
          <div className="fd-header-calc">
            <Landmark className="fd-icon" />
            <h1 className="fd-title">FD Calculator</h1>
          </div>

          <p className="fd-subtitle">Fixed Deposit Calculator</p>

          <div className="fd-content">
            <div className="inputs-section">
              <div className="fd-input-group">
                <label className="input-label">
                  <span className="label-text">Total Investment</span>
                  <span className="label-value">
                    ₹{totalInvestment.toLocaleString()}
                  </span>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="10000000"
                  step="1000"
                  value={totalInvestment}
                  onChange={(e) => setTotalInvestment(Number(e.target.value))}
                  className="slider"
                />
              </div>

              <div className="fd-input-group">
                <label className="input-label">
                  <span className="label-text">Rate of Interest (p.a.)</span>
                  <span className="label-value">{rateOfInterest}%</span>
                </label>
                <input
                  type="range"
                  min="3"
                  max="10"
                  step="0.1"
                  value={rateOfInterest}
                  onChange={(e) => setRateOfInterest(Number(e.target.value))}
                  className="slider"
                />
              </div>

              <div className="fd-input-group">
                <label className="input-label">
                  <span className="label-text">Time Period</span>
                  <span className="label-value">{timePeriod} Years</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="slider"
                />
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
                  <span className="result-value interest">
                    ₹
                    {results.interest.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="result-row total">
                  <span className="result-label">Maturity Amount</span>
                  <span className="result-value total-value">
                    ₹
                    {results.maturity.toLocaleString("en-IN", {
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
                    stroke="#EA580C"
                    strokeWidth="40"
                    strokeDasharray={`${percentage * 5.03} 503`}
                    strokeLinecap="round"
                    className="progress-circle"
                  />
                </svg>
                <div className="chart-center">
                  <div className="chart-value">{percentage.toFixed(0)}%</div>
                  <div className="chart-label">Principal</div>
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
                  <div className="legend-color interest"></div>
                  <span className="legend-text">
                    Interest: ₹{(results.interest / 100000).toFixed(2)}L
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h2 className="info-title">About Fixed Deposit Calculator</h2>
            <p className="info-text">
              A Fixed Deposit (FD) is a financial instrument provided by banks
              which provides investors with a higher rate of interest than a
              regular savings account, until the given maturity date.
            </p>
            <h3 className="info-subtitle">Key Features:</h3>
            <ul className="info-list">
              <li>Guaranteed returns with no market risk</li>
              <li>Flexible tenure options from 7 days to 10 years</li>
              <li>
                Interest can be compounded quarterly, half-yearly, or annually
              </li>
              <li>Premature withdrawal allowed with penalty</li>
              <li>
                Tax benefits available under Section 80C (for 5-year tax-saving
                FDs)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
