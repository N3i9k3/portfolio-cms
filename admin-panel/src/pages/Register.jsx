import React, { useState } from "react";
import api from "../services/api"; // axios instance with baseURL
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await api.post("/auth/register", { email, password });
      // Save token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard"); // redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <button
        onClick={handleRegister}
        className="bg-black text-white px-4 py-2 w-full"
      >
        Register
      </button>
    </div>
  );
}
