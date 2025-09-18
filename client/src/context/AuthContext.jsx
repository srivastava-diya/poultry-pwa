import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (!savedUser || savedUser === "undefined") return null;
      return JSON.parse(savedUser);
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      return null;
    }
  });

  const login = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.error("Error saving user to localStorage:", err);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Error removing user from localStorage:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
