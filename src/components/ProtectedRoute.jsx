// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      setIsValid(false);
      return;
    }

    axios.get("http://localhost:3000/auth/verify", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false));
  }, [token]);

  if (isValid === null) return <div>Loading...</div>;
  if (!isValid) return <Navigate to="/adminlogin" replace />;

  return children;
};

export default ProtectedRoute;
