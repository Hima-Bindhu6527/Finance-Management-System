import React, { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import "./SIPCalculator.css";

export default function SIPCalculator() {
  const [investmentType, setInvestmentType] = useState("sip");
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [lumpsum, setLumpsum] = useState(500000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [results, setResults] = useState({ invested: 0, returns: 0, total: 0 });

  useEffect(() => {
    if (investmentType === "sip") {
      calculateSIP();
    } else {
      calculateLumpsum();
    }
  }, [monthlyInvestment, lumpsum, expectedReturn, timePeriod, investmentType]);

  const calculateSIP = () => {
    const P = monthlyInvestment;
    const r = expectedReturn / 100 / 12;
    const n = timePeriod * 12;

    const futureValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const investedAmount = P * n;
    const estimatedReturns = futureValue - investedAmount;

    setResults({
      invested: investedAmount,
      returns: estimatedReturns,
      total: futureValue,
    });
  };

  const calculateLumpsum = () => {
    const P = lumpsum;
    const r = expectedReturn / 100;
    const n = timePeriod;

    const futureValue = P * Math.pow(1 + r, n);
    const estimatedReturns = futureValue - P;

    setResults({
      invested: P,
      returns: estimatedReturns,
      total: futureValue,
    });
  };

  const percentage = (results.invested / results.total) * 100 || 0;

  return (
    <div className="sip-container">
      <div className="sip-wrapper">
        <div className="sip-card">
          <div className="sip-header">
            <TrendingUp className="sip-icon" />
            <h1 className="sip-title">Investment Calculator</h1>
          </div>

          {/* Toggle Switch */}
          <div className="toggle-container">
            <div className="toggle-wrapper">
              <button
                onClick={() => setInvestmentType("sip")}
                className={`toggle-button ${
                  investmentType === "sip" ? "active" : ""
                }`}
              >
                SIP
              </button>
              <button
                onClick={() => setInvestmentType("lumpsum")}
                className={`toggle-button ${
                  investmentType === "lumpsum" ? "active" : ""
                }`}
              >
                Lumpsum
              </button>
            </div>
          </div>

          <div className="sip-content">
            {/* Left Side - Inputs */}
            <div className="inputs-section">
              {investmentType === "sip" ? (
                <div className="sip-input-group">
                  <label className="input-label">
                    <span className="label-text">Monthly Investment</span>
                    <span className="label-value">
                      ₹{monthlyInvestment.toLocaleString()}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={monthlyInvestment}
                    onChange={(e) =>
                      setMonthlyInvestment(Number(e.target.value))
                    }
                    className="slider"
                  />
                  <div className="range-labels">
                    <span>₹500</span>
                    <span>₹1,00,000</span>
                  </div>
                </div>
              ) : (
                <div className="sip-input-group">
                  <label className="input-label">
                    <span className="label-text">Total Investment</span>
                    <span className="label-value">
                      ₹{lumpsum.toLocaleString()}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="10000"
                    max="10000000"
                    step="10000"
                    value={lumpsum}
                    onChange={(e) => setLumpsum(Number(e.target.value))}
                    className="slider"
                  />
                  <div className="range-labels">
                    <span>₹10,000</span>
                    <span>₹1,00,00,000</span>
                  </div>
                </div>
              )}

              <div className="sip-input-group">
                <label className="input-label">
                  <span className="label-text">
                    Expected Return Rate (p.a.)
                  </span>
                  <span className="label-value">{expectedReturn}%</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="slider"
                />
                <div className="range-labels">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

              <div className="sip-input-group">
                <label className="input-label">
                  <span className="label-text">Time Period</span>
                  <span className="label-value">{timePeriod} Years</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="slider"
                />
                <div className="range-labels">
                  <span>1 Year</span>
                  <span>40 Years</span>
                </div>
              </div>

              <div className="results-box">
                <div className="result-row">
                  <span className="result-label">
                    {investmentType === "sip"
                      ? "Invested Amount"
                      : "Principal Amount"}
                  </span>
                  <span className="result-value">
                    ₹
                    {results.invested.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">Estimated Returns</span>
                  <span className="result-value returns">
                    ₹
                    {results.returns.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="result-row total">
                  <span className="result-label">Total Value</span>
                  <span className="result-value total-value">
                    ₹
                    {results.total.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Chart */}
            <div className="chart-section">
              <div className="chart-wrapper">
                <svg viewBox="0 0 200 200" className="donut-chart">
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#E0E7FF"
                    strokeWidth="40"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="40"
                    strokeDasharray={`${percentage * 5.03} 503`}
                    strokeLinecap="round"
                    className="progress-circle"
                  />
                </svg>
                <div className="chart-center">
                  <div className="chart-value">
                    ₹{(results.total / 100000).toFixed(1)}L
                  </div>
                  <div className="chart-label">Total Value</div>
                </div>
              </div>

              <div className="legend">
                <div className="legend-item">
                  <div className="legend-color invested"></div>
                  <span className="legend-text">
                    {investmentType === "sip" ? "Invested" : "Principal"}: ₹
                    {(results.invested / 100000).toFixed(2)}L
                  </span>
                </div>
                <div className="legend-item">
                  <div className="legend-color returns"></div>
                  <span className="legend-text">
                    Returns: ₹{(results.returns / 100000).toFixed(2)}L
                  </span>
                </div>
              </div>

              <div className="returns-card">
                <div className="returns-label">Absolute Returns</div>
                <div className="returns-percentage">
                  {((results.returns / results.invested) * 100).toFixed(2)}%
                </div>
                <div className="returns-period">over {timePeriod} years</div>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="info-section">
            <h2 className="info-title">
              {investmentType === "sip"
                ? "What is SIP?"
                : "What is Lumpsum Investment?"}
            </h2>
            {investmentType === "sip" ? (
              <>
                <p className="info-text">
                  A Systematic Investment Plan (SIP) allows you to invest a
                  fixed amount regularly in mutual funds. It helps you build
                  wealth over time through rupee cost averaging and the power of
                  compounding.
                </p>
                <h3 className="info-subtitle">Benefits of SIP:</h3>
                <ul className="info-list">
                  <li>
                    Disciplined investing habit with regular contributions
                  </li>
                  <li>Rupee cost averaging reduces market timing risk</li>
                  <li>Power of compounding grows your wealth exponentially</li>
                  <li>Flexibility to start with small amounts</li>
                  <li>Can be paused or stopped anytime</li>
                </ul>
              </>
            ) : (
              <>
                <p className="info-text">
                  Lumpsum investment means investing a large amount of money in
                  one go. It's ideal when you have surplus funds and want to
                  invest for long-term goals. The entire amount gets more time
                  to grow.
                </p>
                <h3 className="info-subtitle">Benefits of Lumpsum:</h3>
                <ul className="info-list">
                  <li>Entire amount invested immediately starts compounding</li>
                  <li>
                    Ideal for windfalls like bonuses, inheritance, or maturity
                    proceeds
                  </li>
                  <li>Maximum time in market for wealth creation</li>
                  <li>Simpler than managing monthly investments</li>
                  <li>Can generate higher returns in bull markets</li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
