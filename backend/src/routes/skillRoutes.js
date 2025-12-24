import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch skills
  const fetchSkills = async () => {
    const res = await api.get("/skills");
    setSkills(res.data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Add skill
  const addSkill = async () => {
    if (!newSkill.trim()) return;

    try {
      setLoading(true);
      await api.post("/skills", { name: newSkill.trim() });
      setNewSkill("");
      fetchSkills();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add skill");
    } finally {
      setLoading(false);
    }
  };

  // Delete skill
  const deleteSkill = async (id) => {
    if (!confirm("Delete this skill?")) return;

    await api.delete(`/skills/${id}`);
    fetchSkills();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Skills Section</h1>

      {/* Add Skill */}
      <div className="flex gap-2 mb-6">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Enter skill"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={addSkill}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-60"
        >
          Add
        </button>
      </div>

      {/* Skills List */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill.id}
            className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2"
          >
            {skill.name}
            <button
              onClick={() => deleteSkill(skill.id)}
              className="text-red-600 font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </Layout>
  );
}
