import ActiveCampaignsSection from "@/components/ui/ActiveCampaignsSection";
import ImpactSection from "@/components/ui/ImpactSection";
import TestimonialsSection from "@/components/ui/TestimonialsSection";
import WaysToGiveSection from "@/components/ui/WaysToGiveSection";
import LiveDonationFeed from "../../components/LiveDonationFeed";
import TrustSection from "../../components/ui/TrustSection";
import Banner from "./../../components/ui/Banner";

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
