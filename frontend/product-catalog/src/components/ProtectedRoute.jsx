import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, adminOnly = false }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   if (adminOnly && role !== "ROLE_ADMIN") {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default ProtectedRoute;
