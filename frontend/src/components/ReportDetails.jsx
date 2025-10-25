import React from "react";

const ReportDetails = ({ report }) => {
  if (!report) {
    return (
      <div className="report-details p-4 rounded-2xl shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-3">📋 Report Details</h2>
        <p className="text-gray-600">Select a report to view its details.</p>
      </div>
    );
  }

  return (
    <div className="report-details p-4 rounded-2xl shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-3">{report.title}</h2>
      <p className="text-gray-600 mb-2">
        <strong>Date:</strong> {report.date}
      </p>
      <p className="text-gray-700">{report.description}</p>

      {/* Example of additional data */}
      {report.data && (
        <div className="mt-4">
          <h3 className="font-semibold">Data Summary:</h3>
          <pre className="bg-gray-100 p-3 rounded-xl text-sm overflow-x-auto">
            {JSON.stringify(report.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ReportDetails;
