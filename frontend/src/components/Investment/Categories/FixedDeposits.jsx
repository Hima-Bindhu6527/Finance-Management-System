import React, { useState } from "react";
import "./FixedDeposits.css";
const FixedDeposits = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const fdTypes = [
    {
      title: "Bank Fixed Deposits",
      description: "Traditional FDs offered by banks with guaranteed returns",
      features: [
        "DICGC insured up to ₹5 lakh",
        "Highly secure",
        "Easy to open",
      ],
      topProviders: ["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank"],
    },
    {
      title: "Corporate Fixed Deposits",
      description:
        "FDs offered by companies, higher returns but slightly riskier",
      features: [
        "Higher interest rates",
        "No DICGC insurance",
        "Check credit ratings",
      ],
      topProviders: ["Bajaj Finance", "Mahindra Finance", "Shriram Finance"],
    },
    {
      title: "Post Office Fixed Deposits",
      description: "Government-backed FDs through India Post",
      features: [
        "Government guarantee",
        "Simple process",
        "Accessible in rural areas",
      ],
      tenure: "1, 2, 3, 5 years",
    },
    {
      title: "Tax Saving FDs",
      description: "5-year lock-in FDs with Section 80C tax benefits",
      features: [
        "Tax deduction up to ₹1.5 lakh",
        "5-year lock-in",
        "Guaranteed returns",
      ],
      note: "Interest income still taxable",
    },
  ];

  const keyBenefits = [
    {
      title: "Guaranteed Returns",
      description: "Fixed, predetermined interest rate for entire tenure",
      icon: "💰",
    },
    {
      title: "Capital Safety",
      description: "Principal amount completely safe, DICGC insured",
      icon: "🛡️",
    },
    {
      title: "Flexible Tenure",
      description: "Choose from 7 days to 10 years based on your needs",
      icon: "⏰",
    },
    {
      title: "Easy Investment",
      description: "Simple process, available at any bank branch or online",
      icon: "✅",
    },
    {
      title: "Loan Facility",
      description: "Get loans up to 90% of FD value without breaking it",
      icon: "🏦",
    },
    {
      title: "Senior Citizen Benefits",
      description: "Extra 0.5% interest for senior citizens (60+ years)",
      icon: "👴",
    },
  ];

  const topFDRates = [
    {
      bank: "SBI",
      regular: "6.50 - 7.00%",
      seniorCitizen: "7.00 - 7.50%",
      tenure: "1-5 years",
    },
    {
      bank: "HDFC Bank",
      regular: "6.50 - 7.25%",
      seniorCitizen: "7.00 - 7.75%",
      tenure: "1-5 years",
    },
    {
      bank: "ICICI Bank",
      regular: "6.70 - 7.20%",
      seniorCitizen: "7.20 - 7.70%",
      tenure: "1-5 years",
    },
    {
      bank: "Bajaj Finance",
      regular: "8.00 - 8.60%",
      seniorCitizen: "8.50 - 8.85%",
      tenure: "1-5 years",
    },
  ];

  const fdCalculatorTips = [
    "Interest can be paid monthly, quarterly, or on maturity",
    "Cumulative FDs offer higher returns (compounding)",
    "Premature withdrawal usually has 0.5-1% penalty",
    "TDS deducted if interest exceeds ₹40,000/year (₹50,000 for seniors)",
    "Online FD rates sometimes higher than branch rates",
  ];

  const fdVsOthers = [
    { aspect: "Returns", fd: "6-8%", savings: "3-4%", recurring: "6-7%" },
    {
      aspect: "Lock-in",
      fd: "Yes (flexible)",
      savings: "No",
      recurring: "Yes (monthly)",
    },
    {
      aspect: "Liquidity",
      fd: "With penalty",
      savings: "Instant",
      recurring: "With penalty",
    },
    {
      aspect: "Investment",
      fd: "Lump sum",
      savings: "Any time",
      recurring: "Monthly fixed",
    },
  ];

  const taxationInfo = [
    {
      aspect: "Interest Income",
      details:
        "Fully taxable as 'Income from Other Sources' as per your tax slab",
    },
    {
      aspect: "TDS",
      details:
        "10% TDS if interest exceeds ₹40,000/year (₹50,000 for senior citizens)",
    },
    {
      aspect: "Form 15G/15H",
      details: "Submit to avoid TDS if total income below taxable limit",
    },
    {
      aspect: "Tax Saving FD",
      details: "Get 80C deduction on principal, but interest still taxable",
    },
  ];

  return (
    <div className="fd-content-wrapper">
      <div className="fd-header">
        <h1>FIXED DEPOSITS (FDs)</h1>
        <p className="fd-subtitle">
          Safe and guaranteed returns for risk-averse investors
        </p>
      </div>

      <div className="fd-tab-navigation">
        <button
          className={activeTab === "overview" ? "fd-active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={activeTab === "types" ? "fd-active" : ""}
          onClick={() => setActiveTab("types")}
        >
          Types of FDs
        </button>
        <button
          className={activeTab === "rates" ? "fd-active" : ""}
          onClick={() => setActiveTab("rates")}
        >
          Current Rates
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="fd-overview-section">
          <div className="fd-intro-content">
            <h2>What are Fixed Deposits?</h2>
            <p>
              Fixed Deposits (FDs) are one of the safest and most popular
              investment options in India. When you invest in an FD, you deposit
              a lump sum amount with a bank or financial institution for a fixed
              period (tenure) at a predetermined interest rate. At maturity, you
              receive your principal amount plus the accumulated interest.
            </p>
            <p>
              FDs are ideal for conservative investors who prioritize capital
              safety over high returns. They offer guaranteed returns regardless
              of market conditions and are protected by Deposit Insurance and
              Credit Guarantee Corporation (DICGC) up to ₹5 lakh per bank.
            </p>
          </div>

          <div className="benefits-section">
            <h2>Key Benefits of Fixed Deposits</h2>
            <div className="benefits-grid">
              {keyBenefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <div className="benefit-icon">{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="how-it-works">
            <h3>📝 How FDs Work</h3>
            <ol className="steps-list">
              <li>Choose the bank/institution and FD scheme</li>
              <li>Decide the deposit amount and tenure</li>
              <li>
                Select interest payout frequency (monthly/quarterly/maturity)
              </li>
              <li>Complete KYC and open the FD (online or branch)</li>
              <li>Receive interest periodically or at maturity</li>
              <li>Get principal + interest at maturity</li>
            </ol>
          </div>

          <div className="tips-section">
            <h3>💡 Important Things to Know</h3>
            <ul className="tips-list">
              {fdCalculatorTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="comparison-box">
            <h3>FD vs Other Savings Options</h3>
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Fixed Deposit</th>
                  <th>Savings Account</th>
                  <th>Recurring Deposit</th>
                </tr>
              </thead>
              <tbody>
                {fdVsOthers.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{row.aspect}</strong>
                    </td>
                    <td>{row.fd}</td>
                    <td>{row.savings}</td>
                    <td>{row.recurring}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "types" && (
        <div className="fd-types-section">
          <h2>Types of Fixed Deposits</h2>
          <div className="fd-types-grid">
            {fdTypes.map((type, index) => (
              <div key={index} className="type-card">
                <h3>{type.title}</h3>
                <p>{type.description}</p>
                <ul className="features-list">
                  {type.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                {type.topProviders && (
                  <div className="providers">
                    <strong>Top Providers:</strong>
                    <p>{type.topProviders.join(", ")}</p>
                  </div>
                )}
                {type.tenure && (
                  <div className="tenure-info">
                    <strong>Tenure Options:</strong> {type.tenure}
                  </div>
                )}
                {type.note && (
                  <div className="note-info">
                    <em>📌 {type.note}</em>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="special-fds">
            <h3>🌟 Special FD Schemes</h3>
            <div className="special-schemes">
              <div className="scheme-card">
                <h4>Flexi FD</h4>
                <p>
                  Linked to savings account, auto-sweeps excess funds to FD for
                  better returns
                </p>
              </div>
              <div className="scheme-card">
                <h4>Step-up FD</h4>
                <p>Interest rate increases periodically during the tenure</p>
              </div>
              <div className="scheme-card">
                <h4>Senior Citizen FD</h4>
                <p>Special rates (0.5% extra) for citizens aged 60 and above</p>
              </div>
              <div className="scheme-card">
                <h4>NRI FD</h4>
                <p>Special FD schemes for Non-Resident Indians (NRE/NRO)</p>
              </div>
            </div>
          </div>

          <div className="taxation-section">
            <h3>📋 Taxation on FDs</h3>
            <div className="tax-cards">
              {taxationInfo.map((tax, index) => (
                <div key={index} className="tax-card">
                  <h4>{tax.aspect}</h4>
                  <p>{tax.details}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="tips-section">
            <h3>💡 Pro Tips for FD Investors</h3>
            <ul className="tips-list">
              <li>Ladder FDs with different maturity dates for liquidity</li>
              <li>Compare rates across banks before investing</li>
              <li>Consider corporate FDs for 1-2% higher returns</li>
              <li>Use online FDs for slightly better rates</li>
              <li>
                Keep emergency fund separate, don't lock everything in FDs
              </li>
              <li>Senior citizens should explore special schemes</li>
              <li>Don't break FDs prematurely to avoid penalties</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "rates" && (
        <div className="rates-section">
          <h2>Current FD Interest Rates (Indicative)</h2>
          <p className="rates-note">
            <em>
              Note: Rates are approximate and change frequently. Check with
              respective banks for current rates.
            </em>
          </p>

          <div className="rates-table">
            <table>
              <thead>
                <tr>
                  <th>Bank/Institution</th>
                  <th>Regular Rate</th>
                  <th>Senior Citizen Rate</th>
                  <th>Tenure</th>
                </tr>
              </thead>
              <tbody>
                {topFDRates.map((rate, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{rate.bank}</strong>
                    </td>
                    <td>{rate.regular}</td>
                    <td>{rate.seniorCitizen}</td>
                    <td>{rate.tenure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rate-factors">
            <h3>📊 Factors Affecting FD Rates</h3>
            <ul className="factors-list">
              <li>
                <strong>RBI Repo Rate:</strong> Banks adjust FD rates based on
                RBI's monetary policy
              </li>
              <li>
                <strong>Economic Conditions:</strong> Inflation and economic
                growth impact rates
              </li>
              <li>
                <strong>Bank Liquidity:</strong> Banks needing funds offer
                higher rates
              </li>
              <li>
                <strong>Tenure:</strong> Longer tenures often (but not always)
                offer higher rates
              </li>
              <li>
                <strong>Competition:</strong> Small finance banks may offer
                higher rates
              </li>
            </ul>
          </div>

          <div className="rate-trends">
            <h3>📈 Recent Rate Trends</h3>
            <p>
              FD rates in India have been relatively stable in recent years,
              typically ranging from 6-8% for bank FDs and 8-9% for corporate
              FDs. Rates tend to increase during periods of high inflation when
              RBI raises the repo rate.
            </p>
            <p>
              <strong>Best Strategy:</strong> Book FDs when rates are high and
              going higher. Consider shorter tenures during rising rate
              environments and longer tenures when rates peak.
            </p>
          </div>

          <div className="calculator-info">
            <h3>🧮 FD Returns Calculator</h3>
            <div className="example-calculation">
              <h4>Example Calculation:</h4>
              <ul>
                <li>Principal Amount: ₹1,00,000</li>
                <li>Interest Rate: 7% per annum</li>
                <li>Tenure: 5 years</li>
                <li>Type: Cumulative (quarterly compounding)</li>
              </ul>
              <div className="result">
                <strong>Maturity Amount:</strong> ₹1,41,478
                <br />
                <strong>Interest Earned:</strong> ₹41,478
              </div>
            </div>
          </div>

          <div className="when-to-invest">
            <h3>⏰ When to Invest in FDs?</h3>
            <div className="investment-scenarios">
              <div className="scenario-card good">
                <h4>✅ Good Time to Invest</h4>
                <ul>
                  <li>When you need guaranteed returns</li>
                  <li>For emergency fund (short-term FDs)</li>
                  <li>When market is highly volatile</li>
                  <li>For near-term goals (1-3 years)</li>
                  <li>If you're risk-averse investor</li>
                </ul>
              </div>
              <div className="scenario-card caution">
                <h4>⚠️ Consider Alternatives When</h4>
                <ul>
                  <li>Looking for inflation-beating returns</li>
                  <li>Long-term goals (5+ years)</li>
                  <li>In high tax bracket (FDs are tax-inefficient)</li>
                  <li>Market corrections offer better opportunities</li>
                  <li>Young investor with high risk appetite</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FixedDeposits;
