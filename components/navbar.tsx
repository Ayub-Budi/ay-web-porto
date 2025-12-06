"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" }
  ];
  return (
    <nav className=" w-full fixed flex flex-col top-3 justify-center items-center z-50">
      <div className="flex w-fit items-center gap-3 border border-gray-300 shadow-xl p-3 bg-black/80 rounded-full relative">
        <div className="w-8 h-8 bg-blue-500 rounded-full overflow-hidden">
          <Image
            src="/profile.jpg"
            alt="ayub"
            width={200}
            height={300}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <ul className="justify-center space-x-2 hidden md:flex">
          {links.map((link) => (
            <li key={link.url}>
              <Link
                href={link.url}
                className={`px-3 py-2 hover:text-blue-500 ${
                  pathname === link.url ? "text-blue-700" : "text-gray-500"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* <button className="px-3 py-1 rounded-full text-white bg-blue-800 hover:bg-blue-900 hidden md:block">
          Contact
        </button> */}
        <p className="md:hidden">Ay-websaite</p>
        <button className="px-3 py-1 md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <i className="ri-menu-line"></i>
        </button>
        <div
          className={`absolute top-15 left-0 rounded-2xl p-2 w-full bg-white/80 z-40 flex items-center justify-center md:hidden ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col items-center gap-4">
            {links.map((link) => (
              <li key={link.url}>
                <Link
                  href={link.url}
                  className={`px-3 py-2 hover:text-blue-500 ${
                    pathname === link.url ? "text-blue-700" : "text-gray-500"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {/* <button className="px-3 py-1 rounded-full text-white bg-blue-800 hover:bg-blue-900">
              Contact
            </button> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
