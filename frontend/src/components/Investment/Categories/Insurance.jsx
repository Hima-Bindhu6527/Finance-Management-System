import React, { useState, useEffect } from "react";
import "./Insurance.css";

const Insurance = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [expandedPolicy, setExpandedPolicy] = useState(null);
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [
              ...new Set([...prev, entry.target.id]),
            ]);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".insurance-section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const insuranceComponents = [
    {
      title: "Premium",
      description:
        "The amount you pay to maintain your insurance coverage. It can be paid monthly, quarterly, annually, or as a one-time payment.",
      icon: "💰",
    },
    {
      title: "Policy Limit",
      description:
        "The maximum amount an insurance policy will pay out for covered losses during a specific period.",
      icon: "📊",
    },
    {
      title: "Deductible",
      description:
        "The amount you pay out-of-pocket before your insurance coverage starts paying for your claim.",
      icon: "🎯",
    },
  ];

  const generalInsuranceTypes = [
    {
      name: "Motor Insurance",
      icon: "🚗",
      points: [
        "Mandatory in India for all vehicles",
        "Covers damage and third-party liabilities",
        "Available for cars, two-wheelers, and commercial vehicles",
        "Types: Third-party, Comprehensive, and Own damage policy",
      ],
    },
    {
      name: "Health Insurance",
      icon: "🏥",
      points: [
        "Covers medical expenses including hospitalization",
        "Types: Individual, Family Floater, and Group Health",
        "Coverage includes medicines and diagnostics",
        "Products: Senior citizen, maternity, super top-up insurance",
      ],
    },
    {
      name: "Home Insurance",
      icon: "🏠",
      points: [
        "Financial protection for residence and contents",
        "Covers dwelling, personal property, and liability",
        "Protection against damage, theft, or accidents",
        "Includes additional living expenses coverage",
      ],
    },
    {
      name: "Travel Insurance",
      icon: "✈️",
      points: [
        "Covers costs and losses related to travel",
        "Trip cancellations and delays coverage",
        "Emergency healthcare and medical expenses",
        "Baggage and personal effects protection",
      ],
    },
    {
      name: "Personal Accident Insurance",
      icon: "🛡️",
      points: [
        "Coverage for injuries and disability from accidents",
        "Financial compensation for violent, external events",
        "Medical expenses and lost income support",
        "Rehabilitation and accident-related costs",
      ],
    },
    {
      name: "Pet Insurance",
      icon: "🐾",
      points: [
        "Coverage for veterinary expenses",
        "Includes routine wellness care options",
        "Some plans cover breeding conditions",
        "Ensures medical care without high costs",
      ],
    },
  ];

  const lifeInsuranceTypes = [
    {
      name: "Term Insurance",
      icon: "📋",
      points: [
        "Coverage for specific period (10-30 years)",
        "Most affordable life insurance option",
        "Death benefit paid to beneficiaries",
        "Types: Level, increasing, decreasing term",
      ],
    },
    {
      name: "Endowment Plan",
      icon: "💎",
      points: [
        "Combines insurance and investment",
        "Lump sum payout at maturity or death",
        "Guaranteed bonuses with tax benefits",
        "With-profit and non-profit options",
      ],
    },
    {
      name: "Retirement & Pension Plans",
      icon: "🏖️",
      points: [
        "Steady income after retirement",
        "Funded by employers or self-contribution",
        "Tax advantages and cash value benefits",
        "Coverage for long-term care expenses",
      ],
    },
    {
      name: "Term Insurance with Return on Premium",
      icon: "🔄",
      points: [
        "Life coverage for specified period",
        "All premiums returned if survived",
        "Death benefit for beneficiaries",
        "Combines protection and savings",
      ],
    },
    {
      name: "Child Insurance",
      icon: "👶",
      points: [
        "Secures child's financial future",
        "Coverage continues even if parent dies",
        "Tax benefits under Section 80C & 10(10D)",
        "Can be used as collateral for education loans",
      ],
    },
    {
      name: "Whole Life Insurance",
      icon: "♾️",
      points: [
        "Lifetime coverage up to 99-100 years",
        "Accumulates cash value over time",
        "Tax rebates up to Rs. 1.5 lakhs",
        "Option to borrow against the policy",
      ],
    },
  ];

  const benefits = [
    {
      title: "Financial Protection Against Risks",
      description:
        "Safety net against accidents, illnesses, or property damage without depleting savings.",
      icon: "🛡️",
    },
    {
      title: "Legal and Regulatory Requirements",
      description:
        "Compliance with mandatory insurance laws ensures protection for yourself and others.",
      icon: "⚖️",
    },
    {
      title: "Family Security and Support",
      description:
        "Financial protection for family covering living expenses, debts, and education costs.",
      icon: "👨‍👩‍👧‍👦",
    },
    {
      title: "Long-term Savings and Investment",
      description:
        "Build wealth and achieve financial goals while maintaining insurance coverage.",
      icon: "💰",
    },
    {
      title: "Peace of Mind and Reduced Stress",
      description:
        "Financial safeguarding brings confidence to focus on daily life and long-term goals.",
      icon: "🧘",
    },
  ];

  const topPolicies = [
    {
      name: "Aditya Birla Sun Life Insurance",
      description:
        "Partnership between Aditya Birla Group and Sun Life Financial Inc. Over 2 million policyholders with 560 branches nationwide.",
      features: [
        "500+ cities coverage",
        "85,000+ advisors",
        "Multiple plan solutions",
      ],
    },
    {
      name: "HDFC Life Click 2 Protect Plus",
      description:
        "Pure protection plan with comprehensive coverage at affordable premiums. Non-linked and non-participating term insurance.",
      features: [
        "Affordable premiums",
        "Multiple cover options",
        "Pure protection",
      ],
    },
    {
      name: "SBI Life eShield",
      description:
        "Non-linked pure-term insurance with high coverage at reasonable rates. Simple online purchase process.",
      features: ["High coverage", "Tax advantages", "Easy online purchase"],
    },
    {
      name: "Future Generali Care Plus",
      description:
        "Pure-term plan with two variants for customized savings and coverage based on premium capacity.",
      features: ["Customizable coverage", "Two variants", "Family protection"],
    },
    {
      name: "Aviva i-Life",
      description:
        "Pure-term plan to safeguard beneficiaries. Additional benefits for female customers and high Sum Assured.",
      features: ["Online purchase", "Female benefits", "Agent-free process"],
    },
    {
      name: "BSLI Protect@Ease Plan",
      description:
        "Online term insurance with high coverage at low costs. Hassle-free purchase with flexible options.",
      features: ["Easy online process", "Flexible terms", "Affordable pricing"],
    },
    {
      name: "Max Life Online Term Plan Plus",
      description:
        "Complete protection with long-term savings through multichannel distribution system.",
      features: ["High coverage", "Affordable prices", "Multiple channels"],
    },
    {
      name: "LIC's Jeevan Pragati Plan",
      description:
        "Non-linked endowment policy with increasing death benefit every five years. Available for ages 12-45.",
      features: ["Increasing benefits", "12-20 year terms", "Endowment plan"],
    },
    {
      name: "PNB MetLife Mera Term Plan",
      description:
        "Partnership between Punjab National Bank and MetLife with 8000+ locations nationwide.",
      features: ["Wide presence", "Global expertise", "Bank partnership"],
    },
    {
      name: "Bharti Axa Life Elite Secure",
      description:
        "Traditional non-participating Savings and Protection plan with guaranteed annual payouts.",
      features: [
        "Guaranteed payouts",
        "Savings + Protection",
        "Family benefits",
      ],
    },
  ];

  return (
    <div className="insurance-container">
      {/* Hero Section */}
      <section className="insurance-hero">
        <div className="hero-content">
          <h1 className="hero-title fade-in">Insurance</h1>
          <p className="hero-subtitle fade-in-delay">
            Ever wondered how to shield your hard-earned investments from
            unforeseen events? Curious about the importance of insurance in
            safeguarding your financial well-being? Worry not, we have you
            covered!
          </p>
          <p className="hero-description fade-in-delay-2">
            Read on to learn all about the complexities of insurance so you can
            make empowered decisions.
          </p>
        </div>
      </section>

      {/* What is Insurance */}
      <section
        id="what-is"
        className={`insurance-section what-is ${
          visibleSections.includes("what-is") ? "visible" : ""
        }`}
      >
        <div className="section-content">
          <h2 className="section-title">What is Insurance?</h2>
          <div className="insurance-definition">
            <p>
              Insurance is a financial safety net designed to protect you from
              unexpected losses or risks. It works on the principle of spreading
              risk among a large group of people.
            </p>
            <p>
              When you purchase insurance, you pay a regular fee called a{" "}
              <strong>premium</strong> to an insurance company. In return, the
              company agrees to provide financial compensation or assistance in
              case of specified events, such as accidents, illnesses, property
              damage, or even loss of life.
            </p>
            <p>
              This compensation gives access to a wide range of coverage options
              tailored to your needs and helps minimize the impact on your
              finances. Insurance offers peace of mind by providing a cushion
              that enables you to recover from unexpected situations without
              incurring significant financial burdens.
            </p>
          </div>
        </div>
      </section>

      {/* How Does Insurance Work */}
      <section
        id="how-it-works"
        className={`insurance-section how-it-works ${
          visibleSections.includes("how-it-works") ? "visible" : ""
        }`}
      >
        <div className="section-content">
          <h2 className="section-title">How Does Insurance Work?</h2>
          <div className="work-flow">
            <div className="flow-step">
              <div className="step-number">1</div>
              <h3>Choose Coverage</h3>
              <p>
                Select the type of insurance - life, health, vehicle, property,
                etc.
              </p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="step-number">2</div>
              <h3>Pay Premium</h3>
              <p>Pay periodically (monthly/annually) or as one-time payment</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="step-number">3</div>
              <h3>File Claim</h3>
              <p>Submit claim with insurance company for covered loss</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="step-number">4</div>
              <h3>Receive Compensation</h3>
              <p>Get reimbursement or direct payment for approved claims</p>
            </div>
          </div>
          <div className="regulatory-info">
            <p>
              <strong>Note:</strong> Insurance policies in India are regulated
              by the{" "}
              <strong>
                Insurance Regulatory and Development Authority of India (IRDAI)
              </strong>
              , which ensures fair practices, consumer protection, and overall
              industry stability.
            </p>
          </div>
        </div>
      </section>

      {/* Components of Insurance */}
      <section
        id="components"
        className={`insurance-section components ${
          visibleSections.includes("components") ? "visible" : ""
        }`}
      >
        <div className="section-content">
          <h2 className="section-title">Components of Insurance</h2>
          <div className="components-grid">
            {insuranceComponents.map((component, index) => (
              <div
                key={index}
                className="component-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="component-icon">{component.icon}</div>
                <h3>{component.title}</h3>
                <p>{component.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Insurance */}
      <section
        id="types"
        className={`insurance-section types ${
          visibleSections.includes("types") ? "visible" : ""
        }`}
      >
        <div className="section-content">
          <h2 className="section-title">Types of Insurance</h2>

          {/* General Insurance */}
          <div className="insurance-category">
            <h3 className="category-title">
              <span className="category-icon">🏢</span>
              General Insurance
            </h3>
            <p className="category-description">
              General insurance provides coverage for various non-life aspects,
              such as property, vehicles, health, and liability. It safeguards
              you against unexpected events and financial losses.
            </p>
            <div className="types-grid">
              {generalInsuranceTypes.map((type, index) => (
                <div
                  key={index}
                  className="type-card"
                  onMouseEnter={() => setActiveSection(`general-${index}`)}
                  onMouseLeave={() => setActiveSection(null)}
                >
                  <div className="type-header">
                    <span className="type-icon">{type.icon}</span>
                    <h4>{type.name}</h4>
                  </div>
                  <ul
                    className={`type-points ${
                      activeSection === `general-${index}` ? "expanded" : ""
                    }`}
                  >
                    {type.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Life Insurance */}
          <div className="insurance-category">
            <h3 className="category-title">
              <span className="category-icon">❤️</span>
              Life Insurance
            </h3>
            <p className="category-description">
              Life insurance is a contract that provides financial protection to
              beneficiaries in the event of the insured person's death. It
              offers a lump-sum payment to help support the family and cover
              financial obligations.
            </p>
            <div className="types-grid">
              {lifeInsuranceTypes.map((type, index) => (
                <div
                  key={index}
                  className="type-card"
                  onMouseEnter={() => setActiveSection(`life-${index}`)}
                  onMouseLeave={() => setActiveSection(null)}
                >
                  <div className="type-header">
                    <span className="type-icon">{type.icon}</span>
                    <h4>{type.name}</h4>
                  </div>
                  <ul
                    className={`type-points ${
                      activeSection === `life-${index}` ? "expanded" : ""
                    }`}
                  >
                    {type.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        id="benefits"
        className={`insurance-section benefits ${
          visibleSections.includes("benefits") ? "visible" : ""
        }`}
      >
        <div className="section-content">
          <h2 className="section-title">Benefits of Having Insurance</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="benefit-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Policies */}
      <section
        id="top-policies"
        className={`insurance-section top-policies ${
          visibleSections.includes("top-policies") ? "visible" : ""
        }`}
      >
        <div className="section-content">
          <h2 className="section-title">
            Best Life Insurance Policies in India: An Overview
          </h2>
          <p className="section-intro">
            Get to know which is the best life insurance policy to get in India
          </p>
          <div className="policies-list">
            {topPolicies.map((policy, index) => (
              <div
                key={index}
                className={`policy-card ${
                  expandedPolicy === index ? "expanded" : ""
                }`}
                onClick={() =>
                  setExpandedPolicy(expandedPolicy === index ? null : index)
                }
              >
                <div className="policy-header">
                  <div className="policy-number">{index + 1}</div>
                  <h3>{policy.name}</h3>
                  <span className="expand-icon">
                    {expandedPolicy === index ? "−" : "+"}
                  </span>
                </div>
                <div className="policy-content">
                  <p>{policy.description}</p>
                  <div className="policy-features">
                    {policy.features.map((feature, idx) => (
                      <span key={idx} className="feature-tag">
                        ✓ {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section
        id="conclusion"
        className={`insurance-section conclusion ${
          visibleSections.includes("conclusion") ? "visible" : ""
        }`}
      >
        <div className="section-content">
          <h2 className="section-title">Conclusion</h2>
          <div className="conclusion-content">
            <p>
              Life insurance provides additional benefits like tax advantages,
              savings opportunities, and wealth creation over time, in addition
              to protecting you against the risk of unfavorable events.
            </p>
            <p>
              The appropriate life insurance policy from a reputable provider
              can help you obtain savings in addition to long-term risk
              protection—two advantages from a single solution.
            </p>
            <div className="cta-box">
              <h3>Ready to Secure Your Future?</h3>
              <p>
                Choose the right insurance policy that fits your needs and
                protect what matters most.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insurance;
