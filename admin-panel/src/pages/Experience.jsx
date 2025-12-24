import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({
    company: "",
    role: "",
    duration: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch experiences
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await api.get("/experience");
        setExperiences(res.data || []);
      } catch (err) {
        console.error("Failed to fetch experience", err);
      }
    };

    fetchExperiences();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add experience
  const addExperience = async () => {
    const { company, role, duration, description } = form;

    if (!company || !role || !duration) {
      return alert("Company, role and duration are required");
    }

    try {
      setLoading(true);
      const res = await api.post("/experience", form);
      setExperiences([res.data, ...experiences]);
      setForm({ company: "", role: "", duration: "", description: "" });
    } catch (err) {
      alert("Failed to add experience ❌");
    } finally {
      setLoading(false);
    }
  };

  // Delete experience
  const deleteExperience = async (id) => {
    if (!confirm("Delete this experience?")) return;

    try {
      await api.delete(`/experience/${id}`);
      setExperiences(experiences.filter((e) => e.id !== id));
    } catch (err) {
      alert("Failed to delete experience ❌");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Experience</h1>

      {/* Add Experience */}
      <div className="bg-white p-4 rounded shadow mb-6 space-y-3">
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company name"
          className="border p-2 w-full rounded"
        />

        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role / Position"
          className="border p-2 w-full rounded"
        />

        <input
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration (e.g. Jan 2024 - Present)"
          className="border p-2 w-full rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description (optional)"
          className="border p-2 w-full rounded h-28"
        />

        <button
          onClick={addExperience}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Saving..." : "Add Experience"}
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg">
                {exp.role} — {exp.company}
              </h3>
              <p className="text-sm text-gray-500">{exp.duration}</p>
              {exp.description && (
                <p className="text-gray-700 mt-1">{exp.description}</p>
              )}
            </div>

            <button
              onClick={() => deleteExperience(exp.id)}
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

