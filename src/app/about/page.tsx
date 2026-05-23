import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { History, Target, Eye, Award } from "lucide-react";
import { getSection, introductionPage } from "@/data/lpsVidhyawadiDatabase";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 lg:pt-40">
      <Navbar />

      {/* Hero */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-green-primary font-black uppercase tracking-[0.4em] text-sm mb-6 block">Our Story</span>
          <h1 className="text-5xl lg:text-8xl font-black text-navy leading-none mb-12">
            PIONEERING <span className="text-green-primary">GIRLS&apos;</span> <br /> EDUCATION.
          </h1>
          <div className="relative aspect-video max-w-5xl mx-auto rounded-[3.5rem] overflow-hidden shadow-2xl">
            <Image src="/lps-vidhyawadi/about-banner.jpg" alt="LPS Vidyawadi campus" fill sizes="(max-width: 1024px) 100vw, 960px" className="object-cover" />
            <div className="absolute inset-0 bg-navy/20" />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-6 py-32 bg-navy text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-mint rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-primary rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Our Mission", desc: getSection(introductionPage, "Mission")[0], icon: Target },
              { title: "Our Vision", desc: "To empower every student with self-respect, identity, purpose, academic excellence, leadership, and social responsibility.", icon: Eye },
              { title: "Our Values", desc: "Tradition, truth, responsibility, respect, care, personal attention, and commitment to every child's happiness and success.", icon: Award },
            ].map((item, i) => (
              <div key={i} className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                <div className="w-16 h-16 bg-mint text-navy rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <item.icon size={32} />
                </div>
                <h3 className="text-3xl font-black mb-6 uppercase tracking-tight">{item.title}</h3>
                <p className="text-white/60 text-lg font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline Preview */}
      <section className="px-6 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-green-primary font-black uppercase tracking-[0.4em] text-sm mb-6 block">Our History</span>
              <h2 className="text-5xl lg:text-7xl font-black text-navy leading-[0.95] mb-8">
                67 YEARS OF <br />
                <span className="text-green-primary">LEGACY.</span>
              </h2>
              <div className="space-y-12 mt-12">
                {[
                  { year: "1956", event: "Marudhar Mahila Shikshan Sangh began its girls' education journey at Vidyawadi." },
                  { year: "65 acres", event: "The campus grew into a full educational ecosystem with schools, college, hostels, labs, kitchen, dining, sports, and transport." },
                  { year: "CBSE", event: "Leeladevi Parasmal Sancheti English Medium Sr. Sec. School became recognized and affiliated to CBSE, New Delhi." },
                  { year: "Today", event: "The institution continues to provide quality education from L.K.G. to XII in a caring residential environment." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="text-3xl font-black text-navy/20 group-hover:text-green-primary transition-colors">{item.year}</div>
                    <div className="pt-2">
                      <p className="text-navy font-bold text-lg">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Image src="/lps-vidhyawadi/gallery-03.jpg" alt="LPS Vidyawadi student activity" width={900} height={700} className="rounded-[3rem] shadow-2xl object-cover" />
              <div className="absolute -bottom-10 -right-10 bg-yellow-accent p-12 rounded-[2.5rem] shadow-2xl hidden md:block">
                <History size={48} className="text-navy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
