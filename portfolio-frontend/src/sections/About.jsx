"use client";
import { useEffect, useState } from "react";
import api from "../lib/api";

export default function About() {
  const [about, setAbout] = useState("");

  useEffect(() => {
    api.get("/about").then(res => setAbout(res.data.content));
  }, []);

  return (
    <section id="about" className="py-16 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <p className="text-gray-600">{about}</p>
    </section>
  );
}
