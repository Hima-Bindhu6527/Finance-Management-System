import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./Gold.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Gold = () => {
  const [amount, setAmount] = useState("0");
  const [weight, setWeight] = useState("0.0g");
  const [buyByAmount, setBuyByAmount] = useState(true);
  const [goldPricePerGram, setGoldPricePerGram] = useState(12859.22);
  const [silverPricePerGram, setSilverPricePerGram] = useState(90.0);
  const [selectedMetal, setSelectedMetal] = useState("gold");
  const [isLive, setIsLive] = useState(true);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [priceError, setPriceError] = useState(null);
  const [chartSource, setChartSource] = useState("synthetic");

  // GST percentage can be configured via Vite env variable VITE_GST_PERCENT
  // Default to 3% when not provided.
  const GST_PERCENT = (() => {
    try {
      if (
        typeof import.meta !== "undefined" &&
        import.meta.env &&
        import.meta.env.VITE_GST_PERCENT
      ) {
        const parsed = Number(import.meta.env.VITE_GST_PERCENT);
        return !isNaN(parsed) && parsed >= 0 ? parsed : 3;
      }
    } catch (e) {
      // ignore
    }
    return 3;
  })();

  const generateSeriesFromPrice = (currentPrice) => {
    const prices = [];
    const dates = [];
    // Start from 29 days ago and walk to today
    let price = currentPrice || 1000;
    // Seed previous prices by walking backwards
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(
        date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      );

      // Create a small random walk around the currentPrice
      const noise = (Math.random() - 0.5) * (currentPrice * 0.02); // +/-1% approx
      const trend = (29 - i) * (currentPrice * 0.001); // slight upward trend
      const p = Math.max(0, Math.round((price + noise + trend) * 100) / 100);
      prices.push(p);
    }

    return { dates, prices };
  };

  // Hold possible fetched historical series
  const [fetchedSeries, setFetchedSeries] = useState(null);

  // Try to fetch real historical series from backend when selectedMetal or prices change
  useEffect(() => {
    let isMounted = true;
    const fetchHistory = async () => {
      try {
        // If gold, request Bengaluru history; if silver, no city param
        const res = await fetch(
          `/api/metals/history?metal=${selectedMetal}&days=30${
            selectedMetal === "gold" ? "&city=Bengaluru" : ""
          }`
        );
        if (!res.ok) throw new Error("no history");
        const json = await res.json();
        if (isMounted && json && json.dates && json.prices) {
          setFetchedSeries({ dates: json.dates, prices: json.prices });
          return;
        }
      } catch (e) {
        setFetchedSeries(null);
      }
    };

    fetchHistory();

    return () => {
      isMounted = false;
    };
  }, [selectedMetal, goldPricePerGram, silverPricePerGram]);

  // Recompute chart data: prefer fetched series, otherwise generate synthetic
  const chartData = fetchedSeries
    ? fetchedSeries
    : selectedMetal === "gold"
    ? generateSeriesFromPrice(goldPricePerGram)
    : generateSeriesFromPrice(silverPricePerGram);

  // Chart configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#1565C0",
        borderWidth: 1,
        callbacks: {
          title: (items) => {
            // show full date as title
            if (!items || items.length === 0) return "";
            const idx = items[0].dataIndex;
            const label =
              chartData.dates && chartData.dates[idx]
                ? chartData.dates[idx]
                : "";
            return label;
          },
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          maxTicksLimit: 8,
        },
      },
      y: {
        display: true,
        position: "right",
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          callback: function (value) {
            return "₹" + value.toLocaleString();
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 3,
      },
      point: {
        radius: 0,
        hoverRadius: 6,
      },
    },
  };

  const data = {
    labels: chartData.dates,
    datasets: [
      {
        label:
          selectedMetal === "gold" ? "Gold Price (₹/g)" : "Silver Price (₹/g)",
        data: chartData.prices,
        borderColor: selectedMetal === "gold" ? "#FFD700" : "#9E9E9E",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(
            0,
            selectedMetal === "gold"
              ? "rgba(226, 208, 74, 0.3)"
              : "rgba(158,158,158,0.25)"
          );
          gradient.addColorStop(
            1,
            selectedMetal === "gold"
              ? "rgba(226, 196, 74, 0.05)"
              : "rgba(158,158,158,0.05)"
          );
          return gradient;
        },
        fill: true,
      },
    ],
  };

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate small price changes (+/- 0.5%)
      const change = (Math.random() - 0.5) * 2 * 0.005; // 0.5% max change
      setGoldPricePerGram(
        (prev) => Math.round(prev * (1 + change) * 100) / 100
      );

      // Blink live indicator
      setIsLive(false);
      setTimeout(() => setIsLive(true), 200);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle amount change
  const handleAmountChange = (value) => {
    setAmount(value);
    const currentPrice =
      selectedMetal === "gold" ? goldPricePerGram : silverPricePerGram;
    if (buyByAmount && value && value !== "0") {
      const calculatedWeight = (parseFloat(value) / currentPrice).toFixed(2);
      setWeight(`${calculatedWeight}g`);
    }
  };

  // Handle weight change
  const handleWeightChange = (value) => {
    setWeight(value);
    const currentPrice =
      selectedMetal === "gold" ? goldPricePerGram : silverPricePerGram;
    if (!buyByAmount && value && value !== "0.0g") {
      const weightNum = parseFloat(value.replace("g", ""));
      const calculatedAmount = Math.round(weightNum * currentPrice);
      setAmount(calculatedAmount.toString());
    }
  };

  // Toggle between buy by amount and buy by weight
  const toggleBuyMethod = (isByAmount) => {
    setBuyByAmount(isByAmount);

    if (isByAmount && weight && weight !== "0.0g") {
      // Convert weight to amount
      const weightNum = parseFloat(weight.replace("g", ""));
      const calculatedAmount = Math.round(weightNum * goldPricePerGram);
      setAmount(calculatedAmount.toString());
    } else if (!isByAmount && amount && amount !== "0") {
      // Convert amount to weight
      const calculatedWeight = (parseFloat(amount) / goldPricePerGram).toFixed(
        2
      );
      setWeight(`${calculatedWeight}g`);
    }
  };

  // Compute value based on selected metal and entered weight, then GST and total
  const currentPrice =
    selectedMetal === "gold" ? goldPricePerGram : silverPricePerGram;
  const weightNumForCalc =
    parseFloat((weight || "").toString().replace("g", "")) || 0;
  const valueBasedNumber =
    Math.round(weightNumForCalc * currentPrice * 100) / 100;
  // Apply GST (configurable percent) for both gold and silver
  const gstAmount =
    Math.round(valueBasedNumber * (GST_PERCENT / 100) * 100) / 100;
  const totalAfterGst = Math.round((valueBasedNumber + gstAmount) * 100) / 100;

  return (
    <div className="gold-investment">
      <div className="gold-container">
        {/* Left Side - Calculator */}
        <div className="gold-calculator">
          <div className="calculator-tabs">
            <button
              className={`tab ${selectedMetal === "gold" ? "active" : ""}`}
              onClick={() => setSelectedMetal("gold")}
            >
              Gold
            </button>
            <button
              className={`tab ${selectedMetal === "silver" ? "active" : ""}`}
              onClick={() => setSelectedMetal("silver")}
            >
              Silver
            </button>
          </div>

          <div className="gold-locker">
            <div className="locker-header">
              {/* Locker removed */}
              <div className="mmtc-badge">
                <span>MMTC-PAMP</span>
                <small>24K 99.99% Purity</small>
              </div>
            </div>

            <div className="price-display">
              <p>
                Value Based On Price : ₹
                {(
                  (parseFloat(weight.replace("g", "")) || 0) *
                  (selectedMetal === "gold"
                    ? goldPricePerGram
                    : silverPricePerGram)
                ).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </p>
              <div className="live-price">
                <span>
                  {selectedMetal === "gold"
                    ? "Price (Gold) : ₹"
                    : "Price (Silver) : ₹"}
                  {(selectedMetal === "gold"
                    ? goldPricePerGram
                    : silverPricePerGram
                  ).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                  /g + {GST_PERCENT}% gst
                </span>
                {isLive && <span className="live-indicator">LIVE</span>}
              </div>
              <div className="price-status">
                {isLoadingPrice && (
                  <div className="loading">Loading live prices...</div>
                )}
                {priceError && <div className="error">{priceError}</div>}
              </div>
              <div className="price-breakdown">
                <div className="breakdown-row">
                  <span className="gst-label">
                    GST ({GST_PERCENT}%){" "}
                    <span
                      className="gst-tooltip"
                      title={`GST at ${GST_PERCENT}% is applied on the transaction value. Please refer to latest tax rules for applicability and exemptions.`}
                    >
                      ℹ️
                    </span>
                  </span>
                  <span>
                    ₹{" "}
                    {gstAmount.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="breakdown-row total">
                  <strong>Total (incl. GST)</strong>
                  <strong>
                    ₹{" "}
                    {totalAfterGst.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </strong>
                </div>
              </div>
              <div style={{ marginTop: 8 }}>
                <small>
                  Check exact market rate:
                  {selectedMetal === "gold" ? (
                    <a
                      className="external-link"
                      href="https://www.goodreturns.in/gold-rates/bangalore.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      Click here for gold rate
                    </a>
                  ) : (
                    <a
                      className="external-link"
                      href="https://www.goodreturns.in/silver-rates/bangalore.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      Click here for silver rate
                    </a>
                  )}
                </small>
              </div>
            </div>

            {/* silver resources removed as requested */}
          </div>

          <div className="buy-options">
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  checked={buyByAmount}
                  onChange={() => toggleBuyMethod(true)}
                />
                Buy by Amount
              </label>
              <label>
                <input
                  type="radio"
                  checked={!buyByAmount}
                  onChange={() => toggleBuyMethod(false)}
                />
                Buy by Weight
              </label>
            </div>

            <div className="input-group">
              <div className="input-field">
                <label>Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder="0"
                />
              </div>

              <div className="converter-arrow">⇄</div>

              <div className="input-field">
                <label>Weight (g)</label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => handleWeightChange(e.target.value)}
                  placeholder="0.0g"
                />
              </div>
            </div>

            {/* KYC removed per request */}
          </div>
        </div>

        {/* Right Side - Information */}
        <div className="gold-info">
          {/* Gold Banner */}
          <div className="gold-banner">
            <div className="banner-content">
              <h2>
                {selectedMetal === "silver" ? "FINCART Silver" : "FINCART Gold"}
              </h2>
              <p>
                {selectedMetal === "silver"
                  ? "Invest in Pure Silver"
                  : "Invest in 24K Pure Gold"}
              </p>
              <div className="banner-features">
                <span>📦 Zero storage fees</span>
                <span>🔒 No Theft</span>
              </div>
            </div>
            <div
              className={`${
                selectedMetal === "silver" ? "silver-bars" : "gold-bars"
              }`}
            >
              <div
                className={`${
                  selectedMetal === "silver" ? "silver-bar" : "gold-bar"
                }`}
              ></div>
              <div
                className={`${
                  selectedMetal === "silver" ? "silver-bar" : "gold-bar"
                }`}
              ></div>
              <div
                className={`${
                  selectedMetal === "silver" ? "silver-bar" : "gold-bar"
                }`}
              ></div>
            </div>
          </div>

          {/* Why Digital (Gold/Silver) - dynamic content */}
          <div className="why-digital-gold">
            <h3>
              {selectedMetal === "silver"
                ? "WHY DIGITAL SILVER?"
                : "WHY DIGITAL GOLD?"}
            </h3>
            <div className="benefits-grid">
              <div className="benefit">
                <div className="benefit-icon">📈</div>
                <div>
                  <h4>Systematic Growth</h4>
                  <p>
                    {selectedMetal === "silver"
                      ? "Digital silver lets you accumulate physical value with low ticket sizes and high liquidity."
                      : "With our no lock-in period, in Gold. You can achieve systematic growth of your investment."}
                  </p>
                </div>
              </div>

              <div className="benefit">
                <div className="benefit-icon">👤</div>
                <div>
                  <h4>Accessibility</h4>
                  <p>
                    {selectedMetal === "silver"
                      ? "Buy and sell silver with small amounts and track your holdings in real time."
                      : "Stay in control of your investments with 24x7 real-time portfolio tracking."}
                  </p>
                </div>
              </div>

              <div className="benefit">
                <div className="benefit-icon">✅</div>
                <div>
                  <h4>Guaranteed Purity</h4>
                  <p>
                    {selectedMetal === "silver"
                      ? "We provide verified and assayed silver holdings with trusted vault partners."
                      : "Invest with confidence in MMTC-approved digital gold, ensuring unmatched purity."}
                  </p>
                </div>
              </div>

              <div className="benefit">
                <div className="benefit-icon">🔒</div>
                <div>
                  <h4>Security</h4>
                  <p>
                    {selectedMetal === "silver"
                      ? "Your silver holdings are secured with insured vault partners."
                      : "We serve our customers with the best & trusted vault keeper that provides security for transactions and storage."}
                  </p>
                </div>
              </div>

              <div className="benefit">
                <div className="benefit-icon">💰</div>
                <div>
                  <h4>Minimum Investment</h4>
                  <p>
                    {selectedMetal === "silver"
                      ? "Start investing with very small amounts in silver."
                      : "You can start investing with an amount as low as ₹5."}
                  </p>
                </div>
              </div>

              <div className="benefit">
                <div className="benefit-icon">💧</div>
                <div>
                  <h4>High Liquidity</h4>
                  <p>
                    {selectedMetal === "silver"
                      ? "Silver is easy to buy and sell online with quick settlement."
                      : "With Fincart, you can buy & sell anywhere, anytime - online."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Trends Chart */}
      <div className="price-trends">
        <div className="chart-header">
          <h3>
            {selectedMetal === "silver"
              ? "Silver Price Trend"
              : "Gold Price Trend"}
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="time-period">1M</span>
            <small style={{ color: "#666" }}>Source: {chartSource}</small>
          </div>
        </div>
        <div className="chart-container">
          <Line data={data} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Gold;
