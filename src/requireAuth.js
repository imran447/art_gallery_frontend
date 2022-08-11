import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authChecker } from "./shared/authChecker";

const RequireAuth = ({ protectedPath, children }) => {
  const location = useLocation();
  const isAuthenticated = authChecker();
  let url = `/?redirectUrl=${location?.pathname}`;

  return (
    <div>
      {protectedPath ? (
        <>{isAuthenticated ? children : <Navigate replace to={url} />}</>
      ) : (
        children
      )}
    </div>
  );
};

export default RequireAuth;
