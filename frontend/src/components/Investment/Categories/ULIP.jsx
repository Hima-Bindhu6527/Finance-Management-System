import React from "react";
import CategoryContent from "./CategoryContent";

const ULIP = () => {
  const categoryData = {
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
  };

  return <CategoryContent categoryData={categoryData} categoryName="ULIP" />;
};

export default ULIP;
