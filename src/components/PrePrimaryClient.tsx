"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Flat array of all showcase items for easy Lightbox cycling
const prePrimaryShowcaseItems = [
  // SECTION 1: Pre School (5 items)
  {
    section: "Pre School",
    title: "Bead Maze Learning",
    description: "Developing fine motor skills and spatial reasoning through tactile wooden bead maze puzzles.",
    src: "https://images.unsplash.com/photo-1603354363425-60bfee595b8d?auto=format&fit=crop&w=600&q=80",
    alt: "tactile bead maze toy block learning",
  },
  {
    section: "Pre School",
    title: "Cup Stacking Tower",
    description: "Collaborative building exercises to teach kids coordination, scale, balance, and patience.",
    src: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80",
    alt: "cup stacking and balance coordination",
  },
  {
    section: "Pre School",
    title: "Preschool Classroom Seating",
    description: "Creating comfortable learning spaces where kids look ahead, listen, and participate together.",
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
    alt: "children sitting at school tables looking ahead",
  },
  {
    section: "Pre School",
    title: "Sensory Wall Activity Board",
    description: "Hands-on wall activities featuring gears, shapes, and textures to foster cognitive development.",
    src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80",
    alt: "toddler touching wall activity toys",
  },
  {
    section: "Pre School",
    title: "Vibrant Creative Playroom",
    description: "Vibrant playroom loaded with educational blocks, dolls, and puzzles for active social play.",
    src: "https://images.unsplash.com/photo-1566378246598-5b11a0fe3a23?auto=format&fit=crop&w=600&q=80",
    alt: "preschool colorful creative toys setup",
  },

  // SECTION 2: Academics (5 items)
  {
    section: "Academics",
    title: "Interactive Art & Drawing Group",
    description: "Group art classes where teachers guide kids in using pencils, sketch pens, and vibrant colors.",
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
    alt: "teacher helping preschool students write and paint at tables",
  },
  {
    section: "Academics",
    title: "Writing Practice Workshops",
    description: "Developing early pencil grip, handwriting rhythm, and stroke order at custom low preschool desks.",
    src: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80",
    alt: "preschool children writing on white sketch papers",
  },
  {
    section: "Academics",
    title: "Wooden Alphabet Word Puzzle",
    description: "Understanding letters, building words, and spelling using tactile wooden cutouts.",
    src: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80",
    alt: "colorful letters puzzle frame",
  },
  {
    section: "Academics",
    title: "Tactile Interactive Display",
    description: "Experiential learning workshops using hands-on exhibits to trigger spatial curiosity.",
    src: "/lps-vidhyawadi/gallery-04.jpg",
    alt: "primary science experiential learning project display",
  },
  {
    section: "Academics",
    title: "Clay Modeling & Sculpting",
    description: "Fostering shape comprehension and finger strength using colorful organic modeling clay.",
    src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
    alt: "pre-primary kids using clay models",
  },

  // SECTION 3: Co-Curricular Activities (4 items)
  {
    section: "Co-Curricular Activities",
    title: "Origami Paper Craft Demonstration",
    description: "Enhancing spatial orientation and focus by folding vibrant paper frogs and planes.",
    src: "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=600&q=80",
    alt: "child holding a cute green origami paper craft",
  },
  {
    section: "Co-Curricular Activities",
    title: "Group Painting & Crafting Sessions",
    description: "Encouraging collaborative expression as students share paints, brushes, and creative ideas.",
    src: "/lps-vidhyawadi/gallery-07.jpg",
    alt: "saturday bagless day activity craft school room",
  },
  {
    section: "Co-Curricular Activities",
    title: "Ladybug Papercraft Showcase",
    description: "Cutting, gluing, and constructing gorgeous paper ladybugs to understand insect biology.",
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
    alt: "ladybug craft paper models shown by students",
  },
  {
    section: "Co-Curricular Activities",
    title: "Vibrant Toy Counters",
    description: "Interactive mock counters where children learn to play, coordinate, and organize shapes.",
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    alt: "kids activity counter at preschool play room",
  },

  // SECTION 4: Sports Activities (6 items)
  {
    section: "Sports Activities",
    title: "Outdoor Climbing Jungle Gym",
    description: "Strengthening muscles and gaining confidence by climbing color-blocked playground structures.",
    src: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=600&q=80",
    alt: "kids play playground gym climbing frame",
  },
  {
    section: "Sports Activities",
    title: "Indoor Dynamic Physical Play",
    description: "Developing balance, coordination, and physical fitness with active indoor classroom setups.",
    src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80",
    alt: "preschool sports session in activity room",
  },
  {
    section: "Sports Activities",
    title: "Strategic Focus & Chess Practice",
    description: "Early logic development and strategy by understanding board configurations and pieces.",
    src: "/lps-vidhyawadi/gallery-02.jpg",
    alt: "school sports chess event matches",
  },
  {
    section: "Sports Activities",
    title: "Outdoor Recreation Drills",
    description: "Holistic fitness, coordination, and outdoor play sessions under teacher guidance.",
    src: "/lps-vidhyawadi/gallery-12.jpg",
    alt: "outdoor playground sports court games",
  },
  {
    section: "Sports Activities",
    title: "Pre-Primary Karate & Self Defense",
    description: "Building agility, discipline, focus, and core strength through guided junior karate kates.",
    src: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=600&q=80",
    alt: "karate physical training class kids",
  },
  {
    section: "Sports Activities",
    title: "Road Safety Tricycle Track",
    description: "Interactive play track simulating road lanes, stop lights, and traffic signs for civic education.",
    src: "https://images.unsplash.com/photo-1564144006388-615f4f4ad6f1?auto=format&fit=crop&w=600&q=80",
    alt: "play scooter track school with road signs",
  },

  // SECTION 5: Projector Class (2 items)
  {
    section: "Projector Class",
    title: "Smart AV Presentation Hall",
    description: "High-tech audio-visual projector classrooms that make geography, history, and science come alive.",
    src: "/lps-vidhyawadi/gallery-09.jpg",
    alt: "projection room classroom with long tables and display",
  },
  {
    section: "Projector Class",
    title: "Smart Whiteboard Classroom Sessions",
    description: "Vibrant classrooms equipped with high-resolution digital whiteboards for interactive learning.",
    src: "https://images.unsplash.com/photo-1568658176307-bfbd2873abda?auto=format&fit=crop&w=600&q=80",
    alt: "interactive flat panel whiteboard classroom screen kids",
  },

  // SECTION 6: Skill Classes (2 items)
  {
    section: "Skill Classes",
    title: "Sand Play Sensory Station",
    description: "Fostering texture recognition, scooping math, and physical coordination at sandboxes.",
    src: "https://images.unsplash.com/photo-1610473068565-d06b67a99252?auto=format&fit=crop&w=600&q=80",
    alt: "children playing sandbox sand table sensory station",
  },
  {
    section: "Skill Classes",
    title: "Geometric Shape Learning Activity",
    description: "Drawing, coloring, and learning shapes like circle, triangle, and square with visual aids.",
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    alt: "preschooler displaying geometry drawing on floor shapes",
  },
];

export default function PrePrimaryClient() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  // Navigate lightbox photos
  const handlePrev = React.useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activePhoto === null) return;
    setActivePhoto((prev) => (prev === 0 ? prePrimaryShowcaseItems.length - 1 : (prev ?? 0) - 1));
  }, [activePhoto]);

  const handleNext = React.useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activePhoto === null) return;
    setActivePhoto((prev) => (prev === prePrimaryShowcaseItems.length - 1 ? 0 : (prev ?? 0) + 1));
  }, [activePhoto]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhoto === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setActivePhoto(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto, handlePrev, handleNext]);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (activePhoto !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePhoto]);

  // Group items by section to make rendering structured and clean
  const getSectionItems = (sectionName: string) => {
    return prePrimaryShowcaseItems
      .map((item, originalIndex) => ({ ...item, originalIndex }))
      .filter((item) => item.section === sectionName);
  };

  const renderSectionHeader = (title: string, colorClass: string) => (
    <div className="flex flex-col items-center mb-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={`px-8 py-3 rounded-2xl ${colorClass} shadow-xl mb-4 border border-white/20`}
      >
        <h2 className="text-xl md:text-2xl font-black text-white tracking-widest uppercase text-center">
          {title}
        </h2>
      </motion.div>
      <div className="w-24 h-1.5 bg-[#F7B801] rounded-full shadow-sm" />
    </div>
  );

  const renderImageCard = (item: { title: string; description: string; src: string; alt: string; originalIndex: number }) => (
    <motion.div
      key={item.originalIndex}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (item.originalIndex % 3) * 0.05 }}
      onClick={() => setActivePhoto(item.originalIndex)}
      className="group relative cursor-pointer"
    >
      {/* Gold Offset Shadow Backing - Keeping for depth */}
      <div className="absolute -inset-1 bg-[#F7B801] rounded-[2.2rem] -z-10 opacity-0 group-hover:opacity-40 transition-all duration-500 shadow-[4px_4px_20px_rgba(247,184,1,0.2)] group-hover:rotate-1" />
      
      {/* Main Card: Transitions from Navy to Yellow */}
      <div className="bg-[#3D348B] group-hover:bg-[#F7B801] p-4 rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.1)] border border-white/10 flex flex-col h-full transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_25px_60px_rgba(247,184,1,0.25)]">
        
        {/* Polaroid Style Image Frame */}
        <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-slate-800 border-[6px] border-white shadow-md">
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          {/* Overlay hover badge */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3D348B]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-white uppercase bg-[#3D348B] px-3 py-1.5 rounded-full shadow-lg">
              <ImageIcon size={12} />
              Enlarge
            </span>
          </div>
        </div>

        {/* Text Area: Colors transition based on card background */}
        <div className="mt-5 px-1 flex-1 flex flex-col">
          <h3 className="text-white group-hover:text-[#3D348B] text-base md:text-lg font-black line-clamp-1 leading-none mb-2 transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-slate-300 group-hover:text-[#3D348B]/70 text-xs line-clamp-2 leading-relaxed font-medium transition-colors duration-300">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full space-y-24 relative pb-20">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-[#7678ED]/5 rounded-full blur-3xl -z-20 animate-pulse" />
      <div className="absolute top-[20%] -right-20 w-96 h-96 bg-[#F7B801]/5 rounded-full blur-3xl -z-20" />
      <div className="absolute top-[50%] -left-20 w-96 h-96 bg-[#3D348B]/5 rounded-full blur-3xl -z-20 animate-pulse" />

      {/* SECTION 1: Pre School */}
      <section className="w-full bg-[#7678ED]/5 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-white/50">
        {renderSectionHeader("Pre School Showcase", "bg-[#7678ED]")}
        {/* Grid of 5 horizontal cards in a row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {getSectionItems("Pre School").map((item) => renderImageCard(item))}
        </div>
      </section>

      {/* SECTION 2: Academics */}
      <section className="w-full bg-[#3D348B]/5 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-white/50">
        {renderSectionHeader("Interactive Academics", "bg-[#3D348B]")}
        <div className="space-y-8">
          {/* Row 1: 2 large cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {getSectionItems("Academics").slice(0, 2).map((item) => renderImageCard(item))}
          </div>
          {/* Row 2: 3 smaller cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {getSectionItems("Academics").slice(2, 5).map((item) => renderImageCard(item))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Co-Curricular Activities */}
      <section className="w-full bg-[#F7B801]/5 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-white/50">
        {renderSectionHeader("Co-Curricular Exploration", "bg-[#F7B801]")}
        {/* Grid of 4 horizontal cards in a row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {getSectionItems("Co-Curricular Activities").map((item) => renderImageCard(item))}
        </div>
      </section>

      {/* SECTION 4: Sports Activities */}
      <section className="w-full bg-[#FF6B6B]/5 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-white/50">
        {renderSectionHeader("Active Sports & Fun", "bg-[#FF6B6B]")}
        <div className="space-y-8">
          {/* Row 1: 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {getSectionItems("Sports Activities").slice(0, 3).map((item) => renderImageCard(item))}
          </div>
          {/* Row 2: 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {getSectionItems("Sports Activities").slice(3, 6).map((item) => renderImageCard(item))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Projector Class */}
      <section className="w-full bg-[#4ECDC4]/5 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-white/50">
        {renderSectionHeader("Digital Projector Learning", "bg-[#4ECDC4]")}
        {/* Grid of 2 large horizontal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {getSectionItems("Projector Class").map((item) => renderImageCard(item))}
        </div>
      </section>

      {/* SECTION 6: Skill Classes */}
      <section className="w-full bg-[#3D348B]/5 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-white/50">
        {renderSectionHeader("Life Skill Development", "bg-[#3D348B]")}
        {/* Grid of 2 large horizontal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {getSectionItems("Skill Classes").map((item) => renderImageCard(item))}
        </div>
      </section>

      {/* Premium Lightbox Modal Viewer */}
      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between items-center py-6 px-4"
          >
            {/* Top Bar */}
            <div className="w-full max-w-6xl flex justify-between items-center text-white px-2">
              <span className="text-xs md:text-sm font-bold tracking-widest text-[#F7B801] uppercase">
                LPS Vidyawadi - Pre-Primary Wing
              </span>
              <button
                onClick={() => setActivePhoto(null)}
                className="p-2.5 bg-white/5 hover:bg-white/15 hover:scale-105 border border-white/10 rounded-full text-white/80 hover:text-white transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Media Area */}
            <div className="flex-1 w-full flex items-center justify-center relative my-4 max-h-[75vh]">
              {/* Left Navigation Arrow */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-4 z-10 p-3 bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white rounded-full transition-all cursor-pointer hidden sm:block"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Central Active Image with organic zoom */}
              <motion.div
                key={activePhoto}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-full max-w-full md:max-w-4xl flex flex-col items-center justify-center"
              >
                <img
                  src={prePrimaryShowcaseItems[activePhoto].src}
                  alt={prePrimaryShowcaseItems[activePhoto].alt}
                  className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl border border-white/5 shadow-2xl"
                />
              </motion.div>

              {/* Right Navigation Arrow */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 z-10 p-3 bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white rounded-full transition-all cursor-pointer hidden sm:block"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Info Bar & Mobile Swiper Controls */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="w-full max-w-3xl text-center flex flex-col items-center gap-2 text-white px-4"
            >
              {/* Title display */}
              <div className="space-y-1">
                <span className="text-[11px] font-black tracking-widest text-[#F7B801] uppercase bg-[#3D348B] px-3 py-1 rounded-full">
                  {prePrimaryShowcaseItems[activePhoto].section}
                </span>
                <p className="text-base md:text-xl font-black text-white tracking-wide max-w-2xl leading-snug mt-2">
                  {prePrimaryShowcaseItems[activePhoto].title}
                </p>
                <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
                  {prePrimaryShowcaseItems[activePhoto].description}
                </p>
                <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Photo {activePhoto + 1} of {prePrimaryShowcaseItems.length}
                </p>
              </div>

              {/* Mobile Arrows (Visible only on small screens) */}
              <div className="flex sm:hidden items-center gap-6 mt-1">
                <button
                  onClick={handlePrev}
                  className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full cursor-pointer text-white"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full cursor-pointer text-white"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
