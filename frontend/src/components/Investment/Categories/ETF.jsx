import React, { useState } from "react";
import "./ETF.css";

const ETF = () => {
  const [activeTab, setActiveTab] = useState("basics");

  const etfTypes = [
    {
      title: "Index ETFs",
      description: "Funds designed to track a specific index",
      example: "Nifty 50, Sensex, S&P 500",
    },
    {
      title: "Fixed Income ETFs",
      description: "Provide exposure to nearly every type of bond available",
      example: "Government bonds, Corporate bonds",
    },
    {
      title: "Sector/Industry ETFs",
      description: "Designed to provide exposure to a specific industry",
      example: "Oil, Pharmaceuticals, High Technology",
    },
    {
      title: "Commodity ETFs",
      description: "Track the price of a specific commodity",
      example: "Gold, Oil, Corn",
    },
    {
      title: "Leveraged ETFs",
      description: "Designed to employ leverage to boost returns",
      example: "2x or 3x leveraged index funds",
    },
    {
      title: "Actively Managed ETFs",
      description: "Aimed to outperform an index rather than just track it",
      example: "Stock-picking ETFs by fund managers",
    },
    {
      title: "ETNs (Exchange-Traded Notes)",
      description:
        "Debt securities guaranteed by issuing bank's creditworthiness",
      example:
        "Enables access to illiquid markets, no short-term capital gains taxes",
    },
    {
      title: "Alternative Investment ETFs",
      description: "Trade volatility or get exposure to specific strategies",
      example: "Currency carry, Covered call writing",
    },
    {
      title: "Style ETFs",
      description: "Mirror specific investment style or market size focus",
      example: "Large-cap value, Small-cap growth",
    },
    {
      title: "Foreign Market ETFs",
      description: "Monitor non-Indian markets",
      example: "Japan's Nikkei Index, Hong Kong's Hang Seng Index",
    },
    {
      title: "Inverse ETFs",
      description:
        "Designed to profit from a drop in the underlying market or index",
      example: "Short index ETFs",
    },
  ];

  const benefits = [
    {
      title: "Intraday Trading",
      description:
        "Unlike other mutual funds which trade at the end of the day, you can buy and sell at any time of day",
      icon: "⏰",
    },
    {
      title: "Daily Transparency",
      description:
        "The majority of ETFs are required to report their holdings on a daily basis",
      icon: "�️",
    },
    {
      title: "Tax Efficiency",
      description:
        "ETFs are more tax efficient than actively managed mutual funds because they generate less capital gain distributions",
      icon: "📋",
    },
    {
      title: "Flexibility in Trading",
      description:
        "Since they are traded like stocks, investors can place order types (limit orders or stop-loss orders) that mutual funds cannot",
      icon: "⚡",
    },
    {
      title: "Diversification",
      description:
        "Single ETF provides exposure to multiple securities across various sectors and markets",
      icon: "�",
    },
    {
      title: "Low Cost",
      description:
        "Lower expense ratios compared to actively managed mutual funds",
      icon: "�",
    },
  ];

  const risks = [
    {
      title: "Trading Costs",
      description:
        "If you invest small sums frequently, dealing directly with a fund company in a no-load fund may be less expensive",
      icon: "💸",
    },
    {
      title: "Illiquidity",
      description:
        "Some lightly traded ETFs have huge bid or ask spreads, which means you'll be buying at the spread's high price and selling at the spread's low price",
      icon: "📉",
    },
    {
      title: "Tracking Error",
      description:
        "While ETFs often mirror their underlying index closely, technical difficulties might cause variances",
      icon: "⚠️",
    },
    {
      title: "Settlement Time",
      description:
        "ETF sales will not be settled for two days after the transaction; your money from an ETF sale is unavailable to reinvest for two days",
      icon: "⏳",
    },
  ];

  const investmentSteps = [
    {
      step: "Step 1",
      title: "Open a Brokerage Account",
      description:
        "Open a demat and trading account with a registered broker to start investing in ETFs",
    },
    {
      step: "Step 2",
      title: "Choose the ETF",
      description:
        "Research and select suitable ETFs based on your investment goals, risk appetite, and market analysis",
    },
    {
      step: "Step 3",
      title: "Transfer the Money",
      description:
        "Transfer funds to your trading account and place buy orders for your chosen ETFs",
    },
  ];

  const etfVsMutualFund = [
    {
      aspect: "Trading",
      etf: "Trade like stocks throughout the day",
      mf: "Once a day at NAV",
    },
    { aspect: "Cost", etf: "Lower expense ratio", mf: "Higher expense ratio" },
    {
      aspect: "Transparency",
      etf: "Daily holdings disclosure",
      mf: "Monthly/quarterly disclosure",
    },
    {
      aspect: "Minimum Investment",
      etf: "1 unit (varies by price)",
      mf: "₹500-₹5000",
    },
    { aspect: "Management", etf: "Passive (mostly)", mf: "etf-active or passive" },
    {
      aspect: "Trading Hours",
      etf: "Anytime during market hours",
      mf: "End of day",
    },
    {
      aspect: "Order Types",
      etf: "Limit orders, stop-loss orders",
      mf: "Not available",
    },
    {
      aspect: "Tax Efficiency",
      etf: "More tax efficient",
      mf: "Less tax efficient",
    },
  ];

  const popularIndianETFs = [
    { name: "Nippon India ETF Nifty BeES", tracks: "Nifty 50 Index" },
    { name: "SBI ETF Nifty 50", tracks: "Nifty 50 Index" },
    { name: "ICICI Prudential Nifty ETF", tracks: "Nifty 50 Index" },
    { name: "Nippon India ETF Junior BeES", tracks: "Nifty Next 50" },
    { name: "SBI ETF Gold", tracks: "Gold Prices" },
    { name: "Motilal Oswal Nasdaq 100 ETF", tracks: "US Tech Stocks" },
  ];

  return (
    <div className="etf-content-wrapper">
      <div className="etf-header">
        <h1>EXCHANGE-TRADED FUNDS (ETFs)</h1>
        <p className="etf-subtitle">
          Combining the diversification of mutual funds with the simplicity of
          stock trading
        </p>
      </div>

      <div className="etf-tab-navigation">
        <button
          className={activeTab === "basics" ? "etf-active" : ""}
          onClick={() => setActiveTab("basics")}
        >
          What is ETF?
        </button>
        <button
          className={activeTab === "types" ? "etf-active" : ""}
          onClick={() => setActiveTab("types")}
        >
          Types of ETFs
        </button>
        <button
          className={activeTab === "benefits" ? "etf-active" : ""}
          onClick={() => setActiveTab("benefits")}
        >
          Benefits & Risks
        </button>
        <button
          className={activeTab === "compare" ? "etf-active" : ""}
          onClick={() => setActiveTab("compare")}
        >
          ETF vs Mutual Fund
        </button>
        <button
          className={activeTab === "invest" ? "etf-active" : ""}
          onClick={() => setActiveTab("invest")}
        >
          How to Invest
        </button>
      </div>

      {activeTab === "basics" && (
        <div className="etf-overview-section">
          <div className="etf-intro-content">
            <h2>ETF Meaning</h2>
            <p>
              <strong>
                ETFs are a sort of investment fund that combines the best
                features of two popular assets:
              </strong>{" "}
              They combine the{" "}
              <strong>diversification benefits of mutual funds</strong> with the{" "}
              <strong>simplicity with which equities may be exchanged</strong>.
            </p>
          </div>

          <div className="definition-section">
            <h2>What is an ETF?</h2>
            <p>
              An <strong>exchange-traded fund (ETF)</strong> is a collection of
              investments such as equities or bonds. ETFs will let you invest in
              a large number of securities at once, and they often have{" "}
              <strong>cheaper fees</strong> than other types of funds. ETFs are
              also more easily traded.
            </p>
            <p>
              However, ETFs, like any other financial product, is not a
              one-size-fits-all solution. Examine them on their own merits,
              including management charges and commission fees, ease of purchase
              and sale, fit into your existing portfolio, and investment
              quality.
            </p>
          </div>

          <div className="how-works-section">
            <h2>How do ETFs Work?</h2>
            <p>
              The assets that are underlying are{" "}
              <strong>owned by the fund provider</strong>, who then forms a fund
              to track the performance and offers shares in that fund to
              investors.{" "}
              <strong>
                Shareholders own a part of an ETF but not the fund's assets.
              </strong>
            </p>
            <p>
              Investors in an ETF that tracks a stock index may get lump
              dividend payments or reinvestments for the index's constituent
              firms.
            </p>

            <div className="etf-work-steps">
              <div className="work-step-card">
                <div className="step-number">1</div>
                <h4>Fund Creation</h4>
                <p>
                  An ETF provider takes into account the universe of assets,
                  such as stocks, bonds, commodities, or currencies, and builds
                  a basket of them, each with its own ticker.
                </p>
              </div>

              <div className="work-step-card">
                <div className="step-number">2</div>
                <h4>Share Purchase</h4>
                <p>
                  Investors can buy a share in that basket in the same way they
                  would buy stock in a firm.
                </p>
              </div>

              <div className="work-step-card">
                <div className="step-number">3</div>
                <h4>Trading</h4>
                <p>
                  Like a stock, buyers and sellers trade the ETF on an exchange
                  throughout the day.
                </p>
              </div>
            </div>
          </div>

          <div className="popular-etfs">
            <h3>🏆 Popular ETFs in India</h3>
            <div className="etf-list">
              {popularIndianETFs.map((etf, index) => (
                <div key={index} className="etf-item">
                  <strong>{etf.name}</strong>
                  <span>Tracks: {etf.tracks}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "types" && (
        <div className="etf-types-section">
          <h2>Types of ETFs</h2>
          <p className="section-intro">
            ETFs come in various types, each designed to meet different
            investment objectives and strategies:
          </p>

          <div className="etf-types-grid">
            {etfTypes.map((type, index) => (
              <div key={index} className="type-card">
                <h3>{type.title}</h3>
                <p className="type-description">{type.description}</p>
                <p className="type-example">
                  <strong>Example:</strong> {type.example}
                </p>
              </div>
            ))}
          </div>

          <div className="index-info">
            <h3>📈 Popular Indices Tracked by ETFs</h3>
            <div className="indices-grid">
              <div className="index-item">
                <h4>Nifty 50</h4>
                <p>Top 50 companies on NSE</p>
              </div>
              <div className="index-item">
                <h4>Sensex</h4>
                <p>30 top companies on BSE</p>
              </div>
              <div className="index-item">
                <h4>Nifty Next 50</h4>
                <p>Next 50 large companies</p>
              </div>
              <div className="index-item">
                <h4>Nifty Bank</h4>
                <p>Banking sector stocks</p>
              </div>
              <div className="index-item">
                <h4>Nifty IT</h4>
                <p>IT sector stocks</p>
              </div>
              <div className="index-item">
                <h4>International</h4>
                <p>S&P 500, Nasdaq 100</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "benefits" && (
        <div className="benefits-risks-section">
          <div className="benefits-container">
            <h2>✅ Benefits of Investing in ETFs</h2>
            <p className="section-intro">The advantages of ETFs:</p>

            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <div className="benefit-icon">{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="risks-container">
            <h2>⚠️ Risks of ETFs</h2>
            <p className="section-intro">
              However, there are several disadvantages to using ETFs:
            </p>

            <div className="risks-grid">
              {risks.map((risk, index) => (
                <div key={index} className="risk-card">
                  <div className="risk-icon">{risk.icon}</div>
                  <h3>{risk.title}</h3>
                  <p>{risk.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="tips-section">
            <h3>💡 Investment Tips</h3>
            <ul className="tips-list">
              <li>Start with broad market index ETFs for beginners</li>
              <li>
                Check the tracking error (how closely it follows the index)
              </li>
              <li>Consider liquidity - higher trading volumes are better</li>
              <li>Compare expense ratios between similar ETFs</li>
              <li>Use ETFs for long-term wealth creation (5+ years)</li>
              <li>Rebalance your portfolio annually</li>
              <li>Understand the underlying assets before investing</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "compare" && (
        <div className="compare-section">
          <h2>ETFs vs Mutual Funds</h2>
          <p className="section-intro">
            Understanding the key differences between ETFs and Mutual Funds can
            help you make better investment decisions:
          </p>

          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>ETFs</th>
                  <th>Mutual Funds</th>
                </tr>
              </thead>
              <tbody>
                {etfVsMutualFund.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{row.aspect}</strong>
                    </td>
                    <td>{row.etf}</td>
                    <td>{row.mf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="when-to-choose">
            <div className="choice-card">
              <h3>✅ Choose ETFs When:</h3>
              <ul>
                <li>You want real-time trading flexibility</li>
                <li>Looking for lower costs and expense ratios</li>
                <li>Prefer passive index investing strategy</li>
                <li>Want complete transparency with daily holdings</li>
                <li>Have a demat and trading account</li>
                <li>Need to place limit orders or stop-loss orders</li>
                <li>Seeking tax-efficient investment options</li>
              </ul>
            </div>

            <div className="choice-card">
              <h3>✅ Choose Mutual Funds When:</h3>
              <ul>
                <li>Want SIP (Systematic Investment Plan) facility</li>
                <li>Prefer professional etf-active management</li>
                <li>Don't have demat account</li>
                <li>Making small investment amounts regularly</li>
                <li>Don't need intraday trading capability</li>
                <li>Want automated investment options</li>
                <li>Prefer direct fund purchases without demat</li>
              </ul>
            </div>
          </div>

          <div className="tax-info">
            <h3>📋 Tax Implications</h3>
            <p>
              <strong>Equity ETFs:</strong> Long-term capital gains (held {">"}1
              year) taxed at 10% above ₹1 lakh gains. Short-term capital gains
              (held ≤ 1 year) taxed at 15%.
            </p>
            <p>
              <strong>Gold/International ETFs:</strong> Long-term capital gains
              (held {">"} 3 years) with indexation benefit. Short-term capital
              gains taxed as per your income tax slab.
            </p>
          </div>
        </div>
      )}

      {activeTab === "invest" && (
        <div className="invest-section">
          <h2>How to Invest in ETF?</h2>
          <p className="section-intro">
            There are a few major steps to invest in an ETF. Follow this simple
            process to start your ETF investment journey:
          </p>

          <div className="investment-steps">
            {investmentSteps.map((item, index) => (
              <div key={index} className="investment-step-card">
                <div className="step-badge">{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          <div className="detailed-process">
            <h3>📝 Detailed Investment Process</h3>
            <div className="process-list">
              <div className="process-item">
                <h4>1. Open a Demat and Trading Account</h4>
                <p>
                  Choose a registered broker or platform to open your account.
                  Complete KYC verification with required documents.
                </p>
              </div>

              <div className="process-item">
                <h4>2. Research and Select ETFs</h4>
                <p>
                  Analyze different ETFs based on expense ratio, tracking error,
                  trading volume, and your investment goals.
                </p>
              </div>

              <div className="process-item">
                <h4>3. Place Buy Orders</h4>
                <p>
                  Transfer funds to your trading account and place market or
                  limit orders for your chosen ETFs through your broker.
                </p>
              </div>

              <div className="process-item">
                <h4>4. Units Credited to Demat Account</h4>
                <p>
                  ETF units will be credited to your demat account after
                  successful purchase and settlement.
                </p>
              </div>

              <div className="process-item">
                <h4>5. Monitor and Rebalance</h4>
                <p>
                  Regularly review performance and rebalance your portfolio
                  annually or as needed based on your goals.
                </p>
              </div>
            </div>
          </div>

          <div className="important-considerations">
            <h3>⚠️ Important Considerations Before Investing</h3>
            <ul className="considerations-list">
              <li>Check the expense ratio - lower is generally better</li>
              <li>
                Look at the trading volume - higher liquidity means easier
                buying/selling
              </li>
              <li>
                Understand the tracking error - how closely does it follow the
                index?
              </li>
              <li>Review the underlying assets and their quality</li>
              <li>Consider your investment timeline and goals</li>
              <li>Be aware of brokerage charges and other costs</li>
              <li>Understand the tax implications based on holding period</li>
            </ul>
          </div>
        </div>
      )}

      <div className="cta-section">
        <h3>Ready to start investing in ETFs?</h3>
        <p>Begin your ETF investment journey with expert guidance</p>
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

export default ETF;
