"use client";
import { useState } from "react";
import TextTitle from "./text/title";

export default function Skill() {
  const [isActive, setActive] = useState("web-development");
  const skills = [
    {
      name: "Web Development",
      slug: "web-development",
      description:
        "Building web applications using HTML, CSS, php(laravel) and JavaScript.",
    },
    {
      name: "Internet of Things (IoT)",
      slug: "iot",
      description:
        "Designing and developing systems that connect physical devices to the internet.",
    },
    {
      name: "Frontend Development",
      slug: "frontend",
      description:
        "Creating user interfaces and user experiences for web applications using HTML, CSS(Tailwind, Bootstrap), and JavaScript (Vue.js, React.js, Next.js).",
    },
    {
      name: "Maintenance and Support",
      slug: "maintenance",
      description:
        "Providing ongoing maintenance and support to existing web applications, ensuring they remain up-to-date and functional.",
    },
  ];
  return (
    <div className="flex flex-col  py-8 gap-6 md:py-30">
      <TextTitle
        title="What I Can Do For You"
        description="I can help you with the following:"
      />

      <hr />
      <div className="flex flex-col gap-4">
        {skills.map((skill) => (
          <div
            className={`group rounded-xl cursor-pointer transition duration-300 ${
              isActive === skill.slug ? "bg-white/30" : ""
            }`}
            key={skill.slug}
            onClick={() => setActive(skill.slug)}
          >
            <div className="p-3 bg-white/30 rounded-xl border flex items-center justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-bold">{skill.name}</h2>
              <i className="ri-arrow-right-s-line text-lg sm:text-2xl"></i>
            </div>

            <div
              className={`p-3 text-xs sm:text-base transition duration-300 ${
                isActive === skill.slug
                  ? "block opacity-100"
                  : "hidden opacity-0"
              }`}
            >
              <p className="">{skill.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
