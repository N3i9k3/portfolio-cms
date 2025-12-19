import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");

  const fetchSkills = async () => {
    const res = await api.get("/skills");
    setSkills(res.data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const addSkill = async () => {
    if (!name) return;
    await api.post("/skills", { name });
    setName("");
    fetchSkills();
  };

  const deleteSkill = async (id) => {
    await api.delete(`/skills/${id}`);
    fetchSkills();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Skills</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="Skill name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button
          onClick={addSkill}
          className="bg-black text-white px-4"
        >
          Add
        </button>
      </div>

      <ul>
        {skills.map(skill => (
          <li
            key={skill.id}
            className="flex justify-between items-center mb-2 border-b pb-1"
          >
            {skill.name}
            <button
              onClick={() => deleteSkill(skill.id)}
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
