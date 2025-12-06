"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden">
      <Image
        src="/hero.webp"
        alt="ayub"
        width={900}
        height={900}
        className="absolute object-cover object-center z-1 animate-spin [animation-duration:120s]"
      />
      <div className="flex flex-col lg:flex-row gap-4 items-stretch z-10">
        <div className="flex flex-col xl:justify-center flex-1 py-5">
          <h2 className="text-xl sm:text-2xl font-bold">AYUB BUDI SANTOSO</h2>
          <h1 className="text-4xl sm:text-6xl font-bold">WEBSITE</h1>
        </div>

        <div className="flex items-center justify-center flex-1">
          <div className="bg-black w-[200px] h-[300px] sm:w-[300px] sm:h-[400px] rounded-4xl border border-gray-300 overflow-hidden">
            <Image
              src="/profile.jpg"
              alt="ayub"
              width={200}
              height={300}
              className="object-cover object-center w-full h-full"
            />
          </div>
        </div>

        <div className="flex flex-col justify-end xl:justify-center flex-1 py-5">
          <h1 className="text-4xl sm:text-6xl font-bold">DEVELOPER</h1>
          <p className="sm:text-lg max-w-[250px]">
            building a website that is fast, secure, and easy to use
          </p>
        </div>
      </div>
    </div>
  );
}
