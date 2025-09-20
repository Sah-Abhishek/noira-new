// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import LoaderPage from "../pages/LoaderPage";

const UserProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const token = localStorage.getItem("userjwt");
  const email = localStorage.getItem("userEmail");
  const location = useLocation();

  // useEffect(() => {
  //   const verifyToken = async () => {
  //     if (!token || !email) {
  //       setIsValid(false);
  //       return;
  //     }
  //
  //     const apiUrl = import.meta.env.VITE_API_URL;
  //
  //     try {
  //       await axios.get(`${apiUrl}/auth/verifytoken`, {
  //         headers: {
  //           authorization: `Bearer ${token}`,
  //           "x-user-email": email, // Send email in custom header
  //         },
  //       });
  //       setIsValid(true);
  //     } catch (error) {
  //       console.error("Token verification failed:", error);
  //       setIsValid(false);
  //     }
  //   };
  //
  //   verifyToken();
  // }, [token, email]);

  // if (isValid === null) return <div><LoaderPage /></div>;
  // if (!isValid) return <Navigate to="/userlogin" replace state={{ from: location }} />;

  return children;
};

export default UserProtectedRoute;
