import { createSlice } from "@reduxjs/toolkit";
import { fetchCampaignCategoryById } from "@/redux/api/campaigns-category/fetchCampaignCategoryById";
import { CampaignCategory } from "@/type/campaigns-category/campaignCategoryByid";

interface CampaignCategoryState {
  data: CampaignCategory | null;
  loading: boolean;
  error: string | null;
}

const initialState: CampaignCategoryState = {
  data: null,
  loading: false,
  error: null,
};

const campaignCategorySliceByid = createSlice({
  name: "campaignCategoryByid",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaignCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaignCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchCampaignCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default campaignCategorySliceByid.reducer;