import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard" className="px-4 py-2 rounded hover:bg-gray-200">Dashboard</Link>
          <Link to="/about" className="px-4 py-2 rounded hover:bg-gray-200">About</Link>
          <Link to="/skills" className="px-4 py-2 rounded hover:bg-gray-200">Skills</Link>
          <Link to="/projects" className="px-4 py-2 rounded hover:bg-gray-200">Projects</Link>
          <Link to="/blogs" className="px-4 py-2 rounded hover:bg-gray-200">Blogs</Link>
          <Link to="/testimonials" className="px-4 py-2 rounded hover:bg-gray-200">Testimonials</Link>
          <Link to="/experience" className="px-4 py-2 rounded hover:bg-gray-200">Experience</Link>
          <Link to="/services" className="px-4 py-2 rounded hover:bg-gray-200">Services</Link>
          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard!</h1>
        <p className="text-gray-700">
          Use the sidebar to navigate through different sections of your portfolio CMS.
        </p>
      </main>
    </div>
  );
}

