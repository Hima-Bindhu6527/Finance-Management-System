import React from "react";
import CategoryContent from "./CategoryContent";

const OtherInsurance = () => {
  const categoryData = {
    title: "Comprehensive insurance solutions for complete protection",
    description: "Choose from various insurance products to secure your future",
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
  };

  return (
    <CategoryContent categoryData={categoryData} categoryName="Insurance" />
  );
};

export default OtherInsurance;
