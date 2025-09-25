// src/pages/Auth/Register.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/landing/Navbar";
import Footer from "../../components/landing/Footer";
import { User, Mail, Lock, Badge, UserCog } from "lucide-react";
import {  useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("owner");
  const [farmId, setFarmId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = { name, email, password, role };
      if (farmId.trim() !== "") payload.farmId = farmId;

      await register(payload);
      navigate('/login');
    
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
      <Navbar />

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-white px-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl mt-15 shadow-xl p-8 transform transition-all duration-500 ">
          <h2 className="text-3xl font-extrabold text-green-700 text-center mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600 text-center mb-8 text-sm">
            Join us to manage your farm with ease.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Name */}
            <div className="relative">
              <User className="absolute top-3 left-3 text-green-500" size={18} />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-xl bg-green-50/60 focus:ring-2 focus:ring-green-400 outline-none"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute top-3 left-3 text-green-500" size={18} />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-xl bg-green-50/60 focus:ring-2 focus:ring-green-400 outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute top-3 left-3 text-green-500" size={18} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-xl bg-green-50/60 focus:ring-2 focus:ring-green-400 outline-none"
                required
              />
            </div>

            {/* Farm ID */}
            <div className="relative">
              <Badge className="absolute top-3 left-3 text-green-500" size={18} />
              <input
                type="text"
                placeholder="Farm ID (optional)"
                value={farmId}
                onChange={(e) => setFarmId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-xl bg-green-50/60 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            {/* Role */}
            <div className="relative">
              <UserCog
                className="absolute top-3 left-3 text-green-500"
                size={18}
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-xl bg-green-50/60 focus:ring-2 focus:ring-green-400 outline-none"
              >
                <option value="owner">Owner</option>
                <option value="supervisor">Supervisor</option>
                <option value="vet">Vet</option>
              </select>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-white font-semibold bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Registering..." : "Create Account"}
            </button>
          </form>

          {/* Already have account */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Register;
