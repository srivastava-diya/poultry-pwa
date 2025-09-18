import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <Link to="/farms" className="p-4 bg-green-200 rounded shadow hover:bg-green-300">
          Farms
        </Link>
        <Link to="/flocks" className="p-4 bg-yellow-200 rounded shadow hover:bg-yellow-300">
          Flocks
        </Link>
        <Link to="/alerts" className="p-4 bg-red-200 rounded shadow hover:bg-red-300">
          Alerts
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
