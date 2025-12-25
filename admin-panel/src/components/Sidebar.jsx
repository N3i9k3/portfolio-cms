import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "16px",
        boxSizing: "border-box"
      }}
    >
      <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
        Admin Panel
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/about">About</Link>
        <Link to="/skills">Skills</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/testimonials">Testimonials</Link>
        <Link to="/experience">Experience</Link>
        <Link to="/services">Services</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  );
}
