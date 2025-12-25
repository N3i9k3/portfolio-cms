import React, { useState, useEffect } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Fetch testimonials
 const fetchData = async () => {
  try {
    const res = await api.get("/testimonials");
    // Make sure to use the correct key
    setItems(Array.isArray(res.data) ? res.data : res.data.testimonials || []);
  } catch (err) {
    console.error("Failed to fetch testimonials:", err);
    setItems([]); // fallback
  }
};


  useEffect(() => {
    fetchData();
  }, []);

  // Add testimonial
  const addItem = async () => {
    if (!name.trim() || !message.trim()) return alert("Name & message required");

    try {
      await api.post("/testimonials", { name, message });
      setName("");
      setMessage("");
      fetchData();
    } catch (err) {
      console.error("Failed to add testimonial:", err);
      alert("Failed to add testimonial ❌");
    }
  };

  // Delete testimonial
  const deleteItem = async (_id) => {
    if (!confirm("Delete this testimonial?")) return;

    try {
      await api.delete(`/testimonials/${_id}`);
      setItems(items.filter((t) => t._id !== _id));
    } catch (err) {
      console.error("Failed to delete testimonial:", err);
      alert("Failed to delete testimonial ❌");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Testimonials</h1>

      {/* Add Testimonial */}
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

      {/* Testimonial List */}
      <ul className="mt-6 space-y-4">
        {items.length === 0 && <p className="text-gray-500">No testimonials yet 📝</p>}

        {items.map((t) => (
          <li key={t._id} className="border-b pb-2">
            <strong>{t.name}</strong>
            <p>{t.message}</p>
            <button
              onClick={() => deleteItem(t._id)}
              className="text-red-600 font-bold"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
