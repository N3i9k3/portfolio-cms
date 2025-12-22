"use client";
import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    api.get("/skills").then(res => setSkills(res.data));
  }, []);

  return (
    <section id="skills" className="py-16 bg-gray-100">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map(skill => (
            <div key={skill.id} className="border p-4 text-center bg-white">
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
