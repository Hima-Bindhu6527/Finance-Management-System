import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Mutual Fund");
  const navigate = useNavigate();

  const carouselSlides = [
    {
      title: "80% of Investors between age group",
      subtitle: "30-40 who are Married and have",
      description: "1 child opt for following goals.",
      tagline: "Feel free to explore",
      goals: [
        { name: "Wealth Creation", image: "wealth" },
        { name: "Car Purchase", image: "car" },
        { name: "Secure Retirement", image: "retirement" },
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
      title: "Do you prefer a personalised plan created by our experts?",
      description:
        "We can create a comprehensive financial plan that covers all of yours goals and requirements, no matter how complex your financial status is. The plan can be tailormade for your individual needs and priorities.",
      footer: "Book your appointment with our expert.",
      tagline:
        "We will get in touch with you and begin the journey to create your personalised plan",
      buttonText: "Connect",
    },
  ];

  const categories = [
    "Mutual Fund",
    "ULIP",
    "Gold",
    "PMS",
    "LiquiLoans",
    "Insurance",
    "Protection",
    "Unlisted Stocks",
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
    ULIP: {
      title: "Unit Linked Insurance Plans combine insurance with investment",
      description:
        "ULIP provides life cover along with investment in equity and debt instruments",
      benefits: [
        { title: "Dual Benefit", icon: "flexibility" },
        { title: "Tax Benefits", icon: "tax" },
        { title: "Flexibility", icon: "variety" },
        { title: "Wealth Creation", icon: "investment" },
        { title: "Market Participation", icon: "management" },
        { title: "Life Cover", icon: "transparency" },
        { title: "Switching Options", icon: "liquidity" },
        { title: "Partial Withdrawals", icon: "cost" },
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
    PMS: {
      title: "Portfolio Management Services for sophisticated investors",
      description:
        "Customized investment solutions managed by professional fund managers",
      benefits: [
        { title: "Personalized Strategy", icon: "management" },
        { title: "Professional Management", icon: "investment" },
        { title: "Direct Ownership", icon: "transparency" },
        { title: "Flexibility", icon: "flexibility" },
        { title: "Custom Benchmarks", icon: "variety" },
        { title: "Risk Management", icon: "diversification" },
        { title: "Dedicated Manager", icon: "liquidity" },
        { title: "Regular Reporting", icon: "cost" },
      ],
    },
    LiquiLoans: {
      title: "Quick loans against your mutual fund investments",
      description: "Get instant liquidity without redeeming your investments",
      benefits: [
        { title: "Instant Approval", icon: "flexibility" },
        { title: "Low Interest Rates", icon: "cost" },
        { title: "No Redemption Required", icon: "investment" },
        { title: "Quick Disbursal", icon: "liquidity" },
        { title: "Continue Investment Growth", icon: "management" },
        { title: "Flexible Tenure", icon: "variety" },
        { title: "Minimal Documentation", icon: "transparency" },
        { title: "Online Process", icon: "diversification" },
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
    Protection: {
      title: "Protect your family's financial future",
      description:
        "Term insurance and protection plans for comprehensive coverage",
      benefits: [
        { title: "High Coverage Amount", icon: "flexibility" },
        { title: "Affordable Premiums", icon: "cost" },
        { title: "Tax Benefits", icon: "tax" },
        { title: "Family Security", icon: "management" },
        { title: "Easy Claim Process", icon: "liquidity" },
        { title: "Pure Protection", icon: "transparency" },
        { title: "Flexible Terms", icon: "variety" },
        { title: "Rider Options", icon: "diversification" },
      ],
    },
    "Unlisted Stocks": {
      title: "Invest in high-growth unlisted companies",
      description:
        "Access to pre-IPO companies with significant growth potential",
      benefits: [
        { title: "High Return Potential", icon: "investment" },
        { title: "Early Access", icon: "flexibility" },
        { title: "Portfolio Diversification", icon: "diversification" },
        { title: "Growth Opportunities", icon: "variety" },
        { title: "Pre-IPO Benefits", icon: "management" },
        { title: "Exclusive Investments", icon: "transparency" },
        { title: "Lower Volatility", icon: "liquidity" },
        { title: "Long-term Wealth", icon: "cost" },
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
            <button className="cta-button">Start SIP</button>
          </div>
          <div className="step-card">
            <div className="step-icon">💳</div>
            <h3>Start your tax saving</h3>
            <button className="cta-button">Save Tax</button>
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
                  <div className="goal-card">
                    <h4>Wealth Creation</h4>
                    <div className="goal-image">👨‍👩‍👧💰</div>
                  </div>
                  <div className="goal-card">
                    <h4>Car Purchase</h4>
                    <div className="goal-image">🚗</div>
                  </div>
                  <div className="goal-card">
                    <h4>Secure Retirement</h4>
                    <div className="goal-image">👴💰</div>
                  </div>
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
                <div className="expert-content">
                  <div className="expert-text">
                    <h3>{carouselSlides[2].title}</h3>
                    <p className="expert-description">
                      {carouselSlides[2].description}
                    </p>
                  </div>
                  <div className="expert-icon">👨‍💼</div>
                </div>
                <div className="expert-footer">
                  <p className="expert-footer-title">
                    {carouselSlides[2].footer}
                  </p>
                  <p className="expert-footer-text">
                    {carouselSlides[2].tagline}
                  </p>
                  <button className="carousel-cta">
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
          <div className="content-header">
            <input type="radio" name="filter" defaultChecked /> All
            <input type="radio" name="filter" /> Active Investments
          </div>

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

        <button className="contact-button">Contact Us</button>
      </div>

      {/* Create Goal is opened via Plan page now */}
    </div>
  );
};

export default Dashboard;
