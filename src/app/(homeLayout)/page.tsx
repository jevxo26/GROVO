import ImpactSection from "@/components/ui/ImpactSection";
import Banner from "./../../components/ui/Banner";
import ActiveCampaignsSection from "@/components/ui/ActiveCampaignsSection";
import LiveDonationFeed from "../../components/LiveDonationFeed";
import TrustSection from "../../components/ui/TrustSection";
import TestimonialsSection from "@/components/ui/TestimonialsSection";

export default function Home() {
  return (
    <div>
      <Banner />
      <ImpactSection />
      <ActiveCampaignsSection />
      <LiveDonationFeed />
      <TrustSection />
      <TestimonialsSection />
    </div>
  );
}
