import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data || []);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };

    fetchProjects();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add project
  const addProject = async () => {
    if (!form.title.trim()) return alert("Title is required");

    try {
      setLoading(true);
      const res = await api.post("/projects", form);
      setProjects([res.data, ...projects]);
      setForm({ title: "", description: "", link: "", image: "" });
    } catch (err) {
      alert("Failed to add project ❌");
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    if (!confirm("Delete this project?")) return;

    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to delete project ❌");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Projects</h1>

      {/* Add Project Form */}
      <div className="bg-white p-4 rounded shadow mb-6 space-y-3">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Project title"
          className="border p-2 w-full rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Project description"
          className="border p-2 w-full rounded"
        />

        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Project link"
          className="border p-2 w-full rounded"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 w-full rounded"
        />

        <button
          onClick={addProject}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Project"}
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  className="text-blue-600 text-sm"
                >
                  {project.link}
                </a>
              )}
            </div>

            <button
              onClick={() => deleteProject(project.id)}
              className="text-red-600 font-bold"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
