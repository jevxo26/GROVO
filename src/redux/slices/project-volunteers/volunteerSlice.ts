import { createSlice } from "@reduxjs/toolkit";
import {
  createProjectVolunteer,
  fetchVolunteersByProjectId,
  fetchVolunteerInfo,
  fetchVolunteerInfoById,
  fetchProjectVolunteerById,
  updateProjectVolunteer,
  deleteProjectVolunteer,
} from "@/redux/api/project-volunteers/volunteerApi";
import { ProjectVolunteer } from "@/type/project-volunteers/volunteer";

interface VolunteerState {
  volunteers: ProjectVolunteer[];
  selectedVolunteer: ProjectVolunteer | null;
  loading: boolean;
  error: string | null;
}

const initialState: VolunteerState = {
  volunteers: [],
  selectedVolunteer: null,
  loading: false,
  error: null,
};

const volunteerSlice = createSlice({
  name: "projectVolunteers",
  initialState,
  reducers: {
    clearSelectedVolunteer: (state) => {
      state.selectedVolunteer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Volunteers By Project ID
      .addCase(fetchVolunteersByProjectId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVolunteersByProjectId.fulfilled, (state, action) => {
        state.loading = false;
        state.volunteers = (action.payload.data as ProjectVolunteer[]) || [];
      })
      .addCase(fetchVolunteersByProjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch project volunteers";
      })

      // Fetch Volunteer Info
      .addCase(fetchVolunteerInfo.fulfilled, (state, action) => {
        state.volunteers = (action.payload.data as ProjectVolunteer[]) || [];
      })

      // Fetch Single Volunteer Assignment
      .addCase(fetchProjectVolunteerById.fulfilled, (state, action) => {
        state.selectedVolunteer = action.payload.data as ProjectVolunteer;
      })

      // Create
      .addCase(createProjectVolunteer.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.volunteers.push(action.payload.data as ProjectVolunteer);
        }
      })

      // Update
      .addCase(updateProjectVolunteer.fulfilled, (state, action) => {
        const updated = action.payload.data as ProjectVolunteer;
        if (updated?.id) {
          const index = state.volunteers.findIndex((v) => v.id === updated.id);
          if (index !== -1) {
            state.volunteers[index] = updated;
          }
        }
      })

      // Delete
      .addCase(deleteProjectVolunteer.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.volunteers = state.volunteers.filter((v) => v.id !== deletedId);
      });
  },
});

export const { clearSelectedVolunteer } = volunteerSlice.actions;
export default volunteerSlice.reducer;