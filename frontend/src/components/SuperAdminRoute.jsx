import { Navigate } from "react-router-dom";

import { getUserRole } from "../utils/authUtils";

const SuperAdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  const role = getUserRole();

  /*
      NOT LOGGED IN
  */

  if (!token) {
    return <Navigate to="/login" />;
  }

  /*
      ONLY SUPER ADMIN
  */

  if (role !== "ROLE_SUPER_ADMIN") {
    return <Navigate to="/" />;
  }

  return children;
};

export default SuperAdminRoute;
