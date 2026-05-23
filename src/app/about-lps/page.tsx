"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Shield, Target, Award, Heart } from "lucide-react";

export default function AboutLpsPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const carouselImages = [
    {
      src: "/lps-vidhyawadi/gallery-09.jpg",
      alt: "LPS Vidyawadi campus life and transport fleet",
      title: "School Transport Fleet",
      desc: "Fleet of buses ferrying students safely from peripheral areas up to 50 km."
    },
    {
      src: "/lps-vidhyawadi/gallery-01.jpg",
      alt: "LPS Vidyawadi student assembly and interactive events",
      title: "Student Leadership & Assembly",
      desc: "Nurturing discipline, public speaking, and community spirit through daily assemblies."
    },
    {
      src: "/lps-vidhyawadi/gallery-02.jpg",
      alt: "LPS Vidyawadi girls extracurricular activities and sports",
      title: "Extracurricular & Outdoor Play",
      desc: "Cultivating wellness, team building, and physical fitness in sprawling outdoor spaces."
    }
  ];

  return (
    <main className="min-h-screen bg-[#F8F9FC] text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 px-6 overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#3D348B_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Award size={14} className="text-accent" />
              <span>ESTD. 1956</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-tight uppercase font-montserrat">
              Leeladevi Parasmal <br />
              <span className="text-accent relative inline-block">
                Sancheti
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-accent/20 -z-10" />
              </span>{" "}
              School
            </h1>
            
            <p className="text-gray-600 text-base md:text-lg font-medium leading-relaxed">
              LPS Vidyawadi is located in the most picturesque and peaceful part of western Rajasthan. 
              As a premier educational residential institution for girls, our campus spreads over 65 sylvan acres 
              to provide an outstanding educational foundation that builds character, academic excellence, 
              leadership, and physical wellness in a caring, family atmosphere.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                href="/apply-for-admission" 
                className="bg-primary text-white font-extrabold px-6 py-3 rounded-xl hover:bg-secondary hover:shadow-lg hover:shadow-secondary/20 transition-all flex items-center gap-2 group text-sm uppercase tracking-wider"
              >
                <span>Apply Now</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contact" 
                className="bg-white border-2 border-primary/10 text-primary font-extrabold px-6 py-3 rounded-xl hover:bg-primary/5 transition-all text-sm uppercase tracking-wider"
              >
                Visit Campus
              </Link>
            </div>
          </div>

          {/* Premium Image Column with Overlaps and Dotted Pattern */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Dotted Grid Decoration */}
            <div className="absolute -top-10 -right-6 w-36 h-36 opacity-30 pointer-events-none bg-[radial-gradient(#3D348B_2px,transparent_2px)] [background-size:12px_12px]" />
            
            {/* Decorative Yellow Circle */}
            <div className="absolute -left-8 top-1/3 w-16 h-16 rounded-full bg-accent opacity-85 shadow-[0_8px_24px_rgba(247,184,1,0.4)] animate-pulse" />

            {/* Main Picture Container */}
            <div className="relative w-full aspect-[4/3] max-w-lg rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white group hover:scale-[1.01] transition-transform duration-500">
              <Image 
                src="/lps-vidhyawadi/about-banner.jpg" 
                alt="LPS Vidyawadi campus building" 
                fill 
                sizes="(max-width: 1024px) 100vw, 550px" 
                className="object-cover" 
                priority
              />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Foundation of LPS Section (Dark Navy Blue Gradient) */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-primary to-[#251f59] text-white overflow-hidden shadow-inner">
        {/* Background Decorative Polygon / Angle */}
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-accent opacity-5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute left-1/4 top-10 w-4 h-4 bg-accent rotate-45 opacity-25 pointer-events-none" />
        
        {/* Overlapping triangle accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-t-[30px] border-t-accent opacity-90" />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="space-y-3">
            <span className="text-accent font-black uppercase tracking-[0.35em] text-xs block">67+ Years of Legacy</span>
            <h2 className="text-3xl md:text-5xl font-black font-montserrat tracking-tight relative inline-block">
              Foundation of LPS Vidyawadi
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-28 h-1 bg-accent rounded-full" />
            </h2>
          </div>

          <p className="text-white/80 text-base md:text-xl font-medium leading-relaxed max-w-3xl mx-auto pt-4">
            About 67 years ago in 1956, a few visionary minds realized the critical importance of girls&apos; 
            education in Rajasthan and took the courageous initiative to make Vidyawadi a reality. Managed by 
            the eminent <strong className="text-accent font-bold">Marudhar Mahila Shikshan Sangh</strong>, our institution 
            has steadily consolidated democratic management, robust administration, and exceptional infrastructural 
            advancements. We dedicate every resource to ensuring our girls receive a healthy, values-driven environment 
            to flourish.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10">
            {[
              { val: "65", label: "Acre Campus" },
              { val: "7", label: "Comfortable Hostels" },
              { val: "47", label: "Qualified Staff" },
              { val: "CBSE", label: "Affiliation" }
            ].map((stat, idx) => (
              <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                <p className="text-3xl md:text-4xl font-black text-accent">{stat.val}</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Columns: Approach & Mission */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Approach Card */}
          <div className="bg-white border border-primary/10 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[5rem] -z-10 group-hover:scale-110 transition-transform duration-300" />
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
              <Compass size={24} />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-tight mb-4">
              Our Approach
            </h3>
            
            <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed">
              We focus on a child-centered <strong className="text-primary font-bold">&quot;Learning by Doing&quot;</strong> methodology. 
              Our sprawling campus contains well-equipped science and computer labs, a spacious library, and modern 
              classrooms integrated with digital IFP boards. Through a balanced blend of rigorous formal academics, 
              physical education, co-curricular arts, and specialized clubs, we nurture inherent creativity in 
              every child. We prioritize a safe, comfortable, and homely residential ecosystem that caters to our 
              students as a true <strong className="text-primary font-bold">&quot;home away from home.&quot;</strong>
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-white border border-primary/10 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-[5rem] -z-10 group-hover:scale-110 transition-transform duration-300" />
            <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6">
              <Target size={24} className="text-accent-hover" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-tight mb-4">
              Our Mission
            </h3>
            
            <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed">
              Our pledge is to facilitate the full development of every girl child who steps into our campus. 
              We strive to provide a healthy learning environment and quality education that empowers girls 
              academically, socially, and emotionally. Our goal is to nurture self-respect, encourage independent 
              thinking, and inculcate self-reliance, so that each student discovers her purpose in life and grows 
              into a compassionate leader capable of adding lasting value to global society.
            </p>
          </div>
        </div>
      </section>

      {/* School Life Carousel Showcase (Image 2 Bottom Section) */}
      <section className="bg-white border-t border-primary/5 py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-accent font-black uppercase tracking-[0.35em] text-xs block">Experience LPS Life</span>
            <h2 className="text-3xl md:text-4xl font-black text-primary uppercase font-montserrat">
              Vidyawadi Campus Showcase
            </h2>
            <p className="text-gray-500 font-medium max-w-xl mx-auto text-sm md:text-base">
              Explore snapshots of the lively residential environment, support facilities, and activities.
            </p>
          </div>

          {/* Desktop Showcase: 3 beautiful columns side-by-side (matching Image 2 slider layout) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {carouselImages.map((slide, idx) => (
              <div 
                key={idx} 
                className="bg-[#F8F9FC] border border-primary/5 rounded-3xl overflow-hidden shadow-md group hover:-translate-y-2 transition-all duration-300"
                onMouseEnter={() => setActiveSlide(idx)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image 
                    src={slide.src} 
                    alt={slide.alt} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 380px" 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                </div>
                
                {/* Description content */}
                <div className="p-6 space-y-2">
                  <h4 className="text-lg font-black text-primary uppercase tracking-tight">
                    {slide.title}
                  </h4>
                  <p className="text-gray-500 font-medium text-xs md:text-sm leading-relaxed">
                    {slide.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Pagination Dots (matching yellow active dot layout in Image 2) */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  activeSlide === idx 
                    ? "bg-accent scale-110 shadow-[0_2px_8px_rgba(247,184,1,0.4)]" 
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action banner */}
      <section className="bg-gradient-to-r from-primary/5 to-secondary/5 py-16 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-primary/10 p-8 md:p-12 text-center space-y-6 shadow-xl">
          <Heart className="text-accent mx-auto animate-bounce" size={40} />
          <h3 className="text-2xl md:text-3xl font-black text-primary font-montserrat uppercase">
            A Safe, Nurturing &ldquo;Home Away From Home&rdquo;
          </h3>
          <p className="text-gray-600 font-medium text-sm md:text-base max-w-2xl mx-auto">
            Discover how Leeladevi Parasmal Sancheti School can help your daughter realize her full 
            potential, develop leadership qualities, and achieve academic excellence.
          </p>
          <div className="pt-2">
            <Link 
              href="/apply-for-admission" 
              className="inline-flex items-center gap-2 bg-accent text-primary font-extrabold uppercase text-xs md:text-sm tracking-wider px-8 py-4 rounded-xl hover:bg-accent-hover hover:scale-[1.02] hover:shadow-lg transition-all"
            >
              <span>Begin Admission Query</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
