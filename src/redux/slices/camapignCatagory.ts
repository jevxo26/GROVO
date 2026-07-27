import { createSlice } from "@reduxjs/toolkit";

interface CampaignCategoryType {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: "ACTIVE" | "INACTIVE" | string; // Adjust status values as needed
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  _count: {
    campaigns: number;
  };
}

export interface CampaignCategory {
  value: CampaignCategoryType[];
}

const initialState: CampaignCategory = {
  value: [],
};

export const CampaignCategorySlice = createSlice({
  name: "CampaignCategory",
  initialState,
  reducers: {
    getCampaignCategories: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },
   
  },
});

// Action creators are generated for each case reducer function
export const { getCampaignCategories} = CampaignCategorySlice.actions;

export default CampaignCategorySlice.reducer;
