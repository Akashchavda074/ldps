import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { gisMenuItems } from "@/data/gisMenu";

const groups = ["Top", "About", "Academics", "Schooling", "Gallery", "More"] as const;

export default function GisMenuPage() {
  return (
    <main className="min-h-screen pt-32 lg:pt-40 bg-[#f7fbf8]">
      <Navbar />
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black text-navy mb-2">GIS Menu Mirror</h1>
          <p className="text-teal font-medium mb-8">Total menu pages mirrored: {gisMenuItems.length}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.map((group) => (
              <section key={group} className="bg-white border border-teal/10 rounded-xl p-5">
                <h2 className="text-2xl font-black text-navy mb-4">{group}</h2>
                <ul className="space-y-2">
                  {gisMenuItems
                    .filter((item) => item.group === group)
                    .map((item) => (
                      <li key={item.slug}>
                        <Link href={`/gis/${item.slug}`} className="text-teal font-semibold hover:text-navy">
                          {item.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
