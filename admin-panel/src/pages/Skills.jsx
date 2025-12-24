import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(false);

  /* -------------------- FETCH SKILLS -------------------- */
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get("/skills");

        // Ensure consistent object structure
        setSkills(res.data.skills || []);
      } catch (err) {
        console.error("Failed to fetch skills", err);
      }
    };

    fetchSkills();
  }, []);

  /* -------------------- ADD SKILL (FRONTEND ONLY) -------------------- */
  const addSkill = () => {
    if (!newSkill.trim()) return;

    setSkills([
      ...skills,
      {
        id: Date.now(), // ✅ temporary unique key
        name: newSkill.trim(),
      },
    ]);

    setNewSkill("");
  };

  /* -------------------- REMOVE SKILL -------------------- */
  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  /* -------------------- SAVE SKILLS -------------------- */
  const saveSkills = async () => {
    try {
      setLoading(true);

      // Send only skill names to backend
      const skillNames = skills.map((skill) => skill.name);

      await api.put("/skills", { skills: skillNames });

      alert("Skills updated successfully ✅");
    } catch (err) {
      console.error("Failed to save skills", err);
      alert("Failed to update skills ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Skills Section</h1>

      {/* Add Skill */}
      <div className="flex gap-2 mb-4">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Enter skill"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={addSkill}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Skills List */}
      <div className="flex flex-wrap gap-2 mb-6">
        {skills.map((skill, index) => (
          <span
            key={skill.id || index} // ✅ stable key
            className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2"
          >
            {skill.name}
            <button
              onClick={() => removeSkill(index)}
              className="text-red-600 font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Save */}
      <button
        onClick={saveSkills}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Skills"}
      </button>
    </Layout>
  );
}

