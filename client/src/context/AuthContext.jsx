// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Persist user and token from localStorage
  useEffect(() => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  if (storedToken && storedUser && storedUser !== "undefined") {
    setToken(storedToken);
    setUser(JSON.parse(storedUser));
  }
}, []);

  // Login
  const login = async (email, password) => {
    try {
      // Clear any stale auth to avoid sending bad tokens during login flow
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);

      const data = await authService.login({ email, password });
      const token = data.token; // backend returns token
      setToken(token);
      localStorage.setItem("token", token);

      // Optionally fetch user profile
      const profile = await authService.getMe(token);
      setUser(profile);
      localStorage.setItem("user", JSON.stringify(profile));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Update user in local state/storage (e.g., after linking farmId)
  const updateUser = (partial) => {
    setUser((prev) => {
      const updated = { ...(prev || {}), ...(partial || {}) };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  // Register
  const register = async ({ name, email, password, role, farmId }) => {
    try {
      const data = await authService.register({ name, email, password, role, farmId });
      return data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
