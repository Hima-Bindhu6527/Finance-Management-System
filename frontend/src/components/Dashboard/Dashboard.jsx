import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Mutual Fund");
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  const formatDateTime = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  // Function to convert category name to URL-friendly path
  const getCategoryPath = (categoryName) => {
    return categoryName
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, ""); // Remove special characters except hyphens
  };

  const carouselSlides = [
    {
      title: "80% of Investors between age group",
      subtitle: "30-40 who are Married and have",
      description: "1 child opt for following goals.",
      tagline: "Feel free to explore",
      goals: [
        {
          name: "Wealth Creation",
          image: "wealth",
          icon: "💎",
          description:
            "Build a diversified portfolio for long-term financial growth",
          highlight: "Average 12-15% returns",
          timeframe: "5-20 years",
        },
        {
          name: "Car Purchase",
          image: "car",
          icon: "🏎️",
          description:
            "Save systematically for your dream car without compromising lifestyle",
          highlight: "Goal-based planning",
          timeframe: "2-5 years",
        },
        {
          name: "Secure Retirement",
          image: "retirement",
          icon: "🏖️",
          description:
            "Ensure financial independence for a comfortable retirement life",
          highlight: "Corpus up to 10Cr+",
          timeframe: "15-30 years",
        },
      ],
      buttonText: "Let's Begin",
    },
    {
      title: "Success Stories",
      stories: [
        {
          name: "Shailesh",
          desc: "is on track for his retirement",
          time: "22 Years",
          icon: "retirement",
        },
        {
          name: "Bhavika's daughter Snehal",
          desc: "is all set for her Masters in USA",
          time: "18 Years",
          icon: "education",
        },
        {
          name: "Rajesh",
          desc: "is all set to launch his startup",
          time: "6 Years",
          icon: "startup",
        },
        {
          name: "Mohit",
          desc: "is secure about his dependents future",
          time: "Infinite Peace",
          icon: "peace",
        },
      ],
      footer:
        "Different people → Varied challenges → Diverse aspirations → Individual plan",
      tagline: "They all took the first step to financial freedom by clicking",
      buttonText: "Start My Plan",
    },
    {
      title: "Powerful Financial Tools at Your Fingertips",
      description:
        "Access professional-grade calculators and investment insights to make informed financial decisions. Our comprehensive toolkit helps you plan, calculate, and track your financial journey.",
      tools: [
        {
          name: "SIP Calculator",
          description: "Calculate systematic investment returns",
          icon: "📈",
          benefit: "Plan your monthly investments",
        },
        {
          name: "EMI Calculator",
          description: "Calculate loan EMIs instantly",
          icon: "🏠",
          benefit: "Budget your loan payments",
        },
        {
          name: "PPF Calculator",
          description: "Calculate PPF maturity and returns",
          icon: "🏛️",
          benefit: "Tax-saving investments",
        },
        {
          name: "FD Calculator",
          description: "Calculate fixed deposit returns",
          icon: "🏦",
          benefit: "Safe investment planning",
        },
        {
          name: "Investment Categories",
          description: "Explore 9+ investment options",
          icon: "💼",
          benefit: "Diversify your portfolio",
        },
      ],
      footer: "All tools designed for smart financial planning",
      tagline: "Start exploring our comprehensive financial toolkit",
      buttonText: "Explore Tools",
      route: "/tools",
    },
  ];

  const categories = [
    "Mutual Fund",
    "Gold",
    "Insurance",
    "Stocks",
    "Cryptocurrency",
    "ETF",
    "Bonds",
    "Fixed Deposits",
    "Real Estate",
  ];

  const categoryContent = {
    "Mutual Fund": {
      title:
        "Mutual funds are easy to invest and offer a great deal of Flexibility",
      description:
        "Mutual funds have been proved as a great investment option with multiple advantages",
      benefits: [
        { title: "Flexibility", icon: "flexibility" },
        { title: "Variety", icon: "variety" },
        { title: "Low Cost", icon: "cost" },
        { title: "Transparency", icon: "transparency" },
        { title: "Diversification", icon: "diversification" },
        { title: "Liquidity", icon: "liquidity" },
        { title: "Professional Management", icon: "management" },
        { title: "One Time Investment", icon: "investment" },
        { title: "Tax Benefit", icon: "tax" },
      ],
    },
    Gold: {
      title: "Gold investment offers stability and hedge against inflation",
      description:
        "Invest in digital gold with complete transparency and security",
      benefits: [
        { title: "Safe Haven", icon: "flexibility" },
        { title: "Liquidity", icon: "liquidity" },
        { title: "Hedge", icon: "variety" },
        { title: "Portfolio Diversification", icon: "diversification" },
      ],
    },
    Insurance: {
      title: "Comprehensive insurance solutions for complete protection",
      description:
        "Choose from various insurance products to secure your future",
      benefits: [
        { title: "Life Coverage", icon: "flexibility" },
        { title: "Health Protection", icon: "variety" },
        { title: "Tax Benefits", icon: "tax" },
        { title: "Peace of Mind", icon: "management" },
        { title: "Affordable Premiums", icon: "cost" },
        { title: "Wide Coverage Options", icon: "transparency" },
        { title: "Family Protection", icon: "liquidity" },
        { title: "Claim Support", icon: "diversification" },
      ],
    },
    Stocks: {
      title: "Build long-term wealth through equity investments",
      description:
        "Direct ownership in companies with potential for high returns",
      benefits: [
        { title: "Ownership", icon: "flexibility" },
        { title: "Capital Appreciation", icon: "investment" },
        { title: "Dividend Income", icon: "variety" },
        { title: "Liquidity", icon: "liquidity" },
        { title: "Voting Rights", icon: "management" },
        { title: "Inflation Hedge", icon: "transparency" },
        { title: "Diversification", icon: "diversification" },
        { title: "Long-term Growth", icon: "cost" },
      ],
    },
    Cryptocurrency: {
      title: "Explore the world of digital currencies and blockchain",
      description:
        "High-risk, high-reward investment in decentralized digital assets",
      benefits: [
        { title: "24/7 Trading", icon: "flexibility" },
        { title: "High Returns Potential", icon: "investment" },
        { title: "Decentralization", icon: "variety" },
        { title: "Global Access", icon: "liquidity" },
        { title: "Blockchain Technology", icon: "management" },
        { title: "Portfolio Diversification", icon: "diversification" },
        { title: "Innovation", icon: "transparency" },
        { title: "Digital Future", icon: "cost" },
      ],
    },
    ETF: {
      title: "Exchange-Traded Funds for diversified, low-cost investing",
      description:
        "Combine benefits of mutual funds with flexibility of stock trading",
      benefits: [
        { title: "Low Cost", icon: "cost" },
        { title: "Diversification", icon: "diversification" },
        { title: "Flexibility", icon: "flexibility" },
        { title: "Transparency", icon: "transparency" },
        { title: "Tax Efficiency", icon: "tax" },
        { title: "No Entry/Exit Load", icon: "liquidity" },
        { title: "Real-time Trading", icon: "management" },
        { title: "Index Tracking", icon: "investment" },
      ],
    },
    Bonds: {
      title: "Secure your future with stable, predictable returns",
      description:
        "Fixed income securities issued by governments and corporations",
      benefits: [
        { title: "Fixed Income", icon: "investment" },
        { title: "Capital Preservation", icon: "flexibility" },
        { title: "Diversification", icon: "diversification" },
        { title: "Tax Benefits", icon: "tax" },
        { title: "Liquidity Options", icon: "liquidity" },
        { title: "Better than FDs", icon: "variety" },
        { title: "Credit Ratings", icon: "transparency" },
        { title: "Regular Coupon", icon: "management" },
      ],
    },
    "Fixed Deposits": {
      title: "Safe and guaranteed returns for risk-averse investors",
      description:
        "Traditional fixed deposits with assured returns and capital safety",
      benefits: [
        { title: "Guaranteed Returns", icon: "investment" },
        { title: "Capital Safety", icon: "flexibility" },
        { title: "Flexible Tenure", icon: "variety" },
        { title: "Easy Investment", icon: "management" },
        { title: "Loan Facility", icon: "liquidity" },
        { title: "Senior Citizen Benefits", icon: "tax" },
        { title: "DICGC Insured", icon: "transparency" },
        { title: "No Market Risk", icon: "diversification" },
      ],
    },
    "Real Estate": {
      title: "Build wealth through property ownership and investment",
      description:
        "Tangible asset investment with rental income and appreciation potential",
      benefits: [
        { title: "Tangible Asset", icon: "flexibility" },
        { title: "Rental Income", icon: "investment" },
        { title: "Capital Appreciation", icon: "variety" },
        { title: "Inflation Hedge", icon: "transparency" },
        { title: "Loan Collateral", icon: "liquidity" },
        { title: "Tax Benefits", icon: "tax" },
        { title: "Legacy Asset", icon: "management" },
        { title: "Portfolio Diversification", icon: "diversification" },
      ],
    },
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length
    );
  };

  return (
    <div className="dashboard">
      {/* Welcome Message Banner */}
      {showWelcome && user && (
        <div className="welcome-banner-simple">
          <span>
            👋 Welcome back, <strong>{user.name}</strong>!
            {user.previousLoginAt && (
              <> Last login: {formatDateTime(user.previousLoginAt)}</>
            )}
            {user.lastLogoutAt && (
              <> • Last logout: {formatDateTime(user.lastLogoutAt)}</>
            )}
          </span>
          <button
            className="close-banner"
            onClick={() => setShowWelcome(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      )}

      <div className="suggested-steps">
        <h2>Suggested next steps:</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-icon">🎯</div>
            <h3>Create your first goal</h3>
            <button
              className="cta-button"
              onClick={() => navigate("/plan")}
              aria-label="Initiate Goal"
            >
              Initiate
            </button>
          </div>
          <div className="step-card">
            <div className="step-icon">💰</div>
            <h3>Quick SIP</h3>
            <button
              className="cta-button"
              onClick={() => navigate("/tools/sip-calculator")}
            >
              Start SIP
            </button>
          </div>
          <div className="step-card">
            <div className="step-icon">💳</div>
            <h3>Start a Fixed Deposit</h3>
            <button
              className="cta-button"
              onClick={() => navigate("/tools/fd-calculator")}
            >
              Start FD
            </button>
          </div>
        </div>
      </div>

      <div className="carousel-section">
        <div className="carousel-container">
          <button className="carousel-arrow left" onClick={prevSlide}>
            ‹
          </button>

          <div className="carousel-content">
            {currentSlide === 0 && (
              <div className="carousel-slide slide-1">
                <div className="slide-header">
                  <p className="slide-title">{carouselSlides[0].title}</p>
                  <p className="slide-subtitle">{carouselSlides[0].subtitle}</p>
                  <p className="slide-description">
                    {carouselSlides[0].description}
                  </p>
                  <p className="slide-tagline">{carouselSlides[0].tagline}</p>
                </div>
                <div className="goals-container">
                  {carouselSlides[0].goals.map((goal, index) => (
                    <div key={index} className="goal-card">
                      <div className="goal-icon">{goal.icon}</div>
                      <h4 className="goal-title">{goal.name}</h4>
                      <p className="goal-description">{goal.description}</p>
                      <div className="goal-stats">
                        <div className="goal-highlight">
                          <span className="highlight-label">
                            � {goal.highlight}
                          </span>
                        </div>
                        <div className="goal-timeframe">
                          <span className="timeframe-label">
                            ⏱️ {goal.timeframe}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-cta"
                  onClick={() => navigate("/plan")}
                >
                  {carouselSlides[0].buttonText}
                </button>
              </div>
            )}

            {currentSlide === 1 && (
              <div className="carousel-slide slide-2">
                <div className="stories-list">
                  {carouselSlides[1].stories.map((story, index) => (
                    <div key={index} className="story-item">
                      <p className="story-text">
                        <strong>{story.name}</strong> {story.desc}
                      </p>
                      <div className="story-details">
                        <span className="story-time">⏰ {story.time}</span>
                        <span className="story-icon">
                          {story.icon === "retirement" && "💰"}
                          {story.icon === "education" && "🎓"}
                          {story.icon === "startup" && "🚀"}
                          {story.icon === "peace" && "☂️"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="slide-footer-box">
                  <p className="footer-flow">{carouselSlides[1].footer}</p>
                  <p className="footer-tagline">{carouselSlides[1].tagline}</p>
                  <button
                    className="carousel-cta"
                    onClick={() => navigate("/plan")}
                  >
                    {carouselSlides[1].buttonText}
                  </button>
                </div>
              </div>
            )}

            {currentSlide === 2 && (
              <div className="carousel-slide slide-3">
                <div className="tools-header">
                  <h3>{carouselSlides[2].title}</h3>
                  <p className="tools-description">
                    {carouselSlides[2].description}
                  </p>
                </div>
                <div className="tools-grid">
                  {carouselSlides[2].tools.map((tool, index) => (
                    <div key={index} className="tool-card">
                      <div className="tool-icon">{tool.icon}</div>
                      <h4 className="tool-name">{tool.name}</h4>
                      <p className="tool-description">{tool.description}</p>
                      <div className="tool-benefit">✓ {tool.benefit}</div>
                    </div>
                  ))}
                </div>
                <div className="tools-footer">
                  <p className="tools-footer-title">
                    {carouselSlides[2].footer}
                  </p>
                  <p className="tools-footer-text">
                    {carouselSlides[2].tagline}
                  </p>
                  <button
                    className="carousel-cta"
                    onClick={() => navigate(carouselSlides[2].route)}
                  >
                    {carouselSlides[2].buttonText}
                  </button>
                </div>
              </div>
            )}
          </div>

          <button className="carousel-arrow right" onClick={nextSlide}>
            ›
          </button>
        </div>
      </div>

      <div className="categories-section">
        <div className="categories-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="category-content">
          <div className="category-info">
            <h3>{categoryContent[activeCategory].title}</h3>
            <p className="category-desc">
              {categoryContent[activeCategory].description}
            </p>

            <div className="benefits-grid">
              {categoryContent[activeCategory].benefits.map(
                (benefit, index) => (
                  <div key={index} className="benefit-item">
                    <div className="benefit-icon">✓</div>
                    <span>{benefit.title}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <button
          className="know-more-button"
          onClick={() => navigate(`/invest/${getCategoryPath(activeCategory)}`)}
        >
          Know More - {activeCategory}
        </button>
      </div>

      {/* Create Goal is opened via Plan page now */}
    </div>
  );
};

export default Dashboard;
