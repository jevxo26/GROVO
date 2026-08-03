// Types Definition
export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}

export const categories: string[] = [
  "All",
  "Emergency Relief",
  "Education",
  "Medical Camps",
  "Food Distribution",
  "Orphan Care",
  "Winter Campaign",
  "Volunteers",
  "Environment",
  "Health",
  "Community Events",
];

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Emergency Flood Relief Action",
    category: "Emergency Relief",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600",
  },
  {
    id: 2,
    title: "Education for Rural Children",
    category: "Education",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600",
  },
  {
    id: 3,
    title: "Free Village Medical Checkup",
    category: "Medical Camps",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600",
  },
  {
    id: 4,
    title: "Food Relief Distribution",
    category: "Food Distribution",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600",
  },
  {
    id: 5,
    title: "Orphan Care & Book Distribution",
    category: "Orphan Care",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600",
  },
  {
    id: 6,
    title: "Winter Clothes Distribution",
    category: "Winter Campaign",
    imageUrl: "https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=600",
  },
  {
    id: 7,
    title: "Youth Volunteer Team",
    category: "Volunteers",
    imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600",
  },
  {
    id: 8,
    title: "Tree Plantation Drive",
    category: "Environment",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600",
  },
  {
    id: 9,
    title: "Maternal Health Awareness",
    category: "Health",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600",
  },
  {
    id: 10,
    title: "Community Gathering & Feast",
    category: "Community Events",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600",
  },
  {
    id: 11,
    title: "Cyclone Shelter Food Support",
    category: "Emergency Relief",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600",
  },
  {
    id: 12,
    title: "School Kit Distribution",
    category: "Education",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
  },
];