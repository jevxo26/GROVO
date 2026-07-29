import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../slices/counterSlice";
import campaignSlice from "../slices/Campaigns/campaignSlice";
import campaignstateSlice from "../slices/Campaigns/campaignstateSlice";
import campaigndetailsSlice from "../slices/Campaigns/campaigndetailsSlice";
import campaignCategorySlice from './../slices/campaigns-category/campaignCategorySlice';
import campaignCategorySliceByid from "../slices/campaigns-category/campaignCategorySliceByid";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    campaigns: campaignSlice,
    campaignstate: campaignstateSlice,
    campaigndetails: campaigndetailsSlice,
    campaignCategory: campaignCategorySlice,
    campaignCategoryByid: campaignCategorySliceByid,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
