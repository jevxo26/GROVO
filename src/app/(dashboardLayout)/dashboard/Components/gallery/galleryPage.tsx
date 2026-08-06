"use client";

import { Upload, Image as ImageIcon, HardDrive, Calendar } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import { Button } from "@/components/ui/button";

export default function GalleryPage() {
  const galleries = [
    { title: "Flood Relief Gallery", count: "47 photos", size: "125 MB", date: "2026-07-08" },
    { title: "Medical Camp Photos", count: "89 photos", size: "240 MB", date: "2026-06-30" },
    { title: "Education Program Launch", count: "34 photos", size: "98 MB", date: "2026-05-15" },
    { title: "Volunteer Training Session", count: "56 photos", size: "175 MB", date: "2026-04-20" },
  ];

  const images = [
    { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80", title: "Annual Award Gala" },
    { url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80", title: "Education Class" },
    { url: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80", title: "Medical Camp" },
    { url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80", title: "Relief Supplies" },
    { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80", title: "Recognition Ceremony" },
    { url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80", title: "Tree Planting Drive" },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Photos" value="249" change="Across 5 albums" icon={ImageIcon} />
        <StatCard title="Storage Used" value="813 MB" change="Cloud CMS" icon={HardDrive} />
        <StatCard title="Active Albums" value="12" change="Public media" icon={Calendar} />
        <StatCard title="Recent Uploads" value="47" change="This month" icon={Upload} />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-4 rounded-2xl border border-border shadow-sm">
        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto">
          {["All", "Emergency", "Health", "Education", "Volunteers", "Press"].map((tab, i) => (
            <button
              key={i}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                i === 0
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-xl">
          <Upload className="w-4 h-4" />
          Upload New Photos
        </Button>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden group cursor-pointer border border-border shadow-sm"
          >
            <img
              src={img.url}
              alt={img.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white font-bold text-sm tracking-wide">{img.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
