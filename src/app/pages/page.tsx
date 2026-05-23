import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { contentPagesWithSlug } from "@/data/lpsVidhyawadiDatabase";
import { ArrowUpRight } from "lucide-react";

export default function AllPagesIndex() {
  return (
    <main className="min-h-screen pt-32 lg:pt-40 bg-[#f7fbf8]">
      <Navbar />

      <section className="px-6 mb-10">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[2rem] bg-gradient-to-r from-teal to-navy p-8 lg:p-12 text-white">
            <span className="text-mint font-black uppercase tracking-[0.35em] text-xs mb-4 block">All Pages</span>
            <h1 className="text-4xl lg:text-6xl font-black">LPS Content Directory</h1>
            <p className="text-white/80 font-medium mt-5">Browse all scraped and mapped school pages.</p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {contentPagesWithSlug.map((page) => (
            <Link
              key={page.slug}
              href={`/pages/${page.slug}`}
              className="bg-white border border-teal/10 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <h2 className="text-2xl font-black text-navy flex items-start justify-between gap-3">
                <span>{page.title}</span>
                <ArrowUpRight className="text-green-primary shrink-0 mt-1" size={18} />
              </h2>
              <p className="text-sm font-bold text-teal/70 mt-2 uppercase tracking-wider">{page.sections.length} sections</p>
              <p className="text-teal mt-4 line-clamp-3">{page.sections[0]?.[1]?.[0] ?? page.status}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
