"use client";

import React from "react";
import { Play } from "lucide-react";
import Image from "next/image";
import { schoolImages } from "@/data/lpsVidhyawadiDatabase";

export default function LifeAtGis() {
  const gallery = schoolImages.filter((image) => image.category === "gallery");

  return (
    <section className="bg-white pb-32">
      {/* Top Banner with Curved Background */}
      <div className="relative bg-navy pt-16 pb-32 overflow-hidden">
        {/* Background Curves Decoration */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute w-[200%] h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          <svg className="absolute bottom-0 w-full h-auto text-white/10" viewBox="0 0 1440 320" fill="currentColor">
            <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <h2 className="relative z-10 text-4xl lg:text-5xl font-black text-white text-center mb-16">
          Life at LPS Vidyawadi
        </h2>

        {/* Video Thumbnails */}
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar items-center justify-center">
            {gallery.slice(3, 6).map((img, i) => (
              <div key={i} className="min-w-[280px] w-[280px] md:w-[320px] aspect-video relative rounded-xl overflow-hidden shrink-0 snap-center shadow-2xl cursor-pointer group border-4 border-white">
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 280px, 320px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                  <div className="w-16 h-16 rounded-full border-4 border-white/80 flex items-center justify-center bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <Play className="text-white fill-white ml-1" size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Video Player */}
      <div className="max-w-6xl mx-auto px-6 relative z-20 -mt-20">
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900 border-8 border-white relative group">
           <Image src="/lps-vidhyawadi/gallery-07.jpg" alt="Campus View" fill sizes="(max-width: 1280px) 100vw, 1100px" className="object-cover opacity-80" />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-white/80 flex items-center justify-center bg-black/40 backdrop-blur-md cursor-pointer hover:scale-110 transition-transform hover:bg-black/60">
                <Play className="text-white fill-white ml-2" size={40} />
              </div>
           </div>
           {/* Fake Video Controls Overlay */}
           <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity">
             <div className="flex items-center gap-4 text-white">
               <Play size={20} className="cursor-pointer" />
               <div className="flex-1 h-1 bg-white/30 rounded-full relative">
                 <div className="absolute left-0 top-0 h-full w-1/3 bg-yellow-accent rounded-full"></div>
               </div>
               <span className="text-xs font-bold font-mono">02:14 / 05:30</span>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
