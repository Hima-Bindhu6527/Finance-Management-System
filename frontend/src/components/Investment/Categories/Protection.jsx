import React from "react";
import CategoryContent from "./CategoryContent";

const Protection = () => {
  const categoryData = {
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
  };

  return (
    <CategoryContent categoryData={categoryData} categoryName="Protection" />
  );
};

export default Protection;
