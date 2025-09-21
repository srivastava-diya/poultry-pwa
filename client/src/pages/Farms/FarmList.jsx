// src/pages/FarmList.jsx
import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";

const FarmList = () => {
  const { data: farms, loading, error, refetch } = useFetch("/api/farms");

  if (loading) return <p className="p-4">Loading farms...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Farms</h2>
      {farms && farms.length > 0 ? (
        <ul className="space-y-3">
          {farms.map((farm) => (
            <li
              key={farm._id}
              className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{farm.name}</p>
                <p className="text-sm text-gray-600">Zip: {farm.zipCode}</p>
              </div>
              <Link
                to={`/farms/${farm._id}`}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                View
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No farms found.</p>
      )}
    </div>
  );
};

export default FarmList;
