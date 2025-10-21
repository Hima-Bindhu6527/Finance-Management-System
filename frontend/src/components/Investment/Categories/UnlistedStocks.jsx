import React from "react";
import CategoryContent from "./CategoryContent";

const UnlistedStocks = () => {
  const categoryData = {
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
  };

  return (
    <CategoryContent
      categoryData={categoryData}
      categoryName="Unlisted Stocks"
    />
  );
};

export default UnlistedStocks;
