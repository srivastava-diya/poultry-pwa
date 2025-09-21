// src/pages/FarmDetails.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";

const FarmDetails = () => {
  const { id } = useParams();
  const { data: farm, loading, error } = useFetch(`/api/farms/${id}`);

  if (loading) return <p className="p-4">Loading farm details...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!farm) return <p className="p-4">Farm not found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{farm.name}</h2>
      <div className="space-y-2">
        <p>
          <span className="font-semibold">Zip Code:</span> {farm.zipCode}
        </p>
        <p>
          <span className="font-semibold">Owner:</span>{" "}
          {farm.owner?.name || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Created:</span>{" "}
          {new Date(farm.createdAt).toLocaleDateString()}
        </p>
      </div>

      <Link
        to="/farms"
        className="inline-block mt-6 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Back to Farms
      </Link>
    </div>
  );
};

export default FarmDetails;
