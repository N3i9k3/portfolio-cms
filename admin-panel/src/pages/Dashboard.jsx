import React from "react";
import { useNavigate } from "react-router-dom";  // <-- add this import

export default function Dashboard() {
  const navigate = useNavigate();  // <-- add this line

  // Logout function
  const handleLogout = () => {
    localStorage.clear(); // removes token and user
    navigate("/login");    // redirect to login page
  };

  return (
    <div>
      <h1>Dashboard works!</h1>

      <button
        onClick={handleLogout}   // <-- add this button
        className="bg-red-600 text-white px-4 py-2 mt-4"
      >
        Logout
      </button>
    </div>
  );
}
