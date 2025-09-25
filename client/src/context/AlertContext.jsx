// src/context/AlertContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { alertService } from "../services/alertService.js"; 

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch alerts on mount
  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const data = await alertService.getAlerts(); 
      setAlerts(data);
    } catch (err) {
      setError(err.message || "Failed to fetch alerts");
    } finally {
      setLoading(false);
    }
  };

  const addAlert = async (alertData) => {
    try {
      const newAlert = await alertService.createAlert(alertData);
      setAlerts((prev) => [newAlert, ...prev]);
    } catch (err) {
      setError(err.message || "Failed to add alert");
    }
  };

  const markAsRead = async (id) => {
    try {
      const updatedAlert = await alertService.markAsRead(id);
      setAlerts((prev) =>
        prev.map((alert) => (alert._id === id ? updatedAlert : alert))
      );
    } catch (err) {
      setError(err.message || "Failed to update alert");
    }
  };

  const deleteAlert = async (id) => {
    try {
      await alertService.deleteAlert(id);
      setAlerts((prev) => prev.filter((alert) => alert._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete alert");
    }
  };

  return (
    <AlertContext.Provider
      value={{
        alerts,
        loading,
        error,
        fetchAlerts,
        addAlert,
        markAsRead,
        deleteAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
