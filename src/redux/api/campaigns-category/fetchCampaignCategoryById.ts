
import { CampaignCategoryResponse } from "@/type/campaigns-category/campaignCategoryByid";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCampaignCategoryById = createAsyncThunk<
  CampaignCategoryResponse,
  string
>("campaignCategory/fetchById", async (id, { rejectWithValue }) => {
  try {
    const res = await axios.get<CampaignCategoryResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/campaign-categories/${id}`
    );
    console.log("API Response:", res.data); // Log the API response for debugging
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Something went wrong");
  }
});