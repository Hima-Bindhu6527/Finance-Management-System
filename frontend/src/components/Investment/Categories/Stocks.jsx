import React, { useState } from "react";
import "./Stocks.css";

const Stocks = () => {
  const [activeTab, setActiveTab] = useState("basics");

  const stockMarketTerms = [
    {
      term: "Sensex",
      description:
        "Sensex is a collection of the top 30 stocks listed on the BSE by way of market capitalisation.",
    },
    {
      term: "SEBI",
      description:
        "The Securities and Exchange Board of India (SEBI) is the securities market regulator to oversee any fraudulent transactions and activities.",
    },
    {
      term: "Demat",
      description:
        "Demat, or dematerialised account, is a form of an online portfolio that holds a customer's shares and securities in electronic format.",
    },
    {
      term: "Trading",
      description:
        "It is the process of buying or selling shares in a company.",
    },
    {
      term: "Stock Index",
      description:
        "A stock index measures financial market fluctuations. They are performance indicators that indicate the performance of a market segment or the market as a whole.",
    },
    {
      term: "Portfolio",
      description:
        "It is a collection of a wide range of assets owned by investors including gold, stocks, funds, derivatives, property, bonds, etc.",
    },
    {
      term: "Bull Market",
      description:
        "In a bull market, companies tend to generate more revenue, and as the economy grows, consumers are more likely to spend.",
    },
    {
      term: "Bear Market",
      description:
        "Bear markets refer to a slowdown in the economy, which may make consumers less likely to spend and, in turn, lower the GDP.",
    },
    {
      term: "Nifty50",
      description:
        "Nifty 50 is a collection of the top 50 companies listed on the National Stock Exchange (NSE).",
    },
    {
      term: "Stock Broker",
      description:
        "A stock broker is an investment advisor who executes transactions such as buying and selling of stocks on behalf of their clients.",
    },
    {
      term: "Bid Price",
      description:
        "The bid price is the highest price a buyer will pay to buy a specified number of shares at any given time.",
    },
    {
      term: "Ask Price",
      description:
        "The ask price refers to the lowest price at which a seller will sell the stock.",
    },
    {
      term: "IPO",
      description:
        "Initial Public Offer (IPO) is the selling of securities to the public in the primary market. It is the largest source of funds with long or indefinite maturity.",
    },
    {
      term: "Equity",
      description:
        "Equity is the value that would be received by the shareholder if all assets were liquidated and all debts were paid off.",
    },
    {
      term: "Dividend",
      description:
        "A dividend refers to cash or reward that a company provides to its shareholders in various forms like cash payment or stocks.",
    },
    {
      term: "BSE",
      description:
        "Bombay Stock Exchange (BSE) is the largest and first securities exchange market in India, established in 1875.",
    },
    {
      term: "NSE",
      description:
        "National Stock Exchange was the first to implement screen-based trading in India. It is the fourth largest stock exchange in the world.",
    },
    {
      term: "Call & Put Option",
      description:
        "Call option gives the right to purchase securities, while put option gives the right to sell shares of the underlying security.",
    },
    {
      term: "Moving Average",
      description:
        "A stock indicator used for technical analysis to smoothen price data. A rising average indicates an uptrend, while a declining one indicates a downtrend.",
    },
  ];

  const stockClassifications = [
    {
      type: "Market Capitalization",
      examples: "Large Cap, Mid Cap, Small Cap",
    },
    { type: "Ownership", examples: "Common Stock, Preferred Stock" },
    { type: "Fundamentals", examples: "Growth Stocks, Value Stocks" },
    { type: "Price Volatility", examples: "Blue Chip, Penny Stocks" },
    {
      type: "Profit Sharing",
      examples: "Dividend Stocks, Non-Dividend Stocks",
    },
    { type: "Economic Trends", examples: "Cyclical, Defensive Stocks" },
  ];

  const stockTypes = [
    {
      title: "Large Cap Stocks",
      description:
        "Well-established companies with market capitalization over ₹20,000 crores",
      features: ["Stable returns", "Lower risk", "Good dividends"],
    },
    {
      title: "Mid Cap Stocks",
      description: "Companies with market cap between ₹5,000-₹20,000 crores",
      features: [
        "Higher growth potential",
        "Moderate risk",
        "Good for medium-term",
      ],
    },
    {
      title: "Small Cap Stocks",
      description: "Companies with market cap less than ₹5,000 crores",
      features: [
        "High growth potential",
        "Higher risk",
        "Long-term investment",
      ],
    },
  ];

  const keyBenefits = [
    {
      title: "Ownership",
      description: "Direct ownership in companies you believe in",
      icon: "🏢",
    },
    {
      title: "Capital Appreciation",
      description: "Potential for significant long-term wealth creation",
      icon: "📈",
    },
    {
      title: "Dividend Income",
      description: "Regular income through dividend payments",
      icon: "💰",
    },
    {
      title: "Liquidity",
      description: "Easy to buy and sell on stock exchanges",
      icon: "💱",
    },
    {
      title: "Voting Rights",
      description: "Participate in company decisions as a shareholder",
      icon: "🗳️",
    },
    {
      title: "Inflation Hedge",
      description: "Long-term stocks typically outpace inflation",
      icon: "🛡️",
    },
  ];

  const investmentStrategies = [
    {
      name: "Value Investing",
      description: "Buy undervalued stocks trading below their intrinsic value",
    },
    {
      name: "Growth Investing",
      description: "Invest in companies with strong growth potential",
    },
    {
      name: "Dividend Investing",
      description: "Focus on stocks that pay regular, attractive dividends",
    },
    {
      name: "Index Investing",
      description: "Mirror market indices like Nifty 50 or Sensex",
    },
  ];

  const riskFactors = [
    "Market volatility can affect stock prices",
    "Company-specific risks like management changes",
    "Economic downturns impact stock performance",
    "Liquidity risk in small cap stocks",
    "Requires research and market knowledge",
  ];

  return (
    <div className="stocks-content-wrapper">
      <div className="stocks-header">
        <h1>STOCKS / EQUITY</h1>
        <p className="stocks-subtitle">
          Build wealth by investing in company shares
        </p>
      </div>

      <div className="stocks-tab-navigation">
        <button
          className={activeTab === "basics" ? "stocks-active" : ""}
          onClick={() => setActiveTab("basics")}
        >
          Stock Market Basics
        </button>
        <button
          className={activeTab === "terms" ? "stocks-active" : ""}
          onClick={() => setActiveTab("terms")}
        >
          Important Terms
        </button>
        <button
          className={activeTab === "types" ? "stocks-active" : ""}
          onClick={() => setActiveTab("types")}
        >
          Types of Stocks
        </button>
        <button
          className={activeTab === "strategies" ? "stocks-active" : ""}
          onClick={() => setActiveTab("strategies")}
        >
          Investment Strategies
        </button>
      </div>

      {activeTab === "basics" && (
        <div className="stocks-overview-section">
          <div className="stocks-intro-content">
            <h2>Understanding Stock Market Basics</h2>
            <p>
              All companies need money to run their business. Sometimes the
              profit acquired from selling goods or services is not sufficient
              to meet the working capital requirements. And so, companies invite
              normal people like you and me to put some money into their company
              so that they can run it efficiently and in return, investors get a
              share of whatever profit they make.
            </p>
            <p>
              Understanding this is the first step towards understanding stock
              market basics.
            </p>
          </div>

          <div className="stocks-intro-content">
            <h2>What are Stocks?</h2>
            <p>
              <strong>
                Stocks are simply an investment method to build wealth.
              </strong>{" "}
              When you invest in the stock of a company, it means you own a
              share in the company that issued the stock.
            </p>
            <p>
              Stock investment is a way to invest in some of the most successful
              companies. Stocks are categorized based on various criteria
              including:
            </p>
            <div className="classification-grid">
              {stockClassifications.map((item, index) => (
                <div key={index} className="classification-card">
                  <h4>{item.type}</h4>
                  <p>{item.examples}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="stocks-intro-content">
            <h2>What is Share Market?</h2>
            <p>
              People often wonder what is stock market and share market, and
              often use it interchangeably.
            </p>
            <p>
              A stock market is similar to a share market. A share market is
              where the shares are issued or traded in. The primary difference
              between the two is that the <strong>stock market</strong> lets an
              individual trade in bonds, mutual funds, derivatives, shares of a
              company, etc. On the other hand, a <strong>share market</strong>{" "}
              only allows the trading of shares.
            </p>
          </div>

          <div className="stocks-intro-content">
            <h2>How Does the Stock Market Work?</h2>
            <p>
              Companies raise money on the stock market by selling ownership
              stakes to investors. These equity stakes are known as shares of
              stock.
            </p>
            <p>
              By listing shares for sale on the stock exchanges that make up the
              stock market, companies get access to the capital they need to
              operate and expand their businesses without having to take on
              debt. Investors benefit by exchanging their money for shares on
              the stock market.
            </p>
            <p>
              As companies put that money to grow and expand their businesses,
              it profits the investors as their shares of stock become more
              valuable over time, leading to capital gains. In addition,
              companies pay dividends to their shareholders as their profits
              grow.
            </p>
            <p className="highlight-box">
              💡 <strong>Historical Performance:</strong> The performances of
              individual stocks vary widely over time but taken as a whole, the
              stock market has historically rewarded investors with average
              annual returns of around 10%, making it one of the most reliable
              ways of growing your money.
            </p>
          </div>

          <div className="stocks-intro-content">
            <h2>Types of Stock Market</h2>
            <div className="market-types">
              <div className="market-type-card">
                <h3>📊 Primary Market</h3>
                <p>
                  It creates securities and acts as a platform where firms float
                  their new stock options and bonds for the general public to
                  acquire. This is where IPOs (Initial Public Offerings) take
                  place.
                </p>
              </div>
              <div className="market-type-card">
                <h3>🔄 Secondary Market</h3>
                <p>
                  Here, investors trade in securities without involving the
                  companies who issued them in the first place with the help of
                  brokers. This is where most of the day-to-day trading happens.
                </p>
              </div>
            </div>
          </div>

          <div className="stocks-intro-content">
            <h2>Key Stock Market Concepts</h2>
            <div className="concepts-grid">
              <div className="concept-card">
                <h4>📈 Ask and Close</h4>
                <p>
                  The term 'ask' in the stock market refers to the lowest price
                  at which a seller will sell the stock. 'Closing price'
                  generally refers to the last price at which a stock trades
                  during a regular trading session.
                </p>
              </div>
              <div className="concept-card">
                <h4>📊 Moving Average</h4>
                <p>
                  It is a stock indicator commonly used for technical analysis
                  to smoothen the price data by creating a constantly updated
                  average price. A rising moving average indicates that the
                  security is in an uptrend, while a declining moving average
                  indicates a downtrend.
                </p>
              </div>
            </div>
          </div>

          <div className="benefits-section">
            <h2>Key Benefits of Stock Investing</h2>
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

          <div className="risk-section">
            <h2>⚠️ Risk Factors to Consider</h2>
            <ul className="risk-list">
              {riskFactors.map((risk, index) => (
                <li key={index}>{risk}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === "terms" && (
        <div className="terms-section">
          <h2>Understanding Stock Market Basics - Important Terms</h2>
          <p className="section-intro">
            Here is a comprehensive glossary of commonly used terms when talking
            about the stock market. Use this as a reference anytime you want to
            learn about stock market terminology.
          </p>

          <div className="terms-grid">
            {stockMarketTerms.map((item, index) => (
              <div key={index} className="term-card">
                <h3>{item.term}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          <div className="exchanges-info">
            <h3>🏛️ Major Indian Stock Exchanges</h3>
            <div className="exchanges-comparison">
              <div className="exchange-card">
                <h4>BSE (Bombay Stock Exchange)</h4>
                <ul>
                  <li>Established in 1875</li>
                  <li>First stock exchange in India</li>
                  <li>Benchmark index: Sensex (Top 30 companies)</li>
                  <li>Over 5,000 listed companies</li>
                  <li>Oldest stock exchange in Asia</li>
                </ul>
              </div>
              <div className="exchange-card">
                <h4>NSE (National Stock Exchange)</h4>
                <ul>
                  <li>Established in 1992</li>
                  <li>First electronic exchange in India</li>
                  <li>Benchmark index: Nifty 50 (Top 50 companies)</li>
                  <li>Fourth largest in world by equity trading volume</li>
                  <li>More liquid than BSE</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "types" && (
        <div className="stocks-types-section">
          <h2>Types of Stocks</h2>
          <div className="stock-types-grid">
            {stockTypes.map((type, index) => (
              <div key={index} className="type-card">
                <h3>{type.title}</h3>
                <p>{type.description}</p>
                <ul className="features-list">
                  {type.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="sectors-info">
            <h3>Popular Sectors in Indian Market</h3>
            <div className="sectors-tags">
              <span className="sector-tag">🏦 Banking & Finance</span>
              <span className="sector-tag">💻 IT & Technology</span>
              <span className="sector-tag">🏭 Manufacturing</span>
              <span className="sector-tag">💊 Pharmaceuticals</span>
              <span className="sector-tag">⚡ Energy & Power</span>
              <span className="sector-tag">🚗 Automobile</span>
              <span className="sector-tag">🛍️ FMCG</span>
              <span className="sector-tag">🏗️ Infrastructure</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "strategies" && (
        <div className="strategies-section">
          <h2>Investment Strategies</h2>
          <div className="strategies-grid">
            {investmentStrategies.map((strategy, index) => (
              <div key={index} className="strategy-card">
                <h3>{strategy.name}</h3>
                <p>{strategy.description}</p>
              </div>
            ))}
          </div>

          <div className="tips-section">
            <h3>💡 Investment Tips</h3>
            <ul className="tips-list">
              <li>Start with a demat and trading account</li>
              <li>Diversify across sectors and market caps</li>
              <li>Invest for the long term (5+ years)</li>
              <li>Do thorough research before investing</li>
              <li>Review your portfolio regularly</li>
              <li>Don't invest money you might need soon</li>
              <li>Consider tax implications (LTCG, STCG)</li>
            </ul>
          </div>
        </div>
      )}

      <div className="cta-section">
        <h3>Ready to start investing in stocks?</h3>
        <a
          href="https://groww.in/mutual-funds"
          target="_blank"
          rel="noopener noreferrer"
          className="invest-now-button"
        >
          Invest Now 🚀
        </a>
      </div>
    </div>
  );
};

export default Stocks;
