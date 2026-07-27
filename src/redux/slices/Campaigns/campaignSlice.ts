import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Campaign {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  status: string;
  createdAt: string;
}

interface CampaignState {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
}

const initialState: CampaignState = {
  campaigns: [],
  loading: false,
  error: null,
};

export const fetchCampaigns = createAsyncThunk(
  "campaigns/fetchCampaigns",
  async () => {
    const res = await fetch("/api/v1/campaigns");
    const data = await res.json();

    return data;
  }
);

const campaignSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.loading = false;

        state.campaigns = action.payload.data.data;
      })

      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default campaignSlice.reducer;