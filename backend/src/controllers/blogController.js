const Blog = require("../models/Blog");

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Blog fetch error:", error);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    console.error("Blog create error:", error);
    res.status(500).json({ message: "Failed to create blog" });
  }
};
