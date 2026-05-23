"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrePrimaryClient from "@/components/PrePrimaryClient";
import { motion } from "framer-motion";

export default function PrePrimaryPageClient() {
  return (
    <div className="min-h-screen bg-[#3D348B] flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1">
        {/* Modern Vibrant Hero Section */}
        <div className="relative pt-32 md:pt-44 pb-20 px-6 overflow-hidden">
          {/* Decorative Blobs - adjusted for dark theme */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7678ED]/20 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F7B801]/10 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

          <div className="max-w-7xl mx-auto text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-6 py-2 rounded-full bg-white/10 text-[#F7B801] text-xs md:text-sm font-black tracking-[0.2em] uppercase mb-6 border border-white/10 backdrop-blur-md">
                LPS Junior Wing
              </span>
              <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight mb-8 leading-[1.1]">
                Nurturing Young Minds <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7B801] to-[#FFD700]">
                  with Joy & Creativity
                </span>
              </h1>
              <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
                Step into a world of vibrant learning where every corner is designed to spark curiosity, 
                foster social growth, and build a strong foundation for lifelong learning.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-24">
          {/* Core Interactive Showcase Grid */}
          <PrePrimaryClient />
        </div>
      </main>

      <Footer />
    </div>
  );
}
