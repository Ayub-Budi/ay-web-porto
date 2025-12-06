"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Title({
  title,
  description,
}: Readonly<{ title: string; description: string }>) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-xl sm:text-2xl font-bold">
        {title}
      </h1>
      <p className="text-gray-400">
        {description}
      </p>
    </div>
  );
}
