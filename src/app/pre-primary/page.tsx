import React from "react";
import PrePrimaryPageClient from "@/components/PrePrimaryPageClient";

export const metadata = {
  title: "Pre-Primary School & Early Childhood Education | LPS Vidyawadi",
  description:
    "Experience world-class early childhood education at LPS Vidyawadi's Pre-Primary Wing. Our preschool curriculum encompasses interactive academics, co-curriculars, sports, skill classes, and smart projector sessions.",
  keywords: [
    "pre-primary school",
    "preschool learning",
    "LPS Vidyawadi primary",
    "early education",
    "Ganga International School pre school",
  ],
  openGraph: {
    title: "Pre-Primary School & Early Childhood Education | LPS Vidyawadi",
    description:
      "Experience world-class early childhood education at LPS Vidyawadi. View high-quality images of preschool life, co-curriculars, and skill classes.",
    type: "website",
    locale: "en_US",
    siteName: "LPS Vidyawadi",
  },
};

export default function PrePrimaryPage() {
  return <PrePrimaryPageClient />;
}
