import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Services() {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services");
        setServices(res.data || []);
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
    };

    fetchServices();
  }, []);

  // Add service
  const addService = async () => {
    if (!title.trim() || !description.trim()) {
      return alert("Title and description are required");
    }

    try {
      setLoading(true);
      const res = await api.post("/services", { title, description });
      setServices([res.data, ...services]);
      setTitle("");
      setDescription("");
    } catch (err) {
      alert("Failed to add service ❌");
    } finally {
      setLoading(false);
    }
  };

  // Delete service
  const deleteService = async (id) => {
    if (!confirm("Delete this service?")) return;

    try {
      await api.delete(`/services/${id}`);
      setServices(services.filter((s) => s.id !== id));
    } catch (err) {
      alert("Failed to delete service ❌");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Services</h1>

      {/* Add Service */}
      <div className="bg-white p-4 rounded shadow mb-6 space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Service title"
          className="border p-2 w-full rounded"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Service description"
          className="border p-2 w-full rounded h-28"
        />

        <button
          onClick={addService}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Saving..." : "Add Service"}
        </button>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>

            <button
              onClick={() => deleteService(service.id)}
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


