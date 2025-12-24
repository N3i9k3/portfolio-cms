import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded ${
      isActive ? "bg-black text-white" : "hover:bg-gray-200"
    }`;

  return (
    <aside className="w-64 bg-white shadow-md p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <nav className="flex flex-col space-y-2">
        <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/about" className={linkClass}>About</NavLink>
        <NavLink to="/skills" className={linkClass}>Skills</NavLink>
        <NavLink to="/projects" className={linkClass}>Projects</NavLink>
        <NavLink to="/blogs" className={linkClass}>Blogs</NavLink>
        <NavLink to="/testimonials" className={linkClass}>Testimonials</NavLink>
        <NavLink to="/experience" className={linkClass}>Experience</NavLink>
        <NavLink to="/services" className={linkClass}>Services</NavLink>

        <button
          onClick={handleLogout}
          className="mt-6 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
