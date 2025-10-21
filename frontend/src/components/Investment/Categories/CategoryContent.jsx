import React from "react";
import "./CategoryContent.css";

const CategoryContent = ({ categoryData, categoryName }) => {
  return (
    <div className="category-content-wrapper">
      <div className="category-header">
        <h1>{categoryName.toUpperCase()}</h1>
      </div>

      <div className="categories-section">
        <div className="single-category-content">
          <div className="content-header">
            <input type="radio" name="filter" defaultChecked /> All
            <input type="radio" name="filter" /> Active Investments
          </div>

          <div className="category-info">
            <h3>{categoryData.title}</h3>
            <p className="category-desc">{categoryData.description}</p>

            <div className="benefits-grid">
              {categoryData.benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <div className="benefit-icon">✓</div>
                  <span>{benefit.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="contact-button">Contact Us</button>
      </div>
    </div>
  );
};

export default CategoryContent;
