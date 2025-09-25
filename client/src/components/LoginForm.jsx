import React, { useState } from "react";
import { User, Lock, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-green-50 via-yellow-50 to-white px-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl mt-15 shadow-xl p-8 transform transition-all duration-500 ">
        <h2 className="text-3xl font-extrabold text-green-700 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-600 text-center mb-8 text-sm">
          Login to manage your farm
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <p className="text-red-500 text-center">{error}</p>}

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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl text-white font-semibold bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer Links */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
