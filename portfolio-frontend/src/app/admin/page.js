"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminPage() {
  // ---------------- ABOUT ----------------
  const [about, setAbout] = useState("");

  // ---------------- SKILLS ----------------
  const [skillName, setSkillName] = useState("");
  const [skills, setSkills] = useState([]);

  // ---------------- PROJECTS ----------------
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projects, setProjects] = useState([]);

  // ---------------- BLOGS ----------------
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogs, setBlogs] = useState([]);

  // ---------------- TESTIMONIALS ----------------
  const [testimonialName, setTestimonialName] = useState("");
  const [testimonialMessage, setTestimonialMessage] = useState("");
  const [testimonials, setTestimonials] = useState([]);

  // ---------------- EXPERIENCE ----------------
  const [expRole, setExpRole] = useState("");
  const [expCompany, setExpCompany] = useState("");
  const [experiences, setExperiences] = useState([]);

  // ---------------- FETCH ALL DATA ----------------
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [
        aboutRes,
        skillsRes,
        projectsRes,
        blogsRes,
        testimonialsRes,
        experienceRes,
      ] = await Promise.all([
        api.get("/about"),
        api.get("/skills"),
        api.get("/projects"),
        api.get("/blogs"),
        api.get("/testimonials"),
        api.get("/experience"),
      ]);

      setAbout(aboutRes.data?.content || "");
      setSkills(skillsRes.data || []);
      setProjects(projectsRes.data || []);
      setBlogs(blogsRes.data || []);
      setTestimonials(testimonialsRes.data || []);
      setExperiences(experienceRes.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // ---------------- HANDLERS ----------------
  const saveAbout = async () => {
    if (!about.trim()) return alert("About is empty");
    await api.post("/about", { content: about });
    alert("About saved!");
    fetchAll();
  };

  const addSkill = async () => {
    if (!skillName.trim()) return alert("Skill empty");
    await api.post("/skills", { name: skillName });
    setSkillName("");
    fetchAll();
  };

  const addProject = async () => {
    if (!projectTitle || !projectDescription)
      return alert("Fill all project fields");
    await api.post("/projects", { title: projectTitle, description: projectDescription });
    setProjectTitle("");
    setProjectDescription("");
    fetchAll();
  };

  const addBlog = async () => {
    if (!blogTitle || !blogContent) return alert("Fill all blog fields");
    await api.post("/blogs", { title: blogTitle, content: blogContent });
    setBlogTitle("");
    setBlogContent("");
    fetchAll();
  };

  const addTestimonial = async () => {
    if (!testimonialName || !testimonialMessage) return alert("Fill all testimonial fields");
    await api.post("/testimonials", { name: testimonialName, message: testimonialMessage });
    setTestimonialName("");
    setTestimonialMessage("");
    fetchAll();
  };

  const addExperience = async () => {
    if (!expRole || !expCompany) return alert("Fill all experience fields");
    await api.post("/experience", { role: expRole, company: expCompany });
    setExpRole("");
    setExpCompany("");
    fetchAll();
  };

  // ---------------- UI ----------------
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Panel</h1>

      {/* ABOUT */}
      <Section title="About">
        <textarea
          className="w-full border rounded p-3 resize-none"
          rows={4}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <button onClick={saveAbout} className="btn-blue">Save About</button>
      </Section>

      {/* SKILLS */}
      <Section title="Skills">
        <input
          className="input"
          placeholder="Skill name"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
        />
        <button onClick={addSkill} className="btn-green">Add Skill</button>
        <List items={skills.map((s) => s.name)} />
      </Section>

      {/* PROJECTS */}
      <Section title="Projects">
        <input
          className="input"
          placeholder="Title"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
        />
        <textarea
          className="input"
          placeholder="Description"
          rows={3}
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
        <button onClick={addProject} className="btn-purple">Add Project</button>
        <List items={projects.map((p) => p.title)} />
      </Section>

      {/* BLOGS */}
      <Section title="Blogs">
        <input
          className="input"
          placeholder="Title"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
        />
        <textarea
          className="input"
          placeholder="Content"
          rows={3}
          value={blogContent}
          onChange={(e) => setBlogContent(e.target.value)}
        />
        <button onClick={addBlog} className="btn-blue">Add Blog</button>
        <List items={blogs.map((b) => b.title)} />
      </Section>

      {/* TESTIMONIALS */}
      <Section title="Testimonials">
        <input
          className="input"
          placeholder="Name"
          value={testimonialName}
          onChange={(e) => setTestimonialName(e.target.value)}
        />
        <textarea
          className="input"
          placeholder="Message"
          rows={3}
          value={testimonialMessage}
          onChange={(e) => setTestimonialMessage(e.target.value)}
        />
        <button onClick={addTestimonial} className="btn-green">Add Testimonial</button>
        <List items={testimonials.map((t) => t.name)} />
      </Section>

      {/* EXPERIENCE */}
      <Section title="Experience">
        <input
          className="input"
          placeholder="Role"
          value={expRole}
          onChange={(e) => setExpRole(e.target.value)}
        />
        <input
          className="input"
          placeholder="Company"
          value={expCompany}
          onChange={(e) => setExpCompany(e.target.value)}
        />
        <button onClick={addExperience} className="btn-purple">Add Experience</button>
        <List items={experiences.map((e) => `${e.role} @ ${e.company}`)} />
      </Section>
    </div>
  );
}

/* ---------------- SMALL HELPERS ---------------- */
const Section = ({ title, children }) => (
  <section className="border rounded-lg p-6 space-y-3 shadow-sm bg-white">
    <h2 className="text-2xl font-semibold">{title}</h2>
    {children}
  </section>
);

const List = ({ items }) =>
  items.length ? (
    <ul className="list-disc pl-5 mt-2 text-gray-700">
      {items.map((i, idx) => (
        <li key={idx}>{i}</li>
      ))}
    </ul>
  ) : null;

/* ---------------- TAILWIND CLASSES ---------------- */
const buttonBase = "px-4 py-2 rounded text-white font-semibold transition hover:opacity-90";

export const btnBlue = `${buttonBase} bg-blue-600 hover:bg-blue-700`;
export const btnGreen = `${buttonBase} bg-green-600 hover:bg-green-700`;
export const btnPurple = `${buttonBase} bg-purple-600 hover:bg-purple-700`;

export const input = "w-full border rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400";



 
