"use client";

import { useEffect } from "react";
import { store } from "@/redux/store/store";
import { fetchallCampaigns } from "./api/campaigns/allcampaign";

export default function ReduxTest() {
  useEffect(() => {
    store.dispatch(fetchallCampaigns()).then((res) => {
      // console.log("RESULT 👉", res);
      // console.log("STATE 👉", store.getState());
    });
  }, []);

  return <div>Testing Redux</div>;
}