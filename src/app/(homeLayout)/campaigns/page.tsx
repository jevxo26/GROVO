import { ActiveCampaignsHeader } from "@/components/CampaignsPage/ActiveCampaignsHeader";
import React from "react";
import CampaignsSection from '../../../components/CampaignsPage/CampaignsSection';

const Campaigns = () => {
  return <div className="py-10">
    <ActiveCampaignsHeader />
    <CampaignsSection />
  </div>;
};

export default Campaigns;