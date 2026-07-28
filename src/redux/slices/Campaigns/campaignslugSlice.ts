import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Types (short version import করলে better)
interface Campaign {
  id: string;
  title: string;
  slug: string;
  targetAmount: number;
  raisedAmount: number;
  progressPercentage: number;
}

interface CampaignState {
  campaign: Campaign | null;
  loading: boolean;
  error: string | null;
}

// ✅ Initial State
const initialState: CampaignState = {
  campaign: null,
  loading: false,
  error: null,
};

// ✅ Async Thunk
export const fetchCampaignBySlug = createAsyncThunk(
  "campaign/fetchBySlug",
  async (slug: string, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/campaigns/slug/${slug}`
      );
      // console.log(res);

      return res.data.data; // 👈 important
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// ✅ Slice
const campaignSlice = createSlice({
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
      .addCase(fetchCampaignBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaignBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.campaign = action.payload;
      })
      .addCase(fetchCampaignBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCampaign } = campaignSlice.actions;
export default campaignSlice.reducer;