import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";   
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";
import FarmList from "./pages/Farms/FarmList";
import FarmDetails from "./pages/Farms/FarmDetails";
import LandingPage from "./pages/LandingPage";
import GroupLogs from "./pages/Logs/GroupLogs.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AlertProvider>
        {/* ToastContainer at the root level */}
        <ToastContainer position="top-center" autoClose={3000} />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farms"
            element={
              <ProtectedRoute>
                <FarmList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farms/:id"
            element={
              <ProtectedRoute>
                <FarmDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/logs/:animalType/:groupId"
            element={
              <ProtectedRoute>
                <GroupLogs />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AlertProvider>
    </Router>
  );
}

export default App;
