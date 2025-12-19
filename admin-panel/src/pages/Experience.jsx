import React, { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Experience() {
  const [items, setItems] = useState([]);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");

  const fetchData = async () => {
    const res = await api.get("/experience");
    setItems(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addItem = async () => {
    if (!role || !company) return;
    await api.post("/experience", { role, company });
    setRole("");
    setCompany("");
    fetchData();
  };

  const deleteItem = async (id) => {
    await api.delete(`/experience/${id}`);
    fetchData();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Experience</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <button onClick={addItem} className="bg-black text-white px-4 py-2">
        Add Experience
      </button>

      <ul className="mt-6">
        {items.map((exp) => (
          <li key={exp.id} className="mb-4 border-b pb-2">
            {exp.role} @ {exp.company}
            <button
              onClick={() => deleteItem(exp.id)}
              className="text-red-600 ml-4"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
