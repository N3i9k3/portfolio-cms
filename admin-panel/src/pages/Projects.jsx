import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject = async () => {
    if (!title || !description) return;
    await api.post("/projects", { title, description });
    setTitle("");
    setDescription("");
    fetchProjects();
  };

  const deleteProject = async (id) => {
    await api.delete(`/projects/${id}`);
    fetchProjects();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Project title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <button onClick={addProject} className="bg-black text-white px-4 py-2">
        Add Project
      </button>

      <ul className="mt-6">
        {projects.map(p => (
          <li key={p.id} className="mb-4 border-b pb-2">
            <h3 className="font-bold">{p.title}</h3>
            <p>{p.description}</p>
            <button
              onClick={() => deleteProject(p.id)}
              className="text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
