import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface CampaignMilestoneData {
  id: string | number;
  [key: string]: any;
}

export interface CampaignMilestoneResponse {
  success: boolean;
  message: string;
  data: CampaignMilestoneData | CampaignMilestoneData[];
}

export const campaignMilestoneApi = createApi({
  reducerPath: "campaignMilestoneApi",
  baseQuery,
  tagTypes: ["CampaignMilestone"],
  endpoints: (builder) => ({
    getAllCampaignMilestones: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/campaign-milestones", params } : "/campaign-milestones"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "CampaignMilestone" as const, id })),
              { type: "CampaignMilestone" as const, id: "LIST" },
            ]
          : [{ type: "CampaignMilestone" as const, id: "LIST" }],
    }),
    getCampaignMilestoneById: builder.query<any, string | number>({
      query: (id) => "/campaign-milestones/${id}",
      providesTags: (result, error, id) => [{ type: "CampaignMilestone", id }],
    }),
    createCampaignMilestone: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/campaign-milestones",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "CampaignMilestone", id: "LIST" }],
    }),
    updateCampaignMilestone: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/campaign-milestones/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CampaignMilestone", id },
        { type: "CampaignMilestone", id: "LIST" },
      ],
    }),
    deleteCampaignMilestone: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/campaign-milestones/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "CampaignMilestone", id },
        { type: "CampaignMilestone", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllCampaignMilestonesQuery,
  useGetCampaignMilestoneByIdQuery,
  useCreateCampaignMilestoneMutation,
  useUpdateCampaignMilestoneMutation,
  useDeleteCampaignMilestoneMutation,
} = campaignMilestoneApi;
