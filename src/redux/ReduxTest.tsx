"use client";

import { useEffect } from "react";
import { store } from "@/redux/store/store";
import { fetchCampaigns } from "./slices/Campaigns/allcampaign";

export default function ReduxTest() {
  useEffect(() => {
    store.dispatch(fetchCampaigns()).then((res) => {
      // console.log("RESULT 👉", res);
      // console.log("STATE 👉", store.getState());
    });
  }, []);

  return <div>Testing Redux</div>;
}