import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // check if user is logged in
  return token ? children : <Navigate to="/login" />; // redirect if not
};

export default ProtectedRoute;
