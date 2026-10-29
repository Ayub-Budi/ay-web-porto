import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Separate root layout: the admin lives outside the localized site.
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <section>{children}</section>
      </body>
    </html>
  );
}
