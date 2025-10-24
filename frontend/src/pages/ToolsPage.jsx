import React from "react";
import { useParams, Navigate } from "react-router-dom";
import SIPCalculator from "../components/Tools/SIPCalculator";
import PPFCalculator from "../components/Tools/PPFCalculator";
import EMICalculator from "../components/Tools/EMICalculator";
import FDCalculator from "../components/Tools/FDCalculator";
import SWPCalculator from "../components/Tools/SWPCalculator";
import "./ToolsPage.css";

const ToolsPage = () => {
  const { calculator } = useParams();

  const renderCalculator = () => {
    switch (calculator) {
      case "sip-calculator":
        return <SIPCalculator />;
      case "ppf-calculator":
        return <PPFCalculator />;
      case "emi-calculator":
        return <EMICalculator />;
      case "fd-calculator":
        return <FDCalculator />;
      case "swp-calculator":
        return <SWPCalculator />;
      default:
        return <Navigate to="/tools/sip-calculator" replace />;
    }
  };

  return <div className="tools-page">{renderCalculator()}</div>;
};

export default ToolsPage;
