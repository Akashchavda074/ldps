"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Bell, Download, FolderPlus, Settings, SquarePen, Trash2 } from "lucide-react";
import { schoolImages } from "@/data/lpsVidhyawadiDatabase";

type UploadItem = {
  id: string;
  page: string;
  section: string;
  title: string;
  description: string;
  fileName: string;
  src: string;
  uploadedAt: string;
};

type Album = {
  id: string;
  title: string;
  page: string;
  category: string;
  date: string;
  description: string;
  photos: string[];
  cover: string;
  featured: boolean;
  source: "database" | "upload";
};

const PAGE_OPTIONS = ["All Pages", "home", "about", "contact", "admin"];
const DEFAULT_CATEGORIES = ["All Categories", "Campus", "Events", "Sports", "Cultural", "Infrastructure"];

function toDate(dateIso: string) {
  const date = new Date(dateIso);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function buildBaseAlbums(): Album[] {
  const logo = schoolImages.find((item) => item.category === "brand");
  const banner = schoolImages.find((item) => item.category === "banner");
  const gallery = schoolImages.filter((item) => item.category === "gallery");
  const contacts = schoolImages.filter((item) => item.category === "contact");

  return [
    {
      id: "db-home-hero",
      title: "Home Hero Slides",
      page: "home",
      category: "Campus",
      date: "29/11/2025",
      description: "Homepage main visuals and hero coverage.",
      photos: [banner?.src, gallery[0]?.src, gallery[1]?.src].filter(Boolean) as string[],
      cover: banner?.src ?? gallery[0]?.src ?? "/lps-vidhyawadi/about-banner.jpg",
      featured: true,
      source: "database",
    },
    {
      id: "db-home-gallery",
      title: "Home Gallery",
      page: "home",
      category: "Events",
      date: "29/11/2025",
      description: "School events and activity highlights.",
      photos: gallery.slice(0, 6).map((item) => item.src),
      cover: gallery[2]?.src ?? "/lps-vidhyawadi/about-banner.jpg",
      featured: false,
      source: "database",
    },
    {
      id: "db-about-media",
      title: "About Page Media",
      page: "about",
      category: "Cultural",
      date: "28/11/2025",
      description: "About page visual media block.",
      photos: [banner?.src, gallery[3]?.src, gallery[4]?.src].filter(Boolean) as string[],
      cover: gallery[3]?.src ?? banner?.src ?? "/lps-vidhyawadi/about-banner.jpg",
      featured: false,
      source: "database",
    },
    {
      id: "db-contact-assets",
      title: "Contact Assets",
      page: "contact",
      category: "Infrastructure",
      date: "27/11/2025",
      description: "Contact and institutional identity assets.",
      photos: [logo?.src, ...contacts.map((item) => item.src)].filter(Boolean) as string[],
      cover: logo?.src ?? "/lps-vidhyawadi/logo.jpg",
      featured: false,
      source: "database",
    },
  ];
}

export default function AdminGalleryManager() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [activePage, setActivePage] = useState("All Pages");
  const [showCategoryEditor, setShowCategoryEditor] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [showNewAlbum, setShowNewAlbum] = useState(false);
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [newAlbumPage, setNewAlbumPage] = useState("home");
  const [newAlbumCategory, setNewAlbumCategory] = useState("Campus");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editorAlbumId, setEditorAlbumId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("Campus");
  const [editDate, setEditDate] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [uploads, setUploads] = useState<UploadItem[]>([]);

  const [albums, setAlbums] = useState<Album[]>(buildBaseAlbums());

  useEffect(() => {
    async function loadUploads() {
      try {
        const response = await fetch("/data/admin-uploads.json", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as { uploads?: UploadItem[] };
        setUploads(data.uploads ?? []);
      } catch {
        setUploads([]);
      }
    }

    loadUploads();
  }, []);

  useEffect(() => {
    const imageUploads = uploads.filter((item) => /\.(png|jpe?g|webp|gif|svg)$/i.test(item.src));
    if (!imageUploads.length) return;

    const grouped = new Map<string, UploadItem[]>();
    for (const item of imageUploads) {
      const key = `${item.page}-${item.section}`;
      const previous = grouped.get(key) ?? [];
      previous.push(item);
      grouped.set(key, previous);
    }

    const uploadAlbums: Album[] = Array.from(grouped.entries()).map(([key, items]) => {
      const first = items[0];
      return {
        id: `upload-${key}`,
        title: first.title || `${first.page} / ${first.section}`,
        page: first.page,
        category: "Events",
        date: toDate(first.uploadedAt),
        description: first.description || "Uploaded media album",
        photos: items.map((item) => item.src),
        cover: first.src,
        featured: false,
        source: "upload",
      };
    });

    setAlbums((previous) => {
      const withoutUpload = previous.filter((item) => item.source !== "upload");
      return [...withoutUpload, ...uploadAlbums];
    });
  }, [uploads]);

  const filteredAlbums = useMemo(() => {
    return albums.filter((album) => {
      const categoryMatch = activeCategory === "All Categories" || album.category === activeCategory;
      const pageMatch = activePage === "All Pages" || album.page === activePage;
      return categoryMatch && pageMatch;
    });
  }, [activeCategory, activePage, albums]);

  function downloadExcelLikeCsv() {
    const rows = [
      ["Album Title", "Page", "Category", "Date", "Photos", "Cover", "Source", "Featured"],
      ...filteredAlbums.map((album) => [
        album.title,
        album.page,
        album.category,
        album.date,
        String(album.photos.length),
        album.cover,
        album.source,
        album.featured ? "Yes" : "No",
      ]),
    ];

    const csv = rows
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, "\"\"")}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gallery-${activePage}-${activeCategory}.csv`.toLowerCase().replace(/\s+/g, "-");
    link.click();
    URL.revokeObjectURL(url);
  }

  function addCategory() {
    const next = newCategory.trim();
    if (!next || categories.includes(next)) return;
    setCategories((previous) => [...previous, next]);
    setNewCategory("");
  }

  function addAlbum() {
    if (!newAlbumTitle.trim()) return;
    const sourceImage = schoolImages.find((item) => item.category === "gallery")?.src ?? "/lps-vidhyawadi/about-banner.jpg";
    const now = toDate(new Date().toISOString());
    const nextAlbum: Album = {
      id: `custom-${Date.now()}`,
      title: newAlbumTitle.trim(),
      page: newAlbumPage,
      category: newAlbumCategory,
      date: now,
      description: "",
      photos: [sourceImage],
      cover: sourceImage,
      featured: false,
      source: "upload",
    };
    setAlbums((previous) => [nextAlbum, ...previous]);
    setNewAlbumTitle("");
    setShowNewAlbum(false);
  }

  function openEditModal(id: string) {
    const album = albums.find((item) => item.id === id);
    if (!album) return;
    setEditorAlbumId(id);
    setEditTitle(album.title);
    setEditCategory(album.category);
    setEditDate(album.date);
    setEditDescription(album.description || "");
    setNewImageUrl("");
    setEditModalOpen(true);
  }

  function addImageToAlbum(id: string) {
    const image = newImageUrl.trim();
    if (!image) return;

    setAlbums((previous) =>
      previous.map((item) => {
        if (item.id !== id) return item;
        const nextPhotos = item.photos.includes(image) ? item.photos : [...item.photos, image];
        return {
          ...item,
          photos: nextPhotos,
          cover: item.cover || image,
        };
      })
    );
    setNewImageUrl("");
  }

  function removeImageFromAlbum(id: string, image: string) {
    setAlbums((previous) =>
      previous.map((item) => {
        if (item.id !== id) return item;
        const nextPhotos = item.photos.filter((photo) => photo !== image);
        return {
          ...item,
          photos: nextPhotos,
          cover: item.cover === image ? nextPhotos[0] ?? "" : item.cover,
        };
      })
    );
  }

  function setCoverImage(id: string, image: string) {
    setAlbums((previous) => previous.map((item) => (item.id === id ? { ...item, cover: image } : item)));
  }

  const editorAlbum = useMemo(() => albums.find((item) => item.id === editorAlbumId) ?? null, [albums, editorAlbumId]);

  function saveEditedAlbum() {
    if (!editorAlbumId) return;
    setAlbums((previous) =>
      previous.map((item) =>
        item.id === editorAlbumId
          ? {
              ...item,
              title: editTitle.trim() || item.title,
              category: editCategory,
              date: editDate.trim() || item.date,
              description: editDescription.trim(),
            }
          : item
      )
    );
    setEditModalOpen(false);
  }

  function removeAlbum(id: string) {
    setAlbums((previous) => previous.filter((item) => item.id !== id));
  }

  function toggleFeatured(id: string) {
    setAlbums((previous) => previous.map((item) => (item.id === id ? { ...item, featured: !item.featured } : item)));
  }

  return (
    <>
      <section className="rounded-3xl border border-white/15 bg-[#112759]/70 p-6 md:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <p className="text-xs tracking-[0.4em] text-white/70 font-black uppercase">Media</p>
          <h1 className="text-4xl font-black mt-2">Photo Gallery</h1>
          <p className="text-white/70 mt-2">Curate visual collections of campus life and events.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={downloadExcelLikeCsv} className="h-11 px-5 rounded-2xl border border-white/20 bg-white/5 font-bold inline-flex items-center gap-2">
            <Download size={16} />
            Download Excel
          </button>
          <button onClick={() => setShowCategoryEditor((value) => !value)} className="h-11 px-5 rounded-2xl border border-white/20 bg-white/5 font-bold inline-flex items-center gap-2">
            <Settings size={16} />
            Manage Categories
          </button>
          <button onClick={() => setShowNewAlbum((value) => !value)} className="h-11 px-5 rounded-2xl border border-pink-400/40 bg-gradient-to-r from-pink-500/20 to-purple-500/20 font-bold inline-flex items-center gap-2">
            <FolderPlus size={16} />
            New Album
          </button>
        </div>
      </section>

      {showCategoryEditor ? (
        <section className="rounded-2xl border border-white/15 bg-[#0f234f]/80 p-4 flex flex-col md:flex-row gap-3 md:items-center">
          <input
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            placeholder="Add category"
            className="h-10 px-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50"
          />
          <button onClick={addCategory} className="h-10 px-4 rounded-lg bg-pink-500 font-bold">
            Add Category
          </button>
        </section>
      ) : null}

      {showNewAlbum ? (
        <section className="rounded-2xl border border-white/15 bg-[#0f234f]/80 p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            value={newAlbumTitle}
            onChange={(event) => setNewAlbumTitle(event.target.value)}
            placeholder="Album title"
            className="h-10 px-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50"
          />
          <select value={newAlbumPage} onChange={(event) => setNewAlbumPage(event.target.value)} className="h-10 px-3 rounded-lg bg-white/10 border border-white/20 text-white">
            {PAGE_OPTIONS.filter((page) => page !== "All Pages").map((page) => (
              <option key={page} value={page} className="text-black">
                {page}
              </option>
            ))}
          </select>
          <select value={newAlbumCategory} onChange={(event) => setNewAlbumCategory(event.target.value)} className="h-10 px-3 rounded-lg bg-white/10 border border-white/20 text-white">
            {categories.filter((category) => category !== "All Categories").map((category) => (
              <option key={category} value={category} className="text-black">
                {category}
              </option>
            ))}
          </select>
          <button onClick={addAlbum} className="h-10 px-4 rounded-lg bg-green-primary font-bold text-white">
            Save Album
          </button>
        </section>
      ) : null}

      <section className="flex flex-wrap gap-3">
        {PAGE_OPTIONS.map((item) => (
          <button
            key={item}
            onClick={() => setActivePage(item)}
            className={`px-4 h-10 rounded-xl text-sm font-bold uppercase ${
              activePage === item ? "bg-cyan-500 text-white" : "bg-white/10 text-white/80 hover:bg-white/20"
            }`}
          >
            {item}
          </button>
        ))}
      </section>

      <section className="flex flex-wrap gap-3">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setActiveCategory(item)}
            className={`px-5 h-10 rounded-xl text-sm font-bold ${
              activeCategory === item ? "bg-pink-500 text-white" : "bg-white/10 text-white/80 hover:bg-white/20"
            }`}
          >
            {item}
          </button>
        ))}
      </section>

      <section className="rounded-3xl border border-white/15 bg-[#0f234f]/80 overflow-hidden">
        <div className="px-6 py-5 text-white/70 font-medium">Showing {filteredAlbums.length} albums</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-white/50 border-y border-white/10">
                <th className="px-6 py-4">Album Title</th>
                <th className="px-6 py-4">Page</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Photos</th>
                <th className="px-6 py-4">Cover</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlbums.map((album) => (
                <tr key={album.id} className="border-b border-white/10">
                  <td className="px-6 py-4 text-xl font-semibold">{album.title}</td>
                  <td className="px-6 py-4 text-white/75 uppercase">{album.page}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-bold rounded-lg bg-white/10 border border-white/10 uppercase">
                      {album.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/75">{album.date}</td>
                  <td className="px-6 py-4 text-white/75">{album.photos.length} images</td>
                  <td className="px-6 py-4">
                    <div className="relative w-14 h-10 rounded-md overflow-hidden border border-white/20">
                      <Image src={album.cover} alt={album.title} fill sizes="56px" className="object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-white/10 text-xs font-bold uppercase">{album.source}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(album.id)}
                        className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
                        title="Edit"
                      >
                        <SquarePen size={14} />
                      </button>
                      <button onClick={() => toggleFeatured(album.id)} className={`w-9 h-9 rounded-lg flex items-center justify-center ${album.featured ? "bg-cyan-500/70" : "bg-white/10 hover:bg-white/20"}`} title="Feature">
                        <Bell size={14} />
                      </button>
                      <button onClick={() => removeAlbum(album.id)} className="w-9 h-9 rounded-lg bg-red-500/20 hover:bg-red-500/35 flex items-center justify-center" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {editModalOpen && editorAlbum ? (
        <div className="fixed inset-0 z-50 bg-[#060d22]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl rounded-3xl border border-white/15 bg-[#0b1b45] overflow-hidden max-h-[92vh] overflow-y-auto">
            <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-4xl font-black">Edit Gallery</h3>
                <p className="text-white/60 mt-1">Photo galleries and albums</p>
              </div>
              <button onClick={() => setEditModalOpen(false)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 font-black text-xl">
                ×
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-white/60 block mb-2">Title *</label>
                <input
                  value={editTitle}
                  onChange={(event) => setEditTitle(event.target.value)}
                  className="w-full h-12 rounded-full bg-[#061434] border border-white/15 px-5 text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-white/60 block mb-2">Category</label>
                  <select
                    value={editCategory}
                    onChange={(event) => setEditCategory(event.target.value)}
                    className="w-full h-12 rounded-full bg-[#061434] border border-white/15 px-5 text-white"
                  >
                    {categories.filter((item) => item !== "All Categories").map((item) => (
                      <option key={item} value={item} className="text-black">
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-white/60 block mb-2">Date</label>
                  <input
                    value={editDate}
                    onChange={(event) => setEditDate(event.target.value)}
                    placeholder="dd-mm-yyyy"
                    className="w-full h-12 rounded-full bg-[#061434] border border-white/15 px-5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-white/60 block mb-2">Description</label>
                <textarea
                  value={editDescription}
                  onChange={(event) => setEditDescription(event.target.value)}
                  placeholder="Brief description..."
                  rows={4}
                  className="w-full rounded-3xl bg-[#061434] border border-white/15 px-5 py-4 text-white resize-y"
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-white/60 block mb-3">Images</label>
                {editorAlbum.photos.length === 0 ? (
                  <p className="text-white/60 text-sm">No images yet in this album.</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    {editorAlbum.photos.map((photo) => (
                      <div key={photo} className="rounded-xl border border-white/15 bg-[#0a214f] p-2">
                        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                          <Image src={photo} alt={editorAlbum.title} fill sizes="(max-width: 768px) 45vw, (max-width: 1280px) 30vw, 220px" className="object-cover" />
                        </div>
                        <div className="mt-2 flex gap-2">
                          <button
                            onClick={() => setCoverImage(editorAlbum.id, photo)}
                            className={`flex-1 h-8 rounded text-xs font-black ${editorAlbum.cover === photo ? "bg-cyan-500 text-white" : "bg-white/10 hover:bg-white/20"}`}
                          >
                            {editorAlbum.cover === photo ? "Cover" : "Set Cover"}
                          </button>
                          <button onClick={() => removeImageFromAlbum(editorAlbum.id, photo)} className="px-2 h-8 rounded text-xs font-black bg-red-500/20 hover:bg-red-500/35">
                            Del
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    value={newImageUrl}
                    onChange={(event) => setNewImageUrl(event.target.value)}
                    placeholder="Paste image URL here"
                    className="flex-1 h-11 rounded-full bg-[#061434] border border-white/15 px-5 text-white"
                  />
                  <button onClick={() => addImageToAlbum(editorAlbum.id)} className="h-11 px-5 rounded-full bg-green-primary font-black">
                    Add Image
                  </button>
                </div>
              </div>
            </div>

            <div className="px-8 py-5 border-t border-white/10 flex items-center justify-end gap-3 bg-white/5">
              <button onClick={() => setEditModalOpen(false)} className="px-5 h-11 rounded-full bg-white/10 hover:bg-white/20 font-bold">
                Cancel
              </button>
              <button onClick={saveEditedAlbum} className="px-6 h-11 rounded-full bg-blue-500 hover:bg-blue-400 font-black">
                Save Gallery
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
