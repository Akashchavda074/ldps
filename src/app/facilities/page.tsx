import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSection, resourcesPage, schoolImages, schoolDatabase } from "@/data/lpsVidhyawadiDatabase";
import Image from "next/image";
import { Building2, ShieldCheck } from "lucide-react";

export default function FacilitiesPage() {
  const strengths = getSection(resourcesPage, "Our Resources and Strengths");
  const gallery = schoolImages.filter((image) => image.category === "gallery").slice(0, 6);

  return (
    <main className="min-h-screen pt-32 lg:pt-40 bg-[#f7fbf8]">
      <Navbar />

      <section className="px-6 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[2rem] bg-gradient-to-r from-teal to-navy p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-mint/20 blur-2xl" />
            <span className="text-mint font-black uppercase tracking-[0.35em] text-xs mb-4 block">Campus Facilities</span>
            <h1 className="text-4xl lg:text-6xl font-black leading-tight">Infrastructure & Resources</h1>
            <p className="text-white/85 max-w-4xl mt-6 font-medium leading-relaxed">
              {schoolDatabase.site.name} provides modern facilities to support holistic development and high-quality education.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {strengths.map((item) => (
            <div key={item} className="bg-white border border-teal/10 rounded-xl p-5 text-teal font-medium shadow-sm hover:shadow-lg transition-shadow">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Building2 className="text-green-primary" />
              <h2 className="text-3xl font-black text-navy">Facility Gallery</h2>
            </div>
            <div className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-teal/15 text-teal font-bold text-sm">
              <ShieldCheck size={16} />
              Verified Campus Visuals
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {gallery.map((image) => (
              <div key={image.file} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
