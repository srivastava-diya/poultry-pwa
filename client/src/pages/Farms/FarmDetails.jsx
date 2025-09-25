// src/pages/FarmDetails.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { farmService } from "@/services/farmService";
import { useAuth } from "@/context/AuthContext";

const FarmDetails = () => {
  const { id } = useParams();
  const [farm, setFarm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const { user } = useAuth();
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await farmService.getFarmById(id);
        setFarm(data);
        setName(data?.name || "");
        setZipCode(data?.zipCode || "");
      } catch (e) {
        setError(e?.response?.data?.message || e.message || "Failed to load farm");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <p className="p-4">Loading farm details...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!farm) return <p className="p-4">Farm not found.</p>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{farm.name}</h2>
        {user?.role === "owner" && String(user?._id) === String(farm?.owner?._id || farm?.owner) && (
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            onClick={() => setEditMode((s) => !s)}
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        )}
      </div>
      {editMode ? (
        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input className="border rounded px-2 py-2 w-full" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Zip Code</label>
            <input className="border rounded px-2 py-2 w-full" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
          </div>
          <button
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            onClick={async () => {
              try {
                setLoading(true);
                setError("");
                const updated = await farmService.updateFarm(farm._id, { name, zipCode });
                setFarm(updated);
                setEditMode(false);
              } catch (e) {
                setError(e?.response?.data?.message || e.message || "Failed to update farm");
              } finally {
                setLoading(false);
              }
            }}
          >
            Save
          </button>
        </div>
      ) : null}
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
