import type { Localized } from "@/domain/content/localized";

export const skillsSeed: {
  id: string;
  name: Localized<string>;
  description: Localized<string>;
}[] = [
  {
    id: "web-development",
    name: { en: "Web development", id: "Pengembangan web" },
    description: {
      en: "Building web applications with HTML, CSS, JavaScript and PHP (Laravel).",
      id: "Membangun aplikasi web dengan HTML, CSS, JavaScript, dan PHP (Laravel).",
    },
  },
  {
    id: "frontend",
    name: { en: "Frontend development", id: "Pengembangan frontend" },
    description: {
      en: "Turning designs into interfaces with Vue.js, React and Next.js, styled with Tailwind or Bootstrap.",
      id: "Mengubah desain menjadi antarmuka dengan Vue.js, React, dan Next.js, memakai Tailwind atau Bootstrap.",
    },
  },
  {
    id: "iot",
    name: { en: "Internet of Things", id: "Internet of Things" },
    description: {
      en: "Designing systems that connect physical devices to the internet, programmed in C/C++ on Arduino and ESP32.",
      id: "Merancang sistem yang menghubungkan perangkat fisik ke internet, diprogram dengan C/C++ di Arduino dan ESP32.",
    },
  },
  {
    id: "maintenance",
    name: { en: "Maintenance and support", id: "Pemeliharaan dan dukungan" },
    description: {
      en: "Keeping existing web applications up to date, stable and working as they should.",
      id: "Menjaga aplikasi web yang sudah berjalan tetap mutakhir, stabil, dan berfungsi semestinya.",
    },
  },
];
