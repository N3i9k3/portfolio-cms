import React, { useState, useEffect } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    const res = await api.get("/testimonials");
    setItems(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addItem = async () => {
    if (!name || !message) return;
    await api.post("/testimonials", { name, message });
    setName("");
    setMessage("");
    fetchData();
  };

  const deleteItem = async (id) => {
    await api.delete(`/testimonials/${id}`);
    fetchData();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Testimonials</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Client name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={addItem} className="bg-black text-white px-4 py-2">
        Add Testimonial
      </button>

      <ul className="mt-6">
        {items.map((t) => (
          <li key={t.id} className="mb-4 border-b pb-2">
            <strong>{t.name}</strong>
            <p>{t.message}</p>
            <button
              onClick={() => deleteItem(t.id)}
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
