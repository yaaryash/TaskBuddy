import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../components/firebase";

const ProtectedRoute = ({ children }) => {
  console.log("ProtectedRoute is rendering", auth);
  return auth.currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
