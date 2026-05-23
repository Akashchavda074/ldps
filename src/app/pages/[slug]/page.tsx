import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { contentPagesWithSlug, getPageBySlug } from "@/data/lpsVidhyawadiDatabase";

export function generateStaticParams() {
  return contentPagesWithSlug.map((page) => ({ slug: page.slug }));
}

export default async function ScrapedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 lg:pt-40 bg-[#f7fbf8]">
      <Navbar />

      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[2rem] bg-gradient-to-r from-navy to-teal p-8 lg:p-12 text-white">
            <span className="text-mint font-black uppercase tracking-[0.35em] text-xs mb-4 block">School Content</span>
            <h1 className="text-4xl lg:text-6xl font-black">{page.title}</h1>
            {page.status ? <p className="text-white/75 font-medium mt-4">{page.status}</p> : null}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto space-y-6">
          {page.sections.map(([title, lines]) => (
            <article key={title} className="bg-white border border-teal/10 rounded-2xl p-7 shadow-sm">
              <h2 className="text-2xl font-black text-navy mb-4">{title}</h2>
              <ul className="space-y-3">
                {lines.map((line) => (
                  <li key={line} className="text-teal font-medium leading-relaxed">
                    • {line}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
