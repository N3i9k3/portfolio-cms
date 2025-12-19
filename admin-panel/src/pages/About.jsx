import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function About() {
  const [content, setContent] = useState("");

  useEffect(() => {
    api.get("/about").then(res => {
      setContent(res.data?.content || "");
    });
  }, []);

  const saveAbout = async () => {
    await api.put("/about", { content });
    alert("About updated");
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">About Section</h1>

      <textarea
        className="w-full h-40 p-2 border"
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button
        onClick={saveAbout}
        className="mt-4 bg-black text-white px-4 py-2"
      >
        Save
      </button>
    </Layout>
  );
}
