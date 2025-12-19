import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-4">
        <h2 className="text-xl font-bold mb-6">CMS</h2>
        <nav className="space-y-2">
          <Link to="/dashboard">Dashboard</Link><br />
          <Link to="/about">About</Link><br />
          <Link to="/skills">Skills</Link><br />
          <Link to="/projects">Projects</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
