"use client";

import React from "react";
import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 px-5 py-2.5 bg-[#3D348B] hover:bg-[#2C256B] text-white font-black text-xs uppercase rounded-xl shadow-lg shadow-[#3D348B]/25 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
    >
      <Printer size={14} />
      Print Circular
    </button>
  );
}
