import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { VolunteerResponse, ProjectVolunteer } from "@/type/project-volunteers/volunteer";

// 1. Create Project Volunteer (POST)
export const createProjectVolunteer = createAsyncThunk<
  VolunteerResponse,
  ProjectVolunteer
>("volunteers/createProjectVolunteer", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post<VolunteerResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/project-volunteers`,
      data
    );
    return res.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Error assigning volunteer to project"
    );
  }
});

// 2. Get Project Volunteers by Project ID
export const fetchVolunteersByProjectId = createAsyncThunk<
  VolunteerResponse,
  string
>("volunteers/fetchVolunteersByProjectId", async (projectId, { rejectWithValue }) => {
  try {
    const res = await axios.get<VolunteerResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/project-volunteers/project/${projectId}`
    );
    return res.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Error fetching project volunteers"
    );
  }
});

// 3. Get Volunteer Info
export const fetchVolunteerInfo = createAsyncThunk<VolunteerResponse>(
  "volunteers/fetchVolunteerInfo",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<VolunteerResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/project-volunteers/volunteer`
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error fetching volunteer info"
      );
    }
  }
);

// 4. Get Volunteer Info by ID
export const fetchVolunteerInfoById = createAsyncThunk<
  VolunteerResponse,
  string
>("volunteers/fetchVolunteerInfoById", async (volunteerUserId, { rejectWithValue }) => {
  try {
    const res = await axios.get<VolunteerResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/project-volunteers/volunteer/${volunteerUserId}`
    );
    return res.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Error fetching volunteer info by ID"
    );
  }
});

// 5. Get Project Volunteer by Assignment ID
export const fetchProjectVolunteerById = createAsyncThunk<
  VolunteerResponse,
  string
>("volunteers/fetchProjectVolunteerById", async (id, { rejectWithValue }) => {
  try {
    const res = await axios.get<VolunteerResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/project-volunteers/${id}`
    );
    return res.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Error fetching volunteer assignment details"
    );
  }
});

// 6. Update Project Volunteer (PATCH)
export const updateProjectVolunteer = createAsyncThunk<
  VolunteerResponse,
  { id: string; data: Partial<ProjectVolunteer> }
>("volunteers/updateProjectVolunteer", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await axios.patch<VolunteerResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/project-volunteers/${id}`,
      data
    );
    return res.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Error updating volunteer assignment"
    );
  }
});

// 7. Delete Project Volunteer (DELETE)
export const deleteProjectVolunteer = createAsyncThunk<VolunteerResponse, string>(
  "volunteers/deleteProjectVolunteer",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete<VolunteerResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/project-volunteers/${id}`
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error deleting volunteer assignment"
      );
    }
  }
);