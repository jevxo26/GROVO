import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CampaignResponse } from "@/type/campaigns/campaign";

export const fetchallCampaigns = createAsyncThunk<CampaignResponse>(
  "campaigns/fetchCampaigns",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<CampaignResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/campaigns`,
      );

      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error fetching campaigns",
      );
    }
  },
);

// done
