// redux/features/campaign/campaignSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import { fetchCampaignById } from "@/redux/api/campaigns/campaigndetails";
import { Campaign } from "../../../../generated/prisma/client";

// ==============================
// STATE
// ==============================
interface CampaignState {
  campaign: Campaign | null;
  loading: boolean;
  error: string | null;
}

const initialState: CampaignState = {
  campaign: null,
  loading: false,
  error: null,
};

// ==============================
// SLICE
// ==============================
const campaigndetailsSlice = createSlice({
  name: "campaigndetails",
  initialState,
  reducers: {
    clearCampaign: (state) => {
      state.campaign = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaignById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaignById.fulfilled, (state, action) => {
        state.loading = false;
        state.campaign = action.payload; // ✅ PERFECT
      })
      .addCase(fetchCampaignById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// ==============================
// EXPORT
// ==============================
export const { clearCampaign } = campaigndetailsSlice.actions;
export default campaigndetailsSlice.reducer;