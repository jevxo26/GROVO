// "use client";

// import { useEffect } from "react";
// import { store } from "@/redux/store/store";
// import { fetchCampaignBySlug } from "./slices/Campaigns/campaignslugSlice";

// export default function ReduxTest() {
//   useEffect(() => {
//     store.dispatch(fetchCampaignBySlug("building-a-library-for-underprivileged-children"))
//       .then((res) => {
//         console.log("RESULT 👉", res);
//         console.log("STATE 👉", store.getState());
//       });
//   }, []);

//   return <div>Testing Redux</div>;
// }


"use client";

import { useEffect } from "react";
import { store } from "@/redux/store/store";
import { fetchCampaignById } from "./api/campaigns/campaigndetails";

export default function ReduxTest() {
  useEffect(() => {
    store
      .dispatch(
        fetchCampaignById(
          "cms5048ua0004n0v6nwhwbfhd"
        )
      )
      .then((res: any) => {
        console.log("FULL RESPONSE 👉", res);

        // 🔥 main data
        console.log("CAMPAIGN 👉", res.payload);

        // 🎯 specific field
        console.log("ID 👉", res.payload?.id);

        // 🧠 full redux state
        console.log("STATE 👉", store.getState());
      });
  }, []);

  return <div>Check Console</div>;
}