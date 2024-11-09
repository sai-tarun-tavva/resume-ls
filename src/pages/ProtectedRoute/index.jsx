import React from "react";
import ProtectedWrapper from "../ProtectedWrapper";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute Component
 *
 * This component verifies if a user is authenticated by checking for an access token in session storage.
 * If the access token is absent, it redirects the user to the login page, ensuring secure access
 * to protected routes.
 *
 * @param {Object} props - The component props.
 * @param {React.Component} props.element - The component to render if the user is authenticated.
 * @returns {JSX.Element} - Either the protected content wrapped in `ProtectedWrapper` or a redirection to the login page.
 */
const ProtectedRoute = ({ element }) => {
  const accessToken = sessionStorage.getItem("accessToken");

  // Redirect to login if accessToken does not exist
  if (!accessToken) {
    sessionStorage.clear();
    localStorage.clear();
    return <Navigate to="/" replace />;
  }

  // Render the protected component if authenticated
  return <ProtectedWrapper>{element}</ProtectedWrapper>;
};

ProtectedRoute.displayName = "ProtectedRoute";
export default ProtectedRoute;
