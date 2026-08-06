import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface BranchAnnouncementData {
  id: string | number;
  [key: string]: any;
}

export interface BranchAnnouncementResponse {
  success: boolean;
  message: string;
  data: BranchAnnouncementData | BranchAnnouncementData[];
}

export const branchAnnouncementApi = createApi({
  reducerPath: "branchAnnouncementApi",
  baseQuery,
  tagTypes: ["BranchAnnouncement"],
  endpoints: (builder) => ({
    getAllBranchAnnouncements: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/branch-announcements", params } : "/branch-announcements"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "BranchAnnouncement" as const, id })),
              { type: "BranchAnnouncement" as const, id: "LIST" },
            ]
          : [{ type: "BranchAnnouncement" as const, id: "LIST" }],
    }),
    getBranchAnnouncementById: builder.query<any, string | number>({
      query: (id) => "/branch-announcements/${id}",
      providesTags: (result, error, id) => [{ type: "BranchAnnouncement", id }],
    }),
    createBranchAnnouncement: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/branch-announcements",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "BranchAnnouncement", id: "LIST" }],
    }),
    updateBranchAnnouncement: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/branch-announcements/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BranchAnnouncement", id },
        { type: "BranchAnnouncement", id: "LIST" },
      ],
    }),
    deleteBranchAnnouncement: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/branch-announcements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "BranchAnnouncement", id },
        { type: "BranchAnnouncement", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBranchAnnouncementsQuery,
  useGetBranchAnnouncementByIdQuery,
  useCreateBranchAnnouncementMutation,
  useUpdateBranchAnnouncementMutation,
  useDeleteBranchAnnouncementMutation,
} = branchAnnouncementApi;
