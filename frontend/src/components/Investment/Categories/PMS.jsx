import React from "react";
import CategoryContent from "./CategoryContent";

const PMS = () => {
  const categoryData = {
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
  };

  return <CategoryContent categoryData={categoryData} categoryName="PMS" />;
};

export default PMS;
