import Navbar from "@/components/navbar";
import Footer from "@/components/landing/footer";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="relative bg-black text-white min-h-screen mx-auto">
      <Navbar />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3 md:gap-6">
        {children}
      </div>
      <Footer />
    </section>
  );
}
