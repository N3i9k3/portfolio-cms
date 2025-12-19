import React, { useState, useEffect } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Services() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch all services
  const fetchData = async () => {
    try {
      const res = await api.get("/services");
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add a new service
  const addItem = async () => {
    try {
      await api.post("/services", { title });
      setTitle("");
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a service
  const deleteItem = async (id) => {
    try {
      await api.delete(`/services/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Services</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Service title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={addItem}
        className="bg-black text-white px-4 py-2 mb-4"
      >
        Add Service
      </button>

      <ul>
        {items.map((s) => (
          <li key={s._id} className="mb-2">
            {s.title}
            <button
              onClick={() => deleteItem(s._id)}
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
