import type { Dictionary } from "@/i18n/get-dictionary";

export default function Footer({
  dict,
}: Readonly<{ dict: Dictionary["footer"] }>) {
  return (
    <footer className="relative border-t border-line bg-night">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-extrabold tracking-tight">Ayub Budi Santoso</p>
        <p className="text-fog text-sm">
          &copy; {new Date().getFullYear()} Ayub Budi Santoso. {dict.rights}
        </p>
      </div>
    </footer>
  );
}
