import React from "react";
import CategoryContent from "./CategoryContent";

const MutualFund = () => {
  const categoryData = {
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
  };

  return (
    <CategoryContent categoryData={categoryData} categoryName="Mutual Fund" />
  );
};

export default MutualFund;
