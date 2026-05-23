import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { admissionPage, curriculumPage, getSection, resourcesPage } from "@/data/lpsVidhyawadiDatabase";
import { BookOpen, GraduationCap, School, Sparkles } from "lucide-react";

export default function AcademicsPage() {
  const curriculumOverview = getSection(curriculumPage, "Overview");
  const curriculumLevels = getSection(curriculumPage, "Levels");
  const learningSupport = getSection(curriculumPage, "Learning Support");
  const resources = getSection(resourcesPage, "Our Resources and Strengths");
  const admission = getSection(admissionPage, "Admission Process");

  return (
    <main className="min-h-screen pt-32 lg:pt-40 bg-[#f7fbf8]">
      <Navbar />

      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[2rem] bg-gradient-to-r from-navy to-teal p-8 lg:p-12 text-white overflow-hidden relative">
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-mint/20 blur-2xl" />
            <span className="text-mint font-black uppercase tracking-[0.35em] text-xs mb-4 block">Academics</span>
            <h1 className="text-4xl lg:text-6xl font-black leading-tight">Academic Excellence</h1>
            <p className="text-white/85 max-w-4xl mt-5 font-medium leading-relaxed">
              {curriculumOverview[0]}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="bg-white border border-teal/10 rounded-2xl p-7 shadow-sm lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <School className="text-green-primary" size={20} />
              <h2 className="text-2xl font-black text-navy">Curriculum Levels</h2>
            </div>
            <ul className="space-y-2">
              {curriculumLevels.map((item) => (
                <li key={item} className="text-teal font-medium">• {item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-teal/10 rounded-2xl p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <BookOpen className="text-green-primary" size={20} />
              <h2 className="text-2xl font-black text-navy">Learning Support</h2>
            </div>
            <ul className="space-y-2">
              {learningSupport.map((item) => (
                <li key={item} className="text-teal font-medium">• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto bg-white border border-teal/10 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <Sparkles className="text-green-primary" size={20} />
            <h2 className="text-2xl font-black text-navy">Teaching Resources</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.slice(0, 10).map((item) => (
              <div key={item} className="bg-[#f4faf8] border border-teal/10 rounded-xl p-4 text-teal font-medium">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-mint/25 to-white border border-teal/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-5">
            <GraduationCap className="text-green-primary" size={20} />
            <h2 className="text-2xl font-black text-navy">Admission Process Snapshot</h2>
          </div>
          <ul className="space-y-3">
            {admission.slice(0, 5).map((item) => (
              <li key={item} className="text-teal font-medium">• {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
