import ActiveCampaignsSection from "@/components/HomePage/ActiveCampaignsSection";
import ImpactSection from "@/components/HomePage/ImpactSection";
import TestimonialsSection from "@/components/HomePage/TestimonialsSection";
import WaysToGiveSection from "@/components/HomePage/WaysToGiveSection";
import LiveDonationFeed from "../../components/HomePage/LiveDonationFeed";
import TrustSection from "../../components/HomePage/TrustSection";
import Banner from "../../components/HomePage/Banner";

export default function Home() {

  
  return (
    <div>
      <Banner />
      <ImpactSection />
      <ActiveCampaignsSection />
      <LiveDonationFeed />
      <TrustSection />
      <TestimonialsSection />
      <WaysToGiveSection />
    </div>
  );
}