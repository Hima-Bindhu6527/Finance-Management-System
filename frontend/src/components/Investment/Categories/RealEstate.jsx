import React, { useState } from "react";
import "./RealEstate.css";

const RealEstate = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const realEstateTypes = [
    {
      title: "Residential Property",
      description: "Apartments, houses, villas for living or rental income",
      features: [
        "Stable rental income",
        "Capital appreciation",
        "Emotional value",
      ],
      investment: "₹30 lakhs - ₹5 crores+",
      returns: "3-5% rental yield + appreciation",
    },
    {
      title: "Commercial Property",
      description: "Office spaces, retail shops, warehouses",
      features: [
        "Higher rental yields (6-10%)",
        "Long-term leases",
        "Business tenants",
      ],
      investment: "₹50 lakhs - ₹10 crores+",
      returns: "6-10% rental yield + appreciation",
    },
    {
      title: "REITs (Real Estate Investment Trusts)",
      description: "Invest in real estate without buying property",
      features: [
        "Low entry barrier",
        "High liquidity",
        "Diversified portfolio",
      ],
      investment: "As low as ₹10,000",
      returns: "6-8% dividend yield",
    },
    {
      title: "Land/Plots",
      description:
        "Agricultural or residential land for long-term appreciation",
      features: [
        "High appreciation potential",
        "No maintenance",
        "Agricultural tax benefits",
      ],
      investment: "₹10 lakhs - ₹1 crore+",
      returns: "Variable, 8-12% annually in growth areas",
    },
  ];

  const keyBenefits = [
    {
      title: "Tangible Asset",
      description: "Physical property you can see, touch, and use",
      icon: "🏠",
    },
    {
      title: "Rental Income",
      description: "Regular monthly income from tenants",
      icon: "💰",
    },
    {
      title: "Capital Appreciation",
      description:
        "Property value increases over time, especially in good locations",
      icon: "📈",
    },
    {
      title: "Inflation Hedge",
      description: "Property values and rents typically rise with inflation",
      icon: "🛡️",
    },
    {
      title: "Loan Collateral",
      description: "Use property to secure loans for other purposes",
      icon: "🏦",
    },
    {
      title: "Tax Benefits",
      description: "Home loan interest and principal deductions under IT Act",
      icon: "📋",
    },
  ];

  const popularREITs = [
    {
      name: "Embassy Office Parks REIT",
      type: "Commercial offices",
      yield: "6-7%",
    },
    {
      name: "Mindspace Business Parks REIT",
      type: "IT/Business parks",
      yield: "6-7%",
    },
    {
      name: "Brookfield India REIT",
      type: "Commercial offices",
      yield: "7-8%",
    },
    { name: "Nexus Select Trust", type: "Retail malls", yield: "7-8%" },
  ];

  const investmentFactors = [
    {
      factor: "Location",
      importance: "Critical",
      tip: "Choose areas with good infrastructure, connectivity, and growth potential",
    },
    {
      factor: "Legal Clarity",
      importance: "Critical",
      tip: "Verify all documents, clear titles, RERA registration, approvals",
    },
    {
      factor: "Builder Reputation",
      importance: "High",
      tip: "Check track record, past projects, customer reviews",
    },
    {
      factor: "Amenities",
      importance: "Medium",
      tip: "Good amenities increase rental demand and property value",
    },
    {
      factor: "Timing",
      importance: "High",
      tip: "Buy during market corrections, avoid peak bubble periods",
    },
  ];

  const taxBenefits = [
    {
      section: "Section 80C",
      benefit: "Principal repayment",
      limit: "₹1.5 lakh per year",
    },
    {
      section: "Section 24(b)",
      benefit: "Home loan interest (self-occupied)",
      limit: "₹2 lakh per year",
    },
    {
      section: "Section 24(b)",
      benefit: "Home loan interest (let-out)",
      limit: "No limit, full interest deductible",
    },
    {
      section: "Section 80EEA",
      benefit: "First-time home buyer interest",
      limit: "Additional ₹1.5 lakh",
    },
  ];

  const riskFactors = [
    "Illiquidity - difficult to sell quickly",
    "High initial investment required",
    "Market cycles can be long (5-10 years)",
    "Property maintenance and management hassles",
    "Tenant-related issues and vacancy periods",
    "Regulatory risks - government policies, rent control",
    "Legal disputes and documentation issues",
    "Location risk - area may not develop as expected",
  ];

  const vsOtherInvestments = [
    {
      aspect: "Entry Amount",
      realestate: "₹30 lakhs+",
      stocks: "₹500+",
      gold: "₹1000+",
    },
    {
      aspect: "Liquidity",
      realestate: "Very Low",
      stocks: "High",
      gold: "High",
    },
    { aspect: "Returns", realestate: "8-12%", stocks: "12-15%", gold: "8-10%" },
    {
      aspect: "Maintenance",
      realestate: "High effort",
      stocks: "Low",
      gold: "None",
    },
    {
      aspect: "Leverage",
      realestate: "High (80% loan)",
      stocks: "Limited",
      gold: "Medium",
    },
  ];

  return (
    <div className="realestate-content-wrapper">
      <div className="realestate-header">
        <h1>REAL ESTATE INVESTMENT</h1>
        <p className="realestate-subtitle">
          Build wealth through property ownership
        </p>
      </div>

      <div className="realestate-tab-navigation">
        <button
          className={activeTab === "overview" ? "realestate-active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={activeTab === "types" ? "realestate-active" : ""}
          onClick={() => setActiveTab("types")}
        >
          Investment Types
        </button>
        <button
          className={activeTab === "tips" ? "realestate-active" : ""}
          onClick={() => setActiveTab("tips")}
        >
          Investment Tips
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="realestate-overview-section">
          <div className="realestate-intro-content">
            <h2>What is Real Estate Investment?</h2>
            <p>
              Real estate investment involves purchasing property (land,
              residential, or commercial) with the expectation of generating
              returns through rental income and/or capital appreciation. It's
              one of the oldest and most popular forms of investment in India,
              often considered a status symbol and wealth preservation tool.
            </p>
            <p>
              Real estate investments can range from buying physical properties
              to investing in REITs (Real Estate Investment Trusts) which allow
              participation in the real estate market with lower capital
              requirements and better liquidity.
            </p>
          </div>

          <div className="benefits-section">
            <h2>Key Benefits of Real Estate Investment</h2>
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

          <div className="tax-benefits-section">
            <h3>📋 Tax Benefits on Home Loans</h3>
            <div className="tax-table">
              <table>
                <thead>
                  <tr>
                    <th>Section</th>
                    <th>Benefit</th>
                    <th>Maximum Limit</th>
                  </tr>
                </thead>
                <tbody>
                  {taxBenefits.map((tax, index) => (
                    <tr key={index}>
                      <td>
                        <strong>{tax.section}</strong>
                      </td>
                      <td>{tax.benefit}</td>
                      <td>{tax.limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="comparison-section">
            <h3>Real Estate vs Other Investments</h3>
            <table>
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Real Estate</th>
                  <th>Stocks</th>
                  <th>Gold</th>
                </tr>
              </thead>
              <tbody>
                {vsOtherInvestments.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{row.aspect}</strong>
                    </td>
                    <td>{row.realestate}</td>
                    <td>{row.stocks}</td>
                    <td>{row.gold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="risk-section">
            <h3>⚠️ Risk Factors to Consider</h3>
            <ul className="risk-list">
              {riskFactors.map((risk, index) => (
                <li key={index}>{risk}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === "types" && (
        <div className="realestate-types-section">
          <h2>Types of Real Estate Investments</h2>
          <div className="realestate-types-grid">
            {realEstateTypes.map((type, index) => (
              <div key={index} className="type-card">
                <h3>{type.title}</h3>
                <p>{type.description}</p>
                <ul className="features-list">
                  {type.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <div className="investment-info">
                  <p>
                    <strong>Typical Investment:</strong> {type.investment}
                  </p>
                  <p>
                    <strong>Expected Returns:</strong> {type.returns}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="reits-section">
            <h3>🏢 Popular REITs in India</h3>
            <p className="reits-intro">
              REITs offer a way to invest in real estate with low entry
              barriers, high liquidity, and regular dividend income. They are
              listed on stock exchanges and can be bought like stocks.
            </p>
            <div className="reits-table">
              <table>
                <thead>
                  <tr>
                    <th>REIT Name</th>
                    <th>Property Type</th>
                    <th>Dividend Yield</th>
                  </tr>
                </thead>
                <tbody>
                  {popularREITs.map((reit, index) => (
                    <tr key={index}>
                      <td>
                        <strong>{reit.name}</strong>
                      </td>
                      <td>{reit.type}</td>
                      <td>{reit.yield}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="reits-benefits">
              <h4>Why Invest in REITs?</h4>
              <ul>
                <li>Low minimum investment (₹10,000-50,000)</li>
                <li>High liquidity - buy/sell like stocks</li>
                <li>Regular dividend income (90% of profits distributed)</li>
                <li>Professionally managed properties</li>
                <li>Diversification across multiple properties</li>
                <li>Transparent and regulated by SEBI</li>
              </ul>
            </div>
          </div>

          <div className="investment-strategies">
            <h3>📊 Real Estate Investment Strategies</h3>
            <div className="strategies-grid">
              <div className="strategy-card">
                <h4>Buy and Hold</h4>
                <p>
                  Purchase property and hold for long-term appreciation while
                  earning rental income
                </p>
              </div>
              <div className="strategy-card">
                <h4>Flipping</h4>
                <p>
                  Buy undervalued properties, renovate, and sell quickly for
                  profit (risky, requires expertise)
                </p>
              </div>
              <div className="strategy-card">
                <h4>Rental Income</h4>
                <p>
                  Focus on properties with high rental yields in prime locations
                </p>
              </div>
              <div className="strategy-card">
                <h4>Under Construction</h4>
                <p>
                  Buy during construction at lower prices, sell after completion
                  (RERA protection)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "tips" && (
        <div className="tips-section">
          <h2>Essential Investment Factors</h2>
          <div className="factors-table">
            <table>
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Importance</th>
                  <th>Key Tip</th>
                </tr>
              </thead>
              <tbody>
                {investmentFactors.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{item.factor}</strong>
                    </td>
                    <td>
                      <span
                        className={`importance-badge ${item.importance.toLowerCase()}`}
                      >
                        {item.importance}
                      </span>
                    </td>
                    <td>{item.tip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="due-diligence">
            <h3>📝 Due Diligence Checklist</h3>
            <div className="checklist">
              <div className="checklist-section">
                <h4>Legal Checks</h4>
                <ul>
                  <li>Clear title deed and ownership documents</li>
                  <li>No pending legal disputes or encumbrances</li>
                  <li>RERA registration (for under-construction)</li>
                  <li>Building plan approval from municipality</li>
                  <li>Occupancy certificate (for ready properties)</li>
                  <li>Property tax receipts up to date</li>
                </ul>
              </div>
              <div className="checklist-section">
                <h4>Physical Checks</h4>
                <ul>
                  <li>Inspect property condition thoroughly</li>
                  <li>Check for water seepage, cracks, damages</li>
                  <li>Verify carpet area vs agreement area</li>
                  <li>Test all fittings, plumbing, electrical</li>
                  <li>Check parking availability and location</li>
                  <li>Assess natural lighting and ventilation</li>
                </ul>
              </div>
              <div className="checklist-section">
                <h4>Financial Checks</h4>
                <ul>
                  <li>Compare prices in the locality</li>
                  <li>Check builder's payment schedule</li>
                  <li>Calculate total cost including registration, GST</li>
                  <li>Verify home loan eligibility and interest rates</li>
                  <li>Check maintenance charges and hidden costs</li>
                  <li>Assess rental potential and yields</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="location-tips">
            <h3>📍 Location Selection Tips</h3>
            <div className="location-factors">
              <div className="factor-card">
                <h4>✅ Good Indicators</h4>
                <ul>
                  <li>
                    Near IT parks, business hubs, or upcoming metro stations
                  </li>
                  <li>Good schools, hospitals, and shopping nearby</li>
                  <li>Upcoming infrastructure projects announced</li>
                  <li>Gated community with security</li>
                  <li>Growing rental demand in the area</li>
                </ul>
              </div>
              <div className="factor-card">
                <h4>❌ Red Flags</h4>
                <ul>
                  <li>Far from main roads and public transport</li>
                  <li>Near pollution sources (factories, landfills)</li>
                  <li>Frequent flooding or waterlogging issues</li>
                  <li>High crime rate in the area</li>
                  <li>No proper civic amenities</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="dos-donts">
            <h3>✓ Do's and ✗ Don'ts</h3>
            <div className="dos-donts-grid">
              <div className="dos">
                <h4>✓ Do's</h4>
                <ul>
                  <li>Research extensively before buying</li>
                  <li>Hire a good lawyer for documentation</li>
                  <li>Get property inspected by engineer</li>
                  <li>Compare multiple properties</li>
                  <li>Negotiate the price</li>
                  <li>Keep 20-30% down payment ready</li>
                  <li>Consider resale value</li>
                  <li>Check builder's track record</li>
                </ul>
              </div>
              <div className="donts">
                <h4>✗ Don'ts</h4>
                <ul>
                  <li>Don't buy in a hurry</li>
                  <li>Don't skip legal verification</li>
                  <li>Don't invest all savings in one property</li>
                  <li>Don't ignore hidden costs</li>
                  <li>Don't buy far from your monitoring ability</li>
                  <li>Don't fall for unrealistic promises</li>
                  <li>Don't buy based on just one visit</li>
                  <li>Don't ignore tenant quality (for rental)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="financing-tips">
            <h3>💰 Financing Your Property</h3>
            <ul className="financing-list">
              <li>
                <strong>Down Payment:</strong> Typically 10-20% of property
                value
              </li>
              <li>
                <strong>Loan Amount:</strong> Banks finance up to 80-90% of
                property value
              </li>
              <li>
                <strong>Interest Rates:</strong> Currently 8-9% for home loans
              </li>
              <li>
                <strong>Tenure:</strong> Up to 30 years maximum
              </li>
              <li>
                <strong>EMI:</strong> Should not exceed 40% of monthly income
              </li>
              <li>
                <strong>Additional Costs:</strong> Registration (5-7%), GST (on
                under-construction), legal fees
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealEstate;
