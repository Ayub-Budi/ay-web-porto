"use client";
import { useState } from "react";
import TextTitle from "@/components/landing/text/title";

export default function Experience() {
  const [isActive, setActive] = useState(0);

  const experiences = [
    {
      title: "Frontend Developer",
      company: "PT. Jenjang Talenta Indonesia",
      date: "nov 2024 - present",
      desc: [
        "Develop dynamic web applications and responsive mobile web views using Vue.js and Tailwind CSS, ensuring high scalability and maintainability.",
        "Transform UI/UX designs into pixel-perfect user interfaces that are optimized for both desktop and mobile experiences.",
        "Collaborate with the Backend team to seamlessly integrate APIs and optimize data flow for superior application performance.",
        "Conduct comprehensive debugging and testing routines to maintain system stability and ensure bug-free deployments.",
      ],
    },
    {
      title: "Frontend Developer",
      company: "Gmedia (Pt. Media Sarana Data)",
      date: "Sep 2024 - present",
      desc: [
        "Responsible for developing and maintaining high-quality user interfaces using modern tech stacks.",
        "Work closely with the Backend team to facilitate API integration and guarantee optimal performance.",
        "leverage modern frameworks like Vue.js to create dynamic, scalable, and reusable architecture",
        "Conduct comprehensive debugging and testing routines to ensure system stability before deployment.",
      ],
    },
    {
      title: "IT Application Officer - Software Developer",
      company: "Trans Retail Indonesia (Magang)",
      date: "Feb 2024 - Jun 2024",
      desc: [
        "Successfully implemented professional projects, demonstrating strong problem-solving and time management skills.",
        "Developed an inventory application specifically for tracking and managing expired goods.",
        "Resolved bugs and improved stability for the Vendor Management System (VMS) frontend using Vue.js.",
        "Assisted in backend development for applications and QRIS payment integration.",
      ],
    },
    {
      title: "Asisten dosen untuk mengawal projek Rekayasa digital",
      company: "SMA N 2 Bantul ",
      date: "16 - 27 Okt 2023",
      desc: [
        "Assisted a university lecturer in delivering a Digital Engineering curriculum at SMKN 2 Bantul (Vocational High School).",
        "Mentored three classes of vocational students on IoT and Embedded Systems, focusing on C/C++ programming for Arduino and ESP32 microcontrollers.",
        "Guided the students through the entire project lifecycle, ensuring the successful development of functional prototypes.",
        "Curated and managed the final project exhibition, allowing the students to showcase their innovations to a wider audience.",
      ],
    },
  ];

  const next = () => {
    if (isActive < experiences.length - 1) {
      setActive(isActive + 1);
    } else {
      setActive(0);
    }
  };

  const prev = () => {
    if (isActive > 0) {
      setActive(isActive - 1);
    } else {
      setActive(experiences.length - 1);
    }
  };

  return (
    <div className="flex flex-col py-8 md:py-30 gap-6">
      <TextTitle
        title="Experience"
        description="My experience in web development and other related fields"
      />

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center text-blue-500">
          <p className="text-[8px] sm:text-base">
            {experiences[isActive].date}
          </p>
          <i className="ri-map-pin-line text-[8px] sm:text-base"></i>
        </div>

        <div className="flex">
          <div className="flex flex-col gap-2 flex-end items-stretch justify-end px-2 leading-0">
            <p className="text-[8px] sm:text-base">2023</p>
          </div>

          <div className="w-60 h-30 sm:h-48 sm:w-96 flex items-center justify-center overflow-hidden relative">
            <div className="w-60 h-60 sm:w-96 sm:h-96 rounded-full border-2 border-dashed absolute top-0 right-0"></div>

            <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 flex flex-col gap-1 sm:gap-4 items-center justify-center w-full max-w-[80%]">
              <p className="text-xs sm:text-xl font-bold text-center">
                {experiences[isActive].title}
              </p>

              <div className="flex items-center w-[80%] justify-between gap-2">
                <button type="button" onClick={prev}>
                  <i className="ri-arrow-left-s-line"></i>
                </button>

                <div className="text-center text-[10px] sm:text-xs">
                  <h6>{experiences[isActive].company}</h6>
                </div>

                <button type="button" onClick={next}>
                  <i className="ri-arrow-right-s-line"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-end items-stretch justify-end px-2 leading-0">
            <p className="text-[8px] sm:text-base">Present</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-lg sm:text-2xl font-bold">
          {experiences[isActive].company}
        </h1>
        <h3 className="text-sm sm:text-lg font-bold">Description</h3>
        {experiences[isActive].desc.map((desc, index) => (
          <div key={index} className="flex gap-2 items-center">
            <span className="w-2 h-2 rounded-full bg-white" />
            <div className="flex-1">
              <p className="text-xs sm:text-base ">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
