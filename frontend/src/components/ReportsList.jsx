import React from "react";

const ReportsList = ({ reports = [], onSelectReport }) => {
  return (
    <div className="reports-list p-4 rounded-2xl shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-3">📊 Available Reports</h2>
      {reports.length === 0 ? (
        <p className="text-gray-600">No reports generated yet.</p>
      ) : (
        <ul className="space-y-2">
          {reports.map((report, index) => (
            <li
              key={index}
              onClick={() => onSelectReport(report)}
              className="cursor-pointer border border-gray-200 p-3 rounded-xl hover:bg-gray-50 transition"
            >
              <strong>{report.title}</strong>
              <p className="text-sm text-gray-500">
                Generated on {report.date}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportsList;
