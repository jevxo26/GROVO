import { CampaignStatisticsResponse } from "@/type/campaigns/campaignstate";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const campaignstate = createAsyncThunk<CampaignStatisticsResponse>(
  "campaigns/fetchCampaignStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<CampaignStatisticsResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/campaigns/stats`,
      );

      console.log(res.data);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error fetching campaign statistics",
      );
    }
  },
);
