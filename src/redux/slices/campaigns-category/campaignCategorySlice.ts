// redux/features/campaignCategorySlice.ts

import { createSlice } from "@reduxjs/toolkit";
import { fetchCampaignCategories } from "@/redux/api/campaigns-category/fetchCampaignCategories";
import { CampaignCategory } from "@/type/campaigns-category/campaignCategory";

interface CampaignCategoryState {
  categories: CampaignCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: CampaignCategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const campaignCategorySlice = createSlice({
  name: "campaignCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaignCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaignCategories.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ no type error anymore
        state.categories = action.payload;
      })
      .addCase(fetchCampaignCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default campaignCategorySlice.reducer;