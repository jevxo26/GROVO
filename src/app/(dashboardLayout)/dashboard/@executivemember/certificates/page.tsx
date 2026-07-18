import React from 'react';
import { Star, ShieldCheck, Award, Trophy } from 'lucide-react';
import { CertificateCard } from '../components/CertificateCard/CertificateCard';

const certsData = [
  { icon: Star, title: "Monthly Donor Recognition", description: "Recognized for consistent monthly donations throughout the year", date: "2026-07-01" },
  { icon: ShieldCheck, title: "Education Champion Badge", description: "Awarded for exceptional support to education programs", date: "2026-03-15" },
  { icon: Award, title: "Emergency Responder Certificate", description: "Contributed significantly to emergency relief campaigns", date: "2026-02-28" },
  { icon: Trophy, title: "Annual Philanthropy Award", description: "Top donor recognition for the fiscal year 2025", date: "2025-12-31" },
];

const Certificates = () => {
  return (
    <div className="p-4 md:p-8 space-y-4">
      {certsData.map((cert, index) => (
        <CertificateCard key={index} {...cert} />
      ))}
    </div>
  );
};

export default Certificates;