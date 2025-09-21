import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Farm Management Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <Link to="/farms" className="p-6 bg-green-100 rounded shadow hover:bg-green-200">
          Manage Farms
        </Link>
        <Link to="/groups" className="p-6 bg-blue-100 rounded shadow hover:bg-blue-200">
          Manage Groups
        </Link>
        <Link to="/logs" className="p-6 bg-yellow-100 rounded shadow hover:bg-yellow-200">
          Daily Logs
        </Link>
        <Link to="/alerts" className="p-6 bg-red-100 rounded shadow hover:bg-red-200">
          Alerts
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
