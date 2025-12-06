'use client';

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full flex flex-col items-center justify-center py-10 border-t border-gray-300">
            <div className="flex flex-col items-center justify-center gap-2">
                <Image
                    src="/profile.jpg"
                    alt="ayub"
                    width={200}
                    height={300}
                    className="w-10 h-10 rounded-full"
                />
                <h1 className="text-xl font-bold">Ayub Budi Santoso</h1>
            </div>
            
            <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Ayub Budi Santoso. All rights reserved.
            </p>
        </footer>
    );
}