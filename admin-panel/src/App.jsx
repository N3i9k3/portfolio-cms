import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Blogs from "./pages/Blogs";
import Testimonials from "./pages/Testimonials";
import Experience from "./pages/Experience";
import Services from "./pages/Services";
import Register from "./pages/Register";

import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>


        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/skills" element={<ProtectedRoute><Skills /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
        <Route path="/testimonials" element={<ProtectedRoute><Testimonials /></ProtectedRoute>} />
        <Route path="/experience" element={<ProtectedRoute><Experience /></ProtectedRoute>} />
        <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
        <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

