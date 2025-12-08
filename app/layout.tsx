import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "remixicon/fonts/remixicon.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayub Budi Santoso",
  description:
    "My personal website and portfolio for Ayub Budi Santoso,  A Diploma 3 graduate with experience in IoT and a dedicated focus on Web Development. Currently working as a Frontend Developer, I possess comprehensive skills in JavaScript (Vue.js, Next.js, React), HTML, CSS, and PHP (Laravel). Driven by a passion for creating high-quality web applications, I aim to contribute my expertise as a Front-End Developer in the tech industry.",
  keywords: ["web developer", "portfolio", "react", "next.js", "ayub", "ayub budi", "ayub budi santoso"],
  authors: [{ name: "Ayub Budi Santoso" }],
  openGraph: {
    title: "Ayub Budi Santoso",
    description: "Personal website and portfolio for Ayub Budi Santoso, a Diploma 3 graduate with experience in IoT and a dedicated focus on Web Development.",
    url: "https://ayubbudi.com/",
    siteName: "Ayub Budi Santoso",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
