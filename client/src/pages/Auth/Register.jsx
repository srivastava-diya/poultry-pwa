// src/pages/Auth/Register.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/landing/Navbar";
import Footer from "../../components/landing/Footer";

const Register = () => {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // 🔹 renamed
  const [role, setRole] = useState("owner");
  const [farmId, setFarmId] = useState(""); // optional
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = { name, email, password, role };
      if (farmId.trim() !== "") payload.farmId = farmId;

      await register(payload);

      alert("Registration successful! Please login.");
      setName("");
      setEmail("");
      setPassword("");
      setRole("owner");
      setFarmId("");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>

    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Farm ID (optional)"
          value={farmId}
          onChange={(e) => setFarmId(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="owner">Owner</option>
          <option value="supervisor">Supervisor</option>
          <option value="vet">Vet</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>

    <Footer/>
    </>
  );
};

export default Register;
