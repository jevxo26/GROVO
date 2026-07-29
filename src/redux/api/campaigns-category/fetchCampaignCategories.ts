// redux/api/campaignCategory.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CampaignCategory, CampaignCategoryResponse } from "@/type/campaigns-category/campaignCategory";

export const fetchCampaignCategories = createAsyncThunk<
  CampaignCategory[], // ✅ final data type
  void,
  { rejectValue: string }
>(
  "campaignCategory/fetchCampaignCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<CampaignCategoryResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/campaign-categories`
      );
      // console.log(res);
      // 🔥 IMPORTANT
      return res.data.data; // শুধু array return
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error fetching categories"
      );
    }
  }
);