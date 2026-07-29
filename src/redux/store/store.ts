import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../slices/counterSlice";
import campaignSlice from "../slices/Campaigns/campaignSlice";
import beneficiarySlice from "@/redux/slices/project-beneficiaries/beneficiarySlice";
import volunteerSlice from "@/redux/slices/project-volunteers/volunteerSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    campaigns: campaignSlice,
    beneficiaries: beneficiarySlice,
    projectVolunteers: volunteerSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
