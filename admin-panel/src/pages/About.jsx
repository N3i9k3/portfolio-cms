import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function About() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch about content
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get("/about");
        setContent(res.data?.content || "");
      } catch (err) {
        console.error("Failed to fetch about content", err);
      }
    };

    fetchAbout();
  }, []);

  // Save about content
  const saveAbout = async () => {
    try {
      setLoading(true);
      await api.put("/about", { content });
      alert("About updated successfully ✅");
    } catch (err) {
      console.error("Failed to save about content", err);
      alert("Failed to update About section ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">About Section</h1>

      <textarea
        className="w-full h-40 p-3 border rounded focus:outline-none focus:ring"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something about yourself..."
      />

      <button
        onClick={saveAbout}
        disabled={loading}
        className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </Layout>
  );
}

