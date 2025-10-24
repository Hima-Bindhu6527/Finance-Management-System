import React from "react";
import "./MutualFund.css";

const MutualFund = () => {
  const amcCompanies = [
    { name: "TRUST Mutual Fund", logo: "🛡️" },
    { name: "Capitalmind Mutual Fund", logo: "📊" },
    { name: "JioBlackRock Mutual Fund", logo: "💎" },
    { name: "Unifi Mutual Fund", logo: "🔷" },
    { name: "Helios Mutual Fund", logo: "☀️" },
    { name: "Bajaj Finserv Mutual Fund", logo: "🅱️" },
    { name: "Navi Mutual Fund", logo: "🔲" },
    { name: "Bandhan Mutual Fund", logo: "🔥" },
    { name: "Union Mutual Fund", logo: "⭕" },
    { name: "Nippon India Mutual Fund", logo: "💠" },
    { name: "360 ONE Mutual Fund", logo: "🔄" },
    { name: "WhiteOak Capital Mutual Fund", logo: "🌳" },
    { name: "PGIM India Mutual Fund", logo: "🏛️" },
    { name: "Motilal Oswal Mutual Fund", logo: "📈" },
    { name: "Bank of India Mutual Fund", logo: "🏦" },
    { name: "Mirae Asset Mutual Fund", logo: "🎯" },
    { name: "Aditya Birla Sun Life Mutual Fund", logo: "☀️" },
    { name: "Franklin Templeton Mutual Fund", logo: "⚓" },
    { name: "LIC Mutual Fund", logo: "🛡️" },
    { name: "JM Financial Mutual Fund", logo: "💼" },
    { name: "ICICI Prudential Mutual Fund", logo: "🔺" },
    { name: "Quant Mutual Fund", logo: "❓" },
    { name: "Canara Robeco Mutual Fund", logo: "🏢" },
    { name: "Mahindra Manulife Mutual Fund", logo: "Ⓜ️" },
    { name: "Samco Mutual Fund", logo: "💹" },
    { name: "NJ Mutual Fund", logo: "🔶" },
    { name: "ITI Mutual Fund", logo: "📱" },
    { name: "The Wealth Company Mutual Fund", logo: "💰" },
    { name: "SBI Mutual Fund", logo: "🏦" },
    { name: "DSP Mutual Fund", logo: "📊" },
    { name: "Tata Mutual Fund", logo: "🚗" },
    { name: "Edelweiss Mutual Fund", logo: "❄️" },
    { name: "Invesco Mutual Fund", logo: "🔼" },
    { name: "Sundaram Mutual Fund", logo: "🏢" },
    { name: "HDFC Mutual Fund", logo: "🏛️" },
    { name: "HSBC Mutual Fund", logo: "🔺" },
    { name: "PPFAS Mutual Fund", logo: "🌿" },
    { name: "Baroda BNP Paribas Mutual Fund", logo: "🏦" },
    { name: "Quantum Mutual Fund", logo: "⚛️" },
    { name: "Taurus Mutual Fund", logo: "🐂" },
    { name: "Shriram Mutual Fund", logo: "📊" },
    { name: "Groww Mutual Fund", logo: "🌊" },
    { name: "Kotak Mahindra Mutual Fund", logo: "♾️" },
    { name: "Zerodha Mutual Fund", logo: "🔄" },
    { name: "Axis Mutual Fund", logo: "🔻" },
    { name: "UTI Mutual Fund", logo: "☀️" },
  ];

  return (
    <div className="mutual-fund-page">
      {/* AMC Section */}
      <section className="amc-section">
        <h2 className="amc-title">Asset Management Company (AMC)</h2>
        <div className="amc-grid">
          {amcCompanies.map((company, index) => (
            <div key={index} className="amc-card">
              <div className="amc-logo">{company.logo}</div>
              <p className="amc-name">{company.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mutual Funds Information */}
      <section className="mutual-fund-content">
        <h1 className="main-title">Mutual Funds</h1>

        <div className="content-section">
          <h2>What are mutual funds?</h2>
          <p>
            A mutual fund is an SEC-registered open-end investment company that
            pools money from many investors. It invests the money in stocks,
            bonds, short-term money-market instruments, other securities or
            assets, or some combination of these investments. The combined
            holdings the mutual fund owns are known as its portfolio, which is
            managed by an SEC-registered investment adviser. Each mutual fund
            share represents an investor's part ownership of the mutual fund's
            portfolio and the gains and losses the portfolio generates.
            Investors in mutual funds buy their shares from, and sell/redeem
            their shares to, the mutual funds themselves or through investment
            professionals like brokers or investment advisers.
          </p>
        </div>

        <div className="content-section">
          <h2>Why do people buy mutual funds?</h2>
          <p>
            Mutual funds are a popular choice among investors because they
            generally offer the following features:
          </p>
          <ul>
            <li>
              <strong>Professional Management.</strong> Mutual funds are managed
              by investment advisers who are registered with the SEC.
            </li>
            <li>
              <strong>Diversification.</strong> Mutual funds may invest in a
              range of companies and industries rather than investing in one
              specific stock or bond. This helps to lower your risk if one
              company fails.
            </li>
            <li>
              <strong>Low Minimum Investment.</strong> Many mutual funds set a
              relatively low dollar amount for initial investment and subsequent
              purchases.
            </li>
            <li>
              <strong>Liquidity.</strong> Mutual fund investors can readily sell
              their shares back to the fund at the next calculated net asset
              value (NAV) – on any business day – minus any redemption fees.
            </li>
          </ul>
        </div>

        <div className="content-section">
          <h2>How do I earn money from mutual funds?</h2>
          <p>
            Investors can make money from their mutual fund investments in three
            ways:
          </p>
          <ul>
            <li>
              <strong>Dividend Payments.</strong> A fund may earn income from
              its portfolio – for example, dividends on stock or interest on
              bonds. The fund then pays the shareholders nearly all the income,
              less expenses, as a dividend payment.
            </li>
            <li>
              <strong>Capital Gains Distributions.</strong> The price of the
              securities a fund owns may increase. When a fund sells a security
              that has increased in price, the fund has a capital gain. At the
              end of the year, the fund distributes these capital gains, minus
              any capital losses, to investors.
            </li>
            <li>
              <strong>Increased Net Asset Value (NAV).</strong> If the market
              value of a fund's portfolio increases, after deducting expenses
              and liabilities, then the NAV of the fund and its shares
              increases. With respect to dividend payments and capital gains
              distributions, mutual funds usually will give investors a choice.
              The mutual fund can transfer the amount to the investor, or the
              investor can have the dividends or distributions reinvested in the
              mutual fund to buy more shares.
            </li>
          </ul>
        </div>

        <div className="content-section">
          <h2>What are the risks of investing in mutual funds?</h2>
          <p>
            Mutual funds are not guaranteed or insured by the FDIC or any other
            government agency. They therefore all carry some level of risk. You
            may lose some or all of the money you invest because the investments
            held by a fund can go down in value. Dividends or interest payments
            may also change as market conditions change.
          </p>
          <p>
            A fund's past performance is not as important as you might think
            because past performance does not predict future returns. But past
            performance can tell you how volatile or stable a fund has been over
            a period of time. The more volatile the fund, the higher the
            investment risk.
          </p>
          <p>
            Different funds have different risks and rewards depending on their
            investment objectives. Generally, the higher the potential return,
            the higher the risk of loss.
          </p>
        </div>

        <div className="content-section">
          <h2>What do I pay for my mutual fund?</h2>
          <p>
            As with any business, running a mutual fund involves costs. Funds
            pass along these costs to investors by deducting fees and expenses
            from NAV. That means you pay the fees and expenses indirectly.
          </p>
          <p>
            Fees vary from fund to fund. It is important to understand what fees
            a mutual fund charges and how those fees impact your investment.
            Even small differences in fees can mean large differences in returns
            over time. In addition, a fund with high costs must perform better
            than a low-cost fund to generate the same returns for you.
          </p>
        </div>

        <div className="content-section">
          <h2>What are some common mutual fund investing strategies?</h2>
          <ul>
            <li>
              <strong>Index Funds.</strong> Index funds follow a passive
              investment strategy that is designed to achieve approximately the
              same return as a particular index before fees. An index fund will
              attempt to achieve its investment objective primarily by investing
              in the securities of companies that are included in a selected
              index. Passive management usually translates into less trading of
              the fund's portfolio (fewer transaction costs), more favorable
              income tax consequences (lower realized capital gains), and lower
              fees than actively managed funds.
            </li>
            <li>
              <strong>Actively Managed Funds.</strong> Actively managed funds
              are not based on an index. Instead, they seek to achieve a stated
              investment objective by investing in a portfolio of stocks, bonds,
              and other assets. An adviser of an actively managed fund may
              actively buy or sell investments in the portfolio on a daily basis
              without regard to conformity with an index. But the trades must be
              consistent with the overall investment objective and strategies of
              the fund. An actively managed fund has the potential to outperform
              the market or its chosen benchmark, but its performance is heavily
              dependent on the skill of the manager.
            </li>
          </ul>
        </div>

        <div className="content-section">
          <h2>What types of mutual funds are there?</h2>
          <p>
            Mutual funds fall into several main categories. Each type has
            different features, risks, and rewards.
          </p>
          <ul>
            <li>
              <strong>Stock funds</strong> invest primarily in stocks or
              equities. A stock is an instrument that represents an ownership
              interest (called equity) in a company and a proportional share in
              the company's assets and profits. The types of stocks owned by a
              stock fund depend upon the fund's investment objectives, policies,
              and strategies. A stock fund's value can rise and fall quickly
              (and dramatically) over the short term. The fund's performance
              depends on whether the underlying companies do well or not.
            </li>
            <li>
              <strong>Bond funds or income funds</strong> invest primarily in
              bonds or other types of debt securities. Depending on its
              investment objectives and policies, a bond fund may concentrate
              its investments in a particular type of bond or debt security or a
              mixture of types. The securities that bond funds hold will vary in
              terms of risk, return, duration, volatility and other features.
            </li>
            <li>
              <strong>Target date funds</strong> typically hold a mix of stock
              funds, bond funds and other funds, and are created for individuals
              with a particular date for retirement or other goal in mind.
              Target date funds are designed to make investing for retirement or
              other goals more convenient by changing their investment mix as
              the target date gets closer. However, be aware that if a target
              date fund invests in other funds, it may charge a double layer of
              fees.
            </li>
            <li>
              <strong>Money market funds</strong> invest in liquid, short-term
              debt securities, cash and cash equivalents. Many investors use
              money market funds to store cash or as an alternative to bank
              savings vehicles.
            </li>
          </ul>
        </div>

        <div className="content-section">
          <h2>How do I buy and sell mutual funds?</h2>
          <p>
            Investors buy and sell mutual fund shares from/to the fund itself or
            through a broker or investment adviser, rather than from/to other
            investors on national securities markets. The purchase price is the
            next calculated NAV, plus any fees charged at the time of purchase.
            Mutual fund shares are redeemable. This means investors can sell the
            shares back to the fund at any time at the next calculated NAV,
            minus any fees charged at the time of redemption.
          </p>
        </div>

        <div className="content-section">
          <h2>What should I consider before investing in mutual funds?</h2>
          <ul>
            <li>
              Before investing in a mutual fund, you should carefully read the
              fund's available information, including its prospectus and most
              recent shareholder report, which are available on the SEC's
              website and the fund's website, free of charge.
            </li>
            <li>
              Consider whether the fund fits into your overall financial
              situation.
            </li>
            <li>
              Ask questions about anything you don't understand. You are
              entrusting your money to someone else. You should know where your
              money is going, who is managing it, how it is being invested, and
              how you can get it back.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default MutualFund;
