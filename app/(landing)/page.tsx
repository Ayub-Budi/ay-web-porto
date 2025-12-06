import Image from "next/image";
import Hero from "@/components/landing/hero";
import Skill from "@/components/landing/skill";
import Experience from "@/components/landing/dashboard/experience";

export default function Home() {
  
  return (
    <div>
      <Hero />
      <Skill />
      <Experience />
    </div>
  );
}
