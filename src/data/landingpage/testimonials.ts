export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarLetter: string;
  rating: number;
  image: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    quote:
      "ASHRAY has completely changed how I approach charity. I can see exactly where every taka goes and know that my donations are creating real change.",
    name: "Md Antor Mia",
    role: "Monthly Donor since 2024",
    avatarLetter: "M",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "2",
    quote:
      "The digital membership card with QR verification makes everything seamless and trustworthy.",
    name: "Nusrat Jahan",
    role: "Volunteer Lead",
    avatarLetter: "N",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "3",
    quote:
      "Complete financial transparency and live impact tracking. Exactly what was needed.",
    name: "Tanvir Ahmed",
    role: "Corporate Partner",
    avatarLetter: "T",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
  },
];