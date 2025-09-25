// src/pages/FarmList.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect} from "react";
import { farmService } from "../../services/farmService";
import FarmCreateForm from "../../components/FarmCreateForm";
import { useAuth } from "../../context/AuthContext";

const FarmList = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const refetch = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await farmService.getFarms();
      setFarms(data || []);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to load farms");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { refetch(); }, []);
  const { user } = useAuth();
  const [showCreate, setShowCreate] = useState(false);

  if (loading) return <p className="p-4">Loading farms...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Farms</h2>
        {(user?.role === "owner" || user?.role === "supervisor") && (
          <button
            onClick={() => setShowCreate((s) => !s)}
            className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700"
          >
            {showCreate ? "Close" : "Create Farm"}
          </button>
        )}
      </div>
      {showCreate && (user?.role === "owner" || user?.role === "supervisor") && (
        <div className="mb-6 p-4 border rounded-lg">
          <FarmCreateForm
            onCreated={() => {
              setShowCreate(false);
              refetch();
            }}
            onCancel={() => setShowCreate(false)}
          />
        </div>
      )}
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
        <div className="p-4 border rounded">
          <p className="mb-3">No farms found.</p>
          {(user?.role === "owner" || user?.role === "supervisor") && (
            <button
              onClick={() => setShowCreate(true)}
              className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700"
            >
              Create your first farm
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FarmList;
