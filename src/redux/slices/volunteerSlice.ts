import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const volunteerApi = createApi({
  reducerPath: "volunteerApi",
  baseQuery,
  tagTypes: [
    "Volunteer", "VolunteerProfile", "VolunteerSkill", "VolunteerAvailability",
    "VolunteerDocument", "VolunteerActivityLog", "VolunteerAssignment", "VolunteerSchedule",
    "VolunteerAttendance", "VolunteerTask", "FieldActivity", "FieldVisit",
    "ActivityReport", "BeneficiaryVerification", "VolunteerPerformance", "VolunteerReward",
    "VolunteerCertificate", "VolunteerExpense", "VolunteerReimbursement", "VolunteerAnnouncement", "VolunteerTraining"
  ],
  endpoints: (builder) => ({
    // Volunteers Core
    getAllVolunteers: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/volunteers/volunteers", params } : "/volunteers/volunteers"),
      providesTags: [{ type: "Volunteer", id: "LIST" }],
    }),
    getVolunteerById: builder.query<any, string | number>({
      query: (id) => `/volunteers/volunteers/${id}`,
      providesTags: (r, e, id) => [{ type: "Volunteer", id }],
    }),
    createVolunteer: builder.mutation<any, Partial<any>>({
      query: (data) => ({ url: "/volunteers/volunteers", method: "POST", body: data }),
      invalidatesTags: [{ type: "Volunteer", id: "LIST" }],
    }),
    updateVolunteer: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({ url: `/volunteers/volunteers/${id}`, method: "PATCH", body: data }),
      invalidatesTags: (r, e, { id }) => [{ type: "Volunteer", id }, { type: "Volunteer", id: "LIST" }],
    }),
    deleteVolunteer: builder.mutation<any, string | number>({
      query: (id) => ({ url: `/volunteers/volunteers/${id}`, method: "DELETE" }),
      invalidatesTags: (r, e, id) => [{ type: "Volunteer", id }, { type: "Volunteer", id: "LIST" }],
    }),

    // Volunteer Profiles
    getAllVolunteerProfiles: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/volunteers/volunteer-profiles", params } : "/volunteers/volunteer-profiles"),
      providesTags: [{ type: "VolunteerProfile", id: "LIST" }],
    }),
    getVolunteerProfileById: builder.query<any, string | number>({
      query: (id) => `/volunteers/volunteer-profiles/${id}`,
      providesTags: (r, e, id) => [{ type: "VolunteerProfile", id }],
    }),
    createVolunteerProfile: builder.mutation<any, Partial<any>>({
      query: (data) => ({ url: "/volunteers/volunteer-profiles", method: "POST", body: data }),
      invalidatesTags: [{ type: "VolunteerProfile", id: "LIST" }],
    }),
    updateVolunteerProfile: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({ url: `/volunteers/volunteer-profiles/${id}`, method: "PATCH", body: data }),
      invalidatesTags: (r, e, { id }) => [{ type: "VolunteerProfile", id }, { type: "VolunteerProfile", id: "LIST" }],
    }),
    deleteVolunteerProfile: builder.mutation<any, string | number>({
      query: (id) => ({ url: `/volunteers/volunteer-profiles/${id}`, method: "DELETE" }),
      invalidatesTags: (r, e, id) => [{ type: "VolunteerProfile", id }, { type: "VolunteerProfile", id: "LIST" }],
    }),

    // Volunteer Tasks
    getAllVolunteerTasks: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/volunteers/volunteer-tasks", params } : "/volunteers/volunteer-tasks"),
      providesTags: [{ type: "VolunteerTask", id: "LIST" }],
    }),
    getVolunteerTaskById: builder.query<any, string | number>({
      query: (id) => `/volunteers/volunteer-tasks/${id}`,
      providesTags: (r, e, id) => [{ type: "VolunteerTask", id }],
    }),
    createVolunteerTask: builder.mutation<any, Partial<any>>({
      query: (data) => ({ url: "/volunteers/volunteer-tasks", method: "POST", body: data }),
      invalidatesTags: [{ type: "VolunteerTask", id: "LIST" }],
    }),
    updateVolunteerTask: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({ url: `/volunteers/volunteer-tasks/${id}`, method: "PATCH", body: data }),
      invalidatesTags: (r, e, { id }) => [{ type: "VolunteerTask", id }, { type: "VolunteerTask", id: "LIST" }],
    }),
    deleteVolunteerTask: builder.mutation<any, string | number>({
      query: (id) => ({ url: `/volunteers/volunteer-tasks/${id}`, method: "DELETE" }),
      invalidatesTags: (r, e, id) => [{ type: "VolunteerTask", id }, { type: "VolunteerTask", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllVolunteersQuery,
  useGetVolunteerByIdQuery,
  useCreateVolunteerMutation,
  useUpdateVolunteerMutation,
  useDeleteVolunteerMutation,
  useGetAllVolunteerProfilesQuery,
  useGetVolunteerProfileByIdQuery,
  useCreateVolunteerProfileMutation,
  useUpdateVolunteerProfileMutation,
  useDeleteVolunteerProfileMutation,
  useGetAllVolunteerTasksQuery,
  useGetVolunteerTaskByIdQuery,
  useCreateVolunteerTaskMutation,
  useUpdateVolunteerTaskMutation,
  useDeleteVolunteerTaskMutation,
} = volunteerApi;
