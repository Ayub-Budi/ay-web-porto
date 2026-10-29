import type { Localized } from "@/domain/content/localized";
import type { EmploymentType } from "@/domain/content/types";

export const experiencesSeed: {
  id: string;
  title: Localized<string>;
  company: string;
  companyShort: string;
  employmentType: EmploymentType;
  startDate: string;
  endDate: string | null;
  highlights: Localized<string[]>;
}[] = [
  {
    id: "sma-2-bantul",
    title: {
      en: "Teaching assistant, Digital Engineering project",
      id: "Asisten dosen, proyek Rekayasa Digital",
    },
    company: "SMA N 2 Bantul",
    companyShort: "SMA N 2 Bantul",
    employmentType: "teaching",
    startDate: "2023-10-16",
    endDate: "2023-10-27",
    highlights: {
      en: [
        "Assisted a university lecturer in delivering a Digital Engineering curriculum at SMA N 2 Bantul.",
        "Mentored three classes of high school students on IoT and embedded systems, focusing on C/C++ programming for Arduino and ESP32 microcontrollers.",
        "Guided the students through the entire project lifecycle, ensuring the successful development of functional prototypes.",
        "Curated and managed the final project exhibition, allowing the students to showcase their innovations to a wider audience.",
      ],
      id: [
        "Membantu dosen menyampaikan kurikulum Rekayasa Digital di SMA N 2 Bantul.",
        "Membimbing tiga kelas siswa SMA tentang IoT dan embedded system, dengan fokus pemrograman C/C++ untuk mikrokontroler Arduino dan ESP32.",
        "Mendampingi siswa di seluruh siklus proyek hingga menghasilkan prototipe yang berfungsi.",
        "Menyusun dan mengelola pameran proyek akhir agar siswa bisa menunjukkan karya mereka ke khalayak yang lebih luas.",
      ],
    },
  },
  {
    id: "trans-retail",
    title: {
      en: "IT Application Officer, Software Developer (internship)",
      id: "IT Application Officer, Software Developer (magang)",
    },
    company: "Trans Retail Indonesia",
    companyShort: "Trans Retail",
    employmentType: "internship",
    startDate: "2024-02-01",
    endDate: "2024-06-30",
    highlights: {
      en: [
        "Successfully implemented professional projects, demonstrating strong problem-solving and time management skills.",
        "Developed an inventory application specifically for tracking and managing expired goods.",
        "Resolved bugs and improved stability for the Vendor Management System (VMS) frontend using Vue.js.",
        "Assisted in backend development for applications and QRIS payment integration.",
      ],
      id: [
        "Menyelesaikan proyek profesional dengan kemampuan pemecahan masalah dan manajemen waktu yang baik.",
        "Mengembangkan aplikasi inventaris khusus untuk melacak dan mengelola barang kedaluwarsa.",
        "Memperbaiki bug dan meningkatkan stabilitas frontend Vendor Management System (VMS) dengan Vue.js.",
        "Membantu pengembangan backend aplikasi dan integrasi pembayaran QRIS.",
      ],
    },
  },
  {
    id: "gmedia",
    title: { en: "Frontend Developer", id: "Frontend Developer" },
    company: "Gmedia (PT Media Sarana Data)",
    companyShort: "Gmedia",
    employmentType: "full-time",
    startDate: "2024-09-01",
    endDate: null,
    highlights: {
      en: [
        "Responsible for developing and maintaining high-quality user interfaces using modern tech stacks.",
        "Work closely with the Backend team to facilitate API integration and guarantee optimal performance.",
        "Leverage modern frameworks like Vue.js to create dynamic, scalable, and reusable architecture.",
        "Conduct comprehensive debugging and testing routines to ensure system stability before deployment.",
      ],
      id: [
        "Mengembangkan dan memelihara antarmuka berkualitas tinggi dengan teknologi modern.",
        "Bekerja sama dengan tim Backend untuk integrasi API dan menjaga performa tetap optimal.",
        "Memakai framework modern seperti Vue.js untuk membangun arsitektur yang dinamis, skalabel, dan dapat dipakai ulang.",
        "Melakukan debugging dan pengujian menyeluruh untuk menjaga stabilitas sistem sebelum rilis.",
      ],
    },
  },
  {
    id: "jenjang-talenta",
    title: { en: "Frontend Developer", id: "Frontend Developer" },
    company: "PT Jenjang Talenta Indonesia",
    companyShort: "Jenjang Talenta",
    employmentType: "full-time",
    startDate: "2024-11-01",
    endDate: null,
    highlights: {
      en: [
        "Develop dynamic web applications and responsive mobile web views using Vue.js and Tailwind CSS, ensuring high scalability and maintainability.",
        "Transform UI/UX designs into pixel-perfect user interfaces that are optimized for both desktop and mobile experiences.",
        "Collaborate with the Backend team to seamlessly integrate APIs and optimize data flow for superior application performance.",
        "Conduct comprehensive debugging and testing routines to maintain system stability and ensure bug-free deployments.",
      ],
      id: [
        "Mengembangkan aplikasi web dinamis dan tampilan web mobile yang responsif dengan Vue.js dan Tailwind CSS, dengan skalabilitas dan kemudahan pemeliharaan tinggi.",
        "Mengubah desain UI/UX menjadi antarmuka yang presisi dan optimal untuk desktop maupun mobile.",
        "Berkolaborasi dengan tim Backend untuk integrasi API dan optimasi alur data demi performa aplikasi yang lebih baik.",
        "Melakukan debugging dan pengujian menyeluruh untuk menjaga stabilitas sistem dan rilis bebas bug.",
      ],
    },
  },
];
