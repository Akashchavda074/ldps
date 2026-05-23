"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { schoolImages } from "@/data/lpsVidhyawadiDatabase";

export default function CategoryGrid() {
  const gallery = schoolImages.filter((image) => image.category === "gallery");
  const categories = [
    { title: "BOARDING", img: gallery[0]?.src },
    { title: "SMART CLASSES", img: gallery[1]?.src },
    { title: "SCIENCE LABS", img: gallery[2]?.src },
    { title: "LIBRARY", img: gallery[3]?.src },
    { title: "CULTURAL ACTIVITIES", img: gallery[4]?.src },
    { title: "GAMES & SPORTS", img: gallery[5]?.src },
    { title: "HOSTEL LIFE", img: gallery[6]?.src },
    { title: "ACHIEVEMENTS", img: gallery[7]?.src },
    { title: "CAMPUS", img: gallery[8]?.src },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {categories.map((cat, i) => (
            <Link key={i} href="#" className="relative aspect-[4/3] group overflow-hidden block">
              <Image 
                src={cat.img ?? "/lps-vidhyawadi/about-banner.jpg"} 
                alt={cat.title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/40 transition-colors duration-300 flex items-center justify-center p-4">
                <h3 className="text-white font-black text-xl lg:text-2xl text-center uppercase tracking-widest drop-shadow-lg">
                  {cat.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
