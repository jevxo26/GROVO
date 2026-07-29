import { campaignstate } from "@/redux/api/campaigns/campaignstate";
import { createSlice } from "@reduxjs/toolkit";

interface CampaignStatistics {
  totalCampaigns: number;
  activeCampaigns: number;
  completedCampaigns: number;
  totalTargetAmount: number;
  totalRaisedAmount: number;
}

interface CampaignState {
  stats: CampaignStatistics | null;
  loading: boolean;
  error: string | null;
}

const initialState: CampaignState = {
  stats: null,
  loading: false,
  error: null,
};

const campaignstateSlice = createSlice({
  name: "campaignstate",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // fetch stats pending
      .addCase(campaignstate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // fetch stats success
      .addCase(campaignstate.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.data;
      })

      // fetch stats error
      .addCase(campaignstate.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          "Failed to fetch campaign statistics";
      });
  },
});

export default campaignstateSlice.reducer;