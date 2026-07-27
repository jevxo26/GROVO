import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CampaignResponse } from "@/type/campaign";

export const fetchCampaigns = createAsyncThunk<CampaignResponse>(
  "campaigns/fetchCampaigns",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<CampaignResponse>(
        "http://localhost:3000/api/v1/campaigns"
      );

      console.log(res.data.data.data);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error fetching campaigns"
      );
    }
  }
);