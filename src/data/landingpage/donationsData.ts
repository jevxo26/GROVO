export interface Donation {
  id: string;
  donorName: string;
  amount: string;
  campaign: string;
  quote?: string;
}

export const donationsData: Donation[] = [
  {
    id: "1",
    donorName: "Kamala B.",
    amount: "BDT 3,000",
    campaign: "Winter Warmth",
    quote: "Stay warm everyone",
  },
  {
    id: "2",
    donorName: "Anonymous Donor",
    amount: "BDT 15,000",
    campaign: "Orphan Support",
  },
  {
    id: "3",
    donorName: "Syed Corp Ltd.",
    amount: "BDT 100,000",
    campaign: "Emergency Flood Relief",
    quote: "Corporate CSR contribution",
  },
  {
    id: "4",
    donorName: "Nusrat J.",
    amount: "BDT 7,500",
    campaign: "Education for Every Child",
    quote: "Education is the key",
  },
];