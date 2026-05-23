import rawKnowledgeBase from "../../lps_vidhyawadi_content_knowledge_base.json";

type RawSection = [string, string[]];

export type SchoolPage = {
  title: string;
  url: string;
  status: string;
  sections: RawSection[];
};

export type SchoolPageWithSlug = SchoolPage & { slug: string };

export type SchoolImage = {
  file: string;
  src: string;
  alt: string;
  sourceUrl: string;
  category: "brand" | "banner" | "gallery" | "contact";
};

const curatedPages = rawKnowledgeBase.pages as SchoolPage[];

function cleanStatusText(input: string) {
  return input
    .replace("Captured from live page/search cache. | Auto-scraped from live page", "")
    .replace("Captured from live page/search cache.", "")
    .replace("| Auto-scraped from live page", "")
    .replace("Auto-scraped from live page", "")
    .replace(/\s+/g, " ")
    .replace(/\s+\|\s+/g, " | ")
    .trim();
}

export const schoolImages: SchoolImage[] = [
  {
    file: "logo.jpg",
    src: "/lps-vidhyawadi/logo.jpg",
    alt: "Leeladevi Parasmal Sancheti English Medium Sr. Sec. School logo",
    sourceUrl: "https://www.lpsvidhyawadi.com/Images/Leela_Devi_College_Logo.jpg",
    category: "brand",
  },
  {
    file: "about-banner.jpg",
    src: "/lps-vidhyawadi/about-banner.jpg",
    alt: "LPS Vidyawadi campus banner",
    sourceUrl: "https://www.lpsvidhyawadi.com/Images/aboutBanner.jpg",
    category: "banner",
  },
  ...Array.from({ length: 12 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");

    return {
      file: `gallery-${number}.jpg`,
      src: `/lps-vidhyawadi/gallery-${number}.jpg`,
      alt: `LPS Vidyawadi gallery image ${index + 1}`,
      sourceUrl: "https://www.lpsvidhyawadi.com/Gallery.aspx",
      category: "gallery" as const,
    };
  }),
  {
    file: "phone.png",
    src: "/lps-vidhyawadi/phone.png",
    alt: "Phone contact icon",
    sourceUrl: "https://www.lpsvidhyawadi.com/Images/phoneNo.png",
    category: "contact",
  },
  {
    file: "email.png",
    src: "/lps-vidhyawadi/email.png",
    alt: "Email contact icon",
    sourceUrl: "https://www.lpsvidhyawadi.com/Images/emaiId.png",
    category: "contact",
  },
];

export const curatedSchoolDatabase = {
  site: rawKnowledgeBase.site,
  capturedOn: rawKnowledgeBase.captured_on,
  sourceDocuments: [
    "lps_vidhyawadi_content_extraction.docx",
    "lps_vidhyawadi_content_knowledge_base.json",
    "lps_vidhyawadi_content_knowledge_base.md",
  ],
  sourceWebsite: "https://www.lpsvidhyawadi.com/",
  pages: curatedPages,
  images: schoolImages,
};

export const schoolDatabase = curatedSchoolDatabase;

const pages = schoolDatabase.pages;

export function slugifyPageTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const contentPagesWithSlug: SchoolPageWithSlug[] = pages.map((page) => ({
  ...page,
  status: cleanStatusText(page.status),
  slug: slugifyPageTitle(page.title),
}));

export function getPageBySlug(slug: string) {
  return contentPagesWithSlug.find((page) => page.slug === slug);
}

export const homePage = pages.find((page) => page.title === "Home");
export const introductionPage = pages.find((page) => page.title === "Introduction");
export const resourcesPage = pages.find((page) => page.title === "Resources");
export const admissionPage = pages.find((page) => page.title === "Admission Procedure");
export const curriculumPage = pages.find((page) => page.title === "Academic Curriculum");
export const beyondAcademicsPage = pages.find((page) => page.title === "Beyond Academics");
export const contactPage = pages.find((page) => page.title === "Contact Us");

export function getSection(page: SchoolPage | undefined, sectionTitle: string) {
  return page?.sections.find(([title]) => title === sectionTitle)?.[1] ?? [];
}

export const heroSlides = [
  {
    image: "/lps-vidhyawadi/about-banner.jpg",
    subtitle: "Premier Girls' Residential Institution",
    title: "QUALITY",
    highlight: "EDUCATION.",
    description: "Providing healthy learning environment and quality education at Vidyawadi, Khimel.",
  },
  {
    image: "/lps-vidhyawadi/gallery-01.jpg",
    subtitle: "Academic Excellence",
    title: "NURTURING",
    highlight: "POTENTIAL.",
    description: "CBSE education from L.K.G. to XII in a caring atmosphere built for confidence, leadership, and wellness.",
  },
  {
    image: "/lps-vidhyawadi/gallery-02.jpg",
    subtitle: "65 Acre Campus",
    title: "HOME",
    highlight: "AWAY FROM HOME.",
    description: "Hostels, labs, library, sports grounds, dining, transport, and support systems for holistic student life.",
  },
];

export const noticeColumns = [
  {
    title: "News & Circulars",
    items: getSection(homePage, "News, Notices & Circulars"),
  },
  {
    title: "Announcements",
    items: getSection(homePage, "Announcements"),
  },
  {
    title: "Admission",
    items: getSection(admissionPage, "Admission Process").slice(0, 4),
  },
  {
    title: "School Rules",
    items: getSection(pages.find((page) => page.title === "Rules and Regulations"), "School Rules").slice(0, 4),
  },
];

export const dashboardStats = [
  { label: "Content Pages", value: pages.length.toString() },
  { label: "Content Sections", value: pages.reduce((total, page) => total + page.sections.length, 0).toString() },
  { label: "Local Images", value: schoolImages.length.toString() },
  { label: "Campus Area", value: "65 acres" },
];
