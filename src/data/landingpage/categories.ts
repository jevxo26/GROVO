export interface CategoryCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const categoriesData: CategoryCard[] = [
  {
    id: "zakat",
    title: "Zakat",
    description:
      "Fulfill your Zakat obligation with full transparency and tracking",
    icon: "HeartHandshake",
  },
  {
    id: "sadaqah",
    title: "Sadaqah",
    description:
      "Voluntary charity that brings blessings and continuous reward",
    icon: "Heart",
  },
  {
    id: "education",
    title: "Education Support",
    description:
      "Help build schools and provide educational materials",
    icon: "BookOpen",
  },
  {
    id: "medical",
    title: "Medical Assistance",
    description:
      "Support free medical camps and healthcare for the poor",
    icon: "Building2",
  },
  {
    id: "food",
    title: "Food Distribution",
    description:
      "Provide daily meals to orphanages and impoverished families",
    icon: "Utensils",
  },
  {
    id: "emergency",
    title: "Emergency Relief",
    description:
      "Respond quickly to disasters and humanitarian crises",
    icon: "Siren",
  },
  {
    id: "winter",
    title: "Winter Campaign",
    description:
      "Warm blankets and clothing for those facing harsh winters",
    icon: "CloudSnow",
  },
  {
    id: "orphan",
    title: "Orphan Support",
    description:
      "Housing, education, and care for orphaned children",
    icon: "Home",
  },
];