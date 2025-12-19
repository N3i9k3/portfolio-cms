import React, { useEffect, useState } from "react";

import api from "../services/api";
import Layout from "../components/Layout";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogs = async () => {
    const res = await api.get("/blogs");
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const addBlog = async () => {
    if (!title || !content) return;
    await api.post("/blogs", { title, content });
    setTitle("");
    setContent("");
    fetchBlogs();
  };

  const deleteBlog = async (id) => {
    await api.delete(`/blogs/${id}`);
    fetchBlogs();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Blog title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Blog content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={addBlog} className="bg-black text-white px-4 py-2">
        Add Blog
      </button>

      <ul className="mt-6">
        {blogs.map((b) => (
          <li key={b.id} className="mb-4 border-b pb-2">
            <h3 className="font-bold">{b.title}</h3>
            <p>{b.content}</p>
            <button
              onClick={() => deleteBlog(b.id)}
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
