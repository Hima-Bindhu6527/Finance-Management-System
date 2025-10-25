import React from "react";
import CategoryContent from "./CategoryContent";

const LiquiLoans = () => {
  const categoryData = {
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
  };

  return (
    <CategoryContent categoryData={categoryData} categoryName="LiquiLoans" />
  );
};

export default LiquiLoans;
