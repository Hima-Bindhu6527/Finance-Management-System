import React, { useState } from "react";
import "./Bonds.css";

const Bonds = () => {
  const [activeTab, setActiveTab] = useState("basics");

  const bondTypes = [
    {
      title: "Government Bonds (G-Secs)",
      description:
        "Issued by the Centra or State governments, these are the safest debt instruments with sovereign guarantee",
      features: [
        "Zero default risk",
        "Fixed interest rates",
        "Tradable in secondary market",
      ],
      examples: [
        "Treasury Bills (T-Bills)",
        "Government Securities",
        "State Development Loans (SDLs)",
      ],
    },
    {
      title: "Corporate Bonds",
      description:
        "Issued by private and public sector companies to raise capital for business expansion",
      features: [
        "Higher returns than G-Secs",
        "Credit rating dependent",
        "Moderate to high risk",
      ],
      examples: [
        "AAA-rated bonds",
        "Non-Convertible Debentures (NCDs)",
        "Commercial Papers",
      ],
    },
    {
      title: "Tax-Free Bonds",
      description:
        "Interest income is completely exempt from tax under Section 10",
      features: [
        "Tax-free interest",
        "Long tenure (10-20 years)",
        "Government entities",
      ],
      examples: ["NHAI Bonds", "PFC Bonds", "IRFC Bonds", "REC Bonds"],
    },
    {
      title: "Inflation-Indexed Bonds",
      description:
        "Principal and interest payments are linked to inflation index (WPI or CPI)",
      features: [
        "Protection against inflation",
        "Real returns guaranteed",
        "Government backed",
      ],
      examples: [
        "Inflation Indexed National Savings Securities (IINSS)",
        "Capital Indexed Bonds",
      ],
    },
    {
      title: "Sovereign Gold Bonds (SGBs)",
      description:
        "Government securities denominated in grams of gold, offering 2.5% p.a. interest plus gold price appreciation",
      features: [
        "Gold price linked",
        "No storage hassle",
        "Tax benefits on redemption",
      ],
      examples: ["RBI Sovereign Gold Bonds (issued periodically)"],
    },
    {
      title: "Municipal Bonds",
      description:
        "Issued by local government bodies to fund infrastructure and development projects",
      features: [
        "Tax-free interest",
        "Support local development",
        "Moderate safety",
      ],
      examples: [
        "Pune Municipal Corporation Bonds",
        "Hyderabad Municipal Bonds",
      ],
    },
    {
      title: "Zero-Coupon Bonds",
      description:
        "Sold at discount, no periodic interest, full face value paid at maturity",
      features: [
        "No coupon payments",
        "Deep discount purchase",
        "Capital appreciation",
      ],
      examples: ["Deep Discount Bonds", "Some Treasury Bills"],
    },
    {
      title: "Floating Rate Bonds",
      description: "Interest rate resets periodically based on benchmark rates",
      features: [
        "Protection from rate hikes",
        "Variable returns",
        "Market-linked",
      ],
      examples: ["RBI Floating Rate Savings Bonds", "Floating Rate NCDs"],
    },
  ];

  const bondStrategies = [
    {
      title: "Buy and Hold",
      description:
        "Purchase bonds and hold until maturity to receive predictable fixed income",
      icon: "🎯",
      bestFor: "Conservative investors seeking stable returns",
    },
    {
      title: "Bond Laddering",
      description:
        "Invest in bonds with staggered maturity dates to manage reinvestment risk",
      icon: "📊",
      bestFor: "Managing interest rate risk and maintaining liquidity",
    },
    {
      title: "Barbell Strategy",
      description:
        "Invest in short-term and long-term bonds, avoiding medium-term",
      icon: "⚖️",
      bestFor: "Balancing liquidity with higher long-term yields",
    },
    {
      title: "Bullet Strategy",
      description:
        "All bonds mature at the same time to meet a specific financial goal",
      icon: "🎯",
      bestFor: "Goal-based investing (retirement, child education)",
    },
    {
      title: "Active Trading",
      description:
        "Buy and sell bonds in secondary market to profit from price movements",
      icon: "📈",
      bestFor: "Experienced investors who can analyze interest rate movements",
    },
    {
      title: "Duration Matching",
      description: "Match bond portfolio duration with investment time horizon",
      icon: "⏱️",
      bestFor: "Minimizing interest rate risk for specific liabilities",
    },
  ];

  const keyBenefits = [
    {
      title: "Fixed Income",
      description: "Regular, predictable interest payments (coupon payments)",
      icon: "💰",
    },
    {
      title: "Capital Preservation",
      description: "Lower risk compared to equities, principal amount safe",
      icon: "🛡️",
    },
    {
      title: "Diversification",
      description: "Balances equity risk in your investment portfolio",
      icon: "⚖️",
    },
    {
      title: "Tax Benefits",
      description: "Tax-free bonds offer complete tax exemption on interest",
      icon: "📋",
    },
    {
      title: "Liquidity Options",
      description: "Many bonds can be sold in secondary market before maturity",
      icon: "💱",
    },
    {
      title: "Better than FDs",
      description: "Often offer higher returns than bank fixed deposits",
      icon: "📈",
    },
  ];

  const popularBonds = [
    {
      issuer: "RBI Floating Rate Bonds",
      rate: "7.15% (varies)",
      tenure: "7 years",
      rating: "AAA",
    },
    {
      issuer: "Sovereign Gold Bonds",
      rate: "2.5% + gold price",
      tenure: "8 years",
      rating: "Sovereign",
    },
    {
      issuer: "HDFC Ltd Bonds",
      rate: "8-9%",
      tenure: "3-5 years",
      rating: "AAA",
    },
    {
      issuer: "Bajaj Finance FDs",
      rate: "8.5%",
      tenure: "1-5 years",
      rating: "AAA",
    },
  ];

  const bondVsFD = [
    {
      aspect: "Returns",
      bond: "Generally higher (7-10%)",
      fd: "Moderate (5-7%)",
    },
    {
      aspect: "Safety",
      bond: "Depends on issuer rating",
      fd: "Very safe (DICGC insured up to ₹5 lakh)",
    },
    {
      aspect: "Liquidity",
      bond: "Can sell in secondary market anytime",
      fd: "Penalty on premature withdrawal (0.5-1%)",
    },
    {
      aspect: "Investment Amount",
      bond: "Usually ₹10,000 to ₹1,00,000 minimum",
      fd: "As low as ₹100-₹1,000",
    },
    {
      aspect: "Tax Benefits",
      bond: "Tax-free bonds offer complete exemption",
      fd: "No tax benefits (interest fully taxable)",
    },
    {
      aspect: "Interest Payment",
      bond: "Annual, semi-annual, or at maturity",
      fd: "Quarterly, monthly, or cumulative",
    },
    {
      aspect: "Market Risk",
      bond: "Bond prices fluctuate with interest rates",
      fd: "No market risk, fixed value",
    },
    {
      aspect: "Tenure",
      bond: "1 year to 30+ years",
      fd: "7 days to 10 years",
    },
  ];

  const howToInvest = [
    {
      step: "Primary Market",
      description:
        "Buy directly when newly issued through banks, brokers, or online platforms",
    },
    {
      step: "Secondary Market",
      description: "Buy existing bonds through stock exchanges (NSE, BSE)",
    },
    {
      step: "Bond Mutual Funds",
      description: "Invest in debt mutual funds that hold various bonds",
    },
    {
      step: "RBI Retail Direct",
      description: "Buy government securities directly through RBI portal",
    },
  ];

  const riskFactors = [
    "Credit risk - issuer may default on payments",
    "Interest rate risk - bond prices fall when rates rise",
    "Liquidity risk - some bonds difficult to sell quickly",
    "Inflation risk - fixed returns may not beat inflation",
    "Reinvestment risk - reinvesting coupons at lower rates",
  ];

  return (
    <div className="bonds-content-wrapper">
      <div className="bonds-header">
        <h1>BONDS & FIXED INCOME</h1>
        <p className="bonds-subtitle">
          Secure your future with stable, predictable returns
        </p>
      </div>

      <div className="bonds-tab-navigation">
        <button
          className={activeTab === "basics" ? "bonds-active" : ""}
          onClick={() => setActiveTab("basics")}
        >
          What are Bonds?
        </button>
        <button
          className={activeTab === "types" ? "bonds-active" : ""}
          onClick={() => setActiveTab("types")}
        >
          Types of Bonds
        </button>
        <button
          className={activeTab === "strategies" ? "bonds-active" : ""}
          onClick={() => setActiveTab("strategies")}
        >
          Investment Strategies
        </button>
        <button
          className={activeTab === "compare" ? "bonds-active" : ""}
          onClick={() => setActiveTab("compare")}
        >
          Bonds vs FDs
        </button>
        <button
          className={activeTab === "invest" ? "bonds-active" : ""}
          onClick={() => setActiveTab("invest")}
        >
          How to Invest
        </button>
      </div>

      {activeTab === "basics" && (
        <div className="bonds-overview-section">
          <div className="bonds-intro-content">
            <h2>What are Bonds?</h2>
            <p>
              <strong>Bonds are debt securities</strong> where investors lend
              money to an entity (government or corporation) for a defined
              period at a fixed interest rate. When you buy a bond, you are
              essentially <strong>giving a loan to the issuer</strong>, who
              promises to pay you back the principal amount on maturity along
              with <strong>periodic interest payments (coupons)</strong>.
            </p>
            <p>
              Bonds are considered <strong>safer than stocks</strong> and are an
              essential part of a diversified investment portfolio. They provide{" "}
              <strong>regular income and help preserve capital</strong>, making
              them ideal for conservative investors and those nearing
              retirement.
            </p>
          </div>

          <div className="bond-basics">
            <h2>How Do Bonds Work?</h2>
            <div className="work-steps">
              <div className="work-step-card">
                <div className="step-number">1</div>
                <h4>Bond Issuance</h4>
                <p>
                  Government or company issues bonds to raise funds. Each bond
                  has a face value (usually ₹1,000), coupon rate (interest %),
                  and maturity date.
                </p>
              </div>

              <div className="work-step-card">
                <div className="step-number">2</div>
                <h4>Investor Purchase</h4>
                <p>
                  You buy bonds in primary market (when issued) or secondary
                  market (from other investors). The purchase price may be at
                  par, premium, or discount.
                </p>
              </div>

              <div className="work-step-card">
                <div className="step-number">3</div>
                <h4>Coupon Payments</h4>
                <p>
                  Issuer pays periodic interest (coupon) - typically annually or
                  semi-annually. This provides regular, predictable income.
                </p>
              </div>

              <div className="work-step-card">
                <div className="step-number">4</div>
                <h4>Maturity & Redemption</h4>
                <p>
                  On maturity date, issuer repays the face value of the bond.
                  You can also sell bonds before maturity in the secondary
                  market.
                </p>
              </div>
            </div>
          </div>

          <div className="benefits-section">
            <h2>Key Benefits of Bond Investing</h2>
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

          <div className="bonds-popular-bonds">
            <h3>🏆 Popular Bond Options in India</h3>
            <div className="bonds-bonds-table">
              <table>
                <thead>
                  <tr>
                    <th>Issuer</th>
                    <th>Interest Rate</th>
                    <th>Tenure</th>
                    <th>Credit Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {popularBonds.map((bond, index) => (
                    <tr key={index}>
                      <td>{bond.issuer}</td>
                      <td>{bond.rate}</td>
                      <td>{bond.tenure}</td>
                      <td>{bond.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bonds-risk-section">
            <h3>⚠️ Risk Factors to Consider</h3>
            <ul className="bonds-risk-list">
              {riskFactors.map((risk, index) => (
                <li key={index}>{risk}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === "strategies" && (
        <div className="strategies-section">
          <h2>Bond Investment Strategies</h2>
          <p className="section-intro">
            Different strategies can help you maximize returns and manage risk
            based on your investment goals:
          </p>

          <div className="strategies-grid">
            {bondStrategies.map((strategy, index) => (
              <div key={index} className="strategy-card">
                <div className="strategy-icon">{strategy.icon}</div>
                <h3>{strategy.title}</h3>
                <p className="strategy-description">{strategy.description}</p>
                <p className="best-for">
                  <strong>Best For:</strong> {strategy.bestFor}
                </p>
              </div>
            ))}
          </div>

          <div className="strategy-examples">
            <h3>📚 Strategy Examples</h3>

            <div className="example-card">
              <h4>Bond Laddering Example</h4>
              <p>
                Invest ₹5 lakh in 5 bonds maturing in 1, 2, 3, 4, and 5 years
                (₹1 lakh each). As each bond matures, reinvest in a new 5-year
                bond. This maintains steady income and reduces reinvestment
                risk.
              </p>
            </div>

            <div className="example-card">
              <h4>Barbell Strategy Example</h4>
              <p>
                Invest 50% in 1-year Treasury Bills (high liquidity) and 50% in
                10-year G-Secs (higher yield). Skip medium-term bonds. This
                balances immediate liquidity needs with long-term returns.
              </p>
            </div>

            <div className="example-card">
              <h4>Goal-Based Bullet Strategy</h4>
              <p>
                If your child's education expense is in 10 years, invest in
                bonds that all mature in year 10. This ensures funds are
                available exactly when needed without reinvestment concerns.
              </p>
            </div>
          </div>

          <div className="strategy-tips">
            <h3>💡 Strategy Selection Tips</h3>
            <ul className="tips-list">
              <li>
                Use Buy & Hold for retirement income - stable and predictable
              </li>
              <li>Choose Laddering if you need regular liquidity and income</li>
              <li>Barbell works well when interest rates are uncertain</li>
              <li>Bullet strategy perfect for specific future expenses</li>
              <li>
                Active trading requires market knowledge and time commitment
              </li>
              <li>
                Duration matching helps institutional investors manage
                liabilities
              </li>
              <li>Combine strategies for optimal portfolio management</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "types" && (
        <div className="types-section">
          <h2>Types of Bonds in India</h2>
          <div className="bond-types-grid">
            {bondTypes.map((type, index) => (
              <div key={index} className="type-card">
                <h3>{type.title}</h3>
                <p>{type.description}</p>
                <ul className="features-list">
                  {type.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
                <div className="examples">
                  <strong>Examples:</strong>
                  <ul>
                    {type.examples.map((example, idx) => (
                      <li key={idx}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="bond-features">
            <h3>🔑 Key Bond Terms to Know</h3>
            <div className="terms-grid">
              <div className="term-item">
                <h4>Face Value</h4>
                <p>Original price of the bond (usually ₹1,000)</p>
              </div>
              <div className="term-item">
                <h4>Coupon Rate</h4>
                <p>Annual interest rate paid on face value</p>
              </div>
              <div className="term-item">
                <h4>Maturity Date</h4>
                <p>When principal amount is repaid</p>
              </div>
              <div className="term-item">
                <h4>Yield</h4>
                <p>Actual return considering market price</p>
              </div>
              <div className="term-item">
                <h4>Credit Rating</h4>
                <p>Assessment of issuer's creditworthiness</p>
              </div>
              <div className="term-item">
                <h4>Duration</h4>
                <p>Measure of interest rate sensitivity</p>
              </div>
            </div>
          </div>

          <div className="credit-ratings">
            <h3>📊 Understanding Credit Ratings</h3>
            <ul className="rating-list">
              <li>
                <strong>AAA:</strong> Highest safety, lowest risk
              </li>
              <li>
                <strong>AA:</strong> High quality, very low risk
              </li>
              <li>
                <strong>A:</strong> Good quality, low risk
              </li>
              <li>
                <strong>BBB:</strong> Adequate safety, moderate risk
              </li>
              <li>
                <strong>Below BBB:</strong> Speculative, higher risk
              </li>
            </ul>
            <p className="rating-note">
              💡 Stick to bonds rated AA and above for safety
            </p>
          </div>
        </div>
      )}

      {activeTab === "compare" && (
        <div className="compare-section">
          <h2>Bonds vs Fixed Deposits</h2>
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Bonds</th>
                  <th>Fixed Deposits</th>
                </tr>
              </thead>
              <tbody>
                {bondVsFD.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{row.aspect}</strong>
                    </td>
                    <td>{row.bond}</td>
                    <td>{row.fd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="when-to-choose">
            <div className="choice-card">
              <h3>✅ Choose Bonds When:</h3>
              <ul>
                <li>Looking for higher returns than FDs</li>
                <li>Want liquidity through secondary market</li>
                <li>Seeking tax-free income (tax-free bonds)</li>
                <li>Comfortable with slightly higher risk</li>
                <li>Have larger investment amounts (₹10,000+)</li>
              </ul>
            </div>
            <div className="choice-card">
              <h3>✅ Choose Fixed Deposits When:</h3>
              <ul>
                <li>Want maximum safety and simplicity</li>
                <li>Prefer bank guarantee</li>
                <li>Have small amounts to invest</li>
                <li>Need easy premature withdrawal</li>
                <li>Looking for senior citizen benefits</li>
              </ul>
            </div>
          </div>

          <div className="tax-info">
            <h3>📋 Tax Implications</h3>
            <p>
              <strong>Regular Bonds:</strong> Interest income taxed as per your
              income tax slab. Capital gains on bond sale also taxable.
            </p>
            <p>
              <strong>Tax-Free Bonds:</strong> Interest earned is completely
              exempt from tax. However, capital gains on sale are taxable.
            </p>
            <p>
              <strong>Sovereign Gold Bonds:</strong> Interest taxable, but
              capital gains on redemption after 8 years are tax-free.
            </p>
          </div>

          <div className="tips-section">
            <h3>💡 Investment Tips</h3>
            <ul className="tips-list">
              <li>Diversify across different types of bonds</li>
              <li>Check credit ratings before investing</li>
              <li>Consider interest rate cycle before buying</li>
              <li>Use RBI Retail Direct for government securities</li>
              <li>Ladder your bond investments (different maturities)</li>
              <li>Keep bonds until maturity for predictable returns</li>
              <li>Consider bond funds for easier diversification</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "invest" && (
        <div className="invest-section">
          <h2>How to Invest in Bonds?</h2>
          <p className="section-intro">
            Multiple options are available to invest in bonds in India. Choose
            the method that suits your investment goals:
          </p>

          <div className="investment-methods">
            {howToInvest.map((method, index) => (
              <div key={index} className="method-card">
                <h3>{method.step}</h3>
                <p>{method.description}</p>
              </div>
            ))}
          </div>

          <div className="detailed-process">
            <h3>📝 Detailed Step-by-Step Process</h3>

            <div className="process-section">
              <h4>1. Primary Market Investment</h4>
              <div className="process-steps">
                <p>
                  <strong>Step 1:</strong> Open a Demat and Trading account with
                  a registered broker
                </p>
                <p>
                  <strong>Step 2:</strong> Watch for New Bond Issues (IPOs)
                  announced by companies/government
                </p>
                <p>
                  <strong>Step 3:</strong> Apply online through your broker
                  during the issue period
                </p>
                <p>
                  <strong>Step 4:</strong> Bonds get credited to your Demat
                  account on allotment
                </p>
              </div>
            </div>

            <div className="process-section">
              <h4>2. Secondary Market Investment</h4>
              <div className="process-steps">
                <p>
                  <strong>Step 1:</strong> Log into your trading platform
                  (Zerodha, Groww, Angel One, etc.)
                </p>
                <p>
                  <strong>Step 2:</strong> Search for bonds in the Debt/Bond
                  segment
                </p>
                <p>
                  <strong>Step 3:</strong> Check YTM (Yield to Maturity), credit
                  rating, and maturity date
                </p>
                <p>
                  <strong>Step 4:</strong> Place buy order similar to buying
                  stocks
                </p>
              </div>
            </div>

            <div className="process-section">
              <h4>3. RBI Retail Direct (for G-Secs)</h4>
              <div className="process-steps">
                <p>
                  <strong>Step 1:</strong> Visit{" "}
                  <a
                    href="https://www.rbiretaildirect.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    RBI Retail Direct Portal
                  </a>
                </p>
                <p>
                  <strong>Step 2:</strong> Register with PAN, Aadhaar, and bank
                  details
                </p>
                <p>
                  <strong>Step 3:</strong> Browse available Government
                  Securities
                </p>
                <p>
                  <strong>Step 4:</strong> Place bids in auctions or buy from
                  secondary market
                </p>
              </div>
            </div>

            <div className="process-section">
              <h4>4. Bond Mutual Funds / Debt Funds</h4>
              <div className="process-steps">
                <p>
                  <strong>Step 1:</strong> Choose a debt mutual fund scheme
                  (corporate bond fund, gilt fund, etc.)
                </p>
                <p>
                  <strong>Step 2:</strong> Complete KYC through any AMC or
                  online platform
                </p>
                <p>
                  <strong>Step 3:</strong> Start SIP or invest lumpsum directly
                </p>
                <p>
                  <strong>Step 4:</strong> Professional fund managers handle
                  bond selection
                </p>
              </div>
            </div>
          </div>

          <div className="platforms-section">
            <h3>🏦 Popular Platforms to Invest in Bonds</h3>
            <div className="platforms-grid">
              <div className="platform-item">
                <h4>RBI Retail Direct</h4>
                <p>For Government Securities - Safe & Direct</p>
              </div>
              <div className="platform-item">
                <h4>Zerodha / Kite</h4>
                <p>Corporate & Government Bonds Trading</p>
              </div>
              <div className="platform-item">
                <h4>Groww</h4>
                <p>Easy Bond Investment Interface</p>
              </div>
              <div className="platform-item">
                <h4>Angel One</h4>
                <p>Wide Range of Bond Options</p>
              </div>
              <div className="platform-item">
                <h4>ICICI Direct</h4>
                <p>Comprehensive Bond Market Access</p>
              </div>
              <div className="platform-item">
                <h4>Debt Mutual Funds</h4>
                <p>Via Groww, Zerodha Coin, Paytm Money</p>
              </div>
            </div>
          </div>

          <div className="documents-required">
            <h3>📄 Documents Required</h3>
            <ul className="documents-list">
              <li>✓ PAN Card (mandatory for all investments)</li>
              <li>✓ Aadhaar Card (for KYC verification)</li>
              <li>✓ Bank Account Details (savings account)</li>
              <li>✓ Address Proof (Aadhaar, Voter ID, Passport)</li>
              <li>✓ Demat Account (for holding bonds electronically)</li>
              <li>
                ✓ Trading Account (for buying/selling in secondary market)
              </li>
              <li>✓ Passport-sized Photograph</li>
            </ul>
          </div>

          <div className="investment-considerations">
            <h3>⚠️ Things to Check Before Investing</h3>
            <div className="considerations-grid">
              <div className="consideration-card">
                <h4>Credit Rating</h4>
                <p>
                  Check CRISIL, ICRA, CARE ratings. Invest in AA+ and above for
                  safety.
                </p>
              </div>
              <div className="consideration-card">
                <h4>Yield to Maturity (YTM)</h4>
                <p>
                  Compare YTM across similar bonds. Higher YTM = better returns.
                </p>
              </div>
              <div className="consideration-card">
                <h4>Maturity Date</h4>
                <p>
                  Match bond maturity with your financial goals and time
                  horizon.
                </p>
              </div>
              <div className="consideration-card">
                <h4>Coupon Rate</h4>
                <p>
                  Higher coupon = more regular income. Zero-coupon = lumpsum at
                  end.
                </p>
              </div>
              <div className="consideration-card">
                <h4>Liquidity</h4>
                <p>
                  Check trading volumes. Higher volumes = easier to sell before
                  maturity.
                </p>
              </div>
              <div className="consideration-card">
                <h4>Tax Implications</h4>
                <p>
                  Understand tax on interest income and capital gains based on
                  holding period.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="cta-section">
        <h3>Ready to start investing in Bonds?</h3>
        <p>Build a stable income portfolio with expert guidance</p>
        <a
          href="https://zerodha.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-button"
        >
          Start Investing 🚀
        </a>
      </div>
    </div>
  );
};

export default Bonds;
