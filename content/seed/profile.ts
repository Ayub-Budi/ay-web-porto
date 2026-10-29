import type { Localized } from "@/domain/content/localized";

export const profileSeed = {
  name: "Ayub Budi Santoso",
  role: { en: "Frontend developer", id: "Frontend developer" },
  location: "Bantul, Yogyakarta",
  headline: {
    en: "Frontend developer in Yogyakarta, building websites that are fast, secure and easy to use.",
    id: "Frontend developer di Yogyakarta yang membangun website cepat, aman, dan mudah dipakai.",
  },
  summary: {
    en: "Vue.js, Next.js and Laravel day to day, with a background in IoT and embedded systems.",
    id: "Sehari-hari memakai Vue.js, Next.js, dan Laravel, dengan latar belakang IoT dan embedded system.",
  },
  bio: {
    en: "A Diploma 3 graduate with experience in IoT and a dedicated focus on web development. Currently working as a Frontend Developer, I have comprehensive skills in JavaScript (Vue.js, Next.js, React), HTML, CSS, and PHP (Laravel). Driven by a passion for creating high-quality web applications, I aim to contribute my expertise as a Front-End Developer in the tech industry.",
    id: "Lulusan Diploma 3 dengan pengalaman di bidang IoT dan fokus pada pengembangan web. Saat ini bekerja sebagai Frontend Developer, dengan kemampuan menyeluruh di JavaScript (Vue.js, Next.js, React), HTML, CSS, dan PHP (Laravel). Saya senang membangun aplikasi web berkualitas tinggi dan ingin terus berkontribusi sebagai Front-End Developer di industri teknologi.",
  },
  photo: {
    src: "/profile.jpg",
    alt: {
      en: "Ayub Budi Santoso on a city footbridge at night",
      id: "Ayub Budi Santoso di jembatan penyeberangan kota pada malam hari",
    },
  },
  techStack: ["Vue.js", "Next.js", "React", "Tailwind CSS", "Laravel", "Arduino", "ESP32"],
} satisfies {
  name: string;
  role: Localized<string>;
  location: string;
  headline: Localized<string>;
  summary: Localized<string>;
  bio: Localized<string>;
  photo: { src: string; alt: Localized<string> };
  techStack: string[];
};
