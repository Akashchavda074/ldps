"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X, FileText, PlusCircle, Save } from "lucide-react";
import { gisMenuItems } from "@/data/gisMenu";

type Section = {
  title: string;
  content: string[];
};

type PageItem = {
  _id: string;
  slug: string;
  title: string;
  group: string;
  sections: Section[];
};

export default function AdminPagesPage() {
  const [items, setItems] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Partial<PageItem> | null>(null);

  async function fetchItems() {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/admin/pages", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to fetch pages.");
      }
      setItems(data as PageItem[]);
    } catch (fetchError) {
      const message = fetchError instanceof Error ? fetchError.message : "Failed to fetch pages.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  function startEditing(slug: string) {
    const existing = items.find((p) => p.slug === slug);
    const menuItem = gisMenuItems.find((m) => m.slug === slug);

    if (existing) {
      setEditingPage({ ...existing });
    } else {
      setEditingPage({
        slug,
        title: menuItem?.title ?? slug,
        group: menuItem?.group ?? "Other",
        sections: [{ title: "Introduction", content: [""] }],
      });
    }
    setModalOpen(true);
  }

  function addSection() {
    if (!editingPage) return;
    const sections = [...(editingPage.sections || []), { title: "", content: [""] }];
    setEditingPage({ ...editingPage, sections });
  }

  function removeSection(index: number) {
    if (!editingPage) return;
    const sections = editingPage.sections?.filter((_, i) => i !== index);
    setEditingPage({ ...editingPage, sections });
  }

  function updateSectionTitle(index: number, title: string) {
    if (!editingPage) return;
    const sections = [...(editingPage.sections || [])];
    sections[index].title = title;
    setEditingPage({ ...editingPage, sections });
  }

  function addLineToSection(sIndex: number) {
    if (!editingPage) return;
    const sections = [...(editingPage.sections || [])];
    sections[sIndex].content.push("");
    setEditingPage({ ...editingPage, sections });
  }

  function updateLine(sIndex: number, lIndex: number, text: string) {
    if (!editingPage) return;
    const sections = [...(editingPage.sections || [])];
    sections[sIndex].content[lIndex] = text;
    setEditingPage({ ...editingPage, sections });
  }

  function removeLine(sIndex: number, lIndex: number) {
    if (!editingPage) return;
    const sections = [...(editingPage.sections || [])];
    sections[sIndex].content = sections[sIndex].content.filter((_, i) => i !== lIndex);
    setEditingPage({ ...editingPage, sections });
  }

  async function onSave() {
    if (!editingPage || !editingPage.slug) return;
    try {
      setSaving(true);
      setError("");

      const response = await fetch("/api/admin/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingPage._id,
          slug: editingPage.slug,
          title: editingPage.title,
          group: editingPage.group,
          sections: editingPage.sections,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Save failed.");
      }

      setModalOpen(false);
      setEditingPage(null);
      await fetchItems();
    } catch (saveError) {
      const message = saveError instanceof Error ? saveError.message : "Save failed.";
      setError(message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-2xl border border-teal/10 shadow-sm overflow-hidden text-gray-800">
        <div className="p-6 md:p-8 border-b border-teal/10">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-accent">Admin</p>
          <h1 className="text-3xl md:text-4xl font-black text-primary mt-2 flex items-center gap-3">
            <FileText className="text-accent" />
            Static Pages Content
          </h1>
          <p className="text-gray-400 font-medium mt-2">Manage the text and sections of your website&apos;s informative pages.</p>
        </div>

        <div className="p-6">
          {error ? <p className="mb-4 text-sm font-semibold text-error">{error}</p> : null}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gisMenuItems
              .filter(m => m.slug !== 'home' && !m.external)
              .map((menuItem) => {
                const isManaged = items.some((p) => p.slug === menuItem.slug);
                return (
                  <div 
                    key={menuItem.slug}
                    className="p-5 border-2 border-gray-100 rounded-2xl hover:border-primary/20 transition-all group"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{menuItem.group}</p>
                        <h3 className="font-black text-primary uppercase mt-1">{menuItem.title}</h3>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${isManaged ? 'bg-green-500' : 'bg-gray-200'}`} title={isManaged ? 'Managed in DB' : 'Using Fallback Data'} />
                    </div>
                    
                    <button
                      onClick={() => startEditing(menuItem.slug)}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary/5 text-primary font-bold text-xs uppercase tracking-wider hover:bg-primary hover:text-white transition-all"
                    >
                      <Pencil size={14} />
                      Edit Content
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {modalOpen && editingPage && (
        <div className="fixed inset-0 z-[100] bg-primary/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl h-[90vh] bg-white rounded-[2.5rem] shadow-2xl border border-primary/10 flex flex-col overflow-hidden text-gray-800">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 shrink-0">
              <div>
                <h2 className="text-2xl font-black text-primary uppercase tracking-tight">Editing: {editingPage.title}</h2>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Slug: {editingPage.slug} • Group: {editingPage.group}</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-2.5 rounded-full hover:bg-gray-200 text-primary transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
              {editingPage.sections?.map((section, sIndex) => (
                <div key={sIndex} className="bg-gray-50/50 rounded-3xl border-2 border-gray-100 p-6 space-y-4 relative group">
                  <button 
                    onClick={() => removeSection(sIndex)}
                    className="absolute top-4 right-4 p-2 text-error opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error/5 rounded-lg"
                    title="Remove Section"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-2">Section Title</label>
                    <input 
                      value={section.title}
                      onChange={(e) => updateSectionTitle(sIndex, e.target.value)}
                      placeholder="e.g. Introduction, Our Mission, etc."
                      className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-2.5 text-primary font-bold focus:border-accent focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-2">Content Lines</label>
                    <div className="space-y-3">
                      {section.content.map((line, lIndex) => (
                        <div key={lIndex} className="flex gap-2">
                          <textarea 
                            value={line}
                            onChange={(e) => updateLine(sIndex, lIndex, e.target.value)}
                            rows={2}
                            className="flex-1 bg-white border-2 border-gray-100 rounded-xl px-4 py-2 text-sm text-gray-600 font-medium focus:border-accent focus:outline-none transition-all resize-none"
                          />
                          <button 
                            onClick={() => removeLine(sIndex, lIndex)}
                            className="p-2 text-gray-300 hover:text-error transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                      <button 
                        onClick={() => addLineToSection(sIndex)}
                        className="inline-flex items-center gap-2 text-[11px] font-black text-secondary hover:text-primary transition-colors ml-2 uppercase"
                      >
                        <PlusCircle size={14} />
                        Add Line
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button 
                onClick={addSection}
                className="w-full py-4 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 font-black uppercase text-xs tracking-[0.2em] hover:border-primary/20 hover:text-primary transition-all flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Add New Section
              </button>
            </div>

            <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 shrink-0">
              <button
                onClick={() => setModalOpen(false)}
                className="px-6 py-3 rounded-xl border-2 border-gray-100 text-gray-400 font-black uppercase text-xs tracking-widest hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={onSave}
                disabled={saving}
                className="px-8 py-3 rounded-xl bg-primary text-white font-black uppercase text-xs tracking-widest hover:bg-secondary shadow-lg shadow-primary/20 disabled:opacity-70 transition-all flex items-center gap-2"
              >
                {saving ? "Saving..." : (
                  <>
                    <Save size={16} />
                    Save Page Content
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
