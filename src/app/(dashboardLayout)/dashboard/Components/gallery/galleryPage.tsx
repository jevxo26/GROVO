"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";


export default function GalleryPage() {
  const galleries = [
    { title: "Flood Relief Gallery", count: "47 photos", size: "125 MB", date: "2026-07-08" },
    { title: "Medical Camp Photos", count: "89 photos", size: "240 MB", date: "2026-06-30" },
    { title: "Education Program Launch", count: "34 photos", size: "98 MB", date: "2026-05-15" },
    { title: "Volunteer Training Session", count: "56 photos", size: "175 MB", date: "2026-04-20" },
    { title: "Annual Report Press Conference", count: "23 photos", size: "65 MB", date: "2026-01-15" },
  ];

  const tabs = ["All", "Emergency", "Health", "Education", "Volunteers", "Press"];

  const images = [
  { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80", title: "Annual Award Gala" },
    { url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80", title: "Education Class" },
    { url: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80", title: "Medical Camp" },
    { url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80", title: "Relief Supplies" },
    { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80", title: "Recognition Ceremony" },
    { url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80", title: "Tree Planting Drive" },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Top Cards */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {galleries.map((gallery, i) => (
          <Card key={i} className="min-w-[240px] p-4 bg-card border-border shadow-sm shrink-0">
            <h3 className="font-semibold text-sm mb-1">{gallery.title}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <span>{gallery.count}</span>
              <span>•</span>
              <span>{gallery.size}</span>
            </div>
            <div className="text-[10px] text-muted-foreground/60">{gallery.date}</div>
          </Card>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-6 overflow-x-auto w-full pb-2 sm:pb-0 border-b sm:border-0 border-border">
          {tabs.map((tab, i) => (
            <button 
              key={i} 
              className={`text-sm font-medium whitespace-nowrap pb-2 sm:pb-0 ${i === 0 ? 'text-teal-600 dark:text-teal-400 sm:border-b-2 sm:border-teal-500' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <Button className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white gap-2 rounded-xl shrink-0">
          <Upload className="w-4 h-4" />
          Upload
        </Button>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer border border-border shadow-sm">
            <img 
              src={img.url} 
              alt={img.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <span className="p-4 text-white font-medium text-sm">{img.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
