// redux/api/campaigns/campaigndetails.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Campaign } from "../../../../generated/prisma/client";

interface CampaignResponse {
  success: boolean;
  message: string;
  data: Campaign; // ✅ single campaign
}

export const fetchCampaignById = createAsyncThunk<
  Campaign,
  string,
  { rejectValue: string }
>(
  "campaigns/fetchCampaignById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get<CampaignResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/campaigns/${id}`
      );

      return res.data.data; // ✅ ONLY campaign return
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error fetching campaign"
      );
    }
  }
);