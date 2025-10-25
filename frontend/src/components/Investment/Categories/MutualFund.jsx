import React from "react";
import "./MutualFund.css";

const MutualFund = () => {
  const amcCompanies = [
    // Use the image from the public assets folder. Make sure the file exists at:
    // frontend/public/assets/1)Trust_Mutual_Fund.png
    { name: "TRUST Mutual Fund", logo: "/assets/1)Trust_Mutual_Fund.png" },
    { name: "Capitalmind Mutual Fund", logo: "/assets/2)Capitalmind_Mutual_Fund.png" },
    { name: "JioBlackRock Mutual Fund", logo: "/assets/3)JioBlacRock_Mutual_Fund.png" },
    { name: "Unifi Mutual Fund", logo: "/assets/4)Unifi_Mutual_Fund.png" },
    { name: "Helios Mutual Fund", logo: "/assets/5)Helios_Mutual_Fund.png" },
    { name: "Bajaj Finserv Mutual Fund", logo: "/assets/6)Bajaj_Mutual_Fund.png" },
    { name: "Navi Mutual Fund", logo: "/assets/7)Navi_Mutual_Fund.png" },
    { name: "Bandhan Mutual Fund", logo: "/assets/8)Bandhan_Mutual_Fund.png" },
    { name: "Union Mutual Fund", logo: "/assets/9)Union_Mutual_Fund.png" },
    { name: "Nippon India Mutual Fund", logo: "/assets/10)Nippon_India_Mutual_Fund.png" },
    { name: "360 ONE Mutual Fund", logo: "/assets/11)360_ONE_Mutual_Fund.png" },
    { name: "WhiteOak Capital Mutual Fund", logo: "/assets/12)WhiteOak_Mutual_Fund.png" },
    { name: "PGIM India Mutual Fund", logo: "/assets/13)PGIM_India_Mutual_Fund.png" },
    { name: "Motilal Oswal Mutual Fund", logo: "/assets/14)Motilal_Oswal_Mutual_Fund.png" },
    { name: "Bank of India Mutual Fund", logo: "/assets/15)Bank_of_India_Mutual_Fund.png" },
    { name: "Mirae Asset Mutual Fund", logo: "/assets/16)Mirae_Asset_Mutual_Fund.png" },
    { name: "Aditya Birla Sun Life Mutual Fund", logo: "/assets/17)Aditya_Birla_Mutual_Fund.png" },
    { name: "Franklin Templeton Mutual Fund", logo: "/assets/18)Franklin_Mutual_Fund.png" },
    { name: "LIC Mutual Fund", logo: "/assets/19)LIC_Mutual_Fund.png" },
    { name: "JM Financial Mutual Fund", logo: "/assets/20)JM_Mutual_Fund.png" },
    { name: "ICICI Prudential Mutual Fund", logo: "/assets/21)ICICI_Mutual_Fund.png" },
    { name: "Quant Mutual Fund", logo: "/assets/22)Quant_Mutual_Fund.png" },
    { name: "Canara Robeco Mutual Fund", logo: "/assets/23)Canara_Mutual_Fund.png" },
    { name: "Mahindra Manulife Mutual Fund", logo: "/assets/24)Mahindra_Mutual_Fund.png" },
    { name: "Samco Mutual Fund", logo: "/assets/25)Samco_Mutual_Fund.png" },
    { name: "NJ Mutual Fund", logo: "/assets/26)NJ_Mutual_Fund.png" },
    { name: "ITI Mutual Fund", logo: "/assets/27)ITI_Mutual_Fund.png" },
    { name: "The Wealth Company Mutual Fund", logo: "/assets/28)Wealth_Mutual_Fund.png" },
    { name: "SBI Mutual Fund", logo: "/assets/29)SBI_Mutual_Fund.png" },
    { name: "DSP Mutual Fund", logo: "/assets/30)DSP_Mutual_Fund.png" },
    { name: "Tata Mutual Fund", logo: "/assets/31)TATA_Mutual_Fund.png" },
    { name: "Edelweiss Mutual Fund", logo: "/assets/32)Edelweiss_Mutual_Fund.png" },
    { name: "Invesco Mutual Fund", logo: "/assets/33)Invesco_Mutual_Fund.png" },
    { name: "Sundaram Mutual Fund", logo: "/assets/34)Sundaram_Mutual_Fund.png" },
    { name: "HDFC Mutual Fund", logo: "/assets/35)HDFC_Mutual_Fund.png" },
    { name: "HSBC Mutual Fund", logo: "/assets/36)HSBC_Mutual_Fund.png" },
    { name: "PPFAS Mutual Fund", logo: "/assets/37)PPFAS_Mutual_Fund.png" },
    { name: "Baroda BNP Paribas Mutual Fund", logo: "/assets/38)Baroda_Mutual_Fund.png" },
    { name: "Quantum Mutual Fund", logo: "/assets/39)Quantum_Mutual_Fund.png" },
    { name: "Taurus Mutual Fund", logo: "/assets/40)Taurus_Mutual_Fund.png" },
    { name: "Shriram Mutual Fund", logo: "/assets/41)Shivam_Mutual_Fund.png" },
    { name: "Groww Mutual Fund", logo: "/assets/42)Groww_Mutual_Fund.png" },
    { name: "Kotak Mahindra Mutual Fund", logo: "/assets/43)Kotak_Mutual_Fund.png" },
    { name: "Zerodha Mutual Fund", logo: "/assets/44)Zerodha_Mutual_Fund.png" },
    { name: "Axis Mutual Fund", logo: "/assets/45)Axis_Mutual_Fund.png" },
    { name: "UTI Mutual Fund", logo: "/assets/46)UTI_Mutual_Fund.png" },
  ];

  return (
    <div className="mutual-fund-page">
      {/* AMC Section */}
      <section className="amc-section">
        <h2 className="amc-title">Asset Management Company (AMC)</h2>
        <div className="amc-grid">
          {amcCompanies.map((company, index) => {
            const isImageUrl =
              typeof company.logo === "string" &&
              (
                company.logo.startsWith("data:") ||
                company.logo.startsWith("/") ||
                company.logo.startsWith("http") ||
                /\.(jpeg|jpg|png|gif|svg|webp)$/i.test(company.logo)
              );

            // Special-case: make the TRUST and Capitalmind Mutual Fund cards open the Groww pages
            const is1 = company.name === "TRUST Mutual Fund";
            const is2 = company.name === "Capitalmind Mutual Fund";
            const is3 = company.name === "JioBlackRock Mutual Fund";
            const is4 = company.name === "Unifi Mutual Fund";
            const is5 = company.name === "Helios Mutual Fund";
            const is6 = company.name === "Bajaj Finserv Mutual Fund";
            const is7 = company.name === "Navi Mutual Fund";
            const is8 = company.name === "Bandhan Mutual Fund";
            const is9 = company.name === "Union Mutual Fund";
            const is10 = company.name === "Nippon India Mutual Fund";
            const is11 = company.name === "360 ONE Mutual Fund";
            const is12 = company.name === "WhiteOak Capital Mutual Fund";
            const is13 = company.name === "PGIM India Mutual Fund";
            const is14 = company.name === "Motilal Oswal Mutual Fund";
            const is15 = company.name === "Bank of India Mutual Fund";
            const is16 = company.name === "Mirae Asset Mutual Fund";
            const is17 = company.name === "Aditya Birla Sun Life Mutual Fund";
            const is18 = company.name === "Franklin Templeton Mutual Fund";
            const is19 = company.name === "LIC Mutual Fund";
            const is20 = company.name === "JM Financial Mutual Fund";
            const is21 = company.name === "ICICI Prudential Mutual Fund";
            const is22 = company.name === "Quant Mutual Fund";
            const is23 = company.name === "Canara Robeco Mutual Fund";
            const is24 = company.name === "Mahindra Manulife Mutual Fund";
            const is25 = company.name === "Samco Mutual Fund";
            const is26 = company.name === "NJ Mutual Fund";
            const is27 = company.name === "ITI Mutual Fund";
            const is28 = company.name === "The Wealth Company Mutual Fund";
            const is29 = company.name === "SBI Mutual Fund";
            const is30 = company.name === "DSP Mutual Fund";
            const is31 = company.name === "Tata Mutual Fund";
            const is32 = company.name === "Edelweiss Mutual Fund";
            const is33 = company.name === "Invesco Mutual Fund";
            const is34 = company.name === "Sundaram Mutual Fund";
            const is35 = company.name === "HDFC Mutual Fund";
            const is36 = company.name === "HSBC Mutual Fund";
            const is37 = company.name === "PPFAS Mutual Fund";
            const is38 = company.name === "Baroda BNP Paribas Mutual Fund";
            const is39 = company.name === "Quantum Mutual Fund";
            const is40 = company.name === "Taurus Mutual Fund";
            const is41 = company.name === "Shriram Mutual Fund";
            const is42 = company.name === "Groww Mutual Fund";
            const is43 = company.name === "Kotak Mahindra Mutual Fund";
            const is44 = company.name === "Zerodha Mutual Fund";
            const is45 = company.name === "Axis Mutual Fund";
            const is46 = company.name === "UTI Mutual Fund";

            const cardContent = (
              <div className="amc-card">
                <div className="amc-logo">
                  {isImageUrl ? (
                    <img src={company.logo} alt={`${company.name} logo`} />
                  ) : (
                    <span className="amc-emoji">{company.logo}</span>
                  )}
                </div>
                <p className="amc-name">{company.name}</p>
              </div>
            );

            if (is46) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/uti-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is45) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/axis-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is44) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/zerodha-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is43) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/kotak-mahindra-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is42) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/groww-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is41) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/shriram-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is40) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/taurus-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is39) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/quantum-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is38) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/baroda-bnp-paribas-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is37) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/ppfas-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is36) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/hsbc-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is35) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/hdfc-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is34) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/sundaram-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is33) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/invesco-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is32) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/edelweiss-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is31) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/tata-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is30) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/dsp-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is29) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/sbi-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is28) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/the-wealth-company-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is27) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/iti-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is26) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href=" https://groww.in/mutual-funds/amc/nj-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is25) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/samco-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is24) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/mahindra-manulife-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is23) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href=" https://groww.in/mutual-funds/amc/canara-robeco-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is22) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/quant-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is21) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/icici-prudential-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is20) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/jm-financial-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is19) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/lic-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is18) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/franklin-templeton-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is17) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/aditya-birla-sun-life-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is16) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/mirae-asset-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is15) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/bank-of-india-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is14) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/motilal-oswal-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is13) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/pgim-india-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is12) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/whiteoak-capital-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }



            if (is11) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/360-one-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is10) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/nippon-india-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is9) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/union-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }


            if (is8) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/bandhan-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is7) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/navi-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is6) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/bajaj-finserv-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is5) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/helios-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is4) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/unifi-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is1) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/trust-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is2) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/capitalmind-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            if (is3) {
              return (
                <a
                  key={index}
                  className="amc-link"
                  href="https://groww.in/mutual-funds/amc/jioblackrock-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardContent}
                </a>
              );
            }

            return <div key={index}>{cardContent}</div>;
          })}
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
