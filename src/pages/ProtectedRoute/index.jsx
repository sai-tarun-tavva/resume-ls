import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute Component
 *
 * Checks if a user is authenticated.
 * If the user is not authenticated, they are redirected to the login page.
 *
 * @param {Object} props - The component props.
 * @param {React.Component} props.element - The component to render if authenticated.
 * @returns {React.Component} The protected route element or redirect.
 */
const ProtectedRoute = ({ element }) => {
  const accessToken = sessionStorage.getItem("accessToken");

  // Check if accessToken exists in sessionStorage
  if (!accessToken) {
    // If no accessToken, redirect to login page
    sessionStorage.clear();
    localStorage.clear();
    return <Navigate to={`/`} replace />;
  }

  // If authenticated, render the protected component
  return element;
};

ProtectedRoute.displayName = "ProtectedRoute";
export default ProtectedRoute;
