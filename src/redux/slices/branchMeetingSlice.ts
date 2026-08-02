import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface BranchMeetingData {
  id: string | number;
  [key: string]: any;
}

export interface BranchMeetingResponse {
  success: boolean;
  message: string;
  data: BranchMeetingData | BranchMeetingData[];
}

export const branchMeetingApi = createApi({
  reducerPath: "branchMeetingApi",
  baseQuery,
  tagTypes: ["BranchMeeting"],
  endpoints: (builder) => ({
    getAllBranchMeetings: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/branch-meetings", params } : "/branch-meetings"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "BranchMeeting" as const, id })),
              { type: "BranchMeeting" as const, id: "LIST" },
            ]
          : [{ type: "BranchMeeting" as const, id: "LIST" }],
    }),
    getBranchMeetingById: builder.query<any, string | number>({
      query: (id) => "/branch-meetings/${id}",
      providesTags: (result, error, id) => [{ type: "BranchMeeting", id }],
    }),
    createBranchMeeting: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/branch-meetings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "BranchMeeting", id: "LIST" }],
    }),
    updateBranchMeeting: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/branch-meetings/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BranchMeeting", id },
        { type: "BranchMeeting", id: "LIST" },
      ],
    }),
    deleteBranchMeeting: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/branch-meetings/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "BranchMeeting", id },
        { type: "BranchMeeting", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBranchMeetingsQuery,
  useGetBranchMeetingByIdQuery,
  useCreateBranchMeetingMutation,
  useUpdateBranchMeetingMutation,
  useDeleteBranchMeetingMutation,
} = branchMeetingApi;
