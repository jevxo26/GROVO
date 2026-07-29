"use client";

import { useEffect } from "react";
import { store } from "@/redux/store/store";
import { fetchallCampaigns } from "./api/campaigns/allcampaign";
import { fetchBeneficiaries, fetchBeneficiariesByProjectId } from "./api/project-beneficiaries/beneficiaryApi";

export default function ReduxTest() {
  useEffect(() => {
    store.dispatch(fetchBeneficiariesByProjectId("project-id")).then((res: any) => {
      // console.log("RESULT 👉", res);
      // console.log("STATE 👉", store.getState());
    });
  }, []);

  return <div>Testing Redux</div>;
}