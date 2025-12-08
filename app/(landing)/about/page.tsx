import TextTitle from "@/components/landing/text/title";
import Experience from "@/components/landing/dashboard/experience";
import Image from "next/image";
export default function About() {
  return (
    <div className="py-10 mt-20 min-h-screen flex flex-col gap-3">
      <div>
        <h1 className="text-xl sm:text-4xl font-bold">Ayub Budi Santoso</h1>
        <h2 className="text-lg sm:text-2xl text-gray-400">Web Developer</h2>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:items-stretch items-center">
        <div className="bg-black w-[200px] h-[300px] sm:w-[300px] sm:h-[400px] rounded-4xl border border-gray-300 overflow-hidden">
          <Image
            src="/profile.jpg"
            alt="ayub"
            width={200}
            height={300}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="flex flex-col flex-1 py-5 gap-3">
          <div className="flex flex-col gap-2">
            <TextTitle title="About Me" description="This is about page" />
            <hr />
            <p className="text-gray-400 text-xs lg:text-base">
              A Diploma 3 graduate with experience in IoT and a dedicated focus
              on Web Development. Currently working as a Frontend Developer, I
              possess comprehensive skills in JavaScript (Vue.js, Next.js,
              React), HTML, CSS, and PHP (Laravel). Driven by a passion for
              creating high-quality web applications, I aim to contribute my
              expertise as a Front-End Developer in the tech industry.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <TextTitle title="Address" description="My address is" />
            <hr />
            <p className="text-gray-400 text-xs lg:text-base">
              Widoro Rt 07 Rw 42, Bangunharjo Kec. Sewon Kab. Bantul Yogyakarta
            </p>
          </div>
        </div>
      </div>

      <Experience />

      
    </div>
  );
}
