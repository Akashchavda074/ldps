"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Upload, CheckCircle2, AlertTriangle } from "lucide-react";

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

function isImagePath(src: string) {
  return /\.(png|jpe?g|webp|gif|svg)$/i.test(src);
}

const PAGE_OPTIONS = [
  {
    value: "home",
    label: "Home Page",
    sections: [
      { value: "hero", label: "Hero Section" },
      { value: "notice", label: "Notice Board" },
      { value: "banner", label: "Intro Banner" },
      { value: "categories", label: "Category Grid" },
      { value: "life", label: "Life at LPS" },
      { value: "gallery", label: "Homepage Gallery" },
    ],
  },
  {
    value: "about",
    label: "About Page",
    sections: [
      { value: "banner", label: "About Banner" },
      { value: "gallery", label: "About Gallery" },
      { value: "documents", label: "About Documents" },
    ],
  },
  {
    value: "contact",
    label: "Contact Page",
    sections: [
      { value: "banner", label: "Contact Banner" },
      { value: "documents", label: "Contact Documents" },
    ],
  },
  {
    value: "admin",
    label: "Admin / Global",
    sections: [
      { value: "gallery", label: "Gallery" },
      { value: "documents", label: "Documents / PDFs" },
    ],
  },
];

export default function AdminUploadPanel() {
  const [page, setPage] = useState("home");
  const [section, setSection] = useState("hero");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploads, setUploads] = useState<UploadItem[]>([]);

  const selectedPage = useMemo(
    () => PAGE_OPTIONS.find((option) => option.value === page) ?? PAGE_OPTIONS[0],
    [page]
  );

  const selectedLabel = useMemo(() => {
    return selectedPage.sections.find((option) => option.value === section)?.label ?? "Section";
  }, [selectedPage, section]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!file) {
      setError("Please choose a file first.");
      return;
    }

    setLoading(true);

    try {
      const body = new FormData();
      body.set("page", page);
      body.set("section", section);
      body.set("title", title);
      body.set("description", description);
      body.set("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Upload failed.");
        return;
      }

      setUploads((previous) => [result.upload as UploadItem, ...previous]);
      setSuccess(`Uploaded to ${selectedPage.label} / ${selectedLabel}.`);
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Upload failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-white border border-teal/10 rounded-lg shadow-sm overflow-hidden mb-10">
      <div className="p-6 border-b border-teal/10 flex items-center gap-3">
        <Upload className="text-green-primary" size={22} />
        <h2 className="text-2xl font-black text-navy">Section-wise Upload Panel</h2>
      </div>

      <div className="p-6 grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-teal block mb-2">Section</label>
            <div className="mb-3">
              <label className="text-xs font-black uppercase tracking-widest text-teal block mb-2">Page</label>
              <select
                value={page}
                onChange={(event) => {
                  const nextPage = event.target.value;
                  const nextPageConfig = PAGE_OPTIONS.find((option) => option.value === nextPage) ?? PAGE_OPTIONS[0];
                  setPage(nextPage);
                  setSection(nextPageConfig.sections[0]?.value ?? "gallery");
                }}
                className="w-full border border-teal/20 rounded-lg px-3 py-2 text-navy font-semibold"
              >
                {PAGE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={section}
              onChange={(event) => setSection(event.target.value)}
              className="w-full border border-teal/20 rounded-lg px-3 py-2 text-navy font-semibold"
            >
              {selectedPage.sections.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-teal block mb-2">Title</label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Example: New Annual Day Banner"
              className="w-full border border-teal/20 rounded-lg px-3 py-2 text-navy font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-teal block mb-2">Description</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Short note for admin reference"
              rows={3}
              className="w-full border border-teal/20 rounded-lg px-3 py-2 text-navy font-semibold resize-y"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-teal block mb-2">File</label>
            <input
              type="file"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="w-full border border-teal/20 rounded-lg px-3 py-2 text-navy font-semibold"
            />
          </div>

          {error ? (
            <p className="text-error text-sm font-semibold flex items-center gap-2">
              <AlertTriangle size={16} />
              {error}
            </p>
          ) : null}

          {success ? (
            <p className="text-green-700 text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 size={16} />
              {success}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="bg-navy text-white px-5 py-3 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-teal transition-colors disabled:opacity-70"
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </form>

        <div>
          <p className="text-xs font-black uppercase tracking-widest text-teal mb-3">Recent Uploads (Current Session)</p>
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {uploads.length === 0 ? (
              <p className="text-sm text-teal/70 font-medium">No uploads yet in this session.</p>
            ) : null}
            {uploads.map((item) => (
              <div key={item.id} className="border border-teal/10 rounded-lg p-3 bg-[#f7fbf8]">
                <p className="text-sm font-black text-navy">{item.title || item.fileName}</p>
                <p className="text-xs font-bold text-teal uppercase tracking-wider mt-1">
                  {item.page} / {item.section}
                </p>
                {item.description ? <p className="text-sm text-teal mt-2">{item.description}</p> : null}
                {isImagePath(item.src) ? (
                  <div className="mt-3 relative w-full h-36 rounded-md overflow-hidden bg-mint/20">
                    <Image src={item.src} alt={item.title || item.fileName} fill sizes="(max-width: 1280px) 100vw, 520px" className="object-cover" />
                  </div>
                ) : (
                  <a
                    href={item.src}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm font-bold text-green-primary hover:text-navy"
                  >
                    Open uploaded file
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
