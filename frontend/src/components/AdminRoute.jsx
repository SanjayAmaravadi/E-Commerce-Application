import { Navigate } from "react-router-dom";

import { getUserRole } from "../utils/authUtils";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  const role = getUserRole();

  /*
      NOT LOGGED IN
  */
  if (!token) {
    return <Navigate to="/login" />;
  }

  /*
      ALLOW ADMIN + SUPER ADMIN
  */

  if (role !== "ROLE_ADMIN" && role !== "ROLE_SUPER_ADMIN") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;

// import { Navigate } from "react-router-dom";

// const AdminRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   if (role !== "ROLE_ADMIN") {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default AdminRoute;
