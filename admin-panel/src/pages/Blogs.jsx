import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        setBlogs(res.data || []);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    };

    fetchBlogs();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add blog
  const addBlog = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      return alert("Title and content are required");
    }

    try {
      setLoading(true);
      const res = await api.post("/blogs", form);
      setBlogs([res.data, ...blogs]);
      setForm({ title: "", content: "" });
    } catch (err) {
      alert("Failed to add blog ❌");
    } finally {
      setLoading(false);
    }
  };

  // Delete blog
  const deleteBlog = async (id) => {
    if (!confirm("Delete this blog?")) return;

    try {
      await api.delete(`/blogs/${id}`);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (err) {
      alert("Failed to delete blog ❌");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Blogs</h1>

      {/* Add Blog */}
      <div className="bg-white p-4 rounded shadow mb-6 space-y-3">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Blog title"
          className="border p-2 w-full rounded"
        />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Blog content"
          className="border p-2 w-full rounded h-32"
        />

        <button
          onClick={addBlog}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg">{blog.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {blog.content}
              </p>
            </div>

            <button
              onClick={() => deleteBlog(blog.id)}
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
